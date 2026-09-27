#!/bin/bash
# README: Claude.ai and Claude Code, execute this file with: bash "zas design drift check.command"
# ZA Support design drift check, V1.1 27/09/2026 14:02 SAST (V1.0 26/09/2026 11:33)
# Compares live zasupport.com brand tokens with the V1.1 design system baseline and reports
# change orders CO1 to CO4. Writes drift.txt and drift.json to a dated folder in the home directory.
set -u
OUT="$HOME/zas-design-drift-$(date +%Y%m%d-%H%M)"; mkdir -p "$OUT/pages"
curl -sSL -m 30 --retry 3 --retry-all-errors -A "Mozilla/5.0" https://zasupport.com -o "$OUT/pages/home.html" || { echo "FAIL: site unreachable"; exit 1; }
curl -sSL -m 30 --retry 3 --retry-all-errors -A "Mozilla/5.0" https://zasupport.com/guides -o "$OUT/pages/guides.html" || echo "WARN: guides page not downloaded"
curl -sSL -m 30 --retry 3 --retry-all-errors -A "Mozilla/5.0" https://zasupport.com/about -o "$OUT/pages/about.html" || echo "WARN: about page not downloaded"
CSS=$(grep -oE 'href="/_next/[^"]+\.css"' "$OUT/pages/home.html" | head -1 | sed 's/href="//;s/"$//')
[ -n "$CSS" ] || { echo "FAIL: no stylesheet link found"; exit 1; }
curl -sSL -m 30 --retry 3 --retry-all-errors "https://zasupport.com$CSS" -o "$OUT/site.css" || { echo "FAIL: stylesheet download"; exit 1; }
python3 - "$OUT" "$CSS" <<'PY'
import re,sys,json,hashlib,os
out,css_path=sys.argv[1],sys.argv[2]
css=open(out+'/site.css').read()
pg={n:open(f'{out}/pages/{n}.html',errors='ignore').read() for n in ('home','guides','about') if os.path.exists(f'{out}/pages/{n}.html')}
expected={'--teal':'#27504d','--teal-light':'#2e6260','--green':'#0fea7a','--green-dim':'#0fea7ab3','--green-glow':'#0fea7a26','--dark':'#0a1a18','--dark-2':'#111c1a','--dark-3':'#162220','--text':'#e8f4f1','--muted':'#7a9e98','--border':'#0fea7a26','--border-subtle':'#ffffff0f'}
m=re.search(r':root\{(--teal:[^}]*)\}',css)
live=dict(d.split(':',1) for d in m.group(1).split(';') if d) if m else {}
diff={k:{'expected':v,'live':live.get(k)} for k,v in expected.items() if live.get(k,'').lower()!=v}
home=pg.get('home','')
foot=home[home.find('<footer'):home.find('</footer>')] if '<footer' in home else ''
canon=['https://www.facebook.com/zasupport','https://www.instagram.com/zasupport/','https://www.linkedin.com/company/zasupport/','https://x.com/za_support','https://www.youtube.com/@zasupport-applemacupgrader6746','https://www.tiktok.com/@appleexpertza']
foot_links=re.findall(r'href="(https://[^"]*(?:facebook|instagram|linkedin|x\.com|youtube|tiktok)[^"]*)"',foot)
same=[json.loads('['+s+']') for s in re.findall(r'"sameAs":\[([^\]]*)\]',home)]
co={
 'CO1_footer_logo':'done' if foot and 'lucide-zap' not in foot and 'za-logo-standard-web' in foot else 'open',
 'CO2_guides_address':'done' if pg.get('guides') and 'Hyde Park Lane' not in pg['guides'] else ('not checked' if not pg.get('guides') else 'open'),
 'CO3_social_set':'done' if foot_links==canon and any(s==canon for s in same) else 'open',
 'CO4_dm_mono_removed':'done' if 'dm_mono' not in home and 'dmMono' not in css else 'open',
}
res={'run':out,'stylesheet':css_path,'baseline_stylesheet':'/_next/static/immutable/chunks/244q57k_qmucl.css','sha256':hashlib.sha256(open(out+'/site.css','rb').read()).hexdigest(),'baseline_sha256':'12a51d85db237dc4aad67a875fa3a3df4982ecc30152ade9541ca595bb165f12','root_block_found':bool(m),'token_differences':diff,'result':'PASS' if m and not diff else 'FAIL','change_orders':co,'footer_social_links_live':foot_links,'sameAs_lists_live':same}
json.dump(res,open(out+'/drift.json','w'),indent=1)
open(out+'/drift.txt','w').write('\n'.join(f'{k}: {v}' for k,v in res.items())+'\n')
print(json.dumps({k:res[k] for k in ('stylesheet','sha256','token_differences','result','change_orders')},indent=1))
PY
echo "Report: $OUT/drift.txt and $OUT/drift.json"
