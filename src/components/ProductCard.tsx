import { Phone } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/adam-badge.png";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { telLink, waLink, BUSINESS } from "@/lib/contact";
import type { Product } from "@/lib/products";
import { ProductModal } from "./ProductModal";

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const [open, setOpen] = useState(false);
  const startingPrice = product.variants[0].price;

  return (
    <>
      <article
        className={`group relative bg-card rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full min-w-0 ${
          featured ? "min-w-[280px] md:min-w-0" : ""
        }`}
        onClick={() => setOpen(true)}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={800}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.badges && product.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badges.map((b) => (
                <span
                  key={b}
                  className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary text-primary-foreground shadow-soft backdrop-blur"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
          <img
            src={logo}
            alt=""
            aria-hidden
            className="absolute bottom-2 right-2 h-10 w-auto"
          />
        </div>

        <div className="p-4 space-y-3 flex flex-col flex-1">
          <div className="space-y-1.5 min-w-0">
            <h3 className="font-display font-bold text-base sm:text-lg leading-tight line-clamp-2 min-h-[2.5rem] sm:min-h-[3.2rem]">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">{product.short}</p>
          </div>

          <div className="flex items-baseline justify-between gap-3">
            <span className="text-xs text-muted-foreground">From</span>
            <span className="font-display text-lg sm:text-xl font-extrabold text-primary whitespace-nowrap">
              Rs {startingPrice}
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
            <Button
              size="sm"
              className="w-full rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-bold h-10 text-sm whitespace-nowrap"
              onClick={() => setOpen(true)}
            >
              <WhatsAppIcon className="size-6 animate-whatsapp-bounce" /> Order Now!
            </Button>
            <Button asChild size="sm" variant="outline" className="rounded-full h-10 px-4">
              <a href={telLink(BUSINESS.phones[0])} aria-label={`Call to order ${product.name}`}>
                <Phone className="size-4" /> Call
              </a>
            </Button>
          </div>
        </div>
      </article>

      <ProductModal product={product} open={open} onOpenChange={setOpen} />
    </>
  );
}
