// scripts/strip-image-exif.js
// Strips EXIF metadata from images before they reach Sanity CMS
//
// EXIF metadata can leak:
// - GPS coordinates (workshop location, home addresses)
// - Camera make/model/serial number
// - Original timestamps (workflow timing intelligence)
// - Device IDs
// - Software/editing tool fingerprints
// - Owner names embedded by cameras
//
// This script processes a directory of images and outputs clean versions
// with all EXIF, IPTC, and XMP metadata removed.
//
// Dependencies: sharp (npm install sharp)
//
// Usage:
//   node scripts/strip-image-exif.js <input-dir> <output-dir>
//
// Or as a Sanity asset upload hook (see sanity/uploadHook.ts)

const fs = require('fs')
const path = require('path')

let sharp
try {
  sharp = require('sharp')
} catch (err) {
  console.error('sharp is not installed. Run: npm install sharp')
  process.exit(1)
}

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif']

/**
 * Strip all metadata from a single image.
 * Preserves the image data exactly — only metadata is removed.
 */
async function stripImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase()
  if (!SUPPORTED_FORMATS.includes(ext)) {
    throw new Error(`Unsupported format: ${ext}`)
  }

  // sharp().withMetadata() WITHOUT arguments preserves rotation but strips everything else
  // To strip ALL metadata including orientation, omit withMetadata() entirely
  await sharp(inputPath)
    // Re-encode to strip all metadata
    .rotate() // Auto-rotate based on EXIF orientation, then discard the EXIF tag
    .toFile(outputPath)

  // Get original vs new file size
  const originalSize = fs.statSync(inputPath).size
  const newSize = fs.statSync(outputPath).size

  return {
    inputPath,
    outputPath,
    originalSize,
    newSize,
    saved: originalSize - newSize,
  }
}

/**
 * Verify no EXIF data remains after stripping.
 */
async function verifyStripped(imagePath) {
  const metadata = await sharp(imagePath).metadata()
  const sensitiveFields = ['exif', 'icc', 'iptc', 'xmp', 'tifftagPhotoshop']
  const remaining = sensitiveFields.filter((f) => metadata[f] && Object.keys(metadata[f]).length > 0)
  return {
    clean: remaining.length === 0,
    remaining,
  }
}

/**
 * Process an entire directory recursively.
 */
async function processDirectory(inputDir, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const files = fs.readdirSync(inputDir)
  const results = []

  for (const file of files) {
    const inputPath = path.join(inputDir, file)
    const outputPath = path.join(outputDir, file)
    const stat = fs.statSync(inputPath)

    if (stat.isDirectory()) {
      const subResults = await processDirectory(inputPath, outputPath)
      results.push(...subResults)
      continue
    }

    const ext = path.extname(file).toLowerCase()
    if (!SUPPORTED_FORMATS.includes(ext)) {
      console.log(`SKIP (unsupported): ${file}`)
      continue
    }

    try {
      const result = await stripImage(inputPath, outputPath)
      const verification = await verifyStripped(outputPath)
      results.push({ ...result, verification })
      console.log(
        `✓ ${file} — ${(result.originalSize / 1024).toFixed(1)}KB → ${(result.newSize / 1024).toFixed(1)}KB ${
          verification.clean ? '(clean)' : `(REMAINING: ${verification.remaining.join(', ')})`
        }`
      )
    } catch (err) {
      console.error(`✗ ${file} — ${err.message}`)
    }
  }

  return results
}

// CLI entry point
async function main() {
  const args = process.argv.slice(2)
  if (args.length < 2) {
    console.error('Usage: node scripts/strip-image-exif.js <input-dir> <output-dir>')
    process.exit(1)
  }

  const [inputDir, outputDir] = args

  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory does not exist: ${inputDir}`)
    process.exit(1)
  }

  console.log(`Stripping EXIF metadata`)
  console.log(`  Input:  ${inputDir}`)
  console.log(`  Output: ${outputDir}`)
  console.log('---')

  const results = await processDirectory(inputDir, outputDir)

  const totalOriginal = results.reduce((sum, r) => sum + (r.originalSize || 0), 0)
  const totalNew = results.reduce((sum, r) => sum + (r.newSize || 0), 0)
  const cleanCount = results.filter((r) => r.verification?.clean).length

  console.log('---')
  console.log(`Processed: ${results.length} images`)
  console.log(`Clean: ${cleanCount}/${results.length}`)
  console.log(`Total saved: ${((totalOriginal - totalNew) / 1024).toFixed(1)}KB`)
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Failed:', err)
    process.exit(1)
  })
}

module.exports = { stripImage, verifyStripped, processDirectory }
