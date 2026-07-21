import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DEFAULT_DB_PATH = path.join(process.cwd(), 'data', 'ai-content.sqlite');

export function runMigrations(dbPath = process.env.DATABASE_PATH ?? DEFAULT_DB_PATH): void {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS ai_agents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      country_code TEXT,
      enabled INTEGER NOT NULL DEFAULT 1,
      schedule TEXT,
      config TEXT,
      status TEXT NOT NULL DEFAULT 'idle',
      last_run_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ai_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id INTEGER REFERENCES ai_agents(id),
      agent_code TEXT NOT NULL,
      country_code TEXT NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      payload TEXT,
      result TEXT,
      error TEXT,
      scheduled_at TEXT,
      started_at TEXT,
      completed_at TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS research_sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT NOT NULL,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      domain TEXT NOT NULL,
      category TEXT NOT NULL,
      keywords TEXT NOT NULL DEFAULT '[]',
      snippet TEXT,
      relevance_score REAL DEFAULT 0,
      task_id INTEGER REFERENCES ai_tasks(id),
      fetched_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS knowledge_base (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT NOT NULL,
      title TEXT NOT NULL,
      source_id INTEGER REFERENCES research_sources(id),
      source_url TEXT NOT NULL,
      source_title TEXT NOT NULL,
      category TEXT NOT NULL,
      keywords TEXT NOT NULL DEFAULT '[]',
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      reference_date TEXT,
      verified INTEGER NOT NULL DEFAULT 0,
      task_id INTEGER REFERENCES ai_tasks(id),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS content_articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT NOT NULL,
      knowledge_ids TEXT NOT NULL DEFAULT '[]',
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      introduction TEXT NOT NULL,
      content TEXT NOT NULL DEFAULT '[]',
      faq TEXT NOT NULL DEFAULT '[]',
      conclusion TEXT NOT NULL,
      cta TEXT NOT NULL,
      category TEXT NOT NULL,
      author TEXT NOT NULL DEFAULT 'Équipe ZYVO',
      language TEXT NOT NULL DEFAULT 'fr',
      read_time TEXT NOT NULL DEFAULT '5 min',
      status TEXT NOT NULL DEFAULT 'draft',
      task_id INTEGER REFERENCES ai_tasks(id),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      published_at TEXT
    );

    CREATE TABLE IF NOT EXISTS seo_metadata (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER NOT NULL REFERENCES content_articles(id),
      meta_title TEXT NOT NULL,
      meta_description TEXT NOT NULL,
      slug TEXT NOT NULL,
      keywords TEXT NOT NULL,
      schema_article TEXT,
      schema_faq TEXT,
      internal_links TEXT DEFAULT '[]',
      image_suggestions TEXT DEFAULT '[]',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS fact_checks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER NOT NULL REFERENCES content_articles(id),
      status TEXT NOT NULL DEFAULT 'pending',
      issues TEXT DEFAULT '[]',
      checker_notes TEXT,
      checked_at TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ai_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_code TEXT NOT NULL,
      country_code TEXT,
      level TEXT NOT NULL DEFAULT 'info',
      message TEXT NOT NULL,
      metadata TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS country_ai_config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT NOT NULL UNIQUE,
      language TEXT NOT NULL,
      enabled INTEGER NOT NULL DEFAULT 1,
      publish_frequency TEXT NOT NULL DEFAULT 'daily',
      auto_publish INTEGER NOT NULL DEFAULT 0,
      require_approval INTEGER NOT NULL DEFAULT 1,
      categories TEXT NOT NULL DEFAULT '[]',
      sources TEXT NOT NULL DEFAULT '[]',
      deepseek_tokens_used INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_research_sources_country ON research_sources(country_code);
    CREATE INDEX IF NOT EXISTS idx_knowledge_base_country ON knowledge_base(country_code);
    CREATE INDEX IF NOT EXISTS idx_content_articles_country_status ON content_articles(country_code, status);
    CREATE INDEX IF NOT EXISTS idx_content_articles_slug ON content_articles(country_code, slug);
    CREATE INDEX IF NOT EXISTS idx_ai_tasks_country ON ai_tasks(country_code, status);
    CREATE INDEX IF NOT EXISTS idx_ai_logs_created ON ai_logs(created_at);

    CREATE TABLE IF NOT EXISTS ai_jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      country_code TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      payload TEXT,
      result TEXT,
      error TEXT,
      attempts INTEGER NOT NULL DEFAULT 0,
      max_attempts INTEGER NOT NULL DEFAULT 3,
      scheduled_at TEXT,
      started_at TEXT,
      completed_at TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS deepseek_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_code TEXT,
      country_code TEXT,
      model TEXT NOT NULL,
      prompt_tokens INTEGER NOT NULL DEFAULT 0,
      completion_tokens INTEGER NOT NULL DEFAULT 0,
      total_tokens INTEGER NOT NULL DEFAULT 0,
      latency_ms INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'pending',
      messages_count INTEGER NOT NULL DEFAULT 0,
      error TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_ai_jobs_status ON ai_jobs(status);
    CREATE INDEX IF NOT EXISTS idx_deepseek_requests_created ON deepseek_requests(created_at);

    CREATE TABLE IF NOT EXISTS managed_sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT NOT NULL,
      name TEXT NOT NULL,
      url TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'Geral',
      trust_level INTEGER NOT NULL DEFAULT 70,
      status TEXT NOT NULL DEFAULT 'active',
      last_checked TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS discovered_keywords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT NOT NULL,
      keyword TEXT NOT NULL,
      search_intent TEXT NOT NULL DEFAULT 'informational',
      category TEXT NOT NULL,
      priority TEXT NOT NULL DEFAULT 'medium',
      seo_score INTEGER NOT NULL DEFAULT 50,
      status TEXT NOT NULL DEFAULT 'discovered',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS knowledge_documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      source_id INTEGER REFERENCES managed_sources(id),
      source_url TEXT NOT NULL,
      source_name TEXT NOT NULL,
      category TEXT NOT NULL,
      validation_status TEXT NOT NULL DEFAULT 'pending',
      extracted_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS content_opportunities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT NOT NULL,
      topic TEXT NOT NULL,
      category TEXT NOT NULL,
      seo_score INTEGER NOT NULL DEFAULT 50,
      business_relevance INTEGER NOT NULL DEFAULT 50,
      competition INTEGER NOT NULL DEFAULT 50,
      zyvo_relevance INTEGER NOT NULL DEFAULT 50,
      total_score INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'pending',
      keyword_ids TEXT DEFAULT '[]',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS research_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT NOT NULL,
      module TEXT NOT NULL,
      action TEXT NOT NULL,
      message TEXT NOT NULL,
      level TEXT NOT NULL DEFAULT 'info',
      metadata TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_managed_sources_country ON managed_sources(country_code);
    CREATE INDEX IF NOT EXISTS idx_discovered_keywords_country ON discovered_keywords(country_code);
    CREATE INDEX IF NOT EXISTS idx_knowledge_documents_country ON knowledge_documents(country_code);
    CREATE INDEX IF NOT EXISTS idx_content_opportunities_score ON content_opportunities(total_score);
    CREATE INDEX IF NOT EXISTS idx_research_logs_created ON research_logs(created_at);

    CREATE TABLE IF NOT EXISTS seo_keywords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      keyword TEXT NOT NULL,
      country TEXT NOT NULL,
      language TEXT NOT NULL,
      intent TEXT NOT NULL DEFAULT 'informational',
      difficulty INTEGER NOT NULL DEFAULT 50,
      priority_score INTEGER NOT NULL DEFAULT 50,
      opportunity TEXT,
      related_content TEXT DEFAULT '[]',
      article_id INTEGER REFERENCES content_articles(id),
      is_primary INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS topic_clusters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      country TEXT NOT NULL,
      category TEXT NOT NULL,
      main_keyword TEXT NOT NULL,
      related_articles TEXT DEFAULT '[]',
      pillar_article_id INTEGER REFERENCES content_articles(id),
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS internal_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_article_id INTEGER NOT NULL REFERENCES content_articles(id),
      target_article_id INTEGER REFERENCES content_articles(id),
      target_url TEXT NOT NULL,
      anchor_text TEXT NOT NULL,
      country TEXT NOT NULL,
      relevance_score REAL DEFAULT 0.8,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS programmatic_pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL,
      country TEXT NOT NULL,
      industry TEXT NOT NULL,
      language TEXT NOT NULL,
      title TEXT NOT NULL,
      meta_title TEXT NOT NULL,
      meta_description TEXT NOT NULL,
      headline TEXT NOT NULL,
      content TEXT NOT NULL DEFAULT '[]',
      faq TEXT DEFAULT '[]',
      cta TEXT NOT NULL,
      keywords TEXT NOT NULL,
      schema_data TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      published_at TEXT,
      UNIQUE(country, industry)
    );

    CREATE TABLE IF NOT EXISTS seo_sitemap_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      country TEXT,
      priority REAL NOT NULL DEFAULT 0.7,
      change_freq TEXT NOT NULL DEFAULT 'monthly',
      lastmod TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS content_freshness_checks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER NOT NULL REFERENCES content_articles(id),
      status TEXT NOT NULL DEFAULT 'pending',
      reason TEXT NOT NULL,
      severity TEXT NOT NULL DEFAULT 'medium',
      suggested_action TEXT,
      checked_at TEXT NOT NULL,
      resolved_at TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_seo_keywords_country ON seo_keywords(country);
    CREATE INDEX IF NOT EXISTS idx_topic_clusters_country ON topic_clusters(country);
    CREATE INDEX IF NOT EXISTS idx_internal_links_source ON internal_links(source_article_id);
    CREATE INDEX IF NOT EXISTS idx_programmatic_pages_country ON programmatic_pages(country, status);
    CREATE INDEX IF NOT EXISTS idx_seo_sitemap_type ON seo_sitemap_entries(type);
    CREATE INDEX IF NOT EXISTS idx_freshness_status ON content_freshness_checks(status);

    CREATE TABLE IF NOT EXISTS search_console_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT NOT NULL,
      page_url TEXT NOT NULL,
      keyword TEXT NOT NULL,
      clicks INTEGER NOT NULL DEFAULT 0,
      impressions INTEGER NOT NULL DEFAULT 0,
      ctr REAL NOT NULL DEFAULT 0,
      position REAL NOT NULL DEFAULT 0,
      date TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS visitor_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT NOT NULL,
      page_url TEXT NOT NULL,
      users INTEGER NOT NULL DEFAULT 0,
      sessions INTEGER NOT NULL DEFAULT 0,
      avg_time_on_page REAL NOT NULL DEFAULT 0,
      bounce_rate REAL NOT NULL DEFAULT 0,
      landing_page TEXT,
      conversions INTEGER NOT NULL DEFAULT 0,
      date TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS content_performance_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER NOT NULL REFERENCES content_articles(id),
      country TEXT NOT NULL,
      seo_score INTEGER NOT NULL DEFAULT 0,
      engagement_score INTEGER NOT NULL DEFAULT 0,
      conversion_score INTEGER NOT NULL DEFAULT 0,
      total_score INTEGER NOT NULL DEFAULT 0,
      traffic INTEGER NOT NULL DEFAULT 0,
      avg_position REAL NOT NULL DEFAULT 0,
      internal_links_count INTEGER NOT NULL DEFAULT 0,
      freshness_days INTEGER NOT NULL DEFAULT 0,
      analyzed_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS growth_opportunities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT NOT NULL,
      keyword TEXT,
      page_url TEXT,
      opportunity_type TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      current_position REAL,
      impressions INTEGER DEFAULT 0,
      clicks INTEGER DEFAULT 0,
      priority TEXT NOT NULL DEFAULT 'medium',
      suggested_action TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'open',
      article_id INTEGER REFERENCES content_articles(id),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS growth_recommendations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT NOT NULL,
      category TEXT NOT NULL,
      recommendation TEXT NOT NULL,
      rationale TEXT NOT NULL,
      priority TEXT NOT NULL DEFAULT 'medium',
      article_count INTEGER DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'pending',
      week_plan TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS growth_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT NOT NULL,
      report_type TEXT NOT NULL DEFAULT 'weekly',
      period_start TEXT NOT NULL,
      period_end TEXT NOT NULL,
      summary TEXT NOT NULL,
      insights TEXT NOT NULL DEFAULT '[]',
      recommendations TEXT NOT NULL DEFAULT '[]',
      metrics TEXT DEFAULT '{}',
      status TEXT NOT NULL DEFAULT 'generated',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS conversion_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_action TEXT NOT NULL,
      page TEXT NOT NULL,
      country TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'direct',
      metadata TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS content_refresh_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER NOT NULL REFERENCES content_articles(id),
      country TEXT NOT NULL,
      reason TEXT NOT NULL,
      issues TEXT DEFAULT '[]',
      priority TEXT NOT NULL DEFAULT 'medium',
      status TEXT NOT NULL DEFAULT 'pending',
      assigned_at TEXT NOT NULL,
      completed_at TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_gsc_metrics_country_date ON search_console_metrics(country, date);
    CREATE INDEX IF NOT EXISTS idx_visitor_metrics_country ON visitor_metrics(country, date);
    CREATE INDEX IF NOT EXISTS idx_content_scores_article ON content_performance_scores(article_id);
    CREATE INDEX IF NOT EXISTS idx_growth_opportunities_status ON growth_opportunities(status);
    CREATE INDEX IF NOT EXISTS idx_conversion_events_country ON conversion_events(country);
    CREATE INDEX IF NOT EXISTS idx_refresh_tasks_status ON content_refresh_tasks(status);
  `);

  // Add new columns to existing tables (idempotent)
  const migrations = [
    'ALTER TABLE ai_agents ADD COLUMN objective TEXT',
    'ALTER TABLE ai_agents ADD COLUMN system_prompt TEXT',
    'ALTER TABLE research_sources ADD COLUMN topic TEXT',
    'ALTER TABLE country_ai_config ADD COLUMN articles_per_day INTEGER NOT NULL DEFAULT 1',
    'ALTER TABLE country_ai_config ADD COLUMN schedule_config TEXT DEFAULT "{}"',
    'ALTER TABLE seo_metadata ADD COLUMN schema_organization TEXT',
    'ALTER TABLE seo_metadata ADD COLUMN schema_software TEXT',
    'ALTER TABLE seo_metadata ADD COLUMN open_graph TEXT',
    'ALTER TABLE seo_metadata ADD COLUMN twitter_card TEXT',
    'ALTER TABLE seo_metadata ADD COLUMN canonical_url TEXT',
    'ALTER TABLE seo_metadata ADD COLUMN hreflang_tags TEXT',
    'ALTER TABLE content_articles ADD COLUMN hero_image_url TEXT',
    'ALTER TABLE content_articles ADD COLUMN hero_image_alt TEXT',
    'ALTER TABLE content_articles ADD COLUMN hero_image_credit TEXT',
    'ALTER TABLE content_articles ADD COLUMN source_topic TEXT',
    `CREATE TABLE IF NOT EXISTS ai_batch_runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      status TEXT NOT NULL DEFAULT 'pending',
      phase TEXT NOT NULL DEFAULT 'prepare',
      config TEXT,
      prepared_countries TEXT NOT NULL DEFAULT '[]',
      total_jobs INTEGER NOT NULL DEFAULT 0,
      completed_jobs INTEGER NOT NULL DEFAULT 0,
      succeeded_jobs INTEGER NOT NULL DEFAULT 0,
      failed_jobs INTEGER NOT NULL DEFAULT 0,
      error TEXT,
      created_at TEXT NOT NULL,
      started_at TEXT,
      completed_at TEXT
    )`,
    'ALTER TABLE ai_jobs ADD COLUMN batch_id INTEGER REFERENCES ai_batch_runs(id)',
    'ALTER TABLE ai_jobs ADD COLUMN idempotency_key TEXT',
    'CREATE UNIQUE INDEX IF NOT EXISTS idx_content_articles_source_topic ON content_articles(country_code, source_topic) WHERE source_topic IS NOT NULL',
    'CREATE INDEX IF NOT EXISTS idx_ai_jobs_batch_id ON ai_jobs(batch_id)',
    'CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_jobs_idempotency ON ai_jobs(batch_id, idempotency_key) WHERE idempotency_key IS NOT NULL',
  ];

  for (const sql of migrations) {
    try { db.exec(sql); } catch { /* column already exists */ }
  }

  db.close();
}
