import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CartCheckout } from "@/components/CartCheckout";
import fullLogo from "@/assets/adam-logo.png";
import { BUSINESS } from "@/lib/contact";
import { CartProvider } from "@/lib/cart";

import appCss from "../styles.css?url";

const SITE_URL = "https://adamnimco.com";
const SITE_TITLE = "Adam Nimco — Fresh Nimco, Snacks & Sweets in Saddar Karachi";
const SITE_DESCRIPTION =
  "Since 1939, Adam Nimco serves fresh nimco, bhail puri, papri, peanuts and sweets in Saddar Karachi. Order quickly on WhatsApp.";
const OG_IMAGE = `${SITE_URL}${fullLogo}`;
const LOCAL_BUSINESS_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: BUSINESS.name,
  image: OG_IMAGE,
  telephone: BUSINESS.phones,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address,
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: [BUSINESS.facebook],
  url: SITE_URL,
  servesCuisine: "Snacks",
  areaServed: "Karachi",
  priceRange: "$$",
});
const WEBSITE_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BUSINESS.name,
  url: SITE_URL,
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-extrabold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The snack you're looking for isn't here.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      {
        name: "description",
        content: SITE_DESCRIPTION,
      },
      { name: "keywords", content: "Adam Nimco, nimco Karachi, bhail puri Karachi, snacks Saddar, sweets Karachi, papri, peanuts, fresh nimco" },
      { name: "author", content: BUSINESS.name },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#d63838" },
      { property: "og:site_name", content: BUSINESS.name },
      { property: "og:locale", content: "en_PK" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", href: fullLogo, type: "image/png" },
      { rel: "apple-touch-icon", href: fullLogo },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script type="application/ld+json">{LOCAL_BUSINESS_JSON_LD}</script>
        <script type="application/ld+json">{WEBSITE_JSON_LD}</script>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CartCheckout />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}
