import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { SprayWall } from "@/types/database";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("spray_walls")
      .select("canvas_data")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching spray wall:", error);
      return NextResponse.json(
        { error: "Failed to fetch spray wall" },
        { status: 500 },
      );
    }

    return NextResponse.json({ canvas_data: data?.canvas_data || null });
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
    const { canvas_data } = body;

    if (!canvas_data || typeof canvas_data !== "string") {
      return NextResponse.json(
        { error: "canvas_data is required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("spray_walls")
      .insert([{ canvas_data }])
      .select()
      .single();

    if (error) {
      console.error("Error saving spray wall:", error);
      return NextResponse.json(
        { error: "Failed to save spray wall" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: data as SprayWall }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
