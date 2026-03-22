#!/usr/bin/env python3
"""
community-answer-generator.py — ZA Support Community Answer Engine
Generates genuine, human-sounding repair answers for Reddit and iFixit.
Uses Haiku API for cost: ~$0.003/answer.
Key principle: answers are genuinely helpful. SA mention = organic only.
"""

import os
import re
import json
import random
import anthropic
from pathlib import Path

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
HOME = Path.home()

# ZA Support context injected when geographically relevant
ZA_CONTEXT = """
You are a Mac repair technician based in Johannesburg, South Africa. You work at a workshop
in Hyde Park doing component-level logic board repairs. You've been doing this for 8 years.
You see about 15–20 Macs per week. Most of your clients are in Sandton, Rosebank, Midrand,
and Fourways. Load shedding is a constant reality — power surges from load shedding are the
#1 cause of MacBook logic board failures you see. You charge R599 for a diagnostic assessment.
"""

# Generic context for non-SA questions
GENERIC_CONTEXT = """
You are a Mac repair technician with 8 years of component-level board repair experience.
You work on Macs daily — logic boards, liquid damage, charging circuits, display drivers.
You've done hundreds of these repairs.
"""

# Post-processing: remove AI tells
AI_TELL_PATTERNS = [
    (r"^Great question[!.]?\s*", ""),
    (r"^I hope this helps[!.]?\s*", ""),
    (r"Feel free to (ask|reach out|message)[^.]*\.", ""),
    (r"Best of luck[!.]?", ""),
    (r"Hope (this helps|that helps|it works out)[!.]?", ""),
    (r"In conclusion,?\s*", ""),
    (r"To summarize,?\s*", ""),
    (r"In summary,?\s*", ""),
    (r"Certainly[!,]?\s*", ""),
    (r"Absolutely[!,]?\s*", ""),
    (r"Of course[!,]?\s*", ""),
    (r"^Sure[!,]?\s*", ""),
    (r"I'd be happy to help[!.]?\s*", ""),
]


def is_sa_relevant(title: str, body: str, subreddit: str = "") -> bool:
    """Check if question has SA/Johannesburg relevance."""
    text = (title + " " + body + " " + subreddit).lower()
    sa_terms = [
        "south africa", "johannesburg", "joburg", "sandton", "rosebank",
        "pretoria", "cape town", "durban", "load shedding", "loadshedding",
        "eskom", "jozi", "randburg", "fourways", "midrand", "bryanston"
    ]
    return any(t in text for t in sa_terms)


def classify_question(title: str, body: str) -> str:
    """Classify question type for appropriate answer style."""
    text = (title + " " + body).lower()
    if any(k in text for k in ["logic board", "motherboard", "board"]):
        return "logic_board"
    if any(k in text for k in ["liquid", "water", "spill", "wet"]):
        return "liquid_damage"
    if any(k in text for k in ["charging", "won't charge", "not charging", "magsafe", "usb-c"]):
        return "charging"
    if any(k in text for k in ["black screen", "no display", "blank screen", "backlight"]):
        return "display"
    if any(k in text for k in ["battery", "swollen", "puffed", "draining fast"]):
        return "battery"
    if any(k in text for k in ["won't turn on", "not turning on", "dead", "no power"]):
        return "no_power"
    if any(k in text for k in ["price", "cost", "how much", "worth it", "repair or buy"]):
        return "pricing"
    return "general"


def build_prompt(title: str, body: str, q_type: str, sa_relevant: bool, platform: str) -> str:
    """Build Haiku prompt for answer generation."""

    context = ZA_CONTEXT if sa_relevant else GENERIC_CONTEXT

    style_rules = """
STYLE RULES (non-negotiable):
- Write in first person as this repair technician
- DO NOT start with "Great question", "I hope this helps", or any preamble
- Start with the direct answer or your most important observation
- Use contractions (it's, don't, you'll, I've, hasn't, etc.)
- Vary sentence length — some short, some long
- You can start a sentence with "And" or "But"
- Include ONE specific technical detail most people wouldn't know
- Include a hedge or caveat ("usually", "in most cases", "can't say for certain without seeing it")
- DO NOT use excessive bullet points — write in paragraphs unless listing steps
- Reference a specific real experience ("I had one come in last month where...")
- If SA-relevant: mention load shedding or power surges naturally if it fits the question
- DO NOT end with "hope this helps", "feel free to ask", "good luck", or any closing platitude
- Keep it under 300 words — dense and useful, not padded
- Sound like a tired but knowledgeable tech who does this daily, not a customer service rep
"""

    sa_mention = ""
    if sa_relevant:
        sa_mention = """
If the person is in South Africa or Johannesburg specifically, you can mention at the end (naturally, not forced):
"If you're in Joburg I can take a look at it — we're in Hyde Park, WA is 064 529 5863"
Only add this if it genuinely fits. Don't shoehorn it.
"""

    type_hints = {
        "logic_board": "Focus on: what the real failure mode is (IC vs the chip itself), repairability odds, what Apple will tell them vs what's actually repairable",
        "liquid_damage": "Focus on: why time matters (corrosion accelerates), the ultrasonic cleaning process, what actually gets damaged first",
        "charging": "Focus on: the specific charge controller path (MagSafe vs USB-C), how to narrow down the fault, common misdiagnoses",
        "display": "Focus on: backlight IC vs LCD vs cable, how to test (external display trick), what the symptoms tell you",
        "battery": "Focus on: cycle count vs health %, genuine vs third-party risk, the real safety implications of swollen batteries",
        "no_power": "Focus on: the diagnostic flowchart a tech actually uses, SMC reset caveats, what 'no power' actually means at a circuit level",
        "pricing": "Focus on: honest comparison (Apple whole-board replacement vs component repair), what affects the price range, what questions to ask any repair shop",
        "general": "Focus on: the most likely root cause based on the symptoms described, what to try first, when to take it to a professional",
    }

    return f"""You are answering a question on {platform}. Here is your background:

{context}

Question title: {title}
Question body: {body}

Question type: {q_type}
Focus guidance: {type_hints.get(q_type, type_hints['general'])}

{style_rules}
{sa_mention}

Write your answer now. Just the answer text — no labels, no "Answer:", nothing before it."""


def remove_ai_tells(text: str) -> str:
    """Strip common AI phrases from generated text."""
    for pattern, replacement in AI_TELL_PATTERNS:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE | re.MULTILINE)
    return text.strip()


def humanise(text: str) -> str:
    """Light post-processing to increase naturalness."""
    # Remove double spaces
    text = re.sub(r"  +", " ", text)
    # Remove trailing whitespace per line
    text = "\n".join(line.rstrip() for line in text.split("\n"))
    # Remove triple+ newlines
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def generate_answer(
    title: str,
    body: str,
    platform: str = "Reddit",
    subreddit: str = "",
    model: str = "claude-haiku-4-5-20251001",
) -> dict:
    """
    Generate a community answer.
    Returns: {answer, q_type, sa_relevant, tokens_used, cost_usd}
    """
    if not ANTHROPIC_API_KEY:
        return {"error": "ANTHROPIC_API_KEY not set", "answer": ""}

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    sa_relevant = is_sa_relevant(title, body, subreddit)
    q_type = classify_question(title, body)
    prompt = build_prompt(title, body, q_type, sa_relevant, platform)

    try:
        response = client.messages.create(
            model=model,
            max_tokens=600,
            messages=[{"role": "user", "content": prompt}],
        )
        raw = response.content[0].text
        answer = humanise(remove_ai_tells(raw))

        input_tokens = response.usage.input_tokens
        output_tokens = response.usage.output_tokens
        # Haiku pricing: $0.00000125/input token, $0.00000125/output token (approx)
        cost = (input_tokens * 0.00000125) + (output_tokens * 0.00000125)

        return {
            "answer": answer,
            "q_type": q_type,
            "sa_relevant": sa_relevant,
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "cost_usd": round(cost, 6),
        }

    except Exception as e:
        return {"error": str(e), "answer": ""}


if __name__ == "__main__":
    # Quick test
    result = generate_answer(
        title="MacBook Pro won't turn on after load shedding surge",
        body="My 2019 MacBook Pro 15 inch just died during a load shedding surge. "
             "Nothing happens when I press power, no light, no fan, no chime. "
             "Apple quoted me R35000 for a new logic board. Is there any other option? "
             "I'm in Johannesburg.",
        platform="Reddit",
        subreddit="r/applehelp",
    )
    print(f"Type: {result.get('q_type')} | SA: {result.get('sa_relevant')} | Cost: ${result.get('cost_usd')}")
    print("\n--- ANSWER ---")
    print(result.get("answer", result.get("error", "")))
