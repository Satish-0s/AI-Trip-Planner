const GEMINI_API_KEY = "AIzaSyAA9sCf6ZT7ZvScHAZXtjBLFejcYCwbNgA"; // Use your own API key

// ✅ Extract JSON from Gemini's raw response text
function cleanGeminiJSON(rawText) {
  try {
    const match = rawText.match(/{[\s\S]*}/);
    if (match) return match[0].trim();
    throw new Error("No valid JSON block found.");
  } catch {
    throw new Error("Failed to extract JSON from Gemini response.");
  }
}

export async function getChatSession(userSelection) {
  const { location, days, budget, travelCompanions } = userSelection;

  const prompt = `
You are a travel assistant AI. Plan a detailed trip ONLY to ${location.label} for ${days} days with a ${budget} budget, traveling with ${travelCompanions}.

⚠️ Make sure all hotel names, coordinates, and descriptions are specific to "${location.label}" — DO NOT use hotels or landmarks from any other city.

Return your answer ONLY in the following strict JSON format:

{
  "hotels": [
    {
      "name": "Hotel Name",
      "description": "Short description",
      "pricePerNight": "$100",
      "coordinates": { "lat": 12.34, "lng": 56.78 },
      "image": "https://upload.wikimedia.org/...jpg"
    }
  ],
  "days": [
    {
      "day": 1,
      "itinerary": [
        {
          "time": "9:00 AM",
          "place": "Place Name",
          "description": "Short description",
          "image": "https://upload.wikimedia.org/...jpg",
          "coordinates": { "lat": 12.34, "lng": 56.78 }
        }
      ]
    }
  ]
}

📌 IMPORTANT RULES:
- Return **exactly 8 hotels** inside the "hotels" array. Not less.
- Use only real image URLs from Wikimedia Commons or Unsplash.
- Use real coordinates for hotels and places located in "${location.label}".
- All places and hotels MUST be in ${location.label}.
- The final JSON must be clean and parseable.

🚫 DO NOT include markdown, commentary, or explanations — ONLY return valid JSON.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096
          },
          safetySettings: [
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: 4 },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: 4 },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: 4 },
            { category: "HARM_CATEGORY_HARASSMENT", threshold: 4 }
          ]
        })
      }
    );

    const data = await response.json();
    const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      console.error("No response from Gemini:", data);
      throw new Error("Empty response from Gemini.");
    }

    const cleaned = cleanGeminiJSON(textResponse); // ✅ Extract JSON
    const parsed = JSON.parse(cleaned);             // ✅ Parse JSON
    return parsed;

  } catch (err) {
    console.error("Gemini fetch error:", err);
    throw err;
  }
}
