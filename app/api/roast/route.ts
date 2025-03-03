import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { userInfo } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a savage roast master, and your job is to roast this GitHub user mercilessly based on their profile. No sugarcoating, no holding back—tear them apart with brutal humor, sarcasm, and wit. Here is their profile info:
    ${JSON.stringify(userInfo, null, 2)}
    Destroy them with words. Make them regret ever sharing their profile. Use humor, roasts, and maybe a little bit of dark truth. Keep it sharp, funny, and absolutely ruthless. You can use emojis too, but do not make it feel lighthearted. Also, avoid unnecessary placeholders like [object] [object], and handle the response properly. 
    Now, do what you do best—ROAST! 🔥🔥🔥`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ roast: text });
  } catch (error) {
    console.error("Error in Gemini roast API:", error);
    return NextResponse.json(
      { error: "Failed to generate roast" },
      { status: 500 }
    );
  }
}
