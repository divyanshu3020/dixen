import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { GuestbookEntry } from "@/types/database";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("guestbook_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching guestbook:", error);
      return NextResponse.json(
        { error: "Failed to fetch entries" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: (data || []) as GuestbookEntry[] });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

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
      console.error("Error inserting entry:", error);
      return NextResponse.json(
        { error: "Failed to post entry" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { data: data?.[0] as GuestbookEntry },
      { status: 201 },
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
