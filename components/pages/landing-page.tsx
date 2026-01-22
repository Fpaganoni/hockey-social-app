"use client";

import { NavbarLanding } from "@/components/landing/navbar-landing";
import { FooterLanding } from "@/components/landing/footer-landing";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { AboutSection } from "@/components/landing/about-section";
import { StatsSection } from "@/components/landing/stats-section";
import { CtaSection } from "@/components/landing/cta-section";

export function LandingPage() {
  return (
    <div className="min-h-screen ">
      <NavbarLanding />

      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <StatsSection />
        <CtaSection />
      </main>

      <FooterLanding />
    </div>
  );
}
