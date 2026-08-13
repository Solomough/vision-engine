// src/lib/aiService.js
// Server-only helper — imported exclusively by route handlers under src/app/api/.
// ANTHROPIC_API_KEY is read here (no NEXT_PUBLIC_ prefix), so it is NEVER
// exposed to the browser bundle.

import Anthropic from "@anthropic-ai/sdk";

let client = null;

function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it in your Vercel project's Environment Variables (or .env.local for local dev)."
    );
  }
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";

export async function askClaude({ system, prompt, maxTokens = 1024 }) {
  const anthropic = getClient();

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: prompt }],
  });

  return response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

export async function askClaudeForJSON({ system, prompt, maxTokens = 1024 }) {
  const jsonSystem = `${system}\n\nRespond with ONLY valid JSON. No preamble, no markdown code fences, no explanation before or after the JSON.`;

  const raw = await askClaude({ system: jsonSystem, prompt, maxTokens });
  const cleaned = raw.replace(/```json\s*|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(
      `AI returned invalid JSON. Raw response:\n${raw}\n\nParse error: ${err.message}`
    );
  }
}
