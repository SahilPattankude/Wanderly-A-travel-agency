export type Destination = {
  id: string;
  name: string;
  country: string;
  code: string;
  image: string;
  priceFrom: number;
  rating: number;
  reviews: number;
  tag: string;
  x: number; // map position (%)
  y: number; // map position (%)
};

export const destinations: Destination[] = [
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    code: "JTR",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
    priceFrom: 42000,
    rating: 4.9,
    reviews: 2312,
    tag: "Trending",
    x: 54,
    y: 40,
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    code: "UKY",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    priceFrom: 58000,
    rating: 4.8,
    reviews: 4109,
    tag: "Culture",
    x: 82,
    y: 38,
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    code: "DPS",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    priceFrom: 31000,
    rating: 4.7,
    reviews: 5820,
    tag: "Best value",
    x: 76,
    y: 58,
  },
  {
    id: "banff",
    name: "Banff",
    country: "Canada",
    code: "YYC",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
    priceFrom: 67000,
    rating: 4.9,
    reviews: 1876,
    tag: "Nature",
    x: 16,
    y: 26,
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    code: "RAK",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1200&auto=format&fit=crop",
    priceFrom: 27000,
    rating: 4.6,
    reviews: 2984,
    tag: "New",
    x: 46,
    y: 46,
  },
  {
    id: "patagonia",
    name: "Patagonia",
    country: "Argentina",
    code: "FTE",
    image: "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?q=80&w=1200&auto=format&fit=crop",
    priceFrom: 74000,
    rating: 4.9,
    reviews: 981,
    tag: "Adventure",
    x: 28,
    y: 78,
  },
];

export type StayOrActivity = {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  type: "Hotel" | "Activity";
  availability: "high" | "low" | "soldout";
  spotsLeft?: number;
};

export const stays: StayOrActivity[] = [
  {
    id: "azure-cliff",
    name: "Azure Cliff Resort",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1000&auto=format&fit=crop",
    price: 18500,
    rating: 4.8,
    reviews: 612,
    type: "Hotel",
    availability: "low",
    spotsLeft: 2,
  },
  {
    id: "kyoto-machiya",
    name: "Gion Machiya House",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1000&auto=format&fit=crop",
    price: 12900,
    rating: 4.9,
    reviews: 388,
    type: "Hotel",
    availability: "high",
  },
  {
    id: "ubud-canopy",
    name: "Ubud Canopy Villas",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop",
    price: 9200,
    rating: 4.7,
    reviews: 941,
    type: "Hotel",
    availability: "high",
  },
  {
    id: "sunset-sail",
    name: "Caldera Sunset Sailing",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1000&auto=format&fit=crop",
    price: 6400,
    rating: 4.9,
    reviews: 1203,
    type: "Activity",
    availability: "low",
    spotsLeft: 4,
  },
  {
    id: "bamboo-forest",
    name: "Arashiyama Bamboo Walk & Tea",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1000&auto=format&fit=crop",
    price: 3100,
    rating: 4.6,
    reviews: 754,
    type: "Activity",
    availability: "high",
  },
  {
    id: "rice-terrace-trek",
    name: "Jatiluwih Rice Terrace Trek",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1000&auto=format&fit=crop",
    price: 2800,
    rating: 4.8,
    reviews: 567,
    type: "Activity",
    availability: "soldout",
  },
];

export const reviews = [
  {
    id: 1,
    name: "Ananya R.",
    location: "Mumbai, India",
    trip: "Santorini, Greece",
    rating: 5,
    text: "Wanderly's itinerary builder saved us hours of planning. The map view made it so easy to see what was actually walkable near our hotel.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Marcus T.",
    location: "Austin, USA",
    trip: "Kyoto, Japan",
    rating: 5,
    text: "Booked our ryokan and three activities in one sitting. The availability indicators meant we never wasted time on sold-out slots.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Priya & Dev",
    location: "Pune, India",
    trip: "Bali, Indonesia",
    rating: 4.8,
    text: "The AI-suggested route grouped our activities by neighborhood, so we barely spent time in transit. Genuinely felt personalized.",
    avatar: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Liam O.",
    location: "Dublin, Ireland",
    trip: "Patagonia, Argentina",
    rating: 5,
    text: "Sharing the itinerary with my hiking group was seamless — everyone could see the route and add their own notes.",
    avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e5?q=80&w=200&auto=format&fit=crop",
  },
];

export const guides = [
  {
    id: "santorini-48h",
    title: "48 Hours in Santorini: A Slow-Travel Route",
    excerpt: "Skip the crowds at Oia and find the caldera views locals actually keep to themselves.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop",
    readTime: "6 min read",
    category: "Guides",
  },
  {
    id: "kyoto-shoulder-season",
    title: "Why Shoulder Season Is Kyoto's Best-Kept Secret",
    excerpt: "Fewer crowds, cooler temples, and a shot at catching the maple leaves turning.",
    image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=1000&auto=format&fit=crop",
    readTime: "5 min read",
    category: "Insider",
  },
  {
    id: "packing-carry-on",
    title: "The Two-Week, Carry-On-Only Packing List",
    excerpt: "A field-tested list for warm-weather trips that never touches baggage claim.",
    image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=1000&auto=format&fit=crop",
    readTime: "4 min read",
    category: "Tips",
  },
];

export const pricingPlans = [
  {
    id: "explorer",
    name: "Explorer",
    price: 0,
    period: "forever",
    description: "For casual planners dipping their toes in.",
    features: [
      "Save up to 3 trips",
      "Basic itinerary builder",
      "Interactive destination map",
      "Community reviews access",
    ],
    highlighted: false,
    cta: "Start free",
  },
  {
    id: "voyager",
    name: "Voyager",
    price: 499,
    period: "month",
    description: "For frequent travelers who want it all planned.",
    features: [
      "Unlimited trips & itineraries",
      "Real-time price & availability alerts",
      "AI route optimization",
      "Offline access & PDF export",
      "Priority customer support",
    ],
    highlighted: true,
    cta: "Start 7-day trial",
  },
  {
    id: "concierge",
    name: "Concierge",
    price: 1499,
    period: "month",
    description: "For travelers who want a human touch too.",
    features: [
      "Everything in Voyager",
      "Dedicated trip concierge",
      "Group trip collaboration",
      "Custom travel insurance options",
      "24/7 on-trip support",
    ],
    highlighted: false,
    cta: "Talk to us",
  },
];

export const faqs = [
  {
    q: "Is Wanderly free to use?",
    a: "Yes. The Explorer plan is free forever and covers destination search, the interactive map, and a basic itinerary builder. You can upgrade any time for AI route optimization and real-time alerts.",
  },
  {
    q: "How does the itinerary builder work?",
    a: "Search destinations, drag hotels and activities onto your trip timeline, and Wanderly automatically groups them by neighborhood and suggests the most efficient order for each day.",
  },
  {
    q: "Can I book hotels and activities directly through Wanderly?",
    a: "Yes. Every listing shows live availability, and you can confirm a booking without leaving your itinerary. You'll get instant confirmation and a shareable trip summary.",
  },
  {
    q: "Can I share my itinerary with friends or family?",
    a: "Every trip has a shareable link and social share options, plus collaborators can view or edit the plan depending on the permissions you set.",
  },
  {
    q: "What happens if a hotel or activity sells out after I plan it?",
    a: "Wanderly monitors availability in real time and will flag affected items in your itinerary immediately, with similar alternatives suggested automatically.",
  },
];
