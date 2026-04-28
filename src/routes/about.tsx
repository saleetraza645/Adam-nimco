import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS, waLink } from "@/lib/contact";

const ABOUT_URL = "https://adamnimco.com/about";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Adam Nimco | Since 1939" },
      {
        name: "description",
        content:
          "About Adam Nimco — a Saddar Karachi snack shop serving fresh nimco, bhail puri and sweets since 1939.",
      },
      { property: "og:title", content: "About Adam Nimco — Since 1939" },
      { property: "og:description", content: "Our story, quality promise, and Karachi heritage since 1939." },
      { property: "og:url", content: ABOUT_URL },
    ],
    links: [{ rel: "canonical", href: ABOUT_URL }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
          <Award className="size-3.5" /> Since 1939
        </span>
        <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold">
          The taste Karachi grew up with.
        </h1>
        <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
          Since 1939, Adam Nimco has been serving taste and quality for generations. We prepare our
          products with pure gram flour (besan) and pure canola oil to maintain authentic flavor and
          trusted quality. Today, the 4th generation proudly continues this family tradition with the
          same dedication.
        </p>
        <p className="mt-3 text-muted-foreground text-base md:text-lg leading-relaxed">
          Every snack is made fresh, crispy, and full of flavor. We focus on hygiene, high standards,
          and traditional recipes in every batch. Trusted by customers for decades, Adam Nimco blends
          tradition, quality, and taste in every bite.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
          <div className="size-12 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center">
            <Sparkles className="size-6" />
          </div>
          <h2 className="mt-4 font-display text-xl font-extrabold">Fresh daily</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            From nimco mixes to bhail puri, we focus on freshness so every bite tastes new.
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
          <div className="size-12 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center">
            <ShieldCheck className="size-6" />
          </div>
          <h2 className="mt-4 font-display text-xl font-extrabold">Hygiene first</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Clean prep, careful handling, and consistent standards—because quality is non‑negotiable.
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
          <div className="size-12 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center">
            <MapPin className="size-6" />
          </div>
          <h2 className="mt-4 font-display text-xl font-extrabold">Saddar, Karachi</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Visit us in Saddar or order on WhatsApp—quick responses and easy pickup.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-gradient-warm border border-border p-6 md:p-10 shadow-soft">
        <div className="grid md:grid-cols-[1fr_auto] items-center gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold">
              Want to place an order?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Tell us what you want, your preferred size, and quantity—we’ll confirm availability.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap justify-start md:justify-end">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-bold shadow-soft"
            >
              <a href={waLink("Hi Adam Nimco, I'd like to place an order.")} target="_blank" rel="noopener noreferrer">
                WhatsApp Order
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/menu" search={{ cat: "all" }}>
                View Menu
              </Link>
            </Button>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Address: {BUSINESS.address}
        </p>
      </div>
    </section>
  );
}

