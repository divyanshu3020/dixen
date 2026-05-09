import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { VibeVote } from "@/types/database";
import { getOrSetCache, invalidateCache } from "@/utils/cache";
import Logger from "@/utils/logger";

const log = Logger.create("API:VIBES");
const CACHE_KEY = "portfolio:vibes";

export async function GET() {
  log.info("GET request received");
  try {
    const fetchFromDB = async () => {
      log.info("Fetching vibe counts from Supabase...");
      const { data, error } = await supabase
        .from("vibe_votes")
        .select("*")
        .order("vibe_type", { ascending: true });

      if (error) {
        log.error("Supabase error fetching vibes:", error);
        throw error;
      }
      log.info(`Successfully fetched ${data?.length || 0} vibe types from Supabase`);
      return (data || []) as VibeVote[];
    };

    const data = await getOrSetCache(CACHE_KEY, fetchFromDB, 3600);
    return NextResponse.json({ data });
  } catch (err) {
    console.error("Unexpected error in GET /api/vibes:", err);
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
    const { vibe_type } = body;

    if (!vibe_type || typeof vibe_type !== "string") {
      log.warn("Missing or invalid vibe_type in request body");
      return NextResponse.json(
        { error: "vibe_type is required" },
        { status: 400 },
      );
    }

    log.info(`Processing vibe: ${vibe_type}`);
    const { data: existing, error: fetchError } = await supabase
      .from("vibe_votes")
      .select("*")
      .eq("vibe_type", vibe_type)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      log.error(`Error fetching existing vibe ${vibe_type}:`, fetchError);
      return NextResponse.json(
        { error: "Failed to update vibe" },
        { status: 500 },
      );
    }

    if (existing) {
      log.info(`Vibe ${vibe_type} exists. Incrementing count to ${existing.count + 1}...`);
      const { data, error } = await supabase
        .from("vibe_votes")
        .update({ count: existing.count + 1 })
        .eq("vibe_type", vibe_type)
        .select()
        .single();

      if (error) {
        log.error(`Error updating vibe ${vibe_type}:`, error);
        return NextResponse.json(
          { error: "Failed to update vibe" },
          { status: 500 },
        );
      }

      log.info(`Vibe ${vibe_type} updated successfully`);
      await invalidateCache(CACHE_KEY);
      return NextResponse.json({ data: data as VibeVote });
    } else {
      log.info(`Vibe ${vibe_type} does not exist. Creating new entry...`);
      const { data, error } = await supabase
        .from("vibe_votes")
        .insert([{ vibe_type, count: 1 }])
        .select()
        .single();

      if (error) {
        log.error(`Error creating vibe entry ${vibe_type}:`, error);
        return NextResponse.json(
          { error: "Failed to create vibe" },
          { status: 500 },
        );
      }

      log.info(`Vibe ${vibe_type} created successfully`);
      await invalidateCache(CACHE_KEY);
      return NextResponse.json({ data: data as VibeVote }, { status: 201 });
    }
  } catch (err) {
    log.error("Unexpected error in POST /api/vibes:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
