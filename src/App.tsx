/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { HeroSection } from "./components/HeroSection";
import { MarqueeSection } from "./components/MarqueeSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { FloatingNav } from "./components/FloatingNav";
import { Preloader } from "./components/Preloader";

export default function App() {
  return (
    <Preloader>
      <main
        className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans antialiased w-full select-none"
        style={{ overflowX: "clip" }}
      >
        {/* 0. Floating Bottom Pill Navigation */}
        <FloatingNav />

        {/* 1. HeroSection */}
        <HeroSection />

        {/* 2. MarqueeSection */}
        <MarqueeSection />

        {/* 3. AboutSection */}
        <AboutSection />

        {/* 4. ServicesSection */}
        <ServicesSection />

        {/* 5. ProjectsSection */}
        <ProjectsSection />

        {/* 6. ContactSection / Let's Talk */}
        <ContactSection />
        
        {/* Footer copyright section - humble and clean */}
        <footer className="bg-[#0C0C0C] text-[#D7E2EA]/30 text-xs py-10 text-center tracking-widest uppercase select-none border-t border-[#D7E2EA]/5">
          &copy; {new Date().getFullYear()} NAGAZAKI. ALL RIGHTS RESERVED.
        </footer>
      </main>
    </Preloader>
  );
}
