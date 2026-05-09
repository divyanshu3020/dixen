import { redis } from "@/lib/redis";
import Logger from "./logger";

const log = Logger.create("CACHE");

/**
 * Standard Cache-Aside pattern
 */
export async function getOrSetCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl = 3600,
): Promise<T> {
  log.info(`getOrSetCache called for key: ${key}`);
  try {
    const cached = await redis.get<T>(key);
    if (cached !== null && cached !== undefined) {
      log.info(`Cache HIT for key: ${key}`);
      return cached;
    }
  } catch (err) {
    log.error(`Redis get error for key ${key}:`, err);
  }

  log.info(`Cache MISS for key: ${key}. Fetching fresh data...`);
  const freshData = await fetchFn();

  try {
    await redis.set(key, freshData, { ex: ttl });
    log.info(`Cache updated for key: ${key} (TTL: ${ttl}s)`);
  } catch (err) {
    log.error(`Redis set error for key ${key}:`, err);
  }

  return freshData;
}

/**
 * Stale-While-Revalidate pattern
 * Returns cached data immediately if available, and refreshes in background if stale.
 */
export async function getOrSetCacheSWR<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl = 86400, // Hard expiry (1 day)
  revalidateInterval = 300, // Soft expiry (5 mins)
): Promise<T> {
  type SWRContainer<T> = {
    data: T;
    timestamp: number;
  };

  log.info(`getOrSetCacheSWR called for key: ${key}`);
  try {
    const cached = await redis.get<SWRContainer<T>>(key);
    const now = Date.now();

    if (cached !== null && cached !== undefined) {
      const isStale = now - cached.timestamp > revalidateInterval * 1000;
      
      if (isStale) {
        log.info(`Cache STALE for key: ${key}. Triggering background refresh...`);
        // Trigger background refresh
        fetchFn()
          .then((freshData) => {
            redis.set(
              key,
              { data: freshData, timestamp: Date.now() },
              { ex: ttl },
            );
            log.info(`SWR Background refresh SUCCESS for key: ${key}`);
          })
          .catch((err) =>
            log.error(`SWR revalidation failed for ${key}:`, err),
          );
      } else {
        log.info(`Cache FRESH for key: ${key}`);
      }
      
      return cached.data;
    }
  } catch (err) {
    log.error(`Redis SWR get error for key ${key}:`, err);
  }

  log.info(`Cache MISS for key: ${key}. Fetching fresh data...`);
  const freshData = await fetchFn();
  
  try {
    await redis.set(
      key,
      { data: freshData, timestamp: Date.now() },
      { ex: ttl },
    );
    log.info(`Cache seeded for key: ${key}`);
  } catch (err) {
    log.error(`Redis SWR set error for key ${key}:`, err);
  }

  return freshData;
}

/**
 * Invalidate a cache key
 */
export async function invalidateCache(key: string): Promise<void> {
  log.info(`Invalidating cache for key: ${key}`);
  try {
    await redis.del(key);
    log.info(`Successfully invalidated key: ${key}`);
  } catch (err) {
    log.error(`Redis delete error for key ${key}:`, err);
  }
}
