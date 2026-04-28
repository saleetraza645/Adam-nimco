import whatsappLogo from "@/assets/whatsapp-logo.png";

export function WhatsAppIcon({
  className,
  title = "WhatsApp",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <img
      src={whatsappLogo}
      alt={title}
      className={className}
      draggable={false}
      loading="lazy"
    />
  );
}

