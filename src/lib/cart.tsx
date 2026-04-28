import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  key: string;
  productSlug: string;
  name: string;
  image: string;
  variantLabel: string;
  unitPrice: number;
  grams: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (input: {
    product: Product;
    variant: { label: string; price: number; grams: number };
    quantity: number;
  }) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  checkoutMessage: string;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = "adamnimco_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {
      // ignore invalid persisted data
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem: CartContextValue["addItem"] = ({ product, variant, quantity }) => {
    const key = `${product.slug}__${variant.label}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item,
        );
      }
      return [
        ...prev,
        {
          key,
          productSlug: product.slug,
          name: product.name,
          image: product.image,
          variantLabel: variant.label,
          unitPrice: variant.price,
          grams: variant.grams,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (key: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.key === key ? { ...item, quantity: Math.max(1, Math.min(99, quantity)) } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    [items],
  );

  const checkoutMessage = useMemo(() => {
    if (!items.length) return "Hi Adam Nimco, I'd like to place an order.";
    const lines = items.map(
      (item, index) =>
        `${index + 1}. ${item.name} — ${item.variantLabel} × ${item.quantity} = Rs ${
          item.quantity * item.unitPrice
        }`,
    );
    return `Hi Adam Nimco, I'd like to checkout my cart:\n\n${lines.join("\n")}\n\nTotal Items: ${totalItems}\nGrand Total: Rs ${totalAmount}\n\nPlease confirm availability. Thank you!`;
  }, [items, totalAmount, totalItems]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalAmount,
        checkoutMessage,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
