#!/usr/bin/env python3
"""
persona-manager.py v1.0 — ZA Support Community Persona System
Manages multiple Gmail/Reddit/iFixit accounts as 'seeder' personas.
Strategy:
  - Seeder accounts ASK questions (Mac problems, SA-specific)
  - Authority account (main) ANSWERS with expert ZA Support knowledge
  - Creates natural Q&A content, builds karma for authority account
  - Personas rotate to avoid patterns

Config: ~/Desktop/Claude/Personas/personas.json
Drafts: ~/Desktop/Claude/Reddit/ and ~/Desktop/Claude/iFixit/
"""

import os
import sys
import json
import random
import hashlib
import time
from pathlib import Path
from datetime import datetime, timezone

HOME = Path.home()
PERSONA_DIR = HOME / "Desktop" / "Claude" / "Personas"
PERSONA_FILE = PERSONA_DIR / "personas.json"
REDDIT_DRAFT_DIR = HOME / "Desktop" / "Claude" / "Reddit"
IFIXIT_DRAFT_DIR = HOME / "Desktop" / "Claude" / "iFixit"
LOG_FILE = HOME / ".za-persona-manager.log"

SCRIPTS_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPTS_DIR))

# Import via importlib since filename uses hyphens
import importlib.util as _ilu
_spec = _ilu.spec_from_file_location("community_answer_generator",
    SCRIPTS_DIR / "community-answer-generator.py")
if _spec is None:
    print("ERROR: community-answer-generator.py not found in scripts/")
    sys.exit(1)
_mod = _ilu.module_from_spec(_spec)
_spec.loader.exec_module(_mod)
generate_answer = _mod.generate_answer


def log(msg: str):
    ts = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    line = f"{ts} [persona-manager] {msg}"
    print(line)
    with open(LOG_FILE, "a") as f:
        f.write(line + "\n")


def load_personas() -> list[dict]:
    """Load persona config. Returns list of persona dicts."""
    if not PERSONA_FILE.exists():
        log(f"No persona file found at {PERSONA_FILE}")
        log("Create it with: python3 scripts/persona-manager.py --init")
        return []
    try:
        data = json.loads(PERSONA_FILE.read_text())
        return data.get("personas", [])
    except Exception as e:
        log(f"ERROR loading personas: {e}")
        return []


def save_personas(personas: list[dict]):
    PERSONA_DIR.mkdir(parents=True, exist_ok=True)
    data = {"personas": personas, "updated_at": datetime.now(timezone.utc).isoformat()}
    PERSONA_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False))


def init_persona_file():
    """Create the persona config template."""
    PERSONA_DIR.mkdir(parents=True, exist_ok=True)
    template = {
        "personas": [
            {
                "id": "persona_01",
                "role": "seeder",
                "name": "Mac User 1",
                "gmail": "",
                "reddit_username": "",
                "reddit_password": "",
                "ifixit_username": "",
                "ifixit_password": "",
                "platforms": ["reddit"],
                "active": False,
                "questions_asked": 0,
                "last_used": None,
                "notes": "First seeder account — asks questions for authority to answer"
            },
            {
                "id": "persona_02",
                "role": "seeder",
                "name": "Mac User 2",
                "gmail": "",
                "reddit_username": "",
                "reddit_password": "",
                "ifixit_username": "",
                "ifixit_password": "",
                "platforms": ["reddit", "ifixit"],
                "active": False,
                "questions_asked": 0,
                "last_used": None,
                "notes": "Second seeder — different posting times to avoid pattern"
            },
            {
                "id": "authority",
                "role": "authority",
                "name": "ZA Support",
                "gmail": "courtney@zasupport.com",
                "reddit_username": os.environ.get("REDDIT_USERNAME", "DesperateBonus6367"),
                "reddit_password": os.environ.get("REDDIT_PASSWORD", ""),
                "ifixit_username": os.environ.get("IFIXIT_USERNAME", ""),
                "ifixit_password": os.environ.get("IFIXIT_PASSWORD", ""),
                "platforms": ["reddit", "ifixit"],
                "active": True,
                "questions_asked": 0,
                "answers_given": 0,
                "notes": "Main authority account — answers all questions"
            }
        ],
        "strategy": {
            "description": "Seeders ask questions, authority answers. Builds karma + SEO content.",
            "question_templates": "scripts/question-templates.json",
            "max_questions_per_seeder_per_night": 2,
            "min_delay_between_posts_seconds": 300,
            "answer_delay_after_question_hours": 1
        },
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    PERSONA_FILE.write_text(json.dumps(template, indent=2, ensure_ascii=False))
    log(f"Created persona template: {PERSONA_FILE}")
    log("Next: fill in gmail/reddit/ifixit credentials for each persona")
    print(f"\n✅ Template created: {PERSONA_FILE}")
    print("   Edit the file and add credentials for each persona account")
    print("   Set 'active': true for accounts that are ready to use")


# ── Question Templates ──────────────────────────────────────────────────────

# Mac problem question templates for seeders to ask
QUESTION_TEMPLATES = [
    {
        "platform": "reddit",
        "subreddit": "applehelp",
        "title": "MacBook Pro won't turn on after power outage in JHB — any hope?",
        "body": "Hey everyone, had a load shedding surge last week and now my 2019 MacBook Pro 15\" won't turn on at all. No chime, no light on MagSafe, nothing. Took it to a local place and they said logic board is dead and quoted me R18,000 for replacement. Is this accurate? Has anyone found a cheaper repair option in Johannesburg? I'm kind of desperate as all my work is on there.",
        "tags": ["logic board", "johannesburg", "load shedding", "won't turn on"]
    },
    {
        "platform": "reddit",
        "subreddit": "mac",
        "title": "Spilled water on my MacBook Air M1 — what do I do right now?",
        "body": "Just spilled about half a glass of water on my MacBook Air M1. Immediately turned it upside down and it seems to have shut off. This happened 10 minutes ago. What should I do right now? Should I take it to a repair shop immediately or wait? I'm in Sandton if anyone knows a good place.",
        "tags": ["liquid damage", "water damage", "sandton", "m1"]
    },
    {
        "platform": "reddit",
        "subreddit": "southafrica",
        "title": "Best MacBook repair shop in Johannesburg? Apple Store quoted R45k",
        "body": "My MacBook Pro 2020 died (logic board issue) and Apple Store at Sandton City quoted me R45,000 for a replacement. That's essentially the price of a new laptop. Anyone know of reputable independent repair shops in JHB that can actually fix these boards instead of replacing them? How do I know if they're trustworthy?",
        "tags": ["johannesburg", "logic board", "repair cost", "south africa"]
    },
    {
        "platform": "reddit",
        "subreddit": "applehelp",
        "title": "MacBook Pro black screen — keyboard lights up but no display",
        "body": "My MacBook Pro 2017 has a black screen issue. When I press power, I can hear the fan, the keyboard backlights up, and I can even hear the startup sound sometimes — but the screen stays completely black. Connected to external monitor and it works fine. Is this a GPU issue, display cable, or something more serious? How much would this usually cost to fix?",
        "tags": ["black screen", "display", "gpu", "macbook pro 2017"]
    },
    {
        "platform": "reddit",
        "subreddit": "techsupport",
        "title": "MacBook Pro not charging — MagSafe LED doesn't light up at all",
        "body": "My 2015 MacBook Pro 15\" is completely dead. The MagSafe adapter shows no LED at all when connected. Tried different chargers, reset SMC multiple times using the guide I found online (Shift+Control+Option+Power), but nothing. Battery is at 0% (according to coconutBattery when I borrowed a friend's charger which also didn't work). Any ideas before I take it somewhere?",
        "tags": ["not charging", "magsafe", "smc reset", "macbook pro 2015"]
    },
    {
        "platform": "ifixit",
        "title": "MacBook Pro 2019 won't power on after Eskom surge — logic board?",
        "body": "South Africa here — we had a bad load shedding surge and my MacBook Pro 15\" 2019 (A1990) stopped working. Completely dead. Apple Authorised Service quoted R18,000 for logic board replacement. Is component-level repair possible on this board? What chips are typically damaged in a power surge? Is there a repair service that does this rather than full board swap?",
        "tags": ["logic board", "power surge", "A1990", "south africa"]
    },
    {
        "platform": "ifixit",
        "title": "MacBook Air 2020 liquid damage — keyboard and trackpad dead after water spill",
        "body": "Spilled about 200ml of water on my MacBook Air 2020 (M1, A2337). Immediately switched it off and dried it. Now keyboard and trackpad don't work, but when I use an external keyboard/mouse it boots fine. Display works too. Is this fixable without replacing the whole top case? I've seen prices for top case replacement and it's nearly as expensive as the laptop itself.",
        "tags": ["liquid damage", "MacBook Air", "A2337", "keyboard", "trackpad"]
    },
]


def pick_question_for_seeder(persona: dict, seen_hashes: set) -> dict | None:
    """Pick a question template that hasn't been asked recently."""
    platforms = persona.get("platforms", ["reddit"])
    available = [q for q in QUESTION_TEMPLATES if q["platform"] in platforms]
    random.shuffle(available)

    for q in available:
        h = hashlib.md5(q["title"].encode()).hexdigest()[:8]
        if h not in seen_hashes:
            return q
    return None


def generate_question_draft(persona: dict, question: dict) -> dict:
    """Create a seeder draft (question to post, not an answer)."""
    pid = hashlib.md5((persona["id"] + question["title"]).encode()).hexdigest()[:8]
    platform = question["platform"]
    date_slug = datetime.now().strftime("%d%m%Y")

    draft = {
        "platform": platform,
        "persona_id": persona["id"],
        "persona_name": persona["name"],
        "role": "question",
        "title": question["title"],
        "body": question["body"],
        "tags": question.get("tags", []),
        "subreddit": question.get("subreddit", ""),
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "status": "draft",
        "answer_status": "pending",
        "note": "Seeder question — authority account will answer after ~1h delay"
    }

    if platform == "reddit":
        fname = REDDIT_DRAFT_DIR / f"draft-reddit-question-{pid}-{date_slug}.json"
        REDDIT_DRAFT_DIR.mkdir(parents=True, exist_ok=True)
    else:
        fname = IFIXIT_DRAFT_DIR / f"draft-ifixit-question-{pid}-{date_slug}.json"
        IFIXIT_DRAFT_DIR.mkdir(parents=True, exist_ok=True)

    fname.write_text(json.dumps(draft, indent=2, ensure_ascii=False))
    return draft


def generate_authority_answer_for_question(question: dict) -> dict | None:
    """Generate an authoritative answer for a seeder question."""
    result = generate_answer(
        title=question["title"],
        body=question.get("body", ""),
        platform=question.get("platform", "Reddit"),
        subreddit=question.get("subreddit", ""),
    )
    return result if result and not result.get("error") else None


def main():
    if "--init" in sys.argv:
        init_persona_file()
        return 0

    log(f"Persona Manager v1.0 — {datetime.now().strftime('%d/%m/%Y %H:%M')}")

    personas = load_personas()
    if not personas:
        log("No personas configured. Run: python3 scripts/persona-manager.py --init")
        return 0

    active_seeders = [p for p in personas if p.get("role") == "seeder" and p.get("active")]
    authority = next((p for p in personas if p.get("role") == "authority" and p.get("active")), None)

    log(f"Active seeders: {len(active_seeders)} | Authority: {'YES' if authority else 'NO'}")

    if not active_seeders:
        log("No active seeder personas. Add Gmail/Reddit credentials to personas.json and set active=true")
        return 0

    # Load seen hashes from existing drafts
    seen_hashes = set()
    for draft_dir in [REDDIT_DRAFT_DIR, IFIXIT_DRAFT_DIR]:
        if draft_dir.exists():
            for f in draft_dir.glob("draft-*-question-*.json"):
                try:
                    d = json.loads(f.read_text())
                    h = hashlib.md5(d.get("title", "").encode()).hexdigest()[:8]
                    seen_hashes.add(h)
                except Exception:
                    pass

    questions_created = 0
    answers_created = 0
    total_cost = 0.0
    MAX_PER_NIGHT = 2  # per seeder

    for persona in active_seeders:
        count = 0
        log(f"\nSeeder: {persona['name']} ({persona.get('reddit_username', 'no username')})")

        while count < MAX_PER_NIGHT:
            q = pick_question_for_seeder(persona, seen_hashes)
            if not q:
                log(f"  No more unique questions for {persona['name']}")
                break

            h = hashlib.md5(q["title"].encode()).hexdigest()[:8]
            seen_hashes.add(h)

            log(f"  Question: {q['title'][:65]}")
            draft = generate_question_draft(persona, q)
            questions_created += 1
            count += 1

            # Generate authority answer for this question (pre-staged)
            if authority:
                log(f"  Generating authority answer...")
                result = generate_authority_answer_for_question(q)
                if result:
                    total_cost += result.get("cost_usd", 0)

                    # Create answer draft for authority account
                    pid = hashlib.md5((persona["id"] + q["title"]).encode()).hexdigest()[:8]
                    date_slug = datetime.now().strftime("%d%m%Y")
                    answer_draft = {
                        "platform": q["platform"],
                        "persona_id": authority["id"],
                        "persona_name": authority["name"],
                        "role": "answer",
                        "linked_question_hash": pid,
                        "question_title": q["title"],
                        "answer": result["answer"],
                        "q_type": result.get("q_type"),
                        "sa_relevant": result.get("sa_relevant"),
                        "cost_usd": result.get("cost_usd"),
                        "generated_at": datetime.now(timezone.utc).isoformat(),
                        "status": "draft",
                        "note": f"Authority answer for seeder question. Post AFTER seeder posts question (≥1h delay)."
                    }

                    if q["platform"] == "reddit":
                        REDDIT_DRAFT_DIR.mkdir(parents=True, exist_ok=True)
                        afile = REDDIT_DRAFT_DIR / f"draft-reddit-answer-{pid}-{date_slug}.json"
                    else:
                        IFIXIT_DRAFT_DIR.mkdir(parents=True, exist_ok=True)
                        afile = IFIXIT_DRAFT_DIR / f"draft-ifixit-answer-{pid}-{date_slug}.json"

                    afile.write_text(json.dumps(answer_draft, indent=2, ensure_ascii=False))
                    answers_created += 1
                    log(f"  Authority answer staged | cost ${result.get('cost_usd', 0):.4f}")

            time.sleep(2)

        # Update persona usage stats
        persona["questions_asked"] = persona.get("questions_asked", 0) + count
        persona["last_used"] = datetime.now(timezone.utc).isoformat()

    save_personas(personas)

    print("\n" + "=" * 60)
    print(f"Questions drafted: {questions_created}")
    print(f"Authority answers staged: {answers_created}")
    print(f"Total API cost: ${total_cost:.4f}")
    print(f"\nNext steps:")
    print(f"  1. Seeder accounts post their QUESTIONS manually (or via Playwright when configured)")
    print(f"  2. Wait ≥1 hour after question posted")
    print(f"  3. Authority account (reddit_poster.py) posts the staged answers")
    print(f"  Drafts: {REDDIT_DRAFT_DIR} | {IFIXIT_DRAFT_DIR}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
