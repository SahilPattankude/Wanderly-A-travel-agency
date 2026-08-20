# Wanderly — Premium Travel Planner & AI Agency

Wanderly is a modern, premium travel planning platform built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It features an AI-powered Trip Planner powered by Google Gemini, real-time database syncing via Supabase, a Sanity CMS blog, and integrated payments via Razorpay.

---

## 🚀 Key Integrations & Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL database, real-time sync, SSG integration, and Client Auth)
- **AI Engine**: [Google Gen AI SDK](https://github.com/google/generative-ai-js) (Gemini model orchestration for generating custom travel itineraries)
- **Payment Gateway**: [Razorpay](https://razorpay.com/) (Order creation, signature verification, and secure client-side Checkout)
- **CMS**: [Sanity](https://www.sanity.io/) (Headless CMS for publishing travel guides and insider stories)
- **Styling & Animation**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)

---

## 🎨 Design System

- **Palette**: Warm Cream sand background (`#fffaf2`), Ink navy text (`#122b3d`), Ocean blue (`#0b6e8f`), Sunset orange (`#ff7a45`), forest green (`#2f6e51`), and Teal accent (`#17a6a1`).
- **Typography**: 
  - *Display / Headings*: **Fraunces** (Serif)
  - *UI / Body*: **Plus Jakarta Sans** (Sans-Serif)
  - *Labels / Codes*: **JetBrains Mono** (Monospace)
- **Aesthetic**: Perforated boarding pass borders, airport route codes, dynamic flight vectors, and map connection overlays.

---

## ⚡ Performance & Accessibility Optimizations

Wanderly is audited and optimized to yield **100/100 Lighthouse Scores** across both Mobile and Desktop viewports:

1. **Largest Contentful Paint (LCP)**: Removed client-side JS-driven opacity animations from the Hero's main graphic container. The LCP element is fully server-rendered and visible on initial print, cutting down render delay by **2.0 seconds**.
2. **GPU-Accelerated Animations**: Removed main-thread animating SVG paths (`stroke-dashoffset`) that caused layout style loops. Paths are static, and dynamic objects like airplanes fly using compositable CSS `offset-path` rules.
3. **Dynamic Code-Splitting**: Code-split all heavy below-the-fold blocks (Interactive Map, Hotels & Activities, Itinerary, Reviews, FAQs) using `next/dynamic` to shrink the initial First Load Javascript payload.
4. **Bandwidth Optimization**: Restructured responsive image sizes (`sizes`) to match maximum column width containers, and added `quality={70}` compression to Unsplash images.
5. **TS Compiler Target & Polyfills**: Upgraded compilation target to `ES2022` and configured a modern `browserslist`, eliminating 12 KiB of unnecessary legacy JS polyfills.
6. **Skip Link Navigation**: Injected a keyboard-navigable "Skip to main content" anchor and matched container targets across all main views.
7. **Descriptive ARIA Mappings**: Linked dropdown menus explicitly using `aria-controls` / `id` combinations, resolved mobile touch target sizes to a minimum of `48x48px`, and added platform-specific social links.

---

## 🛠️ Environment Variables Configuration

Create a `.env.local` file in the root directory and add the following keys:

```env
# Google Gemini Generative AI
GEMINI_API_KEY=your_gemini_api_key

# Supabase Configurations
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SECRET_KEY=your_supabase_service_role_key

# Sanity CMS Configurations
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_sanity_write_token

# Razorpay Payment Configurations
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Server-only Email SMTP (Configure in Supabase Edge Functions)
GMAIL_SMTP_USER=your_email@gmail.com
GMAIL_SMTP_PASSWORD=your_app_password
```

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Populate Database Schema
Wanderly uses Supabase Edge Functions and PostgreSQL. You can locate SQL definitions under `supabase/` to setup the destinations schema.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🏗️ Production Build

To compile and optimize the build for production:

```bash
npm run build
npm run start
```
