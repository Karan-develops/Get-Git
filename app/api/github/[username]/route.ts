import { NextResponse } from "next/server";
import { fetchGitHubData, fetchUserEvents } from "@/lib/github-api";

export async function GET(
  request: Request,
  { params: paramsPromise }: { params: Promise<{ username: string }> }
) {
  const params = await paramsPromise;
  const username = params.username;

  try {
    const [userData, events] = await Promise.all([
      fetchGitHubData(username),
      fetchUserEvents(username),
    ]);

    return NextResponse.json({ userData, events });
  } catch (error) {
    console.log("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
