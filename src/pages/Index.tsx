import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import RoomSection from "@/components/RoomSection";
import ExperienceSection from "@/components/ExperienceSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <RoomSection />
      <ExperienceSection />
      <GallerySection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
