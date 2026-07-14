#!/usr/bin/env node
import { writeSitemap, syncRobotsTxt } from './sitemap-lib.mjs';

const { outputPath, urlCount } = writeSitemap('public');
syncRobotsTxt('public');

console.log(`Sitemap generated: ${outputPath} (${urlCount} URLs)`);
