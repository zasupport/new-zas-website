#!/usr/bin/env python3
"""
Reddit Trust Building Strategy PDF
ZA Support — 24 March 2026
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import PageBreak

OUTPUT = "/Users/courtneybentley/Desktop/ZA Support — Reddit Trust Strategy 24 03 2026.pdf"

TEAL = colors.HexColor("#27504D")
GREEN = colors.HexColor("#0FEA7A")
LIGHT_TEAL = colors.HexColor("#EAF2F1")
DARK = colors.HexColor("#1A1A1A")
MID = colors.HexColor("#555555")
LIGHT = colors.HexColor("#F7F7F7")
WHITE = colors.white
RED = colors.HexColor("#C0392B")
AMBER = colors.HexColor("#D68910")

W, H = A4

def build():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=18*mm,
        rightMargin=18*mm,
        topMargin=18*mm,
        bottomMargin=18*mm,
    )

    styles = getSampleStyleSheet()

    def sty(name, **kw):
        return ParagraphStyle(name, **kw)

    title_sty = sty("Title2", fontName="Helvetica-Bold", fontSize=20, textColor=WHITE,
                    spaceAfter=2, leading=24)
    sub_sty = sty("Sub", fontName="Helvetica", fontSize=10, textColor=GREEN,
                  spaceAfter=2, leading=14)
    h1_sty = sty("H1", fontName="Helvetica-Bold", fontSize=13, textColor=TEAL,
                 spaceBefore=10, spaceAfter=4, leading=16)
    h2_sty = sty("H2", fontName="Helvetica-Bold", fontSize=11, textColor=DARK,
                 spaceBefore=8, spaceAfter=3, leading=14)
    h3_sty = sty("H3", fontName="Helvetica-Bold", fontSize=10, textColor=TEAL,
                 spaceBefore=6, spaceAfter=2, leading=13)
    body_sty = sty("Body2", fontName="Helvetica", fontSize=9, textColor=DARK,
                   spaceAfter=3, leading=13)
    small_sty = sty("Small", fontName="Helvetica", fontSize=8, textColor=MID,
                    spaceAfter=2, leading=11)
    bold_body = sty("BoldBody", fontName="Helvetica-Bold", fontSize=9, textColor=DARK,
                    spaceAfter=3, leading=13)
    warn_sty = sty("Warn", fontName="Helvetica-Bold", fontSize=9, textColor=RED,
                   spaceAfter=3, leading=13)
    note_sty = sty("Note", fontName="Helvetica-Oblique", fontSize=8.5, textColor=MID,
                   spaceAfter=3, leading=12)

    story = []

    # ── HEADER BANNER ──────────────────────────────────────────────────────────
    header_data = [[
        Paragraph("Reddit Trust Building Strategy", title_sty),
        Paragraph("ZA Support — Apple Experts<br/>064 529 5863<br/>zasupport.com",
                  sty("HR", fontName="Helvetica", fontSize=9, textColor=GREEN,
                      leading=13, alignment=TA_RIGHT))
    ]]
    header_tbl = Table(header_data, colWidths=[120*mm, 55*mm])
    header_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), TEAL),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("LEFTPADDING", (0,0), (0,0), 8*mm),
        ("RIGHTPADDING", (-1,0), (-1,0), 6*mm),
        ("TOPPADDING", (0,0), (-1,-1), 7*mm),
        ("BOTTOMPADDING", (0,0), (-1,-1), 7*mm),
    ]))
    story.append(header_tbl)

    # Sub-header
    meta_data = [[
        Paragraph("Prepared for: Courtney Bentley &nbsp;&nbsp;|&nbsp;&nbsp; Date: 24 March 2026 &nbsp;&nbsp;|&nbsp;&nbsp; Accounts: 4 Seeders + 1 Authority",
                  sty("Meta", fontName="Helvetica", fontSize=8.5, textColor=WHITE, leading=12)),
    ]]
    meta_tbl = Table(meta_data, colWidths=[175*mm])
    meta_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), colors.HexColor("#1B3D3A")),
        ("LEFTPADDING", (0,0), (-1,-1), 8*mm),
        ("TOPPADDING", (0,0), (-1,-1), 3*mm),
        ("BOTTOMPADDING", (0,0), (-1,-1), 3*mm),
    ]))
    story.append(meta_tbl)
    story.append(Spacer(1, 6*mm))

    # ── OVERVIEW ───────────────────────────────────────────────────────────────
    story.append(Paragraph("Overview", h1_sty))
    story.append(HRFlowable(width="100%", thickness=1, color=TEAL, spaceAfter=4))
    story.append(Paragraph(
        "Reddit's trust system is based on three pillars: <b>account age</b>, <b>karma</b>, and <b>behavioural consistency</b>. "
        "New accounts are heavily restricted. Accounts that post immediately after creation are flagged or shadow-banned. "
        "The strategy below builds each seeder account to a minimum trust threshold before any ZA Support seeding begins — "
        "typically 60 days with 50+ comment karma. The authority account (DesperateBonus6367) runs in parallel and handles "
        "direct ZA Support recommendations in response to seeder questions.",
        body_sty
    ))
    story.append(Spacer(1, 3*mm))

    # ── ACCOUNT SUMMARY ────────────────────────────────────────────────────────
    story.append(Paragraph("Account Register", h1_sty))
    story.append(HRFlowable(width="100%", thickness=1, color=TEAL, spaceAfter=4))

    acct_data = [
        ["#", "Display Name", "Username", "Role", "Created", "Status"],
        ["1", "Nico Hammans", "u/Slow_Cheetah9554", "Seeder — asks Mac questions", "24 Mar 2026", "Active ✓"],
        ["2", "Elise Mills", "TBC (Day 2)", "Seeder — asks Mac questions", "25 Mar 2026", "Pending"],
        ["3", "Adam Levitt", "TBC (Day 3)", "Seeder — asks Mac questions", "26 Mar 2026", "Pending"],
        ["4", "Dovi Schaffer", "TBC (Day 4)", "Seeder — asks Mac questions", "27 Mar 2026", "Pending"],
        ["A", "DesperateBonus6367", "u/DesperateBonus6367", "Authority — recommends ZA Support", "Existing", "Active ✓"],
    ]
    acct_tbl = Table(acct_data, colWidths=[8*mm, 32*mm, 38*mm, 48*mm, 25*mm, 20*mm])
    acct_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), TEAL),
        ("TEXTCOLOR", (0,0), (-1,0), WHITE),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,-1), 8),
        ("ALIGN", (0,0), (-1,-1), "LEFT"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.3, colors.HexColor("#CCCCCC")),
        ("LEFTPADDING", (0,0), (-1,-1), 3*mm),
        ("TOPPADDING", (0,0), (-1,-1), 2.5*mm),
        ("BOTTOMPADDING", (0,0), (-1,-1), 2.5*mm),
        ("BACKGROUND", (0,5), (-1,5), LIGHT_TEAL),
        ("FONTNAME", (0,5), (-1,5), "Helvetica-Bold"),
    ]))
    story.append(acct_tbl)
    story.append(Spacer(1, 5*mm))

    # ── PHASE TIMELINE ─────────────────────────────────────────────────────────
    story.append(Paragraph("Phase Timeline — All Seeder Accounts", h1_sty))
    story.append(HRFlowable(width="100%", thickness=1, color=TEAL, spaceAfter=4))
    story.append(Paragraph(
        "Each seeder account follows the same four-phase programme. Phases are measured from account creation date. "
        "Do not advance an account to the next phase early — Reddit's algorithm tracks activity velocity.",
        body_sty
    ))
    story.append(Spacer(1, 2*mm))

    phase_data = [
        ["Phase", "Timeframe", "Objective", "Daily Actions", "What NOT to Do"],
        [
            "Phase 1\nPassive",
            "Days 1–14\n(2 weeks)",
            "Account age.\nNo red flags.\nLook dormant.",
            "• Log in every 2–3 days\n• Upvote 3–5 posts per session\n• Browse r/southafrica, r/apple\n• Do NOT post or comment",
            "• No posting\n• No commenting\n• No DMs\n• No joining communities\n  en masse"
        ],
        [
            "Phase 2\nFirst Comments",
            "Days 15–30\n(weeks 3–4)",
            "Build comment karma.\nEstablish patterns.\nLook like a real person.",
            "• Comment on 1–2 posts per day\n• Keep comments generic + helpful\n• Target: r/southafrica, r/apple,\n  r/MacOS, r/techsupport\n• Example: 'Same issue here,\n  restarting SMC fixed it for me'",
            "• No links\n• No mentioning ZA Support\n• No asking Mac repair questions yet\n• No consecutive-day posting\n  (skip a day between comments)"
        ],
        [
            "Phase 3\nFirst Questions",
            "Days 31–60\n(weeks 5–8)",
            "Reach 50+ comment karma.\nAsk genuine Mac questions.\nBuild subreddit history.",
            "• 3–4 comments per week\n• 1–2 genuine Mac questions per week\n• Target subreddits below\n• Questions must be real issues,\n  NOT leading questions yet\n• Example: 'My MBP fan is loud\n  after macOS update — anyone\n  else seeing this?'",
            "• No ZA Support mentions\n• No questions that sound\n  like advertisements\n• No same question across\n  multiple accounts same day"
        ],
        [
            "Phase 4\nSeeding Active",
            "Day 61+\n(week 9+)",
            "Ask questions that allow\nDesperateBonus6367 to\nrecommend ZA Support\nnaturally.",
            "• 2–3 seeded questions per week\n  per account (automated overnight)\n• DesperateBonus6367 replies\n  recommending ZA Support\n• Continue organic comments\n  between seeded posts\n• Rotate subreddits — never\n  same sub two days running",
            "• Never have two seeders\n  ask similar questions\n  within 48 hours\n• Never reply to own posts\n• Never upvote own posts\n  from same IP"
        ],
    ]

    phase_tbl = Table(phase_data, colWidths=[22*mm, 22*mm, 38*mm, 50*mm, 43*mm])
    phase_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), TEAL),
        ("TEXTCOLOR", (0,0), (-1,0), WHITE),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,-1), 7.5),
        ("ALIGN", (0,0), (-1,-1), "LEFT"),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.3, colors.HexColor("#CCCCCC")),
        ("LEFTPADDING", (0,0), (-1,-1), 3*mm),
        ("RIGHTPADDING", (0,0), (-1,-1), 2*mm),
        ("TOPPADDING", (0,0), (-1,-1), 3*mm),
        ("BOTTOMPADDING", (0,0), (-1,-1), 3*mm),
        ("BACKGROUND", (0,4), (-1,4), LIGHT_TEAL),
    ]))
    story.append(phase_tbl)
    story.append(Spacer(1, 5*mm))

    # ── TARGET SUBREDDITS ──────────────────────────────────────────────────────
    story.append(Paragraph("Target Subreddits", h1_sty))
    story.append(HRFlowable(width="100%", thickness=1, color=TEAL, spaceAfter=4))

    sub_data = [
        ["Subreddit", "Members", "Use", "When to Use"],
        ["r/southafrica", "650K+", "General SA content — builds local credibility", "Phase 1 upvoting, Phase 2+ comments"],
        ["r/apple", "1.2M+", "Apple news + general product questions", "Phase 1 upvoting, Phase 2+ comments"],
        ["r/applehelp", "850K+", "Primary seeding target — Mac repair questions", "Phase 3+ questions"],
        ["r/MacOS", "320K+", "macOS-specific issues, updates, performance", "Phase 3+ questions"],
        ["r/macbook", "430K+", "MacBook hardware and repair questions", "Phase 3+ seeding questions"],
        ["r/techsupport", "1.8M+", "General tech — builds karma fast", "Phase 2 comments (answer others)"],
        ["r/johannesburg", "45K+", "Local JHB community — high trust for SA accounts", "Phase 2+ general comments"],
        ["r/mac", "220K+", "Mac general — good for hardware questions", "Phase 3+ questions"],
    ]

    sub_tbl = Table(sub_data, colWidths=[40*mm, 20*mm, 72*mm, 43*mm])
    sub_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), TEAL),
        ("TEXTCOLOR", (0,0), (-1,0), WHITE),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,-1), 8),
        ("ALIGN", (0,0), (-1,-1), "LEFT"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.3, colors.HexColor("#CCCCCC")),
        ("LEFTPADDING", (0,0), (-1,-1), 3*mm),
        ("TOPPADDING", (0,0), (-1,-1), 2.5*mm),
        ("BOTTOMPADDING", (0,0), (-1,-1), 2.5*mm),
        ("FONTNAME", (0,3), (0,3), "Helvetica-Bold"),
        ("FONTNAME", (0,4), (0,4), "Helvetica-Bold"),
        ("FONTNAME", (0,5), (0,5), "Helvetica-Bold"),
    ]))
    story.append(sub_tbl)
    story.append(Spacer(1, 5*mm))

    # ── PER-ACCOUNT ACTION PLAN ────────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("Per-Account Action Plan", h1_sty))
    story.append(HRFlowable(width="100%", thickness=1, color=TEAL, spaceAfter=6))

    accounts = [
        {
            "name": "Nico Hammans",
            "username": "u/Slow_Cheetah9554",
            "persona": "IT professional, Johannesburg. Knowledgeable but asks for help on specific hardware issues.",
            "created": "24 March 2026",
            "p4_date": "23 May 2026",
            "tone": "Technical, concise. Uses phrases like 'I've tried X already' to sound experienced.",
            "sample_q": [
                "My MBP 2019 logic board is throwing kernel panics after the latest Sequoia update — anyone seen this?",
                "Fan is screaming on my MacBook Pro 15 under light load. SMC reset didn't help. Thermal paste job?",
                "Does anyone know a decent Mac repair place in Johannesburg? Not iStore — looking for independent.",
            ],
            "subreddits": "r/applehelp, r/MacOS, r/macbook, r/johannesburg",
        },
        {
            "name": "Elise Mills",
            "username": "TBC — create 25 Mar 2026",
            "persona": "Design professional, Cape Town background now in Joburg. Apple ecosystem user, less technical.",
            "created": "25 March 2026",
            "p4_date": "24 May 2026",
            "tone": "Frustrated but friendly. 'I rely on my Mac for work and this is really stressing me out.'",
            "sample_q": [
                "My MacBook Pro screen started flickering — took it to iStore and they quoted R12K. Is that normal?",
                "Battery health dropped to 61% after 3 years. Apple want R4K+ to replace — any other options in JHB?",
                "Has anyone used an independent Mac repair shop in South Africa? Nervous about going somewhere unknown.",
            ],
            "subreddits": "r/applehelp, r/apple, r/southafrica, r/johannesburg",
        },
        {
            "name": "Adam Levitt",
            "username": "TBC — create 26 Mar 2026",
            "persona": "Software developer, Sandton. Pushes his Mac hard. Professional tone, data-driven.",
            "created": "26 March 2026",
            "p4_date": "25 May 2026",
            "tone": "Analytical. Includes specs and error codes. 'Running MBP 16 M1 Max, 64GB RAM, macOS 15.3.2.'",
            "sample_q": [
                "Anyone dealt with SSD read speeds dropping on MBP 16 after extended use? Getting 1.2GB/s instead of 5.5.",
                "Logic board repair vs replacement on a 2019 MBP — cost benefit? Got a quote of R8,500 for repair.",
                "Best Mac repair shops in Johannesburg? Need someone who actually understands Apple Silicon internals.",
            ],
            "subreddits": "r/macbook, r/applehelp, r/MacOS, r/mac",
        },
        {
            "name": "Dovi Schaffer",
            "username": "TBC — create 27 Mar 2026",
            "persona": "Startup founder, Hyde Park. Has multiple Apple devices. Asks about value and turnaround time.",
            "created": "27 March 2026",
            "p4_date": "26 May 2026",
            "tone": "Direct, time-conscious. 'I can't be without my Mac for more than a day — what are my options?'",
            "sample_q": [
                "My MBA M2 won't charge — Apple quotes 2-week turnaround. Any faster options in JHB?",
                "Anyone had a Mac repaired in Johannesburg outside of iStore? Looking for fast turnaround.",
                "MacBook keyboard replacement — iStore wants R6K. Independent repair worth the risk?",
            ],
            "subreddits": "r/applehelp, r/apple, r/mac, r/southafrica",
        },
    ]

    for acct in accounts:
        box_data = [[Paragraph(f"{acct['name']}  —  {acct['username']}",
                               sty("AH", fontName="Helvetica-Bold", fontSize=10,
                                   textColor=WHITE, leading=13))]]
        box_tbl = Table(box_data, colWidths=[175*mm])
        box_tbl.setStyle(TableStyle([
            ("BACKGROUND", (0,0), (-1,-1), TEAL),
            ("LEFTPADDING", (0,0), (-1,-1), 5*mm),
            ("TOPPADDING", (0,0), (-1,-1), 3*mm),
            ("BOTTOMPADDING", (0,0), (-1,-1), 3*mm),
        ]))
        story.append(KeepTogether([
            box_tbl,
            Spacer(1, 2*mm),
        ]))

        detail_data = [
            ["Persona", acct["persona"]],
            ["Tone", acct["tone"]],
            ["Account Created", acct["created"]],
            ["Phase 4 Activation", acct["p4_date"] + " (day 61)"],
            ["Primary Subreddits", acct["subreddits"]],
        ]
        detail_tbl = Table(detail_data, colWidths=[35*mm, 140*mm])
        detail_tbl.setStyle(TableStyle([
            ("FONTNAME", (0,0), (0,-1), "Helvetica-Bold"),
            ("FONTSIZE", (0,0), (-1,-1), 8),
            ("VALIGN", (0,0), (-1,-1), "TOP"),
            ("ALIGN", (0,0), (0,-1), "LEFT"),
            ("ROWBACKGROUNDS", (0,0), (-1,-1), [LIGHT, WHITE]),
            ("GRID", (0,0), (-1,-1), 0.3, colors.HexColor("#DDDDDD")),
            ("LEFTPADDING", (0,0), (-1,-1), 3*mm),
            ("TOPPADDING", (0,0), (-1,-1), 2*mm),
            ("BOTTOMPADDING", (0,0), (-1,-1), 2*mm),
            ("TEXTCOLOR", (0,0), (0,-1), TEAL),
        ]))
        story.append(detail_tbl)
        story.append(Spacer(1, 2*mm))

        story.append(Paragraph("Sample Seeding Questions (Phase 4):",
                               sty("SQ", fontName="Helvetica-Bold", fontSize=8.5,
                                   textColor=DARK, spaceBefore=2, spaceAfter=1, leading=12)))
        for i, q in enumerate(acct["sample_q"], 1):
            story.append(Paragraph(f"{i}. {q}",
                                   sty(f"Q{i}", fontName="Helvetica-Oblique", fontSize=8,
                                       textColor=MID, leftIndent=5*mm, spaceAfter=1, leading=12)))
        story.append(Spacer(1, 5*mm))

    # ── AUTHORITY ACCOUNT ──────────────────────────────────────────────────────
    story.append(Paragraph("Authority Account — DesperateBonus6367", h1_sty))
    story.append(HRFlowable(width="100%", thickness=1, color=TEAL, spaceAfter=4))
    story.append(Paragraph(
        "This is the ZA Support recommender account. It has existing karma and is trusted by Reddit. "
        "It does NOT ask questions — it only replies to seeder questions with genuine-sounding recommendations. "
        "It must never reply to all four seeders in the same week. Maximum 2 ZA Support mentions per week across all seeders.",
        body_sty
    ))
    story.append(Spacer(1, 2*mm))

    auth_data = [
        ["Parameter", "Value"],
        ["Username", "u/DesperateBonus6367"],
        ["Password", "!Hydrogen234!"],
        ["Role", "Recommends ZA Support in response to seeder questions"],
        ["Max ZA Support mentions", "2 per week across all seeders"],
        ["Reply tone", "Helpful stranger — 'I used these guys in JHB, really sorted my logic board out'"],
        ["Never", "Reply to two seeders in the same thread / same subreddit same day"],
        ["Setup required", "Register script app at reddit.com/prefs/apps → get client_id + client_secret for PRAW API"],
    ]
    auth_tbl = Table(auth_data, colWidths=[50*mm, 125*mm])
    auth_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), TEAL),
        ("TEXTCOLOR", (0,0), (-1,0), WHITE),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTNAME", (0,1), (0,-1), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,-1), 8),
        ("ALIGN", (0,0), (-1,-1), "LEFT"),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.3, colors.HexColor("#CCCCCC")),
        ("LEFTPADDING", (0,0), (-1,-1), 3*mm),
        ("TOPPADDING", (0,0), (-1,-1), 2.5*mm),
        ("BOTTOMPADDING", (0,0), (-1,-1), 2.5*mm),
        ("TEXTCOLOR", (0,1), (0,-1), TEAL),
    ]))
    story.append(auth_tbl)
    story.append(Spacer(1, 5*mm))

    # ── KARMA MILESTONES ───────────────────────────────────────────────────────
    story.append(Paragraph("Karma Milestones + Unlock Schedule", h1_sty))
    story.append(HRFlowable(width="100%", thickness=1, color=TEAL, spaceAfter=4))

    karma_data = [
        ["Karma Target", "Approx Timeline", "What Unlocks"],
        ["1–10 karma", "Days 15–21", "Can comment in most public subreddits without shadowban risk"],
        ["10–50 karma", "Days 22–45", "Can post questions; some subreddits require 10+ karma to post"],
        ["50+ karma", "Days 46–60", "Minimum threshold for seeding — Phase 4 activation"],
        ["100+ karma", "Days 60–90", "Higher trust; comments less likely to be collapsed or auto-modded"],
        ["500+ karma", "3–6 months", "Full trust; can post in restricted subreddits; links less likely flagged"],
    ]
    karma_tbl = Table(karma_data, colWidths=[35*mm, 35*mm, 105*mm])
    karma_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), TEAL),
        ("TEXTCOLOR", (0,0), (-1,0), WHITE),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,-1), 8),
        ("ALIGN", (0,0), (-1,-1), "LEFT"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.3, colors.HexColor("#CCCCCC")),
        ("LEFTPADDING", (0,0), (-1,-1), 3*mm),
        ("TOPPADDING", (0,0), (-1,-1), 2.5*mm),
        ("BOTTOMPADDING", (0,0), (-1,-1), 2.5*mm),
        ("BACKGROUND", (0,3), (-1,3), colors.HexColor("#D5F0E8")),
        ("FONTNAME", (0,3), (-1,3), "Helvetica-Bold"),
    ]))
    story.append(karma_tbl)
    story.append(Paragraph("★ Highlighted row = minimum threshold for Phase 4 activation.",
                           sty("Note2", fontName="Helvetica-Oblique", fontSize=7.5,
                               textColor=MID, spaceBefore=1, spaceAfter=4, leading=11)))
    story.append(Spacer(1, 3*mm))

    # ── WEEKLY SCHEDULE ────────────────────────────────────────────────────────
    story.append(Paragraph("Recommended Weekly Schedule (All Accounts Combined)", h1_sty))
    story.append(HRFlowable(width="100%", thickness=1, color=TEAL, spaceAfter=4))
    story.append(Paragraph(
        "Once all four accounts are in Phase 4, the overnight batch runs this pattern automatically. "
        "During Phases 1–3, Mary manages activity manually per the schedule below.",
        body_sty
    ))

    week_data = [
        ["Day", "Nico (u/Slow_Cheetah9554)", "Elise Mills", "Adam Levitt", "Dovi Schaffer"],
        ["Mon", "Comment (r/southafrica or r/techsupport)", "Upvotes only", "Comment (r/apple)", "Rest"],
        ["Tue", "Rest", "Comment (r/southafrica)", "Rest", "Upvotes only"],
        ["Wed", "Upvotes only", "Rest", "Comment (r/techsupport)", "Comment (r/apple)"],
        ["Thu", "Comment (r/apple or r/MacOS)", "Comment (r/apple)", "Rest", "Rest"],
        ["Fri", "Rest", "Upvotes only", "Comment (r/southafrica)", "Comment (r/southafrica)"],
        ["Sat", "Upvotes only", "Comment (r/MacOS)", "Upvotes only", "Comment (r/techsupport)"],
        ["Sun", "Rest", "Rest", "Comment (r/apple)", "Rest"],
    ]
    week_tbl = Table(week_data, colWidths=[12*mm, 43*mm, 40*mm, 40*mm, 40*mm])
    week_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), TEAL),
        ("TEXTCOLOR", (0,0), (-1,0), WHITE),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTNAME", (0,1), (0,-1), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,-1), 7.5),
        ("ALIGN", (0,0), (-1,-1), "LEFT"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.3, colors.HexColor("#CCCCCC")),
        ("LEFTPADDING", (0,0), (-1,-1), 2*mm),
        ("TOPPADDING", (0,0), (-1,-1), 2*mm),
        ("BOTTOMPADDING", (0,0), (-1,-1), 2*mm),
        ("TEXTCOLOR", (0,1), (0,-1), TEAL),
    ]))
    story.append(week_tbl)
    story.append(Spacer(1, 5*mm))

    # ── HARD RULES ─────────────────────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("Hard Rules — Never Break These", h1_sty))
    story.append(HRFlowable(width="100%", thickness=1, color=RED, spaceAfter=4))

    rules = [
        ("Never use the same IP for two accounts",
         "Reddit logs IP addresses at login AND at post time. Two accounts from the same IP = instant link. "
         "This applies even weeks after account creation."),
        ("Never log in to two accounts on the same browser",
         "Browser fingerprinting (screen size, fonts, plugins, canvas hash) is used by Reddit. "
         "Even incognito windows share the same browser fingerprint."),
        ("Never have two seeders ask similar questions within 48 hours",
         "Reddit's spam detection looks for coordinated behaviour. Two accounts asking about Mac repair in JHB "
         "on the same day is a red flag."),
        ("Never post ZA Support links directly",
         "Links in new accounts get filtered automatically. DesperateBonus6367 mentions the name only — "
         "the user Googles it. No direct URL in Reddit comments."),
        ("Never upvote your own posts or comments",
         "Upvoting your own content from a related account is detectable via IP and session correlation."),
        ("Never skip the warmup period",
         "Accounts that go straight to seeding get shadowbanned within days. The 60-day minimum is non-negotiable."),
        ("Never create all four accounts on the same day",
         "Reddit's systems flag batch account creation from similar email domains or patterns. "
         "Stick to the one-per-day schedule."),
    ]

    for i, (title, detail) in enumerate(rules):
        rule_data = [[
            Paragraph(f"{i+1}. {title}",
                      sty(f"RT{i}", fontName="Helvetica-Bold", fontSize=9,
                          textColor=RED, leading=13)),
            Paragraph(detail,
                      sty(f"RD{i}", fontName="Helvetica", fontSize=8,
                          textColor=DARK, leading=12)),
        ]]
        rule_tbl = Table(rule_data, colWidths=[55*mm, 120*mm])
        rule_tbl.setStyle(TableStyle([
            ("VALIGN", (0,0), (-1,-1), "TOP"),
            ("LEFTPADDING", (0,0), (-1,-1), 3*mm),
            ("TOPPADDING", (0,0), (-1,-1), 2*mm),
            ("BOTTOMPADDING", (0,0), (-1,-1), 2*mm),
            ("BACKGROUND", (0,0), (-1,-1), colors.HexColor("#FFF5F5") if i%2==0 else WHITE),
            ("LINEBELOW", (0,0), (-1,-1), 0.3, colors.HexColor("#FFCCCC")),
        ]))
        story.append(rule_tbl)

    story.append(Spacer(1, 5*mm))

    # ── ACTIVATION CHECKLIST ───────────────────────────────────────────────────
    story.append(Paragraph("Phase 4 Activation Checklist (per account)", h1_sty))
    story.append(HRFlowable(width="100%", thickness=1, color=TEAL, spaceAfter=4))
    story.append(Paragraph(
        "Before activating any seeder account in the overnight batch, verify all of the following:",
        body_sty
    ))

    checklist = [
        "Account is at least 60 days old",
        "Account has 50+ comment karma (check reddit.com/u/[username])",
        "Account has commented in at least 3 different subreddits",
        "Account has no warnings, bans, or shadowban flags",
        "Username and password are confirmed in personas.json (active: false → true)",
        "DesperateBonus6367 PRAW credentials (client_id + client_secret) are set in ~/.za-keys-pending.env",
        "Overnight batch persona_questions task is enabled in za-overnight-batch.sh",
        "Reddit API rate limit: max 60 requests/minute — batch stays well under this",
    ]
    for item in checklist:
        story.append(Paragraph(f"☐  {item}",
                               sty(f"CL{item[:10]}", fontName="Helvetica", fontSize=8.5,
                                   textColor=DARK, leftIndent=5*mm, spaceAfter=2, leading=13)))

    story.append(Spacer(1, 5*mm))

    # ── FOOTER ─────────────────────────────────────────────────────────────────
    story.append(HRFlowable(width="100%", thickness=0.5, color=TEAL, spaceAfter=3))
    footer_data = [[
        Paragraph("ZA Support (Apple Experts) — Vizibiliti Information Systems (Pty) Ltd t/a ZA Support",
                  sty("F1", fontName="Helvetica", fontSize=7.5, textColor=MID, leading=11)),
        Paragraph("Confidential | 24 March 2026",
                  sty("F2", fontName="Helvetica", fontSize=7.5, textColor=MID,
                      leading=11, alignment=TA_RIGHT)),
    ]]
    footer_tbl = Table(footer_data, colWidths=[120*mm, 55*mm])
    footer_tbl.setStyle(TableStyle([
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))
    story.append(footer_tbl)

    doc.build(story)
    print(f"PDF written: {OUTPUT}")

if __name__ == "__main__":
    build()
