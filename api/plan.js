// Vercel serverless function: POST /api/plan
// Gen AI service: Google Gemini API (set GEMINI_API_KEY in Vercel env vars)
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: "GEMINI_API_KEY not set" });
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  const { type, date, weeks, guests, budget, city, prefs } = req.body || {};
  if (!type || !guests || !budget) return res.status(400).json({ error: "Missing fields" });

  const prompt = `You are an expert Indian event planner. Plan a ${type} for ${guests} guests in ${city || "India"} with a total budget of INR ${budget}. Event date: ${date || "not fixed"} (about ${weeks} weeks away). Host preferences: ${prefs || "none"}.
Return ONLY JSON with this exact shape:
{"summary":"2 sentence overview",
"budget":[{"category":"Venue","percent":30,"tip":"short money-saving tip"}],
"timeline":[{"when":"12 weeks before","tasks":["task","task"]}],
"vendors":[{"name":"Caterer","notes":"what to ask / book-by timing"}],
"ideas":{"themes":["..."],"menu":["..."],"activities":["..."]}}
Rules: 6-8 budget categories with percents summing to exactly 100; 5-7 timeline stages scaled to the ${weeks} weeks available (end with "Event day"); 6-8 vendors; 3 items per ideas list. Tailor everything to the preferences and event type.`;

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json", temperature: 0.8 },
        }),
      }
    );
    const data = await r.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return res.status(502).json({ error: "Empty AI response" });
    res.status(200).json(JSON.parse(text.replace(/```json|```/g, "").trim()));
  } catch (e) {
    res.status(502).json({ error: "AI request failed" });
  }
}