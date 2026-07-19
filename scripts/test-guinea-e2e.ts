#!/usr/bin/env tsx
/**
 * Teste completo E2E — mercados GN + SN (11 módulos cada)
 * Uso: npx tsx scripts/test-guinea-e2e.ts [--base-url=http://localhost:3000]
 */
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), '.env.local');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx);
    const val = trimmed.slice(eqIdx + 1);
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

import { getMarket } from '../src/lib/markets/registry';
import { resolveMarketPage, getMarketStaticParams } from '../src/lib/markets/pages';
import { getMergedMarketBlogPosts } from '../src/lib/markets/blog-server';
import { getMarketBlogConfig } from '../src/data/markets/blog';
import { buildMarketBlogPostMetadata, buildMarketMetadata } from '../src/lib/markets/metadata';
import { getEnabledCountryCodes, getCountryConfig } from '../src/lib/ai/countries/registry';
import { isDatabaseAvailable } from '../src/lib/ai/db';
import { PROGRAMMATIC_INDUSTRIES } from '../src/lib/ai/seo-engine/types';
import { MARKET_SOLUTION_SLUGS } from '../src/data/markets/market-modules';
import { getAllLocalErpParams } from '../src/data/markets/local-erp-pages';
import { getLocalErpPageSeo } from '../src/lib/markets/local-erp-seo';
import type { MarketCode } from '../src/lib/markets/types';

const ACTIVE_MARKETS: MarketCode[] = ['gn', 'sn', 'ci'];

const BASE_URL = process.argv.find((a) => a.startsWith('--base-url='))?.split('=')[1] ?? 'http://localhost:3000';

type TestResult = { name: string; ok: boolean; detail?: string };

const results: TestResult[] = [];

function pass(name: string, detail?: string) {
  results.push({ name, ok: true, detail });
  console.log(`  ✅ ${name}${detail ? ` — ${detail}` : ''}`);
}

function fail(name: string, detail?: string) {
  results.push({ name, ok: false, detail });
  console.log(`  ❌ ${name}${detail ? ` — ${detail}` : ''}`);
}

function assert(name: string, condition: boolean, detail?: string) {
  if (condition) pass(name, detail);
  else fail(name, detail);
}

// ─── Structural tests (no server) ───────────────────────────────────────────

function runStructuralTests() {
  console.log('\n📦 Testes estruturais (código + DB)\n');

  const gn = getMarket('gn');
  assert('GN market ativo', gn.active === true);
  assert('GN não é comingSoon', gn.comingSoon !== true);
  assert('GN routePrefix /gn', gn.routePrefix === '/gn');
  assert('GN locale fr-GN', gn.hreflang === 'fr-GN');

  assert('11 módulos ERP definidos', MARKET_SOLUTION_SLUGS.length === 11, `${MARKET_SOLUTION_SLUGS.length} módulos`);

  for (const code of ACTIVE_MARKETS) {
    const market = getMarket(code);
    assert(`${code.toUpperCase()} market ativo`, market.active === true);
    assert(`${code.toUpperCase()} não é comingSoon`, market.comingSoon !== true);
    assert(`${code.toUpperCase()} no AI config`, getEnabledCountryCodes().includes(code));

    const ai = getCountryConfig(code);
    assert(`${code.toUpperCase()} AI config tem topics`, (ai?.topics.length ?? 0) > 0);

    const blogConfig = getMarketBlogConfig(code);
    assert(`Blog config ${code.toUpperCase()} existe`, !!blogConfig);

    const staticParams = getMarketStaticParams(code);
    assert(`Static params ${code.toUpperCase()} gerados`, staticParams.length > 20, `${staticParams.length} rotas`);

    for (const { slug } of staticParams) {
      const resolved = resolveMarketPage(code, slug);
      assert(`resolveMarketPage ${code}/${slug.join('/')}`, !!resolved);
    }

    for (const moduleSlug of MARKET_SOLUTION_SLUGS) {
      const hasRoute = staticParams.some((p) => p.slug.join('/') === `solutions/${moduleSlug}`);
      assert(`${code.toUpperCase()} rota solutions/${moduleSlug}`, hasRoute);
    }

    const posts = getMergedMarketBlogPosts(code);
    assert(`Blog posts merged ${code.toUpperCase()}`, posts.length >= 3, `${posts.length} artigos`);

    for (const post of posts.slice(0, 3)) {
      const meta = buildMarketBlogPostMetadata(code, post);
      assert(`Metadata build ${code}/${post.slug}`, !!meta.title && !!meta.description);
    }

    const blogIndexMeta = buildMarketMetadata(code, ['blog'], 'blog');
    assert(`Blog index metadata ${code.toUpperCase()}`, !!blogIndexMeta.title && !!blogIndexMeta.description);
  }

  assert('Database disponível', isDatabaseAvailable());
  assert('Programmatic industries', PROGRAMMATIC_INDUSTRIES.length >= 6, `${PROGRAMMATIC_INDUSTRIES.length} indústrias`);

  for (const code of ACTIVE_MARKETS) {
    const localParams = getAllLocalErpParams(code);
    assert(
      `${code.toUpperCase()} local ERP pages`,
      localParams.length === PROGRAMMATIC_INDUSTRIES.length * 5,
      `${localParams.length} páginas`
    );

    for (const { industry, city } of localParams.slice(0, 3)) {
      const seo = getLocalErpPageSeo(code, industry, city);
      assert(`Local ERP SEO ${code}/${industry}/${city}`, !!seo?.title && !!seo.description);
      const meta = buildMarketMetadata(code, ['erp', industry, city], 'erp');
      assert(`Local ERP metadata ${code}/${industry}/${city}`, !!meta.title && !!meta.description);
    }
  }
}

// ─── HTTP tests ─────────────────────────────────────────────────────────────

async function fetchStatus(path: string, init?: RequestInit): Promise<{ status: number; body: string; headers: Headers }> {
  const res = await fetch(`${BASE_URL}${path}`, init);
  const body = await res.text();
  return { status: res.status, body, headers: res.headers };
}

async function runHttpTests() {
  console.log('\n🌐 Testes HTTP (servidor: ' + BASE_URL + ')\n');

  for (const code of ACTIVE_MARKETS) {
    const prefix = `/${code}`;
    const market = getMarket(code);

    const home = await fetchStatus(prefix);
    assert(`GET ${prefix} → 200`, home.status === 200, `status ${home.status}`);
    assert(
      `${code.toUpperCase()} home contém país`,
      home.body.includes(market.countryNameLocal) || home.body.includes(market.countryName)
    );

    const corePages = [
      `${prefix}/features`,
      `${prefix}/pricing`,
      `${prefix}/about`,
      `${prefix}/contact`,
      `${prefix}/faq`,
      `${prefix}/demo`,
      `${prefix}/getting-started`,
      `${prefix}/blog`,
      `${prefix}/solutions`,
      `${prefix}/industries`,
      `${prefix}/industries/retail`,
      `${prefix}/industries/restaurants`,
    ];

    for (const path of corePages) {
      const { status } = await fetchStatus(path);
      assert(`GET ${path} → 200`, status === 200, `status ${status}`);
    }

    for (const moduleSlug of MARKET_SOLUTION_SLUGS) {
      const path = `${prefix}/solutions/${moduleSlug}`;
      const { status } = await fetchStatus(path);
      assert(`GET ${path} → 200`, status === 200, `status ${status}`);
    }

    const posts = getMergedMarketBlogPosts(code);
    for (const post of posts.slice(0, 3)) {
      const path = `${prefix}/blog/${post.slug}`;
      const { status, body } = await fetchStatus(path);
      assert(`GET ${path} → 200`, status === 200);
      assert(`Post ${code}/${post.slug} tem <h1>`, body.includes('<h1') || body.includes('text-3xl'));
      assert(
        `Post ${code}/${post.slug} canonical`,
        body.includes(`${prefix}/blog/`) || body.includes('canonical')
      );
    }

    for (const ind of PROGRAMMATIC_INDUSTRIES.slice(0, 3)) {
      const path = `${prefix}/erp/${ind.slug}`;
      const { status } = await fetchStatus(path);
      assert(`GET ${path} → 200`, status === 200, `status ${status}`);
    }

    const localSamples = getAllLocalErpParams(code).slice(0, 3);
    for (const { industry, city } of localSamples) {
      const path = `${prefix}/erp/${industry}/${city}`;
      const { status, body } = await fetchStatus(path);
      assert(`GET ${path} → 200`, status === 200, `status ${status}`);
      assert(`Local ERP ${code}/${industry}/${city} tem <h1>`, body.includes('<h1'));
    }

    const rss = await fetchStatus(`/api/markets/${code}/blog/rss`);
    assert(`GET /api/markets/${code}/blog/rss → 200`, rss.status === 200);
  }

  const aoHome = await fetchStatus('/ao');
  assert('GET /ao → 404 (coming soon)', aoHome.status === 404);

  const sitemap = await fetchStatus('/sitemap.xml');
  assert('GET /sitemap.xml → 200', sitemap.status === 200);
  assert('Sitemap referencia GN', sitemap.body.includes('/gn'));
  assert('Sitemap referencia SN', sitemap.body.includes('/sn'));
  assert('Sitemap referencia CI', sitemap.body.includes('/ci'));
  assert('Sitemap inclui local ERP', sitemap.body.includes('/erp/restaurants/conakry') || sitemap.body.includes('/erp/restaurants/dakar') || sitemap.body.includes('/erp/restaurants/abidjan'));

  const sitemapCountries = await fetchStatus('/sitemap-countries.xml');
  assert('GET /sitemap-countries.xml → 200', sitemapCountries.status === 200);

  const sitemapArticles = await fetchStatus('/sitemap-articles.xml');
  assert('GET /sitemap-articles.xml → 200', sitemapArticles.status === 200);
  assert('Sitemap articles inclui post GN', sitemapArticles.body.includes('/gn/blog/'));
  assert('Sitemap articles inclui post SN', sitemapArticles.body.includes('/sn/blog/'));
  assert('Sitemap articles inclui post CI', sitemapArticles.body.includes('/ci/blog/'));

  // robots.txt
  const robots = await fetchStatus('/robots.txt');
  assert('GET /robots.txt → 200', robots.status === 200);
  assert('robots.txt tem Sitemap', robots.body.toLowerCase().includes('sitemap'));

  // Admin pages load (HTML)
  const adminLogin = await fetchStatus('/admin/ai-engine/login');
  assert('GET /admin/ai-engine/login → 200', adminLogin.status === 200);

  // Admin API — sem auth deve falhar
  const adminDash = await fetchStatus('/api/admin/ai-content/dashboard');
  assert('Admin dashboard sem auth → 401', adminDash.status === 401);

  const adminArticles = await fetchStatus('/api/admin/ai-content/articles');
  assert('Admin articles sem auth → 401', adminArticles.status === 401);

  const seoStats = await fetchStatus('/api/admin/seo-engine/stats');
  assert('SEO engine stats sem auth → 401', seoStats.status === 401);

  const growthStats = await fetchStatus('/api/admin/growth/stats');
  assert('Growth stats sem auth → 401', growthStats.status === 401);

  // Admin auth flow
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminPassword) {
    const loginRes = await fetch(`${BASE_URL}/api/admin/ai-content/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword }),
    });
    const setCookie = loginRes.headers.get('set-cookie') ?? '';
    assert('Admin login → 200', loginRes.status === 200);
    assert('Admin login set-cookie', setCookie.includes('zyvo_admin_token'));

    const cookie = setCookie.split(';')[0];
    const authedDash = await fetchStatus('/api/admin/ai-content/dashboard', {
      headers: { Cookie: cookie },
    });
    assert('Admin dashboard com auth → 200', authedDash.status === 200);

    const authedArticles = await fetchStatus('/api/admin/ai-content/articles', {
      headers: { Cookie: cookie },
    });
    assert('Admin articles com auth → 200', authedArticles.status === 200);

    const authedSettings = await fetchStatus('/api/admin/ai-content/settings', {
      headers: { Cookie: cookie },
    });
    assert('Admin settings com auth → 200', authedSettings.status === 200);

    const authedCountries = await fetchStatus('/api/admin/ai-content/countries', {
      headers: { Cookie: cookie },
    });
    assert('Admin countries com auth → 200', authedCountries.status === 200);
    if (authedCountries.status === 200) {
      const data = JSON.parse(authedCountries.body);
      const countries = data.configured ?? data;
      for (const code of ACTIVE_MARKETS) {
        assert(
          `Admin countries inclui ${code.toUpperCase()}`,
          Array.isArray(countries) && countries.some((c: { countryCode: string }) => c.countryCode === code)
        );
      }
    }

    const authedSeo = await fetchStatus('/api/admin/seo-engine/stats', {
      headers: { Cookie: cookie },
    });
    assert('SEO engine stats com auth → 200', authedSeo.status === 200);

    const authedGrowth = await fetchStatus('/api/admin/growth/stats', {
      headers: { Cookie: cookie },
    });
    assert('Growth stats com auth → 200', authedGrowth.status === 200);

    // Invalid login
    const badLogin = await fetch(`${BASE_URL}/api/admin/ai-content/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'wrong-password' }),
    });
    assert('Admin login senha errada → 401', badLogin.status === 401);
  } else {
    fail('Admin auth flow', 'ADMIN_PASSWORD não configurada — saltado');
  }

  // Cron endpoint
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const cronBad = await fetchStatus('/api/cron/daily-pipeline?country=gn&stage=research');
    assert('Cron sem secret → 401', cronBad.status === 401);

    const cronOk = await fetchStatus(
      `/api/cron/daily-pipeline?country=gn&stage=research&secret=${cronSecret}`
    );
    assert('Cron research GN → 200', cronOk.status === 200, `status ${cronOk.status}`);
  } else {
    const cronOpen = await fetchStatus('/api/cron/daily-pipeline?country=gn&stage=research');
    assert('Cron research GN (sem CRON_SECRET) → 200', cronOpen.status === 200, `status ${cronOpen.status}`);
  }

  // Conversion tracking API
  const conversion = await fetch(`${BASE_URL}/api/analytics/conversion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userAction: 'pricing_view', country: 'gn', page: '/gn/pricing' }),
  });
  assert('Conversion API → 200', conversion.status === 200, `status ${conversion.status}`);

  // Contact API — sem API_KEY configurada retorna 500
  const contactBad = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  assert(
    'Contact API dados inválidos → 400 ou 500',
    contactBad.status === 400 || contactBad.status === 500,
    `status ${contactBad.status}`
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function waitForServer(maxAttempts = 30): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(BASE_URL);
      if (res.ok || res.status === 404) return true;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function main() {
  console.log('🌍 Teste completo E2E — GN + SN + CI (11 módulos)\n');
  console.log('='.repeat(50));

  runStructuralTests();

  console.log('\n⏳ Aguardando servidor...');
  const serverUp = await waitForServer();
  if (!serverUp) {
    fail('Servidor disponível', `Não responde em ${BASE_URL}. Execute: npm run start`);
    printSummary();
    process.exit(1);
  }
  pass('Servidor disponível', BASE_URL);

  await runHttpTests();

  printSummary();
}

function printSummary() {
  console.log('\n' + '='.repeat(50));
  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok);
  console.log(`\n📊 Resultado: ${passed}/${results.length} testes passaram`);

  if (failed.length > 0) {
    console.log('\n❌ Falhas:');
    for (const f of failed) {
      console.log(`   • ${f.name}${f.detail ? `: ${f.detail}` : ''}`);
    }
    process.exit(1);
  }

  console.log('\n✅ Todos os fluxos GN + SN + CI estão funcionando!\n');
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
