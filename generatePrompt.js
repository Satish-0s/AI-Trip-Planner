export function generatePrompt({ location, days, budget, travelCompanions }) {
  const companions = String(travelCompanions)
    .replace(/people?/i, "") // remove "people" or "person"
    .trim();

  return `
Plan a trip to ${location} for ${days} days with a ${budget} budget and traveling with ${companions} people.

Return the result in this strict JSON format:

{
  "days": [
    {
      "day": 1,
      "itinerary": [
        {
          "time": "9:00 AM",
          "place": "Place Name",
          "description": "Short description",
          "image": "https://upload.wikimedia.org/... or https://unsplash.com/...",
          "coordinates": { "lat": 12.34, "lng": 56.78 }
        }
      ],
      "hotel": {
        "name": "Hotel Name",
        "location": "Short description or landmark",
        "price": "$100",
        "image": "https://upload.wikimedia.org/... or https://unsplash.com/..."
      }
    }
  ]
}

All image URLs must be real, public, and from Wikipedia Commons or Unsplash ONLY.
`.trim();
}
