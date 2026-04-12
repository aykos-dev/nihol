import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-forest-dark">
      <div className="container mx-auto px-6 max-w-5xl" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">Biz bilan bog'laning</span>
          <div className="gold-separator mx-auto mt-4 mb-6" />
          <h2 className="font-display text-3xl md:text-5xl text-cream">Joy Band Qilish</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-cream text-lg mb-1">Manzil</h3>
                <p className="font-body text-cream/50 text-sm">123 The Mountain Quincy,<br />Illinois PA 12345</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-gold mt-1 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-cream text-lg mb-1">Telefon</h3>
                <p className="font-body text-cream/50 text-sm">+998 90 920 24 54<br />nihol.uz</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-gold mt-1 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-cream text-lg mb-1">Ish vaqti</h3>
                <p className="font-body text-cream/50 text-sm">
                  Dush – Juma: 10:00 – 23:00<br />
                  Shanba – Yakshanba: 10:00 – 00:00
                </p>
              </div>
            </div>

            <div className="w-full h-48 bg-cream/5 border border-cream/10 flex items-center justify-center mt-6 rounded-sm">
              <span className="text-cream/20 text-sm tracking-widest uppercase font-body">Xarita</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-display text-2xl text-gold mb-3">Rahmat!</h3>
                  <p className="font-editorial text-cream/60 italic">Tez orada siz bilan bog'lanamiz.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    required
                    className="w-full bg-transparent border-b border-cream/20 text-cream font-body text-sm py-3 px-0 placeholder:text-cream/30 focus:border-gold focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Familiyangiz"
                    required
                    className="w-full bg-transparent border-b border-cream/20 text-cream font-body text-sm py-3 px-0 placeholder:text-cream/30 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Telefon raqamingiz"
                  required
                  className="w-full bg-transparent border-b border-cream/20 text-cream font-body text-sm py-3 px-0 placeholder:text-cream/30 focus:border-gold focus:outline-none transition-colors"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="date"
                    required
                    className="w-full bg-transparent border-b border-cream/20 text-cream font-body text-sm py-3 px-0 focus:border-gold focus:outline-none transition-colors"
                  />
                  <select
                    required
                    className="w-full bg-transparent border-b border-cream/20 text-cream/50 font-body text-sm py-3 px-0 focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="">Mehmonlar soni</option>
                    <option value="1">1 kishi</option>
                    <option value="2">2 kishi</option>
                    <option value="3">3 kishi</option>
                    <option value="4">4 kishi</option>
                    <option value="5">5+ kishi</option>
                  </select>
                </div>
                <textarea
                  placeholder="Maxsus istaklar"
                  rows={3}
                  className="w-full bg-transparent border-b border-cream/20 text-cream font-body text-sm py-3 px-0 placeholder:text-cream/30 focus:border-gold focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 bg-gold/90 text-forest-dark text-sm tracking-widest uppercase font-body font-semibold hover:bg-gold transition-all duration-300"
                >
                  Joy band qilish
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
