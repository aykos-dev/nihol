import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-32 bg-forest-dark">
      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">Biz bilan bog'laning</span>
          <div className="gold-separator mx-auto mt-4 mb-6" />
          <h2 className="font-display text-3xl md:text-5xl text-cream">Aloqa</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Info */}
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
                <p className="font-body text-cream/50 text-sm">Toshkent shahar, Yunusobod tumani</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-gold mt-1 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-cream text-lg mb-1">Telefon</h3>
                <p className="font-body text-cream/50 text-sm">+998 90 920 24 54</p>
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
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-full h-[350px] rounded-sm overflow-hidden border border-cream/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.25!3d41.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE5JzQ4LjAiTiA2OcKwMTUnMDAuMCJF!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nihol joylashuvi"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
