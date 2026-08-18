import { NextResponse } from "next/server";
import { gemini } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      destination,
      days,
      travelers,
      budget,
      travelStyle,
      interests,
    } = body;

    // Validate required fields
    if (!destination || !days) {
      return NextResponse.json(
        {
          error: "Destination and number of days are required.",
        },
        { status: 400 }
      );
    }

    const prompt = `
You are Wanderly's expert AI travel planner.

Create a practical and personalized travel itinerary.

Destination: ${destination}
Number of days: ${days}
Number of travelers: ${travelers || 1}
Budget: ${budget || "Not specified"}
Travel style: ${travelStyle || "Relaxed"}
Interests: ${
      interests?.length
        ? interests.join(", ")
        : "General sightseeing"
    }

Create a realistic day-by-day itinerary.

For each day provide:
- Day title
- Morning activities
- Afternoon activities
- Evening activities
- Places to visit
- Food recommendations
- Estimated daily cost

Also provide:
- Overall trip summary
- Estimated total budget
- Travel tips

Important:
- Do not create an unrealistic schedule.
- Do not put too many activities in one day.
- Consider reasonable travel time between places.
- Prices are estimates.
- Do not claim live availability or exact prices.
- If something is uncertain, mention that the traveler should verify it.
- Keep the itinerary practical and easy to follow.
- Consider the selected budget and travel style.

Return ONLY valid JSON using this exact structure:

{
  "tripTitle": "string",
  "destination": "string",
  "summary": "string",
  "estimatedBudget": "string",
  "days": [
    {
      "day": 1,
      "title": "string",
      "morning": "string",
      "afternoon": "string",
      "evening": "string",
      "places": ["string"],
      "food": ["string"],
      "estimatedCost": "string"
    }
  ],
  "travelTips": ["string"]
}
`;

    /*
     * Try the primary model first.
     * If Gemini returns a temporary 503/429 error,
     * retry and then try the fallback model.
     */
    const models = [
      "gemini-3.5-flash",
      "gemini-3.5-flash-lite",
    ];

    let response;
    let lastError: unknown;

    for (const model of models) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          console.log(
            `Trying Gemini model: ${model} | Attempt: ${
              attempt + 1
            }`
          );

          response = await gemini.models.generateContent({
            model,
            contents: prompt,
          });

          console.log(
            `Gemini request successful using ${model}`
          );

          break;
        } catch (error) {
          lastError = error;

          const status =
            typeof error === "object" &&
            error !== null &&
            "status" in error
              ? (error as { status?: number }).status
              : undefined;

          console.error(
            `Gemini error - ${model} - attempt ${
              attempt + 1
            }:`,
            error
          );

          /*
           * 503 = model temporarily unavailable
           * 429 = rate limit / temporary overload
           *
           * Other errors should not be retried because
           * they usually indicate a configuration/request problem.
           */
          if (status !== 503 && status !== 429) {
            throw error;
          }

          // Wait before retrying
          if (attempt < 1) {
            console.log(
              `Retrying ${model} in 2 seconds...`
            );

            await new Promise((resolve) =>
              setTimeout(resolve, 2000)
            );
          }
        }
      }

      // Stop if a model succeeded
      if (response) {
        break;
      }

      console.log(
        `${model} unavailable. Trying next model...`
      );
    }

    // Both models failed
    if (!response) {
      console.error(
        "All Gemini models failed:",
        lastError
      );

      return NextResponse.json(
        {
          error:
            "AI service is temporarily busy. Please try again in a few moments.",
        },
        { status: 503 }
      );
    }

    // Get Gemini response text
    const text = response.text;

    if (!text) {
      return NextResponse.json(
        {
          error: "Gemini returned an empty response.",
        },
        { status: 500 }
      );
    }

    // Remove Markdown code fences if Gemini adds them
    const cleanedText = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let itinerary;

    try {
      itinerary = JSON.parse(cleanedText);
    } catch (error) {
      console.error(
        "Invalid Gemini JSON:",
        text
      );

      console.error(
        "JSON parse error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Gemini returned an invalid itinerary. Please try again.",
        },
        { status: 500 }
      );
    }

    // Successfully return itinerary
    return NextResponse.json({
      success: true,
      itinerary,
    });
  } catch (error) {
    console.error(
      "AI itinerary error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to generate itinerary.",
      },
      { status: 500 }
    );
  }
}