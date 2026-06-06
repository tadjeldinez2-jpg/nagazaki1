import React, { useState, useEffect } from "react";
import { FadeIn } from "./FadeIn";
import { Magnet } from "./Magnet";
import { ContactButton } from "./ContactButton";

export const HeroSection: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-between overflow-hidden bg-[#0C0C0C] px-6 md:px-10 pb-7 sm:pb-8 md:pb-10"
      style={{ overflowX: "clip" }}
    >
      {/* 1. NAVBAR - fixed and hides on scroll */}
      <div className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 pt-4 md:pt-6 transition-all duration-300 ease-in-out ${
        isScrolled ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}>
        <FadeIn delay={0} y={-20} duration={0.7} as="nav" className="w-full max-w-[1200px] mx-auto">
          <div 
            id="navbar" 
            className="flex items-center justify-between w-full h-14 md:h-16 px-4 md:px-6 bg-[#161616]/60 backdrop-blur-md border border-[#D7E2EA]/10 rounded-full relative"
          >
            {/* Left portion: Logo & Navigation Links closely grouped */}
            <div className="flex items-center gap-6 md:gap-10">
              {/* Logo / Brand Name */}
              <span 
                className="text-xs md:text-sm lg:text-[1.1rem] font-black uppercase tracking-widest text-[#D7E2EA] cursor-pointer hover:opacity-85 transition-opacity duration-200"
                onClick={() => handleScroll("hero")}
              >
                NAGAZAKI©
              </span>

              {/* Navigation Links (closely aligned next to Brand name, exactly like the image) */}
              <div className="hidden sm:flex items-center gap-4 md:gap-6 lg:gap-8">
                <button
                  id="nav-about-link"
                  onClick={() => handleScroll("about")}
                  className="text-[10px] md:text-xs lg:text-[0.9rem] font-bold uppercase tracking-wider text-[#D7E2EA]/75 hover:text-[#D7E2EA] transition-all duration-200 cursor-pointer"
                >
                  ABOUT
                </button>
                <button
                  id="nav-price-link"
                  onClick={() => handleScroll("services")}
                  className="text-[10px] md:text-xs lg:text-[0.9rem] font-bold uppercase tracking-wider text-[#D7E2EA]/75 hover:text-[#D7E2EA] transition-all duration-200 cursor-pointer"
                >
                  PRICE
                </button>
                <button
                  id="nav-projects-link"
                  onClick={() => handleScroll("projects")}
                  className="text-[10px] md:text-xs lg:text-[0.9rem] font-bold uppercase tracking-wider text-[#D7E2EA]/75 hover:text-[#D7E2EA] transition-all duration-200 cursor-pointer"
                >
                  PROJECTS
                </button>
              </div>
            </div>

            {/* Right portion: Secondary Link and CTA Button */}
            <div className="flex items-center gap-4 md:gap-6">
              <ContactButton
                id="nav-contact-button"
                onClick={() => handleScroll("about")}
                className="px-3 py-1.5 md:px-5 md:py-2 text-[10px] md:text-xs lg:text-[0.85rem]"
              />
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="w-full h-14 md:h-16 pt-4 md:pt-6 flex-shrink-0" /> {/* Spacer keeping hero proportion constant */}

      {/* 3. HERO PORTRAIT (Positioned absolutely left-1/2 bottom-0) */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 z-20 w-[240px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[500px] 
                   top-1/2 -translate-y-[35%] sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto"
      >
        <FadeIn delay={0.6} y={30} duration={0.9}>
          <Magnet
            padding={150}
            strength={3.5}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="flex justify-center"
          >
            <img
              id="hero-portrait-img"
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Nagazaki Portrait"
              loading="eager"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-pulse-slow"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 2. HERO HEADING */}
      <div className="flex-1 flex flex-col justify-start pt-10 sm:pt-14 md:pt-20 relative z-10">
        <div className="w-full text-center overflow-hidden px-4">
          <FadeIn delay={0.15} y={40} duration={0.8}>
            <h1 className="font-black uppercase tracking-tighter leading-[0.95] w-full text-[8.5vw] sm:text-[7.5vw] md:text-[6.5vw] lg:text-[6vw] select-none flex flex-col items-center justify-center gap-1 sm:gap-2">
              <span className="hero-heading block text-[#D7E2EA] opacity-90">
                I&apos;M{" "}
                <span 
                  className="inline-block bg-gradient-to-r from-[#B600A8] via-[#E23E57] to-[#FF8A00] bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  NAGAZAKI
                </span>
              </span>
              <span className="hero-heading block text-[#D7E2EA] opacity-90">
                AND I&apos;M OBSESSED WITH{" "}
                <span 
                  className="inline-block bg-gradient-to-r from-[#B600A8] via-[#E23E57] to-[#FF8A00] bg-clip-text text-transparent font-black"
                  style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  WEB DESIGNING
                </span>
              </span>
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* 4. BOTTOM BAR */}
      <div className="flex justify-between items-end w-full relative z-25 pb-4 sm:pb-6 md:pb-8">
        {/* Left text */}
        <FadeIn delay={0.35} y={20} duration={0.8} className="max-w-[170px] sm:max-w-[240px] md:max-w-[280px]">
          <p className="text-[#D7E2EA] font-semibold uppercase tracking-widest leading-relaxed text-[0.65rem] sm:text-[0.75rem] md:text-[0.85rem] lg:text-[0.95rem]">
            A 3D CREATOR DRIVEN BY<br />
            CRAFTING STRIKING AND<br />
            UNFORGETTABLE PROJECTS
          </p>
        </FadeIn>

        {/* Right Button */}
        <FadeIn delay={0.5} y={20} duration={0.8}>
          <ContactButton
            id="hero-bottom-contact-button"
            variant="gradient"
            className="px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-3.5 text-[10px] sm:text-xs md:text-sm lg:text-base"
            onClick={() => handleScroll("about")}
          />
        </FadeIn>
      </div>
    </section>
  );
};
