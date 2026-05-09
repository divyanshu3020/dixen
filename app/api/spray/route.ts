import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { SprayWall } from "@/types/database";
import { getOrSetCacheSWR, invalidateCache } from "@/utils/cache";
import Logger from "@/utils/logger";

const log = Logger.create("API:SPRAY");
const CACHE_KEY = "portfolio:spray_walls";

export async function GET() {
  log.info("GET request received");
  try {
    const fetchFromDB = async () => {
      log.info("Fetching spray walls from Supabase...");
      const { data, error } = await supabase
        .from("spray_walls")
        .select("id, canvas_data, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        log.error("Supabase error fetching spray walls:", error);
        throw error;
      }
      log.info(`Successfully fetched ${data?.length || 0} snapshots from Supabase`);
      return data || [];
    };

    const data = await getOrSetCacheSWR(CACHE_KEY, fetchFromDB, 86400, 300);

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Unexpected error in GET /api/spray:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  log.info("POST request received");
  try {
    const body = await request.json();
    const { canvas_data } = body;

    if (!canvas_data || typeof canvas_data !== "string") {
      log.warn("Missing canvas_data in request body");
      return NextResponse.json(
        { error: "canvas_data is required" },
        { status: 400 },
      );
    }

    log.info("Saving new spray wall snapshot to Supabase...");
    const { data, error } = await supabase
      .from("spray_walls")
      .insert([{ canvas_data }])
      .select()
      .single();

    if (error) {
      log.error("Error saving spray wall to Supabase:", error);
      return NextResponse.json(
        { error: "Failed to save spray wall" },
        { status: 500 },
      );
    }

    log.info("Successfully saved spray wall to Supabase. ID:", (data as any).id);

    // Invalidate cache on new entry
    await invalidateCache(CACHE_KEY);

    return NextResponse.json({ data: data as SprayWall }, { status: 201 });
  } catch (err) {
    log.error("Unexpected error in POST /api/spray:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
