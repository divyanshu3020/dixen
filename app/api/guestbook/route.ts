import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { GuestbookEntry } from "@/types/database";
import { getOrSetCache, invalidateCache } from "@/utils/cache";
import Logger from "@/utils/logger";

const log = Logger.create("API:GUESTBOOK");
const CACHE_KEY = "portfolio:guestbook";

export async function GET() {
  log.info("GET request received");
  try {
    const fetchFromDB = async () => {
      log.info("Fetching guestbook entries from Supabase...");
      const { data, error } = await supabase
        .from("guestbook_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        log.error("Supabase error fetching guestbook:", error);
        throw error;
      }
      log.info(`Successfully fetched ${data?.length || 0} entries from Supabase`);
      return (data || []) as GuestbookEntry[];
    };

    const data = await getOrSetCache(CACHE_KEY, fetchFromDB, 3600);
    return NextResponse.json({ data });
  } catch (err) {
    console.error("Unexpected error in GET /api/guestbook:", err);
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
    const { name, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      log.warn("Missing or invalid name in request body");
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      log.warn("Missing or invalid message in request body");
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    log.info(`Saving new guestbook entry from ${name.trim()}...`);
    const { data, error } = await supabase
      .from("guestbook_entries")
      .insert([
        {
          name: name.trim(),
          message: message.trim(),
          liked: false,
        },
      ])
      .select();

    if (error) {
      log.error("Error inserting entry into Supabase:", error);
      return NextResponse.json(
        { error: "Failed to post entry" },
        { status: 500 },
      );
    }

    log.info("Successfully posted to guestbook. ID:", (data as any)?.[0]?.id);

    // Invalidate cache on new entry
    await invalidateCache(CACHE_KEY);

    return NextResponse.json(
      { data: data?.[0] as GuestbookEntry },
      { status: 201 },
    );
  } catch (err) {
    log.error("Unexpected error in POST /api/guestbook:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
