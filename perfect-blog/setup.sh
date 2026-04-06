#!/bin/bash
set -e
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
log()  { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}⚠${NC} $1"; }
fail() { echo -e "${RED}✗${NC} $1"; exit 1; }
step() { echo -e "\n${GREEN}→${NC} $1"; }

echo ""
echo "══════════════════════════════════════════════════════════"
echo "  Perfect Blog Creator — Zero-Touch Install"
echo "══════════════════════════════════════════════════════════"

# ── Find perfect-blog source ───────────────────────────────
step "Locating perfect-blog folder..."
BLOG_SRC=""
for p in "$(cd "$(dirname "$0")" && pwd)" "$(pwd)/perfect-blog" "$HOME/Downloads/perfect-blog" "$HOME/Desktop/perfect-blog" "$HOME/perfect-blog"; do
  [ -f "$p/SKILL.md" ] && [ -f "$p/CLAUDE-BLOG-APPEND.md" ] && BLOG_SRC="$p" && break
done
if [ -z "$BLOG_SRC" ]; then
  F=$(find "$HOME" -maxdepth 4 -name "CLAUDE-BLOG-APPEND.md" -path "*/perfect-blog/*" 2>/dev/null | head -1)
  [ -n "$F" ] && BLOG_SRC="$(dirname "$F")"
fi
[ -z "$BLOG_SRC" ] && fail "Cannot find perfect-blog folder anywhere."
log "Source: $BLOG_SRC"

# ── Find project root ──────────────────────────────────────
step "Locating Next.js project..."
PROJECT_ROOT=""
[ -f "$(pwd)/next.config.js" ] || [ -f "$(pwd)/next.config.mjs" ] || [ -f "$(pwd)/next.config.ts" ] && PROJECT_ROOT="$(pwd)"
if [ -z "$PROJECT_ROOT" ]; then
  for p in "$HOME/new-zas-website" "$HOME/Projects/new-zas-website" "$HOME/Documents/new-zas-website" "$HOME/Desktop/new-zas-website" "$HOME/Code/new-zas-website" "$HOME/dev/new-zas-website"; do
    [ -d "$p" ] && [ -f "$p/package.json" ] && PROJECT_ROOT="$p" && break
  done
fi
if [ -z "$PROJECT_ROOT" ]; then
  F=$(find "$HOME" -maxdepth 3 -name "next.config.*" -not -path "*/node_modules/*" 2>/dev/null | head -1)
  [ -n "$F" ] && PROJECT_ROOT="$(dirname "$F")"
fi
[ -z "$PROJECT_ROOT" ] && fail "Cannot find Next.js project. cd into your project first."
log "Project: $PROJECT_ROOT"

# ── Copy perfect-blog into project ─────────────────────────
step "Moving perfect-blog into project root..."
TD="$PROJECT_ROOT/perfect-blog"
if [ "$BLOG_SRC" != "$TD" ]; then
  [ -d "$TD" ] && rm -rf "$TD"
  cp -r "$BLOG_SRC" "$TD"
  log "Copied to $TD"
else
  log "Already in project"
fi

# ── Components ─────────────────────────────────────────────
step "Installing components..."
mkdir -p "$PROJECT_ROOT/src/components/blog" "$PROJECT_ROOT/src/components"
cp "$TD/components/AuthorBox.tsx"       "$PROJECT_ROOT/src/components/blog/"
cp "$TD/components/BlogSchema.tsx"      "$PROJECT_ROOT/src/components/blog/"
cp "$TD/components/BlogComponents.tsx"  "$PROJECT_ROOT/src/components/blog/"
cp "$TD/components/SiteSchema.tsx"      "$PROJECT_ROOT/src/components/"
log "4 components installed"

# ── Pages ──────────────────────────────────────────────────
step "Installing pages..."
mkdir -p "$PROJECT_ROOT/src/app/author/\[slug\]" "$PROJECT_ROOT/src/app/editorial-policy"
cp "$TD/pages/AuthorPage.tsx"      "$PROJECT_ROOT/src/app/author/[slug]/page.tsx"
cp "$TD/pages/EditorialPolicy.tsx" "$PROJECT_ROOT/src/app/editorial-policy/page.tsx"
log "2 page routes created"

# ── Images ─────────────────────────────────────────────────
step "Installing images..."
mkdir -p "$PROJECT_ROOT/public/authors" "$PROJECT_ROOT/public/blog"
cp "$TD/assets/courtney-bentley-author.png"              "$PROJECT_ROOT/public/authors/"
cp "$TD/assets/mary-blount-portrait.png"                 "$PROJECT_ROOT/public/authors/"
cp "$TD/assets/za-support-team-imac-workshop.png"        "$PROJECT_ROOT/public/blog/"
cp "$TD/assets/za-support-workshop-mac-repair.png"       "$PROJECT_ROOT/public/blog/"
cp "$TD/assets/mary-blount-safety-goggles-workshop.png"  "$PROJECT_ROOT/public/blog/"
cp "$TD/assets/za-support-team-rooftop.png"              "$PROJECT_ROOT/public/blog/"
cp "$TD/assets/mary-blount-macbook-desk.png"             "$PROJECT_ROOT/public/blog/"
log "7 images installed"

# ── WebP conversion ────────────────────────────────────────
step "Converting to WebP..."
cd "$PROJECT_ROOT"
if command -v npx &>/dev/null; then
  for img in public/authors/*.png public/blog/*.png; do
    [ -f "$img" ] || continue
    WEBP="${img%.png}.webp"
    npx --yes sharp --input "$img" --output "$WEBP" --format webp 2>/dev/null && log "$(basename "$WEBP")" || true
  done
else
  warn "npx not available — PNGs kept as-is"
fi

# ── Patch layout.tsx ───────────────────────────────────────
step "Patching layout.tsx with SiteSchema..."
LF=""
for c in "$PROJECT_ROOT/src/app/layout.tsx" "$PROJECT_ROOT/app/layout.tsx"; do
  [ -f "$c" ] && LF="$c" && break
done
if [ -n "$LF" ]; then
  if grep -q "SiteSchema" "$LF"; then
    log "SiteSchema already in layout.tsx"
  else
    # Detect quote style
    QC="'"
    head -20 "$LF" | grep -q 'from "' && QC='"'
    IMPORT="import { SiteSchema } from ${QC}@/components/SiteSchema${QC}"
    # macOS + Linux compatible sed
    if [[ "$OSTYPE" == "darwin"* ]]; then
      LAST=$(grep -n "^import " "$LF" | tail -1 | cut -d: -f1)
      [ -n "$LAST" ] && sed -i '' "${LAST}a\\
${IMPORT}
" "$LF"
    else
      LAST=$(grep -n "^import " "$LF" | tail -1 | cut -d: -f1)
      [ -n "$LAST" ] && sed -i "${LAST}a\\${IMPORT}" "$LF"
    fi
    # Insert component before </head> or after <html
    if grep -q "</head>" "$LF"; then
      if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' 's|</head>|<SiteSchema />\n        </head>|' "$LF"
      else
        sed -i 's|</head>|<SiteSchema />\n        </head>|' "$LF"
      fi
    fi
    log "SiteSchema patched into layout.tsx"
  fi
else
  warn "layout.tsx not found — Claude Code will create it"
fi

# ── CLAUDE.md (append only) ────────────────────────────────
step "Updating CLAUDE.md..."
CMD="$PROJECT_ROOT/CLAUDE.md"
MARKER="# PERFECT BLOG CREATOR RULES"
if [ -f "$CMD" ]; then
  if grep -q "$MARKER" "$CMD"; then
    log "Blog rules already in CLAUDE.md — skipped"
  else
    printf "\n---\n\n" >> "$CMD"
    cat "$TD/CLAUDE-BLOG-APPEND.md" >> "$CMD"
    log "Blog rules appended to existing CLAUDE.md"
  fi
else
  cat "$TD/CLAUDE-BLOG-APPEND.md" > "$CMD"
  log "CLAUDE.md created"
fi

# ── SKILL.md ───────────────────────────────────────────────
step "Installing SKILL..."
mkdir -p "$PROJECT_ROOT/.claude/skills/perfect-blog-creator"
cp "$TD/SKILL.md" "$PROJECT_ROOT/.claude/skills/perfect-blog-creator/"
[ -d "$HOME/.claude" ] && mkdir -p "$HOME/.claude/skills/perfect-blog-creator" && cp "$TD/SKILL.md" "$HOME/.claude/skills/perfect-blog-creator/"
log "SKILL.md installed (project + global)"

# ── Verify ─────────────────────────────────────────────────
step "Verifying..."
E=0
for f in \
  "src/components/blog/AuthorBox.tsx" \
  "src/components/blog/BlogSchema.tsx" \
  "src/components/blog/BlogComponents.tsx" \
  "src/components/SiteSchema.tsx" \
  "src/app/author/[slug]/page.tsx" \
  "src/app/editorial-policy/page.tsx" \
  "public/authors/courtney-bentley-author.png" \
  "public/authors/mary-blount-portrait.png" \
  "CLAUDE.md" \
  ".claude/skills/perfect-blog-creator/SKILL.md"; do
  if [ -f "$PROJECT_ROOT/$f" ]; then
    log "  $f"
  else
    warn "  MISSING: $f"; E=$((E+1))
  fi
done

echo ""
echo "══════════════════════════════════════════════════════════"
[ "$E" -eq 0 ] && echo -e "  ${GREEN}✓ INSTALL COMPLETE — zero errors${NC}" || echo -e "  ${YELLOW}⚠ Installed with $E warnings${NC}"
echo "══════════════════════════════════════════════════════════"
echo ""
echo "  Claude Code is ready. Run:"
echo "    cd $PROJECT_ROOT && claude"
echo ""
echo "  CLAUDE.md blog rules load automatically."
echo "  No further manual steps required."
echo ""
