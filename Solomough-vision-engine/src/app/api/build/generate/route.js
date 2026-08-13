// src/app/api/build/generate/route.js
import { NextResponse } from "next/server";
import { askClaude } from "../../../../lib/aiService";

export async function POST(req) {
  try {
    const { stack, module: moduleName } = await req.json();
    const stackList = Array.isArray(stack) ? stack.join(", ") : String(stack || "Next.js");

    const system = `You are an expert frontend engineer. Generate clean, working, production-quality code for the requested component. Follow the conventions of the given stack exactly.`;

    const prompt = `Stack: ${stackList}
Component/module to generate: "${moduleName}"

Write the complete file for this component. Use Tailwind CSS for styling if the stack includes it. Return ONLY the code — no explanation, no markdown code fences, no commentary before or after.`;

    const raw = await askClaude({ system, prompt, maxTokens: 1500 });
    const code = raw.replace(/^```[a-z]*\n?/i, "").replace(/```$/i, "").trim();

    return NextResponse.json({ success: true, code });
  } catch (error) {
    console.error("Build Error:", error);
    return NextResponse.json(
      { message: "Code generation failed: " + error.message },
      { status: 500 }
    );
  }
}
