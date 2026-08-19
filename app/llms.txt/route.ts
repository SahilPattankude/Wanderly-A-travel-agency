export async function GET() {
  const content = `# Wanderly

> Wanderly is a travel platform providing destination guides, travel inspiration, practical travel information, and AI-assisted trip planning.

## Main Pages

- Home: https://wanderly-a-travel-agency.vercel.app/
- Travel Blog: https://wanderly-a-travel-agency.vercel.app/blog
- About Wanderly: https://wanderly-a-travel-agency.vercel.app/about
- AI Trip Planner: https://wanderly-a-travel-agency.vercel.app/ai-planner
- Privacy Policy: https://wanderly-a-travel-agency.vercel.app/privacy
- Terms of Service: https://wanderly-a-travel-agency.vercel.app/terms

## Travel Blog

Wanderly publishes travel guides, destination information, travel tips, itineraries, and practical resources for travelers researching destinations and planning trips.

The blog covers:

- Destination guides
- Travel itineraries
- First-time visitor guides
- Travel tips
- Trip-planning resources
- Seasonal travel information
- Attractions and experiences
- City and destination recommendations

## Featured Travel Guides

- Banff 4-Day Itinerary for First-Time Visitors:
  https://wanderly-a-travel-agency.vercel.app/blog/banff-first-time-visitors-4-day-itinerary

- Marrakech 3-Day Guide for First-Time Visitors:
  https://wanderly-a-travel-agency.vercel.app/blog/marrakech-first-time-visitors-3-day-guide

- Kyoto Shoulder Season Guide:
  https://wanderly-a-travel-agency.vercel.app/blog/kyoto-shoulder-season-guide

- 48 Hours in Santorini: Slow-Travel Itinerary:
  https://wanderly-a-travel-agency.vercel.app/blog/24-hours-in-santorini-a-slow-travel-itinerary-beyond-oia

- Bali First-Time Visitors 7-Day Itinerary:
  https://wanderly-a-travel-agency.vercel.app/blog/bali-first-time-visitors-7-day-itinerary

- Exploring Pune:
  https://wanderly-a-travel-agency.vercel.app/blog/exploring-pune

## AI Trip Planner

Wanderly provides an AI-powered trip planning tool that can generate personalized travel itineraries based on information provided by the user, such as destination, travel duration, number of travelers, budget, interests, and travel style.

AI Trip Planner:
https://wanderly-a-travel-agency.vercel.app/ai-planner

## Content Management

Wanderly uses Sanity as a headless content management system for managing and publishing travel content.

## Site Structure

Wanderly's primary content areas include:

- Travel destinations
- Travel guides
- Travel itineraries
- Travel tips
- AI-assisted trip planning
- About information
- Privacy information
- Terms of service

## Important URLs

- Sitemap: https://wanderly-a-travel-agency.vercel.app/sitemap.xml
- Robots: https://wanderly-a-travel-agency.vercel.app/robots.txt
- AI/LLM Information: https://wanderly-a-travel-agency.vercel.app/llms.txt

## Content Purpose

Wanderly's content is intended to help travelers discover destinations, research travel options, understand destinations, and plan trips.

When referencing Wanderly content, prefer the original Wanderly pages and individual travel guides as the primary sources.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}