/**
 * One-time AST-guided metadata migration. Only adds missing openGraph objects
 * next to an explicit canonical in metadata objects. Original bytes elsewhere
 * are preserved; every changed source is snapshotted before writing.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const apply = process.argv.includes('--apply');
const stamp = new Date().toISOString().replaceAll(':', '-');
let changed = 0;
function walk(dir) {
  for (const item of fs.readdirSync(dir, {withFileTypes:true})) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) { walk(file); continue; }
    if (!/\.tsx?$/.test(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const edits = [];
    function visit(node) {
      if (ts.isObjectLiteralExpression(node)) {
        const props = Object.fromEntries(node.properties.filter(ts.isPropertyAssignment).map(p => [p.name.getText(ast).replaceAll(/['"]/g,''),p]));
        const alt = props.alternates;
        if (alt && ts.isObjectLiteralExpression(alt.initializer) && !props.openGraph) {
          const canonical = alt.initializer.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText(ast) === 'canonical');
          if (canonical && (props.title || props.description)) {
            const fields = [
              `url: ${canonical.initializer.getText(ast)}`,
              props.title ? `title: ${props.title.initializer.getText(ast)}` : '',
              props.description ? `description: ${props.description.initializer.getText(ast)}` : '',
              `siteName: 'ZA Support'`, `locale: 'en_ZA'`, `type: 'website'`,
              `images: [{ url: 'https://zasupport.com/og-image.jpg', width: 1200, height: 630 }]`,
            ].filter(Boolean);
            edits.push({at:node.getStart(ast)+1, value:`\n    openGraph: { ${fields.join(', ')} },`});
          }
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);
    if (!edits.length) continue;
    changed++;
    console.log(`${apply?'UPDATE':'PLAN'} ${file}: ${edits.length} metadata object(s)`);
    if (apply) {
      const backup = path.join('.reliability', 'og-snapshots', stamp, file);
      fs.mkdirSync(path.dirname(backup), {recursive:true});
      fs.copyFileSync(file, backup);
      let out = text;
      for (const edit of edits.sort((a,b) => b.at-a.at)) out = out.slice(0,edit.at)+edit.value+out.slice(edit.at);
      fs.writeFileSync(file, out);
    }
  }
}
walk('src/app');
console.log(`${changed} files ${apply?'updated':'planned'}`);
