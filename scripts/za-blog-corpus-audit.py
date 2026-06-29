#!/usr/bin/env python3
"""
za-blog-corpus-audit.py — READ-ONLY full-corpus compliance audit (29/06/2026).
Applies EVERY new pipeline rule to ALL live blog posts and GSC-ranks the findings, so we know
exactly how far the live corpus is from "completely clean" and where effort matters (traffic).
NEVER edits/commits/deploys (§190) — it writes a report + remediation worklist only.

Rules applied as checks (all SoT-reused, §354 no-fork):
  §489  invented/unconfirmed Rand prices         (check-blog-price-allowlist.offenders)
  §529  suburb-doorway permutation               (auto-blog-insert.is_doorway_slug)
  §167  model×fault permutation shape            (advisor._infer_repair_type + model tokens)
  §172  weak pricing (price-intent title, no confirmed anchor)  (price-anchor registry)
  GSC   per-post clicks/impressions              (gsc-pages-export.csv) → rank by exposure
"""
import re, json, csv, os, importlib.util
from pathlib import Path
from collections import Counter

WEB = Path.home() / "Developer/new-zas-website"
TSX = WEB / "src/app/blog/[slug]/page.tsx"
GSC_CSV = Path.home() / "Desktop/Claude/Google/SEO/gsc-pages-export.csv"
REG = json.loads((Path.home()/".za-blog-price-anchors.json").read_text()).get("anchors",{})

def _load(p, n):
    s=importlib.util.spec_from_file_location(n,p); m=importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
_pg = _load(WEB/"scripts/check-blog-price-allowlist.py","pg")
_abi= _load(WEB/"scripts/auto-blog-insert.py","abi")
_adv= _load(Path.home()/"bin/za-web-blog-advisor.py","adv")

MODELS=["macbook-pro-m1","macbook-pro-m2","macbook-pro-m3","macbook-pro-m4","macbook-air-m1","macbook-air-m2","macbook-air-m3","macbook-pro-14-inch","macbook-pro-16-inch","macbook-pro-13-inch","imac","imac-27-inch","mac-mini","mac-studio","mac-pro","intel-macbook-pro"]
PRICE_TITLE=re.compile(r"how much|what (it|you).{0,8}(cost|pay)|\bcost\b|\bprice|\bpricing",re.I)

def gsc():
    g={}
    if GSC_CSV.exists():
        for r in csv.DictReader(open(GSC_CSV)):
            m=re.search(r"/blog/([a-z0-9-]+)",r.get("Page",""));
            if m: g[m.group(1)]=(int(r["Clicks"]),int(r["Impressions"]))
    return g

def posts():
    t=TSX.read_text(); d={}
    for m in re.finditer(r"\n  '([a-z0-9-]+)': \{(.*?)\n  \},", t, re.DOTALL):
        d[m.group(1)]=m.group(2)
    return d

def main():
    G=gsc(); P=posts(); rows=[]
    for slug,body in P.items():
        tm=re.search(r"title: `([^`]*)`",body); title=tm.group(1) if tm else ""
        invented=len(_pg.offenders(body))
        doorway=_abi.is_doorway_slug(slug)
        perm_shape=any(slug.startswith(m+"-") for m in MODELS) and not slug.endswith("-johannesburg")
        rt=_adv._infer_repair_type(slug,title)
        rands={x.replace(" ","").rstrip(",") for x in re.findall(r"R\s?\d[\d,]*",body)}
        has_anchor=bool(rands & (set(_pg.ALLOWED)-{"R599"}))
        weak = bool(PRICE_TITLE.search(title)) and not has_anchor and invented==0
        clk,imp=G.get(slug,(0,0))
        # primary classification (priority = real exposure)
        if invented>0:     bucket="INVENTED-PRICE-LIVE (§489)"
        elif weak:         bucket="WEAK-PRICING (§172)"
        elif doorway:      bucket="DOORWAY (§529)"
        elif perm_shape:   bucket="PERMUTATION-SHAPE (§167)"
        else:              bucket="COMPLIANT"
        rows.append(dict(slug=slug,bucket=bucket,invented=invented,doorway=doorway,perm=perm_shape,
                         rt=rt,clk=clk,imp=imp,traffic=clk*100+imp))
    # report
    bc=Counter(r["bucket"] for r in rows)
    out=["# Blog Corpus Compliance Audit (READ-ONLY) — 29/06/2026",""]
    out.append(f"Live posts audited: **{len(rows)}**  |  GSC page-rows: {len(G)}")
    out.append("")
    out.append("## Compliance summary (every new rule applied as a check)")
    for b,n in bc.most_common(): out.append(f"- **{b}**: {n}")
    out.append("")
    def section(title, pred, rank_desc=True):
        sel=sorted([r for r in rows if pred(r)], key=lambda r:-r["traffic"])
        out.append(f"## {title} ({len(sel)})")
        earn=[r for r in sel if r["traffic"]>0]; dead=[r for r in sel if r["traffic"]==0]
        out.append(f"   earners (clicks/imp>0, KEEP+fix): {len(earn)}  |  zero-traffic (301/noindex candidate): {len(dead)}")
        for r in sel[:25]:
            out.append(f"   - {r['clk']}clk {r['imp']}imp  `{r['slug']}`" + (f"  [{r['rt']}]" if r['rt']!='unknown' else ""))
        out.append("")
    section("INVENTED-PRICE-LIVE (§489) — real live exposure, scrub earners first", lambda r:r["invented"]>0)
    section("WEAK-PRICING (§172) — anchor earners / 301 deadweight", lambda r:r["bucket"].startswith("WEAK"))
    section("DOORWAY (§529) — keep earners, 301 zero-traffic", lambda r:r["bucket"].startswith("DOORWAY"))
    section("PERMUTATION-SHAPE (§167) — GSC-ranked, never blanket-purge", lambda r:r["bucket"].startswith("PERMUTATION"))
    out.append("## CLEAN BILL — what the new rules now guarantee for FUTURE posts")
    out.append("- §489 pre-insert filter: no invented price can enter git (single inserter)")
    out.append("- demand-gated engine: no model×fault permutation enters the pool without GSC demand")
    out.append("- review-queue (default-safe): nothing auto-publishes; human approves first-hand value (§167)")
    out.append("- single canonical generator → single filtered inserter (6 bypass generators retired)")
    rep="\n".join(out)
    dest=WEB/"docs/seo/blog-corpus-compliance-audit-29-06-2026.md"; dest.write_text(rep+"\n")
    print(rep)
    print(f"\n[written] {dest}")

if __name__=="__main__":
    main()
