import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { VibeVote } from "@/types/database";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("vibe_votes")
      .select("*")
      .order("vibe_type", { ascending: true });

    if (error) {
      console.error("Error fetching vibes:", error);
      return NextResponse.json(
        { error: "Failed to fetch vibes" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: (data || []) as VibeVote[] });
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
    const { vibe_type } = body;

    if (!vibe_type || typeof vibe_type !== "string") {
      return NextResponse.json(
        { error: "vibe_type is required" },
        { status: 400 },
      );
    }

    const { data: existing, error: fetchError } = await supabase
      .from("vibe_votes")
      .select("*")
      .eq("vibe_type", vibe_type)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching vibe:", fetchError);
      return NextResponse.json(
        { error: "Failed to update vibe" },
        { status: 500 },
      );
    }

    if (existing) {
      const { data, error } = await supabase
        .from("vibe_votes")
        .update({ count: existing.count + 1 })
        .eq("vibe_type", vibe_type)
        .select()
        .single();

      if (error) {
        console.error("Error updating vibe:", error);
        return NextResponse.json(
          { error: "Failed to update vibe" },
          { status: 500 },
        );
      }

      return NextResponse.json({ data: data as VibeVote });
    } else {
      const { data, error } = await supabase
        .from("vibe_votes")
        .insert([{ vibe_type, count: 1 }])
        .select()
        .single();

      if (error) {
        console.error("Error creating vibe entry:", error);
        return NextResponse.json(
          { error: "Failed to create vibe" },
          { status: 500 },
        );
      }

      return NextResponse.json({ data: data as VibeVote }, { status: 201 });
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
