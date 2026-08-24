import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Hero } from "@/components/sections/Hero";
import { CollectionCards } from "@/components/sections/CollectionCards";
import { BouquetsSection } from "@/components/sections/BouquetsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { CustomOrdersSection } from "@/components/sections/CustomOrdersSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { StoreSection } from "@/components/sections/StoreSection";
import { GoogleReviewsSection } from "@/components/sections/GoogleReviewsSection";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SeoBrowseSection } from "@/components/sections/SeoBrowseSection";

function EventsFallback() {
  return (
    <section id="events" className="section-padding bg-blush/25">
      <div className="container-narrow text-center">
        <p className="text-charcoal/70">Loading events...</p>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-[calc(3.5rem+env(safe-area-inset-bottom))] sm:pb-0">
        <Hero />
        <CollectionCards />
        <BouquetsSection />
        <Suspense fallback={<EventsFallback />}>
          <EventsSection mode="homepage" />
        </Suspense>
        <CustomOrdersSection />
        <AboutSection />
        <HowItWorksSection />
        <StoreSection />
        <GoogleReviewsSection />
        <ContactSection />
        <ServiceAreasSection />
        <FAQSection />
        <SeoBrowseSection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileActionBar />
    </>
  );
}
