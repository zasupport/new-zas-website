// scripts/schedule-sanity-posts.js
// Queues draft blog posts in Sanity to publish at the GSC-determined optimal hours.
//
// HOW IT WORKS:
// 1. Reads config/publish-schedule.json (the 8 optimal hours from gsc-traffic-analyser.js)
// 2. Fetches all unpublished drafts from Sanity that are flagged ready-to-publish
// 3. Assigns each draft to the next available publish slot
// 4. Sets `publishAt` field on each draft for Sanity Scheduled Publishing to pick up
// 5. Logs the schedule to /reports/publish-queue.json
//
// Runs every hour via cron:
//   0 * * * * cd /var/www/zasupport && node scripts/schedule-sanity-posts.js
//
// Sanity Studio handles the actual publishing via Scheduled Publishing plugin
// (sanity install @sanity/scheduled-publishing) — this script just sets the
// publishAt timestamp.

const fs = require('fs')
const path = require('path')

const SCHEDULE_FILE = path.join(__dirname, '..', 'config', 'publish-schedule.json')
const QUEUE_FILE = path.join(__dirname, '..', 'reports', 'publish-queue.json')
const TIMEZONE_OFFSET_MS = 2 * 60 * 60 * 1000 // SAST = UTC+2

let createClient
try {
  createClient = require('@sanity/client').createClient
} catch (err) {
  console.warn('@sanity/client not installed. Run: npm install @sanity/client')
  console.warn('(Continuing in dry-run mode)')
}

function getSanityClient() {
  if (!createClient) return null

  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  const token = process.env.SANITY_WRITE_TOKEN

  if (!projectId || !token) {
    throw new Error(
      'SANITY_PROJECT_ID and SANITY_WRITE_TOKEN must be set. ' +
      'Get token from https://www.sanity.io/manage/project/<id>/api'
    )
  }

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2024-01-01',
    useCdn: false,
  })
}

// ============================================================
// Schedule loading
// ============================================================

function loadSchedule() {
  if (!fs.existsSync(SCHEDULE_FILE)) {
    throw new Error(
      `Publish schedule not found at ${SCHEDULE_FILE}. ` +
      `Run: node scripts/gsc-traffic-analyser.js --refresh-schedule`
    )
  }
  return JSON.parse(fs.readFileSync(SCHEDULE_FILE, 'utf-8'))
}

function loadQueue() {
  if (!fs.existsSync(QUEUE_FILE)) return { entries: [] }
  return JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf-8'))
}

function saveQueue(queue) {
  if (!fs.existsSync(path.dirname(QUEUE_FILE))) {
    fs.mkdirSync(path.dirname(QUEUE_FILE), { recursive: true })
  }
  fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2))
}

// ============================================================
// Slot calculation
// ============================================================

/**
 * Generate the next N publish slots based on the schedule.
 * Returns ISO timestamps in UTC for Sanity to consume.
 */
function generateUpcomingSlots(schedule, count = 56) { // 56 = 7 days × 8 slots
  const slots = []
  const now = new Date()
  const publishHours = schedule.publishTimes.map((t) => parseInt(t.split(':')[0], 10))

  // Start from today, walk forward until we have `count` future slots
  let day = new Date(now)
  day.setHours(0, 0, 0, 0)

  while (slots.length < count) {
    for (const hour of publishHours) {
      const slot = new Date(day)
      slot.setHours(hour, 0, 0, 0)

      // Convert from SAST to UTC for Sanity
      const utcSlot = new Date(slot.getTime() - TIMEZONE_OFFSET_MS)

      // Only future slots (with 5-minute buffer)
      if (utcSlot.getTime() > now.getTime() + 5 * 60 * 1000) {
        slots.push({
          sastTime: slot.toISOString(),
          utcTime: utcSlot.toISOString(),
          hour,
          dayOffset: Math.floor((day - now) / 86400000),
        })
      }
    }
    day.setDate(day.getDate() + 1)

    // Safety: don't loop more than 30 days
    if ((day - now) / 86400000 > 30) break
  }

  return slots
}

/**
 * Filter out slots that are already occupied by queued posts.
 */
function getAvailableSlots(allSlots, existingQueue) {
  const occupied = new Set(existingQueue.entries.map((e) => e.utcTime))
  return allSlots.filter((s) => !occupied.has(s.utcTime))
}

// ============================================================
// Sanity operations
// ============================================================

async function fetchReadyDrafts(client) {
  if (!client) return []

  // Fetch drafts where:
  // - readyToPublish is true (set by author when content is finished)
  // - publishAt is not yet set (not already scheduled)
  // - _id starts with "drafts." (still in draft state)
  const query = `*[_type == "blogPost" && readyToPublish == true && !defined(publishAt) && _id in path("drafts.**")] {
    _id,
    title,
    slug,
    authorSlug,
    category,
    _createdAt
  } | order(_createdAt asc)`

  return await client.fetch(query)
}

async function assignSlot(client, draft, slot) {
  if (!client) return { dryRun: true, draft, slot }

  return await client
    .patch(draft._id)
    .set({
      publishAt: slot.utcTime,
      scheduledFor: slot.sastTime,
      scheduledAt: new Date().toISOString(),
    })
    .commit()
}

// ============================================================
// Main scheduler
// ============================================================

async function runScheduler() {
  console.log(`[${new Date().toISOString()}] Running publish scheduler`)

  // 1. Load schedule
  const schedule = loadSchedule()
  console.log(`  Schedule:     ${schedule.publishTimes.join(', ')} ${schedule.timezone}`)
  console.log(`  Posts/day:    ${schedule.postsPerDay}`)

  // Check if schedule needs refresh
  if (new Date(schedule.nextRefresh) < new Date()) {
    console.log(`  ⚠ Schedule expired (${schedule.nextRefresh}) — refresh recommended`)
    console.log(`    Run: node scripts/gsc-traffic-analyser.js --refresh-schedule`)
  }

  // 2. Load existing queue
  const existingQueue = loadQueue()
  console.log(`  Queue depth:  ${existingQueue.entries.length} posts already scheduled`)

  // 3. Generate upcoming slots
  const allSlots = generateUpcomingSlots(schedule, 56)
  const availableSlots = getAvailableSlots(allSlots, existingQueue)
  console.log(`  Available:    ${availableSlots.length} open slots in next 7 days`)

  // 4. Fetch ready drafts from Sanity
  let client
  try {
    client = getSanityClient()
  } catch (err) {
    console.error(`  ! Sanity client error: ${err.message}`)
    console.error('  ! Continuing in dry-run mode')
    client = null
  }

  const drafts = await fetchReadyDrafts(client)
  console.log(`  Ready drafts: ${drafts.length}`)

  if (drafts.length === 0) {
    console.log('  Nothing to schedule.')
    return { scheduled: 0 }
  }

  // 5. Assign drafts to slots
  const assignments = []
  const newQueueEntries = [...existingQueue.entries]

  for (let i = 0; i < drafts.length && i < availableSlots.length; i++) {
    const draft = drafts[i]
    const slot = availableSlots[i]

    try {
      await assignSlot(client, draft, slot)
      assignments.push({ draft: draft.title || draft._id, slot: slot.sastTime })
      newQueueEntries.push({
        draftId: draft._id,
        title: draft.title,
        slug: draft.slug?.current,
        author: draft.authorSlug,
        category: draft.category,
        utcTime: slot.utcTime,
        sastTime: slot.sastTime,
        scheduledAt: new Date().toISOString(),
      })
      console.log(`  ✓ ${slot.sastTime} → ${draft.title || draft._id}`)
    } catch (err) {
      console.error(`  ✗ Failed to schedule ${draft._id}: ${err.message}`)
    }
  }

  // 6. Save updated queue
  saveQueue({ entries: newQueueEntries, lastUpdated: new Date().toISOString() })

  // 7. Report
  if (drafts.length > availableSlots.length) {
    console.log(
      `  ⚠ ${drafts.length - availableSlots.length} drafts could not be scheduled — queue is full`
    )
  }

  return { scheduled: assignments.length, assignments }
}

if (require.main === module) {
  runScheduler()
    .then((result) => {
      console.log(`\nScheduler complete. ${result.scheduled} posts queued.`)
      process.exit(0)
    })
    .catch((err) => {
      console.error('Scheduler failed:', err.message)
      process.exit(1)
    })
}

module.exports = { runScheduler, generateUpcomingSlots, loadSchedule }
