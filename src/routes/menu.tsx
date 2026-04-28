import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCTS, type CategoryKey, type Product } from "@/lib/products";

const MENU_URL = "https://adamnimco.com/menu";

const VALID_CATS = [
  "all",
  "bhail-puri",
  "special",
  "regular",
  "chips",
  "peanuts",
  "bondi",
  "papri",
  "sweets",
] as const;

type CatSearch = { cat: (typeof VALID_CATS)[number] };

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>): CatSearch => {
    const cat = search.cat as string;
    return {
      cat: (VALID_CATS as readonly string[]).includes(cat)
        ? (cat as CatSearch["cat"])
        : "all",
    };
  },
  head: () => ({
    meta: [
      { title: "Menu — Adam Nimco | Fresh Nimco, Snacks, Chips & Sweets" },
      {
        name: "description",
        content:
          "Browse our full menu of bhail puri, special nimco, regular snacks, chips, peanuts, papri and sweets. Order on WhatsApp.",
      },
      { property: "og:title", content: "Menu — Adam Nimco" },
      {
        property: "og:description",
        content: "Full menu of fresh snacks & sweets — order on WhatsApp.",
      },
      { property: "og:url", content: MENU_URL },
    ],
    links: [{ rel: "canonical", href: MENU_URL }],
  }),
  component: MenuPage,
});

const filters: { key: "all" | CategoryKey; label: string; emoji: string }[] = [
  { key: "all", label: "All", emoji: "✨" },
  ...CATEGORIES,
];

function MenuPage() {
  const { cat } = Route.useSearch();
  const navigate = useNavigate({ from: "/menu" });

  const items =
    cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  // Group by category when "all" is selected so user sees the required order
  const grouped = cat === "all"
    ? CATEGORIES.map((c) => ({
        ...c,
        products: PRODUCTS.filter((p) => p.category === c.key),
      })).filter((g) => g.products.length > 0)
    : null;

  return (
    <section className="container mx-auto px-4 lg:px-6 py-10 lg:py-14">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-primary font-bold text-sm uppercase tracking-wider">
          Our Menu
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-2">
          Fresh, Crunchy &<span className="text-primary"> Delicious</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Tap any item to choose size, set quantity and order on WhatsApp.
        </p>
      </div>

      <div className="mt-8 sticky top-16 lg:top-20 z-30 -mx-4 px-4 py-3 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="flex justify-start lg:justify-center gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() =>
                navigate({ search: { cat: f.key }, resetScroll: false })
              }
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                cat === f.key
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-muted text-foreground hover:bg-muted/70"
              }`}
            >
              <span className="mr-1">{f.emoji}</span>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {grouped ? (
        <div className="space-y-12 mt-10">
          {grouped.map((g) => (
            <div key={g.key} id={g.key}>
              <div className="flex items-end justify-between mb-5">
                <div>
                  <span className="text-primary font-bold text-xs uppercase tracking-wider">
                    {g.emoji} {g.label}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold mt-1">
                    {g.label}
                  </h2>
                  {g.key === "bhail-puri" && (
                    <p className="mt-2 text-sm text-muted-foreground max-w-2xl font-semibold">
                      Note: For delivery outside Karachi, dry chutney is also available on request.
                    </p>
                  )}
                </div>
                <Link
                  to="/menu"
                  search={{ cat: g.key }}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  View all →
                </Link>
              </div>
              {g.key === "bhail-puri" || (g.key === "sweets" && g.products.some((p) => p.slug === "gulab-jamun")) ? (
                <div className="relative -mx-4 px-4">
                  <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
                    {g.products.map((p) => (
                      <FeaturedSlide
                        key={p.slug}
                        product={p}
                        label={g.label}
                        fullWidth={g.key === "bhail-puri" || g.key === "sweets"}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {g.products.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          {cat === "bhail-puri" && (
            <p className="mt-6 text-sm text-muted-foreground max-w-2xl mx-auto text-center font-semibold">
              Note: For delivery outside Karachi, dry chutney is also available on request.
            </p>
          )}
          {cat === "bhail-puri" || cat === "sweets" ? (
            <div className="mt-10 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-4 px-4">
              {items.map((p) => (
                <FeaturedSlide
                  key={p.slug}
                  product={p}
                  label={cat === "bhail-puri" ? "Bhail Puri" : "Sweets"}
                  fullWidth={cat === "bhail-puri" || cat === "sweets"}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

function FeaturedSlide({
  product,
  label,
  fullWidth = false,
}: {
  product: Product;
  label: string;
  fullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const startingPrice = product.variants[0]?.price ?? 0;

  return (
    <div
      className={`snap-start shrink-0 ${
        fullWidth ? "w-full" : "w-[92%] sm:w-[70%] lg:w-[56%] xl:w-[46%]"
      }`}
    >
      <div
        className={`overflow-hidden bg-card ${
          fullWidth
            ? "rounded-2xl border border-border shadow-soft"
            : "rounded-3xl border border-border shadow-glow"
        }`}
      >
        <button
          type="button"
          className="relative w-full text-left"
          onClick={() => setOpen(true)}
        >
          <div className="relative h-[52vh] sm:h-[58vh] lg:h-[62vh]">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              width={1400}
              height={900}
            />
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="relative h-full flex items-end p-5 sm:p-7">
              <div className="max-w-xl">
                <p className="text-white/85 text-sm font-semibold uppercase tracking-wider">
                  {label}
                </p>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-white">
                  {product.name}
                </h3>
                <p className="mt-2 text-white/85 text-sm sm:text-base line-clamp-2">
                  {product.short}
                </p>

                <div className="mt-4 flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center rounded-full bg-white/10 text-white px-3 py-1 text-sm font-semibold backdrop-blur">
                    From Rs {startingPrice}
                  </span>
                  <Button
                    type="button"
                    className="rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-bold text-sm sm:text-base h-10 px-5 shadow-soft"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpen(true);
                    }}
                  >
                    Order Now!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>

      <ProductModal product={product} open={open} onOpenChange={setOpen} />
    </div>
  );
}
