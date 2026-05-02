import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { PortfolioStats } from "@/types/database";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("portfolio_stats")
      .select("likes")
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching likes:", error);
      return NextResponse.json(
        { error: "Failed to fetch likes" },
        { status: 500 },
      );
    }

    const likes = data?.likes ?? 0;
    return NextResponse.json({ likes });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    // Try to upsert: increment if exists, insert if not
    // Use raw SQL for atomic increment (single query, no race conditions)
    const { data, error } = await supabase.rpc("increment_likes");

    if (error) {
      console.error("Error incrementing likes:", error);
      // Fallback to read-then-update for compatibility
      const { data: existing, error: fetchError } = await supabase
        .from("portfolio_stats")
        .select("likes, id")
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        return NextResponse.json(
          { error: "Failed to increment likes" },
          { status: 500 },
        );
      }

      const newLikes = (existing?.likes ?? 0) + 1;
      const statsId = existing?.id;

      if (statsId) {
        const { data: updated, error: updateError } = await supabase
          .from("portfolio_stats")
          .update({ likes: newLikes })
          .eq("id", statsId)
          .select()
          .single();

        if (updateError) {
          return NextResponse.json(
            { error: "Failed to increment likes" },
            { status: 500 },
          );
        }

        return NextResponse.json(
          { likes: (updated as PortfolioStats).likes },
          { status: 200 },
        );
      } else {
        const { data: inserted, error: insertError } = await supabase
          .from("portfolio_stats")
          .insert([{ likes: 1 }])
          .select()
          .single();

        if (insertError) {
          return NextResponse.json(
            { error: "Failed to increment likes" },
            { status: 500 },
          );
        }

        return NextResponse.json(
          { likes: (inserted as PortfolioStats).likes },
          { status: 201 },
        );
      }
    }

    // If rpc returned a primitive (number), use it. If it returned an object, use data.likes.
    const likesValue = typeof data === "object" && data !== null ? data.likes : data;
    
    return NextResponse.json(
      { likes: likesValue ?? 0 },
      { status: 200 },
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
