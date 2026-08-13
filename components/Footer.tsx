import { Compass, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const columns = [
  {
    title: "Explore",
    links: ["Destinations", "Interactive map", "Travel guides", "Deals"],
  },
  {
    title: "Plan",
    links: ["Itinerary builder", "Hotels", "Activities", "Group trips"],
  },
  {
    title: "Company",
    links: ["About Wanderly", "Careers", "Press", "Partners"],
  },
  {
    title: "Support",
    links: ["Help center", "Contact us", "Cancellation policy", "Trust & safety"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-800 text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sunset-500">
                <Compass className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <span className="font-display text-xl font-semibold">Wanderly</span>
            </a>
            <p className="mt-4 text-sm text-white/60 max-w-xs">
              Discover, plan, and book your travel — all in one calm, considered
              place built for people who love going somewhere new.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
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
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                      {l}
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
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
