import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { Sparkles } from "lucide-react";

const SPECIAL_URL = "https://adamnimco.com/special";

export const Route = createFileRoute("/special")({
  head: () => ({
    meta: [
      { title: "Special Items — Adam Nimco | Premium Picks" },
      {
        name: "description",
        content:
          "Our most loved premium specials — Punjabi Nimco, Shahi Nimco, Khatta Meetha & more. Made fresh daily.",
      },
      { property: "og:title", content: "Special Items — Adam Nimco" },
      {
        property: "og:description",
        content: "Premium snack picks, hand-prepared every morning since 1939.",
      },
      { property: "og:url", content: SPECIAL_URL },
    ],
    links: [{ rel: "canonical", href: SPECIAL_URL }],
  }),
  component: SpecialPage,
});

function SpecialPage() {
  const specials = PRODUCTS.filter((p) => p.special || p.category === "special");

  return (
    <section className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
          <Sparkles className="size-3.5" /> Today's Special
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-3">
          Premium <span className="text-primary">Specials</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Our most popular, premium-grade picks — hand-prepared every morning since 1939.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {specials.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
