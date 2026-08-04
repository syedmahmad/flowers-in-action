import { Suspense } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Hero } from "@/components/sections/Hero";
import { CategoryNav } from "@/components/sections/CategoryNav";
import { ShopSection } from "@/components/shop/ShopSection";
import { OccasionsSection } from "@/components/sections/OccasionsSection";
import { FlowersSection } from "@/components/sections/FlowersSection";
import { WeddingsSection } from "@/components/sections/WeddingsSection";
import { CustomOrdersSection } from "@/components/sections/CustomOrdersSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { StoreSection } from "@/components/sections/StoreSection";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";

function ShopFallback() {
  return (
    <section id="shop" className="section-padding bg-blush/30">
      <div className="container-narrow text-center">
        <p className="text-charcoal/70">Loading shop...</p>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pb-[calc(3.5rem+env(safe-area-inset-bottom))] sm:pb-0">
        <Hero />
        <CategoryNav />
        <Suspense fallback={<ShopFallback />}>
          <ShopSection />
        </Suspense>
        <OccasionsSection />
        <FlowersSection />
        <WeddingsSection />
        <CustomOrdersSection />
        <AboutSection />
        <HowItWorksSection />
        <StoreSection />
        <ServiceAreasSection />
        <FAQSection />
        <TestimonialsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileActionBar />
    </>
  );
}
