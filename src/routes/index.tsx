import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ShoppingBag, Sparkles, ShieldCheck, Clock, Heart, Award } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import { BUSINESS, telLink, waLink } from "@/lib/contact";
import logo from "@/assets/adam-logo.png";
import hero from "@/assets/hero.jpg";

const SITE_URL = "https://adamnimco.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adam Nimco — Fresh Nimco & Snacks Since 1939 | Saddar Karachi" },
      {
        name: "description",
        content:
          "Premium quality nimco, bhail puri, chips, peanuts, papri & sweets — handcrafted fresh daily at our Saddar shop since 1939. Order on WhatsApp.",
      },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}${hero}` },
      { name: "twitter:image", content: `${SITE_URL}${hero}` },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: HomePage,
});

const trust = [
  { icon: Award, title: "Since 1939", text: "Three generations of taste" },
  { icon: Sparkles, title: "Fresh Daily", text: "Hand-prepared every morning" },
  { icon: ShieldCheck, title: "Hygienic", text: "Premium quality standards" },
  { icon: Clock, title: "Quick Orders", text: "WhatsApp & call ready" },
];

function HomePage() {
  const specials = PRODUCTS.filter((p) => p.special).slice(0, 6);
  const bhailLiquid = PRODUCTS.find((p) => p.slug === "bhail-puri-liquid");
  const [bhailOpen, setBhailOpen] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden h-[calc(100svh-4rem)] lg:h-[calc(100svh-5rem)]">
        <div className="absolute inset-0">
          <img
            src={hero}
            alt="Bowl of fresh Pakistani nimco snack mix"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-6 h-full flex items-center py-6 md:py-8 lg:py-10">
          <div className="grid lg:grid-cols-[1fr_auto] items-center gap-6 lg:gap-10 w-full">
            <div className="text-white text-center lg:text-left order-2 lg:order-1 lg:pl-6 xl:pl-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold mb-4 animate-pop-in">
                <Award className="size-3.5" /> SINCE 1939 • SADDAR, KARACHI
              </span>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-balance animate-fade-up">
                ADAM NIMCO
                <span className="block bg-gradient-to-r from-accent to-amber-300 bg-clip-text text-transparent">
                  Fresh Snacks Daily
                </span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/90 max-w-xl mx-auto lg:mx-0 animate-fade-up">
                Three generations of premium nimco, bhail puri, chips, peanuts & sweets — hand
                made every morning at our Saddar shop.
              </p>
              <div className="mt-7 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:justify-center lg:justify-start animate-fade-up">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-bold shadow-glow w-full sm:w-auto"
                >
                  <a href={waLink("Hi Adam Nimco, I'd like to place an order.")}>
                    <ShoppingBag className="size-5" /> Order Now
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-white/10 border-white/40 text-white hover:bg-white hover:text-foreground font-bold backdrop-blur w-full sm:w-auto"
                >
                  <a href={telLink(BUSINESS.phones[0])}>
                    <Phone className="size-5" /> Call Now
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end animate-pop-in order-1 lg:order-2">
              <img
                src={logo}
                alt="Adam Nimco logo since 1939"
                width={420}
                height={420}
                className="h-52 md:h-72 lg:h-96 w-auto object-contain drop-shadow-2xl animate-float-slow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-marquee font-semibold text-sm">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-10 shrink-0">
              <span>🏆 Trusted Since 1939</span>
              <span>•</span>
              <span>🔥 Bhail Puri Special</span>
              <span>•</span>
              <span>⭐ Shahi Nimco</span>
              <span>•</span>
              <span>🥔 Fresh Chips Daily</span>
              <span>•</span>
              <span>💬 WhatsApp anytime</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* BHAIL PURI — Full-screen slide */}
      {bhailLiquid && (
        <section className="relative overflow-hidden h-[calc(100svh-4rem)] lg:h-[calc(100svh-5rem)]">
          <div className="absolute inset-0">
            <img
              src={bhailLiquid.image}
              alt={bhailLiquid.name}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>
          <div className="relative container mx-auto px-4 lg:px-6 h-full flex items-center py-6 lg:py-8">
            <div className="max-w-2xl text-white">
              <p className="text-white/85 text-sm font-bold uppercase tracking-wider">
                🥗 Karachi Favourite
              </p>
              <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
                Bhail Puri (Liquid Chutney)
              </h2>
              <p className="mt-3 text-white/85 text-base sm:text-lg">
                Generous tamarind & green chutney — saucy, tangy, and freshly made.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 items-center">
                <Button
                  size="lg"
                  className="rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-bold shadow-glow"
                  onClick={() => setBhailOpen(true)}
                >
                  <ShoppingBag className="size-5" /> Order Bhail Puri
                </Button>
                <Link
                  to="/menu"
                  search={{ cat: "bhail-puri" }}
                  className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold bg-white/10 border border-white/25 text-white hover:bg-white/20 backdrop-blur"
                >
                  View on menu →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {bhailLiquid && (
        <ProductModal product={bhailLiquid} open={bhailOpen} onOpenChange={setBhailOpen} />
      )}

      {/* SPECIAL ITEMS */}
      <section className="bg-gradient-warm border-y border-border h-[calc(100svh-4rem)] lg:h-[calc(100svh-5rem)]">
        <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-10 w-full h-full flex flex-col">
          <div className="flex items-end justify-between mb-6 lg:mb-7">
            <div>
              <span className="text-primary font-bold text-sm uppercase tracking-wider">
                🔥 Most Loved
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-1">
                Special Items
              </h2>
            </div>
            <Link
              to="/special"
              className="hidden md:inline-flex text-sm font-semibold text-primary hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="flex-1 min-h-0">
            <div className="h-full flex items-stretch gap-4 lg:gap-5 overflow-x-auto scrollbar-hide pb-3 -mx-4 px-4 snap-x snap-mandatory">
            {specials.map((p) => (
              <div
                key={p.slug}
                className="snap-start shrink-0 h-full basis-[78%] max-w-[300px] md:basis-[45%] md:max-w-[360px] lg:basis-[33%] lg:max-w-[380px] xl:basis-[30%] first:ml-0 last:mr-1"
              >
                <ProductCard product={p} featured />
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)] flex items-center">
        <div className="container mx-auto px-4 lg:px-6 py-10 lg:py-12 w-full">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">
              Browse Menu
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-1">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {CATEGORIES.map((c) => {
              const count = PRODUCTS.filter((p) => p.category === c.key).length;
              return (
                <Link
                  key={c.key}
                  to="/menu"
                  search={{ cat: c.key }}
                  className="group rounded-2xl bg-card border border-border p-5 text-center shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all"
                >
                  <div className="text-4xl mb-2">{c.emoji}</div>
                  <h3 className="font-bold">{c.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{count} items</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-gradient-warm border-y border-border min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)] flex items-center">
        <div className="container mx-auto px-4 lg:px-6 py-10 lg:py-12 w-full">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-center mb-8">
            Why <span className="text-primary">Adam Nimco</span>?
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trust.map((t) => (
              <div
                key={t.title}
                className="bg-card rounded-2xl p-5 text-center shadow-soft border border-border hover:shadow-card hover:-translate-y-1 transition-all"
              >
                <div className="size-12 mx-auto rounded-full bg-gradient-primary text-primary-foreground grid place-items-center mb-3">
                  <t.icon className="size-6" />
                </div>
                <h3 className="font-bold">{t.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="container mx-auto px-4 lg:px-6 py-14">
        <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-8 md:p-12 shadow-glow relative overflow-hidden">
          <div className="absolute -right-10 -top-10 size-48 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-6">
            <div>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold">
                Hungry? Order in 30 seconds.
              </h2>
              <p className="mt-2 text-white/90 max-w-lg">
                Tap WhatsApp, choose your snack, we'll get it ready.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full bg-white/15 border-white/35 text-white hover:bg-white/25 font-bold"
              >
                <a href={waLink("Hi Adam Nimco, I'd like to order.")}>
                  <WhatsAppIcon className="size-7 animate-whatsapp-bounce" /> WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full bg-white text-foreground border-white hover:bg-white/90 font-bold"
              >
                <a href={telLink(BUSINESS.phones[0])}>
                  <Phone className="size-5" /> Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
