import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Facebook, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/adam-logo.png";
import { BUSINESS, telLink, waLink } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu", search: { cat: "all" as const } },
  { to: "/menu", label: "Bhail Puri", search: { cat: "bhail-puri" as const } },
  { to: "/menu", label: "Special", search: { cat: "special" as const } },
  { to: "/menu", label: "Regular", search: { cat: "regular" as const } },
  { to: "/menu", label: "Chips", search: { cat: "chips" as const } },
  { to: "/menu", label: "Peanuts", search: { cat: "peanuts" as const } },
  { to: "/menu", label: "Bondi", search: { cat: "bondi" as const } },
  { to: "/menu", label: "Papri", search: { cat: "papri" as const } },
  { to: "/menu", label: "Sweets", search: { cat: "sweets" as const } },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-3 lg:px-6">
        <div className="relative flex items-center justify-between gap-3 h-16 lg:h-20">
          {/* Centered brand title (mobile only — desktop shows nav links here) */}
          <Link
            to="/"
            className="md:hidden absolute left-1/2 -translate-x-1/2 pointer-events-auto"
            onClick={() => setOpen(false)}
            aria-label="Adam Nimco home"
          >
            <span className="font-display text-lg sm:text-xl font-extrabold uppercase bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-tight">
              ADAM NIMCO
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 flex-row-reverse group"
            onClick={() => setOpen(false)}
          >
            <div className="relative">
              <img
                src={logo}
                alt="Adam Nimco logo"
                width={56}
                height={56}
                className="h-9 lg:h-11 w-9 lg:w-11 object-contain drop-shadow-sm group-hover:drop-shadow-md transition-[filter]"
              />
            </div>
            <span className="hidden md:flex flex-col leading-none items-end text-right">
              <span className="font-display text-sm sm:text-base lg:text-lg font-extrabold text-primary">
                Adam Nimco
              </span>
              <span className="text-[9px] sm:text-[10px] lg:text-xs font-bold tracking-[0.2em] text-accent-foreground/70">
                SINCE 1939
              </span>
            </span>
          </Link>

          {/* Desktop nav — visible md+ */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center flex-wrap">
            {links.map((l, i) => (
              <Link
                key={`${l.to}-${l.label}-${i}`}
                to={l.to}
                {...(("search" in l && l.search) ? { search: l.search } : {})}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "bg-primary text-primary-foreground" }}
                inactiveProps={{
                  className: "text-foreground/80 hover:text-primary hover:bg-muted",
                }}
                className="px-2.5 lg:px-3 py-1.5 rounded-full text-[13px] lg:text-sm font-medium transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="rounded-full font-semibold"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="size-4" />
              Cart
              <span className="min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground grid place-items-center text-[10px] font-bold">
                {totalItems}
              </span>
            </Button>
            <a
              href={BUSINESS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="size-9 rounded-full grid place-items-center bg-[#1877F2] text-white hover:bg-[#166FE5] transition-colors shadow-soft"
            >
              <Facebook className="size-4" />
            </a>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full font-semibold bg-background/80 hover:bg-background shadow-soft"
            >
              <a href={waLink("Hi Adam Nimco, I'd like to place an order.")}>
                <WhatsAppIcon className="size-7 animate-whatsapp-bounce drop-shadow-sm" /> WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden pb-4 animate-fade-up">
            <nav className="flex flex-col gap-1 pt-2">
              {links.map((l, i) => (
                <Link
                  key={`${l.to}-${l.label}-${i}`}
                  to={l.to}
                  {...(("search" in l && l.search) ? { search: l.search } : {})}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "bg-primary text-primary-foreground" }}
                  inactiveProps={{ className: "text-foreground/85 hover:bg-muted" }}
                  className="px-4 py-3 rounded-lg text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full shrink-0"
                onClick={() => {
                  setCartOpen(true);
                  setOpen(false);
                }}
              >
                <ShoppingCart className="size-4" />
                Cart
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full shrink-0"
              >
                <a href={telLink(BUSINESS.phones[0])}>
                  <Phone className="size-4" /> Call
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-full bg-background/80 hover:bg-background shrink-0"
              >
                <a href={waLink("Hi Adam Nimco, I'd like to place an order.")}>
                  <WhatsAppIcon className="size-7 animate-whatsapp-bounce drop-shadow-sm" /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-full shrink-0">
                <a
                  href={BUSINESS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="size-4" /> Facebook
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
