import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { BUSINESS, telLink, waLink } from "@/lib/contact";

const CONTACT_URL = "https://adamnimco.com/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Adam Nimco | Visit, Call or WhatsApp" },
      { name: "description", content: "Visit us at Saddar, Karachi or order via call/WhatsApp. Phone: 03243187567, 03341923235." },
      { property: "og:title", content: "Contact Adam Nimco" },
      { property: "og:description", content: "Visit, call or WhatsApp us to place your order." },
      { property: "og:url", content: CONTACT_URL },
    ],
    links: [{ rel: "canonical", href: CONTACT_URL }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(60),
  phone: z.string().trim().min(10, "Enter a valid phone").max(20),
  message: z.string().trim().min(3, "Tell us your order").max(500),
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const msg = `Hi Adam Nimco!\n\nName: ${parsed.data.name}\nPhone: ${parsed.data.phone}\n\nOrder: ${parsed.data.message}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-primary font-bold text-sm uppercase tracking-wider">Get in touch</span>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-2">
          Visit, Call or <span className="text-primary">WhatsApp</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          We're ready to take your order — choose whatever's easiest for you.
        </p>
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-8">
        {/* Quick contact */}
        <div className="rounded-2xl bg-card border border-border shadow-card p-6">
          <h2 className="font-display text-xl font-bold mb-4">Quick Contact</h2>
          <div className="space-y-3">
            {BUSINESS.phones.map((p) => (
              <div key={p} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/60 flex-wrap sm:flex-nowrap">
                <a href={telLink(p)} className="flex items-center gap-3 font-semibold">
                  <span className="size-10 rounded-full bg-primary text-primary-foreground grid place-items-center">
                    <Phone className="size-5" />
                  </span>
                  {p}
                </a>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-full border-whatsapp/40 text-whatsapp hover:bg-whatsapp hover:text-whatsapp-foreground text-xs sm:text-sm font-semibold px-3"
                >
                  <a
                    href={waLink(`Hi Adam Nimco, I'd like to order. (Calling from ${p})`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Click to WhatsApp ${p}`}
                  >
                    <WhatsAppIcon className="size-5" /> Click to WhatsApp
                  </a>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 rounded-xl bg-gradient-warm border border-border">
            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold">Visit Our Shop</h3>
                <p className="text-sm text-muted-foreground mt-1">{BUSINESS.address}</p>
                <Button asChild size="sm" className="mt-3 rounded-full">
                  <a href={BUSINESS.mapLink} target="_blank" rel="noopener noreferrer">
                    <Navigation className="size-4" /> Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-card border border-border shadow-card p-6 lg:p-8">
          <h2 className="font-display text-xl font-bold">Order via Form</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Fill in your details — we'll redirect you to WhatsApp with your message ready.
          </p>
          <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your full name" maxLength={60} className="mt-1.5" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" placeholder="03XX XXXXXXX" maxLength={20} className="mt-1.5" />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>
            <div>
              <Label htmlFor="message">Your Order</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                maxLength={500}
                placeholder="e.g. 500g Bhail Puri + 200g Peanuts"
                className="mt-1.5"
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full border border-whatsapp/40 bg-transparent text-whatsapp hover:bg-whatsapp hover:text-whatsapp-foreground font-bold shadow-soft"
            >
              <WhatsAppIcon className="size-9" /> Send via WhatsApp
            </Button>
          </form>
        </div>

        <div className="rounded-2xl overflow-hidden border border-border shadow-card aspect-[16/9] md:aspect-[16/7] lg:col-span-2">
          <iframe
            title="Adam Nimco shop location"
            src={BUSINESS.mapEmbed}
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
