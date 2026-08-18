import { Compass, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const columns = [
  {
    title: "Explore",
    links: [
      ["Destinations", "/#destinations"], ["Interactive map", "/#map"],
      ["Travel guides", "/blog"], ["Deals", "/#pricing"],
    ],
  },
  {
    title: "Plan",
    links: [
      ["Itinerary builder", "/#itinerary"], ["Hotels", "/#stays"],
      ["Activities", "/#stays"], ["Group trips", "/register"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Wanderly", "#top"], ["Careers", "mailto:hello@wanderly.example?subject=Careers"],
      ["Press", "mailto:hello@wanderly.example?subject=Press"], ["Partners", "mailto:hello@wanderly.example?subject=Partnership"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Help center", "#faq"], ["Contact us", "mailto:hello@wanderly.example?subject=Support"],
      ["Cancellation policy", "/terms"], ["Trust & safety", "/privacy"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-800 text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-2 group">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-card overflow-hidden border border-ink-700/5">
                <img
                  src="/logo.png"
                  alt=""
                  className="absolute h-14 w-auto max-w-none object-top -top-0.5"
                />
              </span>
              <span className="font-display text-xl font-semibold text-white">
                Wanderly
              </span>
            </a>
            <p className="mt-4 text-sm text-white/60 max-w-xs">
              Discover, plan, and book your travel — all in one calm, considered
              place built for people who love going somewhere new.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="mailto:hello@wanderly.example?subject=Social%20media"
                  aria-label="Wanderly on social media"
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white/90">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Wanderly. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/50">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
