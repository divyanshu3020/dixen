import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { PortfolioStats } from "@/types/database";
import { redis } from "@/lib/redis";
import { getOrSetCache } from "@/utils/cache";
import Logger from "@/utils/logger";

const log = Logger.create("API:LIKES");
const CACHE_KEY = "portfolio:likes";

export async function GET() {
  log.info("GET request received");
  try {
    const fetchFromDB = async () => {
      log.info("Fetching likes from Supabase...");
      const { data, error } = await supabase
        .from("portfolio_stats")
        .select("likes")
        .single();

      if (error && error.code !== "PGRST116") {
        log.error("Supabase error fetching likes:", error);
        throw error;
      }
      log.info(`Successfully fetched likes from Supabase: ${data?.likes ?? 0}`);
      return data?.likes ?? 0;
    };

    const likes = await getOrSetCache(CACHE_KEY, fetchFromDB, 3600);
    return NextResponse.json({ likes });
  } catch (err) {
    console.error("Unexpected error in GET /api/likes:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST() {
  log.info("POST request received");
  try {
    // 1. Atomically increment in Redis for instant feedback
    const newLikes = await redis.incr(CACHE_KEY);
    log.info(`Redis incremented. New value: ${newLikes}`);

    // 2. Update Supabase in background (or concurrently)
    log.info("Syncing likes to Supabase...");
    const { data, error } = await supabase.rpc("increment_likes");

    if (error) {
      if (error.code !== "PGRST202") {
        log.error("Error incrementing likes in Supabase RPC:", error);
      }
      log.info("Falling back to manual Supabase update...");
      // Fallback: update Supabase manually if RPC fails
      const { data: existing } = await supabase
        .from("portfolio_stats")
        .select("likes, id")
        .single();
      
      const statsId = existing?.id;
      if (statsId) {
        log.info(`Updating existing record ${statsId}...`);
        await supabase
          .from("portfolio_stats")
          .update({ likes: newLikes })
          .eq("id", statsId);
      } else {
        log.info("Inserting new stats record...");
        await supabase
          .from("portfolio_stats")
          .insert([{ likes: newLikes }]);
      }
    } else {
      log.info("Supabase RPC sync successful");
    }

    return NextResponse.json(
      { likes: newLikes },
      { status: 200 },
    );
  } catch (err) {
    log.error("Unexpected error in POST /api/likes:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
