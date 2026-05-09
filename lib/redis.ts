import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!redisUrl || !redisToken) {
  console.warn(
    "Upstash Redis environment variables are missing. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local",
  );
}

export const redis = new Redis({
  url: redisUrl || "",
  token: redisToken || "",
});
