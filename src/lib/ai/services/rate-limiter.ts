interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: Number(process.env.DEEPSEEK_RATE_LIMIT ?? 30),
  windowMs: 60_000,
};

export function checkRateLimit(
  key = 'deepseek',
  config: RateLimitConfig = DEFAULT_CONFIG
): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = store.get(key) ?? { timestamps: [] };

  entry.timestamps = entry.timestamps.filter((t) => now - t < config.windowMs);

  if (entry.timestamps.length >= config.maxRequests) {
    const oldest = entry.timestamps[0];
    const retryAfterMs = config.windowMs - (now - oldest);
    return { allowed: false, retryAfterMs };
  }

  entry.timestamps.push(now);
  store.set(key, entry);
  return { allowed: true, retryAfterMs: 0 };
}

export async function waitForRateLimit(key = 'deepseek'): Promise<void> {
  const { allowed, retryAfterMs } = checkRateLimit(key);
  if (!allowed) {
    await new Promise((resolve) => setTimeout(resolve, retryAfterMs));
    return waitForRateLimit(key);
  }
}
