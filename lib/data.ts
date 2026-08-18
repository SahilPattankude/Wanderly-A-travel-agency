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
  x: number;
  y: number;
};

export const destinations: Destination[] = [
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    code: "JTR",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?q=80&w=1200&auto=format&fit=crop",
    priceFrom: 74000,
    rating: 4.9,
    reviews: 981,
    tag: "Adventure",
    x: 28,
    y: 78,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    code: "BOM",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop",
    priceFrom: 14500,
    rating: 4.8,
    reviews: 3124,
    tag: "Trending",
    x: 72,
    y: 48,
  },
  {
    id: "pune",
    name: "Pune",
    country: "India",
    code: "PNQ",
    image:
      "https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=1200&auto=format&fit=crop",
    priceFrom: 8500,
    rating: 4.7,
    reviews: 942,
    tag: "Culture",
    x: 72,
    y: 50,
  },
  {
    id: "delhi",
    name: "Delhi",
    country: "India",
    code: "DEL",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop",
    priceFrom: 12500,
    rating: 4.8,
    reviews: 4812,
    tag: "Heritage",
    x: 71,
    y: 43,
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    country: "India",
    code: "HYD",
    image:
      "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=1200&auto=format&fit=crop",
    priceFrom: 10500,
    rating: 4.7,
    reviews: 1654,
    tag: "Heritage",
    x: 73,
    y: 52,
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    country: "India",
    code: "BLR",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop",
    priceFrom: 11000,
    rating: 4.7,
    reviews: 2341,
    tag: "Tech Hub",
    x: 72,
    y: 55,
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
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1000&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1000&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1000&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1000&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1000&auto=format&fit=crop",
    price: 2800,
    rating: 4.8,
    reviews: 567,
    type: "Activity",
    availability: "soldout",
  },
  {
    id: "banff-springs",
    name: "Banff Springs Hotel",
    location: "Banff, Canada",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop",
    price: 24500,
    rating: 4.9,
    reviews: 312,
    type: "Hotel",
    availability: "low",
    spotsLeft: 1,
  },
  {
    id: "lake-louise-canoe",
    name: "Lake Louise Canoe Rental",
    location: "Banff, Canada",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
    price: 4200,
    rating: 4.8,
    reviews: 819,
    type: "Activity",
    availability: "high",
  },
  {
    id: "riad-kheirredine",
    name: "Riad Kheirredine",
    location: "Marrakech, Morocco",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
    price: 14200,
    rating: 4.9,
    reviews: 456,
    type: "Hotel",
    availability: "high",
  },
  {
    id: "marrakech-souks",
    name: "Souks Guided Shopping Tour",
    location: "Marrakech, Morocco",
    image:
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1000&auto=format&fit=crop",
    price: 1800,
    rating: 4.7,
    reviews: 1040,
    type: "Activity",
    availability: "high",
  },
  {
    id: "patagonia-ecocamp",
    name: "Patagonia Eco Camp",
    location: "Patagonia, Argentina",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1000&auto=format&fit=crop",
    price: 21000,
    rating: 4.8,
    reviews: 198,
    type: "Hotel",
    availability: "low",
    spotsLeft: 3,
  },
  {
    id: "glacier-trek",
    name: "Perito Moreno Glacier Trekking",
    location: "Patagonia, Argentina",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop",
    price: 9500,
    rating: 4.9,
    reviews: 673,
    type: "Activity",
    availability: "high",
  },
  {
    id: "taj-mahal-palace",
    name: "The Taj Mahal Palace",
    location: "Mumbai, India",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    price: 28000,
    rating: 4.9,
    reviews: 1450,
    type: "Hotel",
    availability: "high",
  },
  {
    id: "oberoi-mumbai",
    name: "The Oberoi Mumbai",
    location: "Mumbai, India",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
    price: 22000,
    rating: 4.8,
    reviews: 820,
    type: "Hotel",
    availability: "low",
    spotsLeft: 3,
  },
  {
    id: "elephanta-caves",
    name: "Elephanta Caves Guided Tour",
    location: "Mumbai, India",
    image:
      "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?q=80&w=1000&auto=format&fit=crop",
    price: 1500,
    rating: 4.6,
    reviews: 1205,
    type: "Activity",
    availability: "high",
  },
  {
    id: "mumbai-street-food",
    name: "Street Food Tour at Chowpatty",
    location: "Mumbai, India",
    image:
      "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=1000&auto=format&fit=crop",
    price: 1200,
    rating: 4.9,
    reviews: 980,
    type: "Activity",
    availability: "high",
  },
  {
    id: "jw-marriott-pune",
    name: "JW Marriott Hotel Pune",
    location: "Pune, India",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop",
    price: 14000,
    rating: 4.8,
    reviews: 740,
    type: "Hotel",
    availability: "high",
  },
  {
    id: "ritz-carlton-pune",
    name: "The Ritz-Carlton Pune",
    location: "Pune, India",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop",
    price: 16500,
    rating: 4.9,
    reviews: 410,
    type: "Hotel",
    availability: "low",
    spotsLeft: 2,
  },
  {
    id: "sinhagad-hike",
    name: "Sinhagad Fort Sunrise Trek",
    location: "Pune, India",
    image:
      "https://images.unsplash.com/photo-1626761191244-893997d2085a?q=80&w=1000&auto=format&fit=crop",
    price: 1000,
    rating: 4.7,
    reviews: 580,
    type: "Activity",
    availability: "high",
  },
  {
    id: "aga-khan-palace",
    name: "Aga Khan Palace Heritage Tour",
    location: "Pune, India",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
    price: 800,
    rating: 4.6,
    reviews: 310,
    type: "Activity",
    availability: "high",
  },
  {
    id: "leela-delhi",
    name: "The Leela Palace New Delhi",
    location: "Delhi, India",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    price: 20000,
    rating: 4.9,
    reviews: 1350,
    type: "Hotel",
    availability: "high",
  },
  {
    id: "maidens-delhi",
    name: "Maidens Hotel New Delhi",
    location: "Delhi, India",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop",
    price: 11000,
    rating: 4.7,
    reviews: 640,
    type: "Hotel",
    availability: "high",
  },
  {
    id: "delhi-food-walk",
    name: "Old Delhi Street Food Walk",
    location: "Delhi, India",
    image:
      "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=1000&auto=format&fit=crop",
    price: 2000,
    rating: 4.9,
    reviews: 1540,
    type: "Activity",
    availability: "low",
    spotsLeft: 5,
  },
  {
    id: "red-fort-tour",
    name: "Red Fort & Jama Masjid Tour",
    location: "Delhi, India",
    image:
      "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=1000&auto=format&fit=crop",
    price: 1500,
    rating: 4.8,
    reviews: 2450,
    type: "Activity",
    availability: "high",
  },
  {
    id: "falaknuma-hyderabad",
    name: "Taj Falaknuma Palace",
    location: "Hyderabad, India",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
    price: 35000,
    rating: 4.9,
    reviews: 890,
    type: "Hotel",
    availability: "low",
    spotsLeft: 1,
  },
  {
    id: "kohenur-hyderabad",
    name: "ITC Kohenur Hyderabad",
    location: "Hyderabad, India",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    price: 15000,
    rating: 4.8,
    reviews: 940,
    type: "Hotel",
    availability: "high",
  },
  {
    id: "charminar-walk",
    name: "Charminar & Laad Bazaar Walk",
    location: "Hyderabad, India",
    image:
      "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=1000&auto=format&fit=crop",
    price: 900,
    rating: 4.8,
    reviews: 1420,
    type: "Activity",
    availability: "high",
  },
  {
    id: "golconda-fort-tour",
    name: "Golconda Fort Guided Tour",
    location: "Hyderabad, India",
    image:
      "https://images.unsplash.com/photo-1608958415217-024823d0473b?q=80&w=1000&auto=format&fit=crop",
    price: 1200,
    rating: 4.7,
    reviews: 1100,
    type: "Activity",
    availability: "high",
  },
  {
    id: "leela-bengaluru",
    name: "The Leela Palace Bengaluru",
    location: "Bengaluru, India",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
    price: 19000,
    rating: 4.8,
    reviews: 1250,
    type: "Hotel",
    availability: "high",
  },
  {
    id: "west-end-bengaluru",
    name: "Taj West End Bengaluru",
    location: "Bengaluru, India",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1000&auto=format&fit=crop",
    price: 21000,
    rating: 4.9,
    reviews: 640,
    type: "Hotel",
    availability: "low",
    spotsLeft: 3,
  },
  {
    id: "cubbon-park-walk",
    name: "Cubbon Park & Traditional Breakfast",
    location: "Bengaluru, India",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop",
    price: 900,
    rating: 4.8,
    reviews: 820,
    type: "Activity",
    availability: "high",
  },
  {
    id: "nandi-hills",
    name: "Nandi Hills Sunrise Excursion",
    location: "Bengaluru, India",
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1000&auto=format&fit=crop",
    price: 1800,
    rating: 4.6,
    reviews: 1540,
    type: "Activity",
    availability: "high",
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
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Marcus T.",
    location: "Austin, USA",
    trip: "Kyoto, Japan",
    rating: 5,
    text: "Booked our ryokan and three activities in one sitting. The availability indicators meant we never wasted time on sold-out slots.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Priya & Dev",
    location: "Pune, India",
    trip: "Bali, Indonesia",
    rating: 4.8,
    text: "The AI-suggested route grouped our activities by neighborhood, so we barely spent time in transit. Genuinely felt personalized.",
    avatar:
      "https://images.unsplash.com/photo-1545996124-0501ebae84d0?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Liam O.",
    location: "Dublin, Ireland",
    trip: "Patagonia, Argentina",
    rating: 5,
    text: "Sharing the itinerary with my hiking group was seamless — everyone could see the route and add their own notes.",
    avatar:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e5?q=80&w=200&auto=format&fit=crop",
  },
];

export const guides = [
  {
    id: "santorini-48h",
    title: "48 Hours in Santorini: A Slow-Travel Route",
    excerpt:
      "Skip the crowds at Oia and find the caldera views locals actually keep to themselves.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop",
    readTime: "6 min read",
    category: "Guides",
  },
  {
    id: "kyoto-shoulder-season",
    title: "Why Shoulder Season Is Kyoto's Best-Kept Secret",
    excerpt:
      "Fewer crowds, cooler temples, and a shot at catching the maple leaves turning.",
    image:
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=1000&auto=format&fit=crop",
    readTime: "5 min read",
    category: "Insider",
  },
  {
    id: "packing-carry-on",
    title: "The Two-Week, Carry-On-Only Packing List",
    excerpt:
      "A field-tested list for warm-weather trips that never touches baggage claim.",
    image:
      "https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=1000&auto=format&fit=crop",
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

export type DefaultItineraryItem = {
  id: string;
  day: number;
  time: string;
  title: string;
  place: string;
};

export const defaultItineraries: Record<string, DefaultItineraryItem[]> = {
  santorini: [
    {
      id: "santo-1",
      day: 1,
      time: "09:00",
      title: "Arrive & check in",
      place: "Azure Cliff Resort, Santorini",
    },
    {
      id: "santo-2",
      day: 1,
      time: "13:00",
      title: "Walk the caldera path",
      place: "Fira to Oia",
    },
    {
      id: "santo-3",
      day: 1,
      time: "18:30",
      title: "Sunset sailing trip",
      place: "Ammoudi Bay",
    },
    {
      id: "santo-4",
      day: 2,
      time: "10:00",
      title: "Wine tasting tour",
      place: "Santo Wines Winery",
    },
  ],
  kyoto: [
    {
      id: "kyo-1",
      day: 1,
      time: "10:00",
      title: "Check in & green tea welcome",
      place: "Gion Machiya House, Kyoto",
    },
    {
      id: "kyo-2",
      day: 1,
      time: "13:30",
      title: "Explore Kiyomizu-dera Temple",
      place: "Higashiyama District",
    },
    {
      id: "kyo-3",
      day: 1,
      time: "19:00",
      title: "Kaiseki multi-course dinner",
      place: "Gion neighborhood",
    },
    {
      id: "kyo-4",
      day: 2,
      time: "09:30",
      title: "Arashiyama Bamboo Forest walk",
      place: "Arashiyama, Kyoto",
    },
  ],
  bali: [
    {
      id: "bal-1",
      day: 1,
      time: "12:00",
      title: "Villa check-in & relax",
      place: "Ubud Canopy Villas, Bali",
    },
    {
      id: "bal-2",
      day: 1,
      time: "15:30",
      title: "Campuhan Ridge Walk",
      place: "Ubud",
    },
    {
      id: "bal-3",
      day: 2,
      time: "08:30",
      title: "Tegallalang Rice Terrace tour",
      place: "Ubud",
    },
    {
      id: "bal-4",
      day: 2,
      time: "16:00",
      title: "Yoga & meditation session",
      place: "Yoga Barn Ubud",
    },
  ],
  banff: [
    {
      id: "bnf-1",
      day: 1,
      time: "11:00",
      title: "Arrive in Banff & check-in",
      place: "Banff Springs Hotel",
    },
    {
      id: "bnf-2",
      day: 1,
      time: "14:00",
      title: "Canoeing on Moraine Lake",
      place: "Moraine Lake, Banff",
    },
    {
      id: "bnf-3",
      day: 2,
      time: "09:00",
      title: "Johnston Canyon hike",
      place: "Johnston Canyon Trail",
    },
    {
      id: "bnf-4",
      day: 2,
      time: "16:35",
      title: "Relax at Upper Hot Springs",
      place: "Banff Upper Hot Springs",
    },
  ],
  marrakech: [
    {
      id: "mar-1",
      day: 1,
      time: "13:00",
      title: "Riad check-in & mint tea",
      place: "Riad Kheirredine, Marrakech",
    },
    {
      id: "mar-2",
      day: 1,
      time: "16:00",
      title: "Jemaa el-Fnaa square stroll",
      place: "Medina of Marrakech",
    },
    {
      id: "mar-3",
      day: 2,
      time: "10:00",
      title: "Majorelle Garden & YSL Museum",
      place: "Rue Yves Saint Laurent",
    },
    {
      id: "mar-4",
      day: 2,
      time: "14:30",
      title: "Souks shopping experience",
      place: "Medina Souks",
    },
  ],
  patagonia: [
    {
      id: "pat-1",
      day: 1,
      time: "10:30",
      title: "Arrive at eco-lodge",
      place: "Patagonia Eco Camp",
    },
    {
      id: "pat-2",
      day: 1,
      time: "13:00",
      title: "Perito Moreno glacier walk",
      place: "Los Glaciares National Park",
    },
    {
      id: "pat-3",
      day: 2,
      time: "08:00",
      title: "Mount Fitz Roy day trek",
      place: "El Chaltén trailhead",
    },
  ],
  mumbai: [
    {
      id: "mum-1",
      day: 1,
      time: "09:00",
      title: "Taj Mahal Palace Check-in",
      place: "Colaba, Mumbai",
    },
    {
      id: "mum-2",
      day: 1,
      time: "14:00",
      title: "Gateway of India & Marine Drive",
      place: "South Mumbai",
    },
    {
      id: "mum-3",
      day: 2,
      time: "10:00",
      title: "Elephanta Caves Tour",
      place: "Mumbai Harbour",
    },
    {
      id: "mum-4",
      day: 2,
      time: "17:00",
      title: "Street Food Tour at Chowpatty",
      place: "Chowpatty Beach",
    },
  ],
  pune: [
    {
      id: "pun-1",
      day: 1,
      time: "10:00",
      title: "JW Marriott Pune Check-in",
      place: "Senapati Bapat Road, Pune",
    },
    {
      id: "pun-2",
      day: 1,
      time: "14:30",
      title: "Shaniwar Wada Heritage Walk",
      place: "Pune City Center",
    },
    {
      id: "pun-3",
      day: 2,
      time: "09:00",
      title: "Sinhagad Fort Sunrise Trek",
      place: "Sinhagad Fort Trail",
    },
    {
      id: "pun-4",
      day: 2,
      time: "16:00",
      title: "Aga Khan Palace Heritage Tour",
      place: "Yerwada, Pune",
    },
  ],
  delhi: [
    {
      id: "del-1",
      day: 1,
      time: "11:00",
      title: "Leela Palace Delhi Check-in",
      place: "Chanakyapuri, New Delhi",
    },
    {
      id: "del-2",
      day: 1,
      time: "14:00",
      title: "Red Fort & Jama Masjid Tour",
      place: "Old Delhi",
    },
    {
      id: "del-3",
      day: 2,
      time: "09:30",
      title: "Humayun's Tomb Heritage Walk",
      place: "Nizamuddin East, Delhi",
    },
    {
      id: "del-4",
      day: 2,
      time: "16:30",
      title: "Old Delhi Street Food Walk",
      place: "Chandni Chowk",
    },
  ],
  hyderabad: [
    {
      id: "hyd-1",
      day: 1,
      time: "12:00",
      title: "Taj Falaknuma Palace Check-in",
      place: "Falaknuma, Hyderabad",
    },
    {
      id: "hyd-2",
      day: 1,
      time: "15:30",
      title: "Charminar & Laad Bazaar Walk",
      place: "Old City, Hyderabad",
    },
    {
      id: "hyd-3",
      day: 2,
      time: "09:30",
      title: "Golconda Fort Guided Tour",
      place: "Golconda, Hyderabad",
    },
    {
      id: "hyd-4",
      day: 2,
      time: "19:00",
      title: "Hyderabadi Biryani Tasting",
      place: "Hyderabad",
    },
  ],
  bengaluru: [
    {
      id: "blr-1",
      day: 1,
      time: "11:30",
      title: "Leela Palace Bengaluru Check-in",
      place: "HAL Airport Road, Bengaluru",
    },
    {
      id: "blr-2",
      day: 1,
      time: "15:00",
      title: "Cubbon Park & Traditional Breakfast",
      place: "Cubbon Park, Bengaluru",
    },
    {
      id: "blr-3",
      day: 2,
      time: "10:00",
      title: "Bangalore Palace Heritage Tour",
      place: "Vasanth Nagar",
    },
    {
      id: "blr-4",
      day: 2,
      time: "18:00",
      title: "Nandi Hills Sunrise Excursion",
      place: "Nandi Hills",
    },
  ],
};

export type DefaultSuggestionItem = {
  id: string;
  time: string;
  title: string;
  place: string;
};

export const destinationSuggestions: Record<
  string,
  DefaultSuggestionItem[]
> = {
  santorini: [
    {
      id: "santo-s1",
      time: "08:00",
      title: "Beach morning",
      place: "Red Beach, Akrotiri",
    },
    {
      id: "santo-s2",
      time: "16:00",
      title: "Museum visit",
      place: "Museum of Prehistoric Thera",
    },
  ],
  kyoto: [
    {
      id: "kyo-s1",
      time: "08:00",
      title: "Golden Pavilion tour",
      place: "Kinkaku-ji Temple",
    },
    {
      id: "kyo-s2",
      time: "17:00",
      title: "Fushimi Inari Shrine walk",
      place: "Fushimi Inari Gates",
    },
  ],
  bali: [
    {
      id: "bal-s1",
      time: "06:00",
      title: "Mount Batur sunrise trek",
      place: "Kintamani",
    },
    {
      id: "bal-s2",
      time: "17:30",
      title: "Uluwatu Temple sunset & Kecak dance",
      place: "Uluwatu",
    },
  ],
  banff: [
    {
      id: "bnf-s1",
      time: "08:30",
      title: "Banff Gondola ride",
      place: "Sulphur Mountain",
    },
    {
      id: "bnf-s2",
      time: "12:00",
      title: "Lake Louise tea house hike",
      place: "Lake Louise",
    },
  ],
  marrakech: [
    {
      id: "mar-s1",
      time: "06:00",
      title: "Hot air balloon flight",
      place: "Marrakech Outskirts",
    },
    {
      id: "mar-s2",
      time: "18:00",
      title: "Hammam spa ritual",
      place: "Les Bains de Marrakech",
    },
  ],
  patagonia: [
    {
      id: "pat-s1",
      time: "07:30",
      title: "Torres del Paine viewpoint hike",
      place: "Torres del Paine National Park",
    },
    {
      id: "pat-s2",
      time: "11:00",
      title: "Boat navigation to Grey Glacier",
      place: "Lake Grey",
    },
  ],
  mumbai: [
    {
      id: "mum-s1",
      time: "08:00",
      title: "Marine Drive Morning Jog",
      place: "Marine Drive",
    },
    {
      id: "mum-s2",
      time: "16:00",
      title: "Sanjay Gandhi National Park Walk",
      place: "Borivali",
    },
  ],
  pune: [
    {
      id: "pun-s1",
      time: "08:00",
      title: "Osho Garden Morning Meditation",
      place: "Koregaon Park",
    },
    {
      id: "pun-s2",
      time: "17:00",
      title: "Saras Baug Lake Visit",
      place: "Pune",
    },
  ],
  delhi: [
    {
      id: "del-s1",
      time: "08:00",
      title: "Lodhi Gardens Heritage Walk",
      place: "Lodhi Road",
    },
    {
      id: "del-s2",
      time: "17:00",
      title: "India Gate Evening Stroll",
      place: "Rajpath",
    },
  ],
  hyderabad: [
    {
      id: "hyd-s1",
      time: "08:00",
      title: "Hussain Sagar Morning Cruise",
      place: "Hyderabad",
    },
    {
      id: "hyd-s2",
      time: "17:00",
      title: "Qutb Shahi Tombs Heritage Walk",
      place: "Ibrahim Bagh",
    },
  ],
  bengaluru: [
    {
      id: "blr-s1",
      time: "07:30",
      title: "Lalbagh Botanical Garden Hike",
      place: "Lalbagh",
    },
    {
      id: "blr-s2",
      time: "17:00",
      title: "Commercial Street Shopping",
      place: "Tasker Town",
    },
  ],
};