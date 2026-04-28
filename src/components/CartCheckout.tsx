import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/lib/cart";
import { waLink } from "@/lib/contact";

export function CartCheckout() {
  const {
    items,
    totalItems,
    totalAmount,
    updateQuantity,
    removeItem,
    clearCart,
    checkoutMessage,
    cartOpen,
    setCartOpen,
  } = useCart();

  return (
    <>
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="fixed bottom-24 right-5 z-40 rounded-full bg-primary text-primary-foreground shadow-glow px-4 h-12 inline-flex items-center gap-2 hover:scale-105 transition-transform"
        aria-label={`Open cart with ${totalItems} items`}
      >
        <ShoppingCart className="size-5" />
        <span className="text-sm font-bold">Cart</span>
        <span className="min-w-6 h-6 px-1 rounded-full bg-white/20 grid place-items-center text-xs font-extrabold">
          {totalItems}
        </span>
      </button>

      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Your Cart</DialogTitle>
            <DialogDescription>
              Add items from menu, then checkout directly on WhatsApp.
            </DialogDescription>
          </DialogHeader>

          {!items.length ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
              Cart is empty. Add any item with your preferred weight and quantity.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="rounded-xl border border-border p-3 flex items-center gap-3"
                >
                  <img src={item.image} alt={item.name} className="size-14 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-tight">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.variantLabel}</p>
                    <p className="text-sm font-bold text-primary">Rs {item.unitPrice * item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-muted rounded-full p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="size-8 rounded-full bg-background grid place-items-center"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-7 text-center font-bold text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="size-8 rounded-full bg-background grid place-items-center"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="size-9 rounded-full grid place-items-center text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    aria-label="Remove item"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-xl bg-gradient-warm border border-border p-3 flex items-center justify-between">
            <span className="text-sm font-semibold">Total ({totalItems} items)</span>
            <span className="font-display text-2xl font-extrabold text-primary">Rs {totalAmount}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              disabled={!items.length}
              className="flex-1 min-w-[220px] rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-bold"
            >
              <a href={waLink(checkoutMessage)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-6 animate-whatsapp-bounce" /> Checkout on WhatsApp
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={clearCart}
              disabled={!items.length}
            >
              Clear Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
