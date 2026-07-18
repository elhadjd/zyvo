#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', 'src');

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry !== 'app' && entry !== 'routes') walk(full, files);
    } else if (entry.endsWith('.tsx')) {
      walk.push ? null : files.push(full);
    }
  }
  return files;
}

function walkDir(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry !== 'app' && entry !== 'routes') walkDir(full, files);
    } else if (entry.endsWith('.tsx')) {
      files.push(full);
    }
  }
  return files;
}

for (const file of walkDir(ROOT)) {
  let content = readFileSync(file, 'utf8');
  const original = content;

  content = content.replace(/import SEO from ['"][^'"]+['"];?\n?/g, '');
  content = content.replace(/import JsonLd from ['"][^'"]+['"];?\n?/g, '');

  // Remove <SEO ... /> including multiline props
  content = content.replace(/<SEO[\s\S]*?\/>\s*\n?/g, '');

  // Remove orphaned getBreadcrumbSchema imports if only used in SEO
  if (!content.includes('getBreadcrumbSchema') && !content.includes('getFAQSchema') && !content.includes('getOrganizationSchema')) {
    content = content.replace(/import \{[^}]*getBreadcrumbSchema[^}]*\} from ['"][^'"]+structured-data['"];?\n?/g, '');
    content = content.replace(/import \{ getBreadcrumbSchema \} from ['"][^'"]+['"];?\n?/g, '');
  }

  // Fix broken Navigate
  content = content.replace(/return <Navigate href="([^"]+)" replace \/>/g, "return null; // invalid slug, handled by route");

  // Remove empty fragments wrapper if only child left - skip for safety

  if (content !== original) {
    writeFileSync(file, content);
    console.log('Cleaned:', file.replace(ROOT + '/', ''));
  }
}
