---
name: ZAS-TESTING-VALIDATION-PROTOCOL-20260407
version: 1.2 FINAL
chat_id: ZAS-CHAT-20260407-1100-SEO
type: claude-code-injection + claude-infrastructure
applies_to: ALL Claude Code, ALL Claude Infrastructure, ALL .md files, ALL knowledge centres
---

# Testing and Validation Protocol

## HR RULES (1-19 complete)
1. Verify-first. 2. Zero data loss. 3. Third-party monitoring. 4. Comprehensive. 5. Claude Code injection. 6. Auto-include verification. 7. ALL media via pipeline. 8. All content distributed. 9. No paid tools. 10. Auto-setup; instructions where login needed. 11. Login: open URLs + bullet lists. 12. "Notify me via email" = courtney@zasupport.com ALWAYS. 13. Scan emails for errors, self-heal silently. 14. TEST-BEFORE-DECLARE: Nothing marked done without validation.log evidence. 15. Every .md includes verification commands; nothing DONE without real-data proof. 16. UNCERTAINTY FALLBACK: stop, fix, test real data, log, propagate fix across ALL systems. 17. CONTENT INHERITANCE: diff before replacing .md, extract value, archive old versions. 18. AUTO-EXECUTE: any automatable task completed without human intervention. 19. FULL REGENERATION: when system change affects multiple files, regenerate ALL .md files as complete standalone documents. No incremental updates. No content loss.

## STATUS LEVELS (mandatory)
NOT INSTALLED | INSTALLED | TESTED | DEPLOYED | ACTIVE | BLOCKED | CREDENTIAL SET
Nothing jumps to ACTIVE without validation.log evidence.

## RULE 17: CONTENT INHERITANCE
Before replacing any .md file: diff, extract valuable content (scripts, credentials, URLs, schemas), incorporate or archive to docs/seo/archive/. Never lose knowledge.

## RULE 18: AUTO-EXECUTE
Any task that can be automated runs without asking. Only genuine platform limitations (e.g. Apple Shortcuts UI) may require manual steps — minimised with app auto-opened and exact steps displayed.

## RULE 19: FULL REGENERATION
When a system change applies to multiple files: regenerate ALL .md files as complete standalone documents. Every file fresh, complete, ready for Claude Code. No incremental str_replace updates. No content loss across versions.

## VALIDATION LOG
Location: ~/Developer/new-zas-website/media/workshop/logs/validation.log
Format: `[YYYY-MM-DD HH:MM:SS] [ZAS-CHAT-20260407-1100-SEO] CATEGORY component STATUS: detail`

## DEPLOYMENT VERIFICATION
```bash
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
[ -f "$VLOG" ] && echo "[$(date '+%F %T')] VALIDATION LOG EXISTS ($(wc -l < $VLOG) lines)" || echo "VALIDATION LOG NOT FOUND — creating" && mkdir -p $(dirname $VLOG) && touch $VLOG
```

---
*v1.2 FINAL | 07/04/2026 SAST*
