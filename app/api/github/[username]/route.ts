import { NextResponse } from "next/server";
import { fetchGitHubData, fetchUserEvents } from "@/lib/github-api";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username;

  try {
    const [userData, events] = await Promise.all([
      fetchGitHubData(username),
      fetchUserEvents(username),
    ]);

    return NextResponse.json({ userData, events });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
