#!/usr/bin/env node
/**
 * Migrates react-router-dom imports to Next.js equivalents in src/
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', 'src');

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!full.includes('/app/') && entry !== 'routes') walk(full, files);
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      if (!full.includes('/app/')) files.push(full);
    }
  }
  return files;
}

for (const file of walk(ROOT)) {
  let content = readFileSync(file, 'utf8');
  const original = content;

  if (!content.includes('react-router-dom')) continue;

  const imports = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]react-router-dom['"]/);
  if (!imports) continue;

  const names = imports[1].split(',').map((s) => s.trim()).filter(Boolean);
  const replacements = [];

  if (names.includes('Link')) {
    replacements.push("import Link from 'next/link'");
  }
  if (names.includes('useParams') || names.includes('useLocation') || names.includes('useNavigate')) {
    replacements.push(`import { ${names.filter((n) => ['useParams', 'useLocation', 'useNavigate'].includes(n)).join(', ')} } from 'next/navigation'`);
  }
  if (names.includes('Navigate')) {
    // handled manually in pages
  }

  content = content.replace(/import\s+\{[^}]+\}\s+from\s+['"]react-router-dom['"];?\n?/g, '');
  if (replacements.length) {
    content = replacements.join('\n') + '\n' + content;
  }

  content = content.replace(/\bto=\{/g, 'href={');
  content = content.replace(/\bto="/g, 'href="');
  content = content.replace(/\bto='/g, "href='");

  const needsClient =
    content.includes('useState') ||
    content.includes('useEffect') ||
    content.includes('useParams') ||
    content.includes('useLocation') ||
    content.includes('useSearchParams') ||
    content.includes('window.') ||
    content.includes('localStorage') ||
    content.includes('onClick') ||
    content.includes('onSubmit') ||
    file.includes('/components/') ||
    file.includes('/pages/Contact') ||
    file.includes('/pages/Demo');

  if (needsClient && !content.startsWith("'use client'")) {
    content = "'use client';\n\n" + content;
  }

  if (content !== original) {
    writeFileSync(file, content);
    console.log('Updated:', file.replace(ROOT + '/', ''));
  }
}

console.log('Migration complete');
