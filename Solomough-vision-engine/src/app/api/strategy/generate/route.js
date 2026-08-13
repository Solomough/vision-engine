// src/app/api/strategy/generate/route.js
import { NextResponse } from "next/server";
import { askClaudeForJSON } from "../../../../lib/aiService";

export async function POST(req) {
  try {
    const { vision } = await req.json();

    const answers = Object.entries(vision || {})
      .map(([question, answer]) => `Q: ${question}\nA: ${answer}`)
      .join("\n\n");

    const system = `You are a senior software architect helping a developer turn a project idea into a concrete, actionable build plan. Be specific and realistic — recommend real, current tools, not generic filler.`;

    const prompt = `Here are the founder's answers about their project:

${answers}

Return a JSON object with exactly these fields:
{
  "projectName": string,
  "summary": string (2-3 sentences describing the project back to them, sharp and specific),
  "stack": string (a short "X · Y · Z" formatted list of the recommended technologies),
  "style": string (a short design-style description matching what they asked for),
  "recommendedStack": string[] (3-6 individual technology names),
  "folderStructure": { "frontend": string[], "backend": string[] } (realistic folder/module paths for this specific project, not a generic template),
  "setupGuide": string[] (4-6 concrete, ordered setup/deploy steps specific to the chosen stack)
}`;

    const data = await askClaudeForJSON({ system, prompt, maxTokens: 1200 });
    return NextResponse.json({ message: "Strategy generated successfully", data });
  } catch (error) {
    console.error("Strategy Error:", error);
    return NextResponse.json(
      { message: "Strategy generation failed: " + error.message },
      { status: 500 }
    );
  }
}
