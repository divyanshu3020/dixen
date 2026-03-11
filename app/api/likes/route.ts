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
    const { data: existing, error: fetchError } = await supabase
      .from("portfolio_stats")
      .select("likes, id")
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching current likes:", fetchError);
      return NextResponse.json(
        { error: "Failed to increment likes" },
        { status: 500 },
      );
    }

    const newLikes = (existing?.likes ?? 0) + 1;
    const statsId = existing?.id;

    if (statsId) {
      const { data, error } = await supabase
        .from("portfolio_stats")
        .update({ likes: newLikes })
        .eq("id", statsId)
        .select()
        .single();

      if (error) {
        console.error("Error updating likes:", error);
        return NextResponse.json(
          { error: "Failed to increment likes" },
          { status: 500 },
        );
      }

      return NextResponse.json(
        { likes: (data as PortfolioStats).likes },
        { status: 200 },
      );
    } else {
      const { data, error } = await supabase
        .from("portfolio_stats")
        .insert([{ likes: newLikes }])
        .select()
        .single();

      if (error) {
        console.error("Error creating stats entry:", error);
        return NextResponse.json(
          { error: "Failed to increment likes" },
          { status: 500 },
        );
      }

      return NextResponse.json(
        { likes: (data as PortfolioStats).likes },
        { status: 201 },
      );
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
