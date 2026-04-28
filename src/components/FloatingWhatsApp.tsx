import { waLink } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Hi Adam Nimco, I'd like to place an order.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-5 right-5 z-40 size-16 rounded-full bg-transparent text-foreground grid place-items-center hover:scale-110 transition-transform animate-float"
    >
      <WhatsAppIcon className="size-12 animate-whatsapp-bounce" />
    </a>
  );
}
