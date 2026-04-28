import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Facebook } from "lucide-react";
import logo from "@/assets/adam-logo.png";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { BUSINESS, telLink, waLink } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-br from-secondary/80 via-secondary/55 to-primary/10">
      <div className="container mx-auto px-4 lg:px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Adam Nimco"
              width={56}
              height={72}
              className="h-14 w-auto object-contain"
              loading="lazy"
            />
            <div className="leading-tight">
              <p className="font-display text-lg font-extrabold text-primary">Adam Nimco</p>
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground">
                SINCE 1939
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Fresh nimco, snacks & sweets — handcrafted daily at our Saddar shop.
          </p>
          <a
            href={BUSINESS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-3 py-2 rounded-full bg-[#1877F2] text-white hover:bg-[#166FE5] text-sm font-semibold transition-colors shadow-soft"
          >
            <Facebook className="size-4" /> Follow on Facebook
          </a>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/special" className="text-muted-foreground hover:text-primary">
                Special Items
              </Link>
            </li>
            <li>
              <Link to="/menu" search={{ cat: "all" }} className="text-muted-foreground hover:text-primary">
                Full Menu
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-primary">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {BUSINESS.phones.map((p) => (
              <li key={p}>
                <a
                  href={telLink(p)}
                  className="inline-flex items-center gap-2 hover:text-primary"
                >
                  <Phone className="size-4" /> {p}
                </a>
              </li>
            ))}
            <li>
              <a
                href={waLink("Hi Adam Nimco!")}
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <WhatsAppIcon className="size-6" /> WhatsApp Order
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="size-4 mt-0.5 shrink-0" />
              <span>{BUSINESS.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {BUSINESS.name} — Since 1939. Crafted with <a href="https://techodix.site/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TECHODIX</a> in Karachi.
      </div>
    </footer>
  );
}
