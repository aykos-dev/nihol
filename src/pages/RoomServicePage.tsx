import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowLeft, MessageCircle } from "lucide-react";
import { rooms } from "@/components/RoomSection";
import niholLogo from "@/assets/nihol-logo.png";

const RoomServicePage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = rooms.find((r) => r.id === Number(roomId));

  if (!room) {
    return (
      <div className="min-h-screen bg-forest-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-cream/50 font-editorial text-lg italic">Xona topilmadi</p>
          <button onClick={() => navigate("/")} className="text-gold mt-4 underline font-body text-sm">
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const phoneNumber = "+998909202454";
  const callMessage = `Iltimos, buyurtmani ${room.name}ga olib keling`;

  return (
    <div className="min-h-screen bg-forest-dark">
      {/* Header */}
      <div className="border-b border-cream/10 py-4 px-6">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Orqaga
          </button>
          <img src={niholLogo} alt="NIHOL" className="h-8 w-auto" />
          <div className="w-16" />
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Room info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="overflow-hidden rounded-sm">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-64 md:h-80 object-cover"
                width={768}
                height={512}
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-gold text-sm tracking-[0.3em] uppercase font-body mb-2">Tanlangan xona</span>
              <h1 className="font-display text-3xl md:text-4xl text-cream mb-2">{room.name}</h1>
              <p className="font-editorial text-cream/50 italic mb-1">{room.description}</p>
              <p className="font-body text-cream/40 text-sm">{room.capacity}</p>
            </div>
          </div>

          {/* Service request */}
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
                href={`https://t.me/+998909202454?text=${encodeURIComponent(callMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 border border-gold/50 text-gold font-body text-sm tracking-widest uppercase hover:bg-gold hover:text-forest-dark transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Telegram orqali
              </a>
            </div>
          </div>

          <p className="text-center text-cream/30 text-xs font-body tracking-wider">
            Nihol — Kafe va Restoran · +998 90 920 24 54
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RoomServicePage;
