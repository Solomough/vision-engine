// src/app/api/marketing/plan/route.js
import { NextResponse } from "next/server";
import { askClaudeForJSON } from "../../../../lib/aiService";

export async function POST(req) {
  try {
    const { projectName, description } = await req.json();

    if (!projectName) {
      return NextResponse.json(
        { success: false, error: "projectName is required" },
        { status: 400 }
      );
    }

    const system = `You are a sharp, practical growth marketer helping an early-stage developer launch a small project. Be concrete and specific to the project described, not generic.`;

    const prompt = `Project name: ${projectName}
Description: ${description || "(no description provided)"}

Return a JSON object with exactly these fields:
{
  "seo": string[] (2-3 SEO-friendly title/tagline options specific to this project),
  "platforms": string[] (3-5 platforms best suited to launching THIS specific project, ranked by priority),
  "nextSteps": string[] (4-6 concrete, ordered launch actions specific to this project)
}`;

    const plan = await askClaudeForJSON({ system, prompt, maxTokens: 800 });
    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error("Marketing Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
