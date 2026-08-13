export async function GET() {
  const content = `# Wanderly

> Wanderly is a travel platform providing destination guides, travel inspiration, and practical travel information.

## Main Pages

- Home: https://wanderly-a-travel-agency.vercel.app/
- Blog: https://wanderly-a-travel-agency.vercel.app/blog
- About: https://wanderly-a-travel-agency.vercel.app/about
- Contact: https://wanderly-a-travel-agency.vercel.app/contact

## Travel Blog

Wanderly publishes travel guides, destination information, travel tips, and practical resources to help travelers research destinations and plan trips.

## Content

The Wanderly blog contains travel articles covering destinations, attractions, travel tips, itineraries, and trip-planning information.

## Content Management

Wanderly uses Sanity as its headless CMS for managing and publishing travel content.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}