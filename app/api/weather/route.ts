// app/api/weather/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });
  if (!API_URL || !API_KEY)
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });

  const url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json().catch(() => null);

  if (!res.ok) return NextResponse.json({ error: "API request failed", data }, { status: res.status });

  return NextResponse.json(data);
}