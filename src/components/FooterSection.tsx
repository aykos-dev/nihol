import niholLogo from "@/assets/nihol-logo.png";
import { Instagram, Facebook, Send } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-forest-dark border-t border-accent/10 py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <img src={niholLogo} alt="NIHOL" className="h-12 w-auto mb-4" loading="lazy" />
          <p className="font-editorial text-cream/40 italic text-sm mb-2">
            — kafe va restoran —
          </p>
          <p className="font-editorial text-cream/30 text-xs mb-8">
            Nafosatni his eting
          </p>

          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { label: "Bosh sahifa", href: "#home" },
              { label: "Biz haqimizda", href: "#about" },
              { label: "Menyu", href: "#menu" },
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

          <div className="flex gap-5 mb-10">
            <a href="#" className="text-cream/30 hover:text-gold transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="#" className="text-cream/30 hover:text-gold transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="#" className="text-cream/30 hover:text-gold transition-colors" aria-label="Telegram">
              <Send className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>

          <div className="w-full h-px bg-cream/10 mb-6" />
          <p className="text-cream/20 text-xs font-body tracking-wider">
            © {new Date().getFullYear()} Nihol. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
