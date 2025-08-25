const fs = require('fs');
const path = require('path');

const root = process.cwd();
const srcDir = path.join(root, 'src');
const componentsDir = path.join(srcDir, 'components');
const outPath = path.join(root, 'components.json');

function readAllFiles(dir, exts) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...readAllFiles(p, exts));
    else if (e.isFile() && exts.some(ext => p.endsWith(ext))) out.push(p);
  }
  return out;
}

function getRelImportPath(absPath) {
  const rel = absPath.split(`${path.sep}src${path.sep}`)[1];
  return `@/${rel.replace(/\.tsx$/, '')}`;
}

function extractBalancedBody(content, openBraceIdx) {
  let i = openBraceIdx;
  let depth = 0;
  let inStr = false;
  let strCh = '';
  let bodyStart = -1;
  for (; i < content.length; i++) {
    const ch = content[i];
    if (inStr) {
      if (ch === strCh && content[i - 1] !== '\\') inStr = false;
      continue;
    }
    if (ch === '"' || ch === '\'') { inStr = true; strCh = ch; continue; }
    if (ch === '{') {
      depth++;
      if (depth === 1) bodyStart = i + 1;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) {
        return content.slice(bodyStart, i);
      }
    }
  }
  return '';
}

function findPropsInterface(content, preferredName) {
  // Try PreferredNameProps first
  const pref = new RegExp(`interface\\s+${preferredName}Props\\s*\\{`);
  let m = pref.exec(content);
  if (m) {
    const body = extractBalancedBody(content, m.index + m[0].lastIndexOf('{'));
    return { name: `${preferredName}Props`, body };
  }
  // Else first *Props interface
  const re = /interface\s+([A-Za-z0-9_]+Props)\s*\{/g;
  m = re.exec(content);
  if (m) {
    const body = extractBalancedBody(content, m.index + m[0].lastIndexOf('{'));
    return { name: m[1], body };
  }
  return null;
}

function parseObjectFields(body) {
  const parts = [];
  let buf = '';
  let depthAngle = 0;
  let depthBrace = 0;
  let inStr = false;
  let strCh = '';
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (inStr) {
      buf += ch;
      if (ch === strCh && body[i - 1] !== '\\') inStr = false;
      continue;
    }
    if (ch === '\'' || ch === '"') { inStr = true; strCh = ch; buf += ch; continue; }
    if (ch === '<') depthAngle++;
    else if (ch === '>') depthAngle = Math.max(0, depthAngle - 1);
    else if (ch === '{') depthBrace++;
    else if (ch === '}') depthBrace = Math.max(0, depthBrace - 1);
    if (ch === ';' && depthAngle === 0 && depthBrace === 0) {
      const part = buf.trim();
      if (part) parts.push(part);
      buf = '';
    } else {
      buf += ch;
    }
  }
  if (buf.trim()) parts.push(buf.trim());
  const fields = [];
  for (const p of parts) {
    const m = p.match(/^(\w+)\??:\s*([\s\S]+)$/);
    if (m) fields.push({ name: m[1], type: m[2].trim() });
  }
  return fields;
}

function normalizeBody(body) {
  return body
    .split('\n')
    .map(l => l.replace(/\/\/.*$/, '').trim())
    .filter(Boolean)
    .join(' ');
}

function buildTypeMap() {
  const files = readAllFiles(srcDir, ['.ts', '.tsx']);
  const map = new Map();
  for (const f of files) {
    let content;
    try { content = fs.readFileSync(f, 'utf8'); } catch { continue; }
    // interfaces
    const ifaceRe = /(?:export\s+)?interface\s+([A-Za-z0-9_]+)\s*\{/g;
    let m;
    while ((m = ifaceRe.exec(content)) !== null) {
      const body = extractBalancedBody(content, m.index + m[0].lastIndexOf('{'));
      if (!map.has(m[1])) map.set(m[1], `{ ${normalizeBody(body)} }`);
    }
    // type aliases with object on RHS
    const typeRe = /(?:export\s+)?type\s+([A-Za-z0-9_]+)\s*=\s*\{/g;
    while ((m = typeRe.exec(content)) !== null) {
      const body = extractBalancedBody(content, m.index + m[0].lastIndexOf('{'));
      if (!map.has(m[1])) map.set(m[1], `{ ${normalizeBody(body)} }`);
    }
  }
  return map;
}

function expandObjectShape(objShape, typeMap, seen, depth) {
  const body = objShape.trim().replace(/^\{/, '').replace(/\}$/, '');
  const fields = parseObjectFields(body);
  const parts = [];
  for (const f of fields) {
    parts.push(`${f.name}: ${expandType(f.type, typeMap, seen, depth + 1)};`);
  }
  return `{ ${parts.join(' ')} }`;
}

function expandType(typeStr, typeMap, seen = new Set(), depth = 0) {
  if (!typeStr) return typeStr;
  const t = String(typeStr).trim();
  if (depth > 8) return t; // recursion guard
  // parentheses
  if (t.startsWith('(') && t.endsWith(')')) return expandType(t.slice(1, -1), typeMap, seen, depth + 1);
  // arrays
  if (t.endsWith('[]')) {
    const base = t.slice(0, -2).trim();
    return `Array<${expandType(base, typeMap, seen, depth + 1)}>`;
  }
  const arrMatch = t.match(/^Array<([\s\S]+)>$/);
  if (arrMatch) return `Array<${expandType(arrMatch[1].trim(), typeMap, seen, depth + 1)}>`;
  // inline object
  if (t.startsWith('{') && t.endsWith('}')) return expandObjectShape(t, typeMap, seen, depth + 1);
  // unions/intersections at top-level
  if (/[|&]/.test(t) && !/^['\"]/ .test(t)) {
    let parts = [];
    let buf = '';
    let depthA = 0, depthB = 0; let inS = false, sCh = '';
    for (let i = 0; i < t.length; i++) {
      const ch = t[i];
      if (inS) { buf += ch; if (ch === sCh && t[i - 1] !== '\\') inS = false; continue; }
      if (ch === '\'' || ch === '"') { inS = true; sCh = ch; buf += ch; continue; }
      if (ch === '<') depthA++; else if (ch === '>') depthA = Math.max(0, depthA - 1);
      if (ch === '{') depthB++; else if (ch === '}') depthB = Math.max(0, depthB - 1);
      if ((ch === '|' || ch === '&') && depthA === 0 && depthB === 0) { parts.push(buf.trim()); buf = ''; parts.push(ch); }
      else buf += ch;
    }
    if (buf.trim()) parts.push(buf.trim());
    return parts.map(p => (p === '|' || p === '&') ? p : expandType(p, typeMap, seen, depth + 1)).join(' ');
  }
  // type reference
  if (typeMap.has(t)) {
    if (seen.has(t)) return t;
    seen.add(t);
    const expanded = expandObjectShape(typeMap.get(t), typeMap, seen, depth + 1);
    seen.delete(t);
    return expanded;
  }
  return t;
}

function exampleForType(typeStr) {
  const t = String(typeStr).trim();
  const arr = t.match(/^Array<([\s\S]+)>$/);
  if (arr) return [exampleForType(arr[1].trim())];
  if (t.startsWith('{') && t.endsWith('}')) {
    const fields = parseObjectFields(t.slice(1, -1));
    const obj = {};
    for (const f of fields) obj[f.name] = exampleForType(f.type);
    return obj;
  }
  if (/^(['\"][^'\"]+['\"])\s*(\||$)/.test(t)) return t.split('|')[0].trim().replace(/^['\"]|['\"]$/g, '');
  if (t === 'string') return 'string';
  if (t === 'number') return 1;
  if (t === 'boolean') return true;
  if (/React\.ReactNode|ReactNode/.test(t)) return 'Text';
  if (/\)\s*=>/.test(t)) return '() => {}';
  return null;
}

function detectExport(content, filePath) {
  const baseName = path.basename(filePath, '.tsx');
  let m;
  // default export variants
  m = content.match(/export\s+default\s+React\.memo\((\w+)\)/);
  if (m) return { name: m[1], isDefault: true };
  m = content.match(/export\s+default\s+memo\((\w+)\)/);
  if (m) return { name: m[1], isDefault: true };
  m = content.match(/export\s+default\s+function\s+(\w+)\s*\(/);
  if (m) return { name: m[1], isDefault: true };
  m = content.match(/export\s+default\s+(\w+)\s*;/);
  if (m) return { name: m[1], isDefault: true };
  // named exports
  const named = new Set();
  const reg1 = /export\s+const\s+(\w+)\s*=\s*/g;
  while ((m = reg1.exec(content)) !== null) named.add(m[1]);
  const reg2 = /export\s+function\s+(\w+)\s*\(/g;
  while ((m = reg2.exec(content)) !== null) named.add(m[1]);
  const reg3 = /export\s+\{\s*([^}]+)\s*\}\s*;/g;
  while ((m = reg3.exec(content)) !== null) {
    const names = m[1].split(',').map(s => s.trim().split('\n').join('')).filter(Boolean);
    for (const n of names) {
      const pure = n.split(' as ')[0].trim();
      if (pure) named.add(pure);
    }
  }
  const namedList = Array.from(named);
  let pick = namedList.find(n => n === baseName) || namedList.find(n => n.toLowerCase() === baseName.toLowerCase()) || namedList[0];
  if (pick) return { name: pick, isDefault: false };
  // fallback
  return { name: baseName, isDefault: true };
}

function buildPropsSchema(propsBody, typeMap) {
  const bodyWithSemicolons = propsBody
    .split('\n')
    .map(l => l.replace(/\/\/.*$/, '').trim())
    .filter(Boolean)
    .map(l => (l.endsWith(';') ? l : l + ';'))
    .join('\n');
  const fields = parseObjectFields(bodyWithSemicolons);
  const out = {};
  for (const f of fields) out[f.name] = expandType(f.type, typeMap);
  return out;
}

function main() {
  const typeMap = buildTypeMap();
  const files = readAllFiles(componentsDir, ['.tsx']);
  const items = [];
  for (const f of files) {
    const content = fs.readFileSync(f, 'utf8');
    const { name, isDefault } = detectExport(content, f);
    const importPath = getRelImportPath(f);
    const importStmt = isDefault ? `import ${name} from '${importPath}';` : `import { ${name} } from '${importPath}';`;
    const propsIface = findPropsInterface(content, name);
    const propsSchema = propsIface ? buildPropsSchema(propsIface.body, typeMap) : {};
    const example = {};
    for (const [k, v] of Object.entries(propsSchema)) {
      if (k === 'className') example[k] = 'custom-class';
      else if (k === 'image' || k === 'imageSrc' || k === 'backgroundSrc') example[k] = '/images/logo.svg';
      else if (k === 'video') example[k] = '/videos/demo.mp4';
      else if (k === 'title') example[k] = 'Title';
      else if (k === 'description' || k === 'subtitle') example[k] = 'Description';
      else if (k === 'text') example[k] = 'Text';
      else if (k === 'children') example[k] = 'Content';
      else if (k.startsWith('on')) example[k] = '() => {}';
      else example[k] = exampleForType(v);
    }
    items.push({ import: importStmt, name, path: importPath, propsSchema, examples: [example] });
  }
  fs.writeFileSync(outPath, JSON.stringify(items, null, 2));
  console.log('Wrote', items.length, 'components to', outPath);
}

main();


