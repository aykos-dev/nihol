import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import patternBg from "@/assets/pattern-bg.png";
import room1 from "@/assets/room-1.jpg";
import room2 from "@/assets/room-2.jpg";
import room3 from "@/assets/room-3.jpg";
import room4 from "@/assets/room-4.jpg";
import room5 from "@/assets/room-5.jpg";
import room6 from "@/assets/room-6.jpg";
import room7 from "@/assets/room-7.jpg";

export const rooms = [
  { id: 1, name: "Xona 1", description: "Oilaviy yig'ilishlar uchun qulay xona", image: room1, capacity: "10–14 kishi" },
  { id: 2, name: "Xona 2", description: "Keng va zamonaviy xona", image: room2, capacity: "15–18 kishi" },
  { id: 3, name: "Xona 3", description: "Biznes uchrashuvlar uchun ideal", image: room3, capacity: "15–18 kishi" },
  { id: 4, name: "Xona 4", description: "Yoqimli muhitdagi xona", image: room4, capacity: "10–12 kishi" },
  { id: 5, name: "Xona 5", description: "Do'stlar davrasiga mo'ljallangan", image: room5, capacity: "10–12 kishi" },
  { id: 6, name: "Xona 6", description: "Shinam va xususiy xona", image: room6, capacity: "6–8 kishi" },
  { id: 7, name: "Xona 7", description: "Bayramlar uchun hashamatli xona", image: room7, capacity: "10–12 kishi" },
];

const RoomSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section id="rooms" className="py-24 md:py-32 bg-cream relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url(${patternBg})`, backgroundSize: "400px", backgroundRepeat: "repeat" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">Xususiy xonalar</span>
          <div className="gold-separator mx-auto mt-4 mb-6" />
          <h2 className="font-display text-3xl md:text-5xl text-foreground">Xona Xizmati</h2>
          <p className="font-editorial text-lg text-muted-foreground mt-4 italic max-w-xl mx-auto">
            O'zingizga qulay xonani tanlang va maxsus xizmatdan foydalaning
          </p>
        </motion.div>

        {/* Row 1: 4 items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-5 md:mb-6">
          {rooms.slice(0, 4).map((room, i) => (
            <RoomCard key={room.id} room={room} i={i} inView={inView} onSelect={() => navigate(`/room-service/${room.id}`)} />
          ))}
        </div>
        {/* Row 2: remaining items centered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {rooms.slice(4).map((room, i) => (
            <RoomCard key={room.id} room={room} i={i + 4} inView={inView} onSelect={() => navigate(`/room-service/${room.id}`)} />
          ))}
        </div>
      </div>
    </section>
  );
};

const RoomCard = ({
  room,
  i,
  inView,
  onSelect,
}: {
  room: typeof rooms[0];
  i: number;
  inView: boolean;
  onSelect: () => void;
}) => (
  <motion.div
    className="group"
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: i * 0.08 }}
  >
    <div className="bg-forest-dark rounded-sm overflow-hidden">
      <div className="relative overflow-hidden aspect-[3/2]">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          width={768}
          height={512}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 to-transparent" />
        <div className="absolute top-3 right-3 bg-gold/90 text-forest-dark px-2.5 py-0.5 text-xs font-body tracking-wider uppercase">
          {room.capacity}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg text-cream mb-0.5">{room.name}</h3>
        <p className="font-editorial text-xs text-cream/50 italic mb-3">{room.description}</p>
        <button
          onClick={onSelect}
          className="w-full px-4 py-2 border border-gold/50 text-gold text-xs tracking-widest uppercase font-body hover:bg-gold hover:text-forest-dark transition-all duration-300"
        >
          Xonani tanlash
        </button>
      </div>
    </div>
  </motion.div>
);

export default RoomSection;
