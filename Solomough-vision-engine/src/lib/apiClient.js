// src/lib/apiClient.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''; // e.g. http://localhost:5000

async function postJson(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {})
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error (${res.status}): ${text}`);
  }
  return res.json();
}

export async function postStrategy(vision) {
  return postJson('/api/strategy/generate', { vision });
}

export async function postGenerateCode(stack, moduleName) {
  return postJson('/api/build/generate', { stack, module: moduleName });
}

export async function postMarketingPlan(projectName, options = {}) {
  return postJson('/api/marketing/plan', { projectName, ...options });
}

export async function postTutorAssist(step) {
  return postJson('/api/tutor/assist', { step });
}
