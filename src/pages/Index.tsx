import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import MenuSection from "@/components/MenuSection";
import RoomSection from "@/components/RoomSection";
import GallerySection from "@/components/GallerySection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <HeroSection />
      <ContactSection />
      <AboutSection />
      <MenuSection />
      <RoomSection />
      <GallerySection />
      <FooterSection />
    </div>
  );
};

export default Index;
