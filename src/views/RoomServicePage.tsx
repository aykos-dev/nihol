"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, ArrowLeft, MessageCircle, Clock3, CircleCheck, ShieldCheck, UtensilsCrossed, Users } from "lucide-react";
import { rooms } from "@/components/RoomSection";
import niholLogo from "@/assets/nihol-logo.png";
import patternBg from "@/assets/pattern-bg.png";
import OptimizedImage from "@/components/media/OptimizedImage";
import { toCdnMediaUrl } from "@/lib/cdn";

const RoomServicePage = () => {
  const router = useRouter();
  const params = useParams<{ roomId: string }>();
  const roomIdNumber = Number(params?.roomId);
  const room = rooms.find((r) => r.id === roomIdNumber);

  if (!room) {
    return (
      <div className="min-h-screen bg-forest-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-cream/50 font-editorial text-lg italic">Xona topilmadi</p>
          <button onClick={() => router.push("/")} className="text-gold mt-4 underline font-body text-sm">
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const phoneNumber = "998712469536";
  const callMessage = `Iltimos, buyurtmani ${room.name}ga olib keling`;

  return (
    <div className="min-h-screen bg-forest-dark relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: `url(${toCdnMediaUrl(patternBg.src, { resourceType: "image" })})`, backgroundSize: "360px", backgroundRepeat: "repeat" }}
      />
      <div className="border-b border-cream/10 py-4 px-6">
        <div className="container mx-auto max-w-4xl flex items-center justify-between relative z-10">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Orqaga
          </button>
          <OptimizedImage src={niholLogo} alt="NIHOL" className="h-11 md:h-12 w-auto" width={144} height={48} sizes="144px" priority />
          <div className="w-16" />
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-12 md:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              className="overflow-hidden rounded-sm border border-gold/30"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <OptimizedImage
                src={room.image}
                alt={`${room.name} rasmi`}
                className="w-full h-64 md:h-80 object-cover"
                width={768}
                height={512}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <div className="flex flex-col justify-center">
              <span className="text-gold text-sm tracking-[0.3em] uppercase font-body mb-2">Tanlangan xona</span>
              <h1 className="font-display text-3xl md:text-4xl text-cream mb-2">{room.name}</h1>
              <p className="font-editorial text-cream/50 italic mb-1">{room.description}</p>
              <p className="font-body text-cream/40 text-sm mb-6">{room.capacity}</p>

              <div className="bg-gold/10 border border-gold/30 rounded-sm p-4 mb-4">
                <p className="font-body text-cream/60 text-xs tracking-wider uppercase mb-1">Operator raqami</p>
                <a href={`tel:${phoneNumber}`} className="font-display text-gold text-2xl hover:text-gold/80 transition-colors">
                  +998 71 246 95 36
                </a>
              </div>
            </div>
          </div>

          <div className="border border-cream/10 rounded-sm p-6 md:p-8 mb-8 bg-forest-dark/40 backdrop-blur-[1px]">
            <h2 className="font-display text-xl text-cream mb-2">Xona haqida muhim ma'lumotlar</h2>
            <p className="font-editorial text-cream/50 italic text-sm mb-6">
              Mehmonlar uchun qulaylik yaratish maqsadida har bir xonada xizmat jarayoni bir xil tartibda ishlaydi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gold/20 bg-cream/5 rounded-sm p-4">
                <div className="flex items-center gap-2 text-gold mb-2">
                  <Clock3 className="w-4 h-4" />
                  <span className="font-body text-xs tracking-[0.2em] uppercase">Xizmat vaqti</span>
                </div>
                <p className="font-body text-sm text-cream/70">Buyurtmalar odatda 15-25 daqiqa ichida xonaga olib boriladi.</p>
              </div>

              <div className="border border-gold/20 bg-cream/5 rounded-sm p-4">
                <div className="flex items-center gap-2 text-gold mb-2">
                  <UtensilsCrossed className="w-4 h-4" />
                  <span className="font-body text-xs tracking-[0.2em] uppercase">Menyu tanlovi</span>
                </div>
                <p className="font-body text-sm text-cream/70">Asosiy taomlar firmennit jo’ja, salat va kaboblar.</p>
              </div>

              <div className="border border-gold/20 bg-cream/5 rounded-sm p-4">
                <div className="flex items-center gap-2 text-gold mb-2">
                  <Users className="w-4 h-4" />
                  <span className="font-body text-xs tracking-[0.2em] uppercase">Sig'im</span>
                </div>
                <p className="font-body text-sm text-cream/70">{room.capacity} uchun mos, oilaviy va do'stona uchrashuvlar uchun qulay.</p>
              </div>

              <div className="border border-gold/20 bg-cream/5 rounded-sm p-4">
                <div className="flex items-center gap-2 text-gold mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-body text-xs tracking-[0.2em] uppercase">Shaxsiy muhit</span>
                </div>
                <p className="font-body text-sm text-cream/70">Yopiq xona formati mehmonlar uchun osoyishta va xususiy muhitni ta'minlaydi.</p>
              </div>
            </div>
          </div>

          <div className="border border-cream/10 rounded-sm p-6 md:p-8 mb-8">
            <h2 className="font-display text-xl text-cream mb-2">Xona xizmati</h2>
            <p className="font-editorial text-cream/50 italic text-sm mb-6">
              Operatorga qo'ng'iroq qiling va buyurtmangizni {room.name}ga yetkazib beramiz
            </p>

            <div className="bg-cream/5 border border-cream/10 rounded-sm p-4 mb-6">
              <p className="font-body text-cream/70 text-sm mb-1">Operator uchun xabar:</p>
              <p className="font-display text-gold text-lg">"{callMessage}"</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${phoneNumber}`}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-gold/90 text-forest-dark font-body text-sm tracking-widest uppercase font-semibold hover:bg-gold transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Operatorga qo'ng'iroq
              </a>
              <a
                href="https://t.me/niholjoja_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 border border-gold/50 text-gold font-body text-sm tracking-widest uppercase hover:bg-gold hover:text-forest-dark transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Telegram orqali
              </a>
            </div>
            <div className="mt-5 flex items-center gap-2 text-cream/50">
              <CircleCheck className="w-4 h-4 text-gold" />
              <p className="font-body text-xs">Band qilishdan oldin operator bilan xona mavjudligini aniqlashtiring.</p>
            </div>
          </div>

          <p className="text-center text-cream/30 text-xs font-body tracking-wider">
            Nihol — Kafe va Restoran · +998 71 246 95 36
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RoomServicePage;
