import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import type { Product } from "@/lib/products";
import { BUSINESS, telLink, waLink } from "@/lib/contact";
import logo from "@/assets/adam-badge.png";
import { useCart } from "@/lib/cart";

export function ProductModal({
  product,
  open,
  onOpenChange,
  onAddedToCart,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAddedToCart?: () => void;
}) {
  const [variantIdx, setVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  const variant = product.variants[variantIdx];
  const total = useMemo(() => variant.price * qty, [variant, qty]);

  const message = `Hi Adam Nimco, I'd like to order:\n\n• ${product.name} — ${variant.label} × ${qty}\n• Total: Rs ${total}\n\nPlease confirm availability. Thank you!`;

  useEffect(() => {
    if (open) {
      setVariantIdx(0);
      setQty(1);
    }
  }, [open, product.slug]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl p-0 gap-0 max-h-[min(88vh,680px)] overflow-y-auto rounded-2xl border border-border shadow-card">
        <div className="grid md:grid-cols-2 h-full">
          <div className="bg-gradient-warm overflow-hidden md:border-r border-border">
            <div className="w-full h-full flex items-center justify-center p-3 sm:p-4">
              <div className="relative w-full h-full rounded-xl border border-border/70 bg-card/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-3">
                <img
                  src={product.image}
                  alt={product.name}
                  width={1200}
                  height={1200}
                  className="max-w-full max-h-[22vh] sm:max-h-[26vh] md:max-h-[300px] object-contain"
                />
                <img
                  src={logo}
                  alt=""
                  aria-hidden
                  className="absolute bottom-2 right-2 h-9 w-auto opacity-95"
                />
              </div>
            </div>
          </div>
          <div className="p-3 md:p-4 flex flex-col min-h-0">
            <DialogHeader className="text-left space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {product.badges?.map((b) => (
                  <span key={b} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent text-accent-foreground">
                    {b}
                  </span>
                ))}
              </div>
              <DialogTitle className="font-display text-2xl">{product.name}</DialogTitle>
              <DialogDescription className="text-sm">{product.description}</DialogDescription>
            </DialogHeader>

            {product.slug === "bhail-puri-liquid" && (
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-semibold">
                Note: For delivery outside Karachi, dry chutney is also available on request.
              </p>
            )}

            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Choose size
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.label}
                    onClick={() => setVariantIdx(i)}
                    className={`rounded-xl border-2 px-3 py-2.5 text-center transition-all ${
                      i === variantIdx
                        ? "border-primary bg-primary/10 shadow-soft"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-bold text-sm">{v.label}</div>
                    <div className="text-xs text-muted-foreground">Rs {v.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Quantity
              </p>
              <div className="flex items-center gap-1 bg-muted rounded-full p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="size-8 rounded-full bg-background grid place-items-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-8 text-center font-bold tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="size-8 rounded-full bg-background grid place-items-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded-xl bg-gradient-warm border border-border flex items-baseline justify-between">
              <span className="text-sm font-medium">Total</span>
              <span className="font-display text-2xl font-extrabold text-primary">Rs {total}</span>
            </div>

            <div className="mt-auto pt-3 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 grid grid-cols-[1fr_1fr_auto] gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full font-semibold h-9 text-xs sm:text-sm"
                onClick={() => {
                  addItem({ product, variant, quantity: qty });
                  onAddedToCart?.();
                  onOpenChange(false);
                }}
              >
                Add to Cart
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full bg-background/80 hover:bg-background font-semibold shadow-soft h-9 text-xs sm:text-sm"
              >
                <a href={waLink(message)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5 sm:size-6 animate-whatsapp-bounce" /> WhatsApp Order
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full h-9 w-9 p-0 shrink-0" size="icon">
                <a href={telLink(BUSINESS.phones[0])} aria-label="Call to order">
                  <Phone className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
