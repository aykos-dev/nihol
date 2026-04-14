import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import room1 from "@/assets/room-1.jpg";
import room2 from "@/assets/room-2.jpg";
import room3 from "@/assets/room-3.jpg";
import room4 from "@/assets/room-4.jpg";
import room5 from "@/assets/room-5.jpg";
import room6 from "@/assets/room-6.jpg";

export const rooms = [
  { id: 1, name: "Xona 1", description: "4-6 kishilik xususiy xona", image: room1, capacity: "4-6 kishi" },
  { id: 2, name: "Xona 2", description: "6-8 kishilik zamonaviy xona", image: room2, capacity: "6-8 kishi" },
  { id: 3, name: "Xona 3", description: "8-10 kishilik hashamatli xona", image: room3, capacity: "8-10 kishi" },
  { id: 4, name: "Xona 4", description: "12-20 kishilik VIP xona", image: room4, capacity: "12-20 kishi" },
  { id: 5, name: "Xona 5", description: "6-10 kishilik qulay xona", image: room5, capacity: "6-10 kishi" },
  { id: 6, name: "Xona 6", description: "10-14 kishilik bayram xonasi", image: room6, capacity: "10-14 kishi" },
];

const RoomSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section id="rooms" className="py-24 md:py-32 bg-cream">
      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
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
                  <div className="absolute top-4 right-4 bg-gold/90 text-forest-dark px-3 py-1 text-xs font-body tracking-wider uppercase">
                    {room.capacity}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-cream mb-1">{room.name}</h3>
                  <p className="font-editorial text-sm text-cream/50 italic mb-4">{room.description}</p>
                  <button
                    onClick={() => navigate(`/room-service/${room.id}`)}
                    className="w-full px-6 py-2.5 border border-gold/50 text-gold text-sm tracking-widest uppercase font-body hover:bg-gold hover:text-forest-dark transition-all duration-300"
                  >
                    Xonani tanlash
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomSection;
