/** Parse admin/cron articles-per-country (1–5). */
export function parseArticlesPerCountry(value: unknown): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(Math.floor(n), 5));
}
