// src/app/api/tutor/assist/route.js
import { NextResponse } from "next/server";
import { askClaude } from "../../../../lib/aiService";

const STEP_CONTEXT = {
  setup: "installing dependencies and configuring environment variables",
  build: "generating and wiring up individual components/modules",
  deploy: "deploying to Vercel and connecting environment variables",
};

export async function POST(req) {
  try {
    const { step, question } = await req.json();

    const system = `You are a friendly, encouraging coding tutor helping a developer who is learning fast. Answer in 2-4 short sentences, concrete and actionable, no fluff.`;

    const prompt = question
      ? question
      : `Give a short, practical tip for the "${step || "setup"}" stage of this project: ${
          STEP_CONTEXT[step] || "building and shipping their app"
        }.`;

    const message = await askClaude({ system, prompt, maxTokens: 300 });
    return NextResponse.json({ message });
  } catch (error) {
    console.error("Tutor Error:", error);
    return NextResponse.json(
      { message: "Tutor is temporarily unavailable: " + error.message },
      { status: 500 }
    );
  }
}
