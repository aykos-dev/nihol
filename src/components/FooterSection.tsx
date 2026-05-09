import niholLogo from "@/assets/nihol-logo.png";
import { Send } from "lucide-react";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FooterSection = () => {
  return (
    <footer className="bg-forest-dark border-t border-accent/10 py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <img src={niholLogo.src} alt="NIHOL" className="h-14 md:h-16 w-auto mb-3" loading="lazy" />
          <p className="font-editorial text-cream/40 italic text-sm mb-6">
            Restourant
          </p>

          <nav className="flex flex-wrap justify-center gap-6 mb-6">
            {[
              { label: "Bosh sahifa", href: "#home" },
              { label: "Biz haqimizda", href: "#about" },
              { label: "Menyu", href: "#menu" },
              { label: "Xonalar", href: "#rooms" },
              { label: "Galereya", href: "#gallery" },
              { label: "Aloqa", href: "#contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-cream/40 hover:text-gold text-xs tracking-widest uppercase font-body transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-5 mb-5">
            <a href="https://t.me/niholjoja_bot" target="_blank" rel="noopener noreferrer" className="text-cream/30 hover:text-gold transition-colors" aria-label="Telegram">
              <Send className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="https://www.instagram.com/nihol_restaurant__?igsh=cms4a3Rsam40eTBq" target="_blank" rel="noopener noreferrer" className="text-cream/30 hover:text-gold transition-colors" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
