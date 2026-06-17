import React, { useState, useEffect, useRef } from "react";
import { FadeIn } from "./FadeIn";
import { AnimatedText } from "./AnimatedText";
import { ContactButton } from "./ContactButton";

export const AboutSection: React.FC = () => {
  const [isIntersected, setIsIntersected] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" } // trigger loading before user arrives
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleScrollToContact = () => {
    // We can show a contact popup or scroll somewhere, let's scroll to projects or smooth alert
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If there's no contact section, scroll back to hero or top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* 4 DECORATIVE 3D IMAGES POSITIONED ABSOLUTELY */}
      {/* 1. Top-left: Moon icon */}
      <div className="absolute top-[3%] left-[2%] sm:left-[3%] md:left-[4%] z-10 select-none pointer-events-none">
        <FadeIn delay={0.1} x={-40} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon 3D Asset"
            referrerPolicy="no-referrer"
            className="w-[50px] sm:w-[110px] md:w-[160px] lg:w-[210px] h-auto object-contain animate-pulse duration-5000"
          />
        </FadeIn>
      </div>

      {/* 2. Bottom-left: 3D object */}
      <div className="absolute bottom-[4%] left-[3%] sm:left-[5%] md:left-[8%] z-10 select-none pointer-events-none">
        <FadeIn delay={0.25} x={-40} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="Abstract Shape 3D Asset"
            referrerPolicy="no-referrer"
            className="w-[45px] sm:w-[95px] md:w-[130px] lg:w-[180px] h-auto object-contain animate-bounce duration-4000"
          />
        </FadeIn>
      </div>

      {/* 3. Top-right: Lego icon */}
      <div className="absolute top-[3%] right-[2%] sm:right-[3%] md:right-[4%] z-10 select-none pointer-events-none">
        <FadeIn delay={0.15} x={40} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego Bracket 3D Asset"
            referrerPolicy="no-referrer"
            className="w-[50px] sm:w-[110px] md:w-[160px] lg:w-[210px] h-auto object-contain animate-pulse duration-3000"
          />
        </FadeIn>
      </div>

      {/* 4. Bottom-right: 3D group */}
      <div className="absolute bottom-[4%] right-[3%] sm:right-[5%] md:right-[8%] z-10 select-none pointer-events-none">
        <FadeIn delay={0.3} x={40} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="Abstract Group 3D Asset"
            referrerPolicy="no-referrer"
            className="w-[60px] sm:w-[115px] md:w-[160px] lg:w-[220px] h-auto object-contain animate-bounce duration-5000"
          />
        </FadeIn>
      </div>

      {/* CENTRALIZED TEXT CONTAINER WITH SECTOR GAPS */}
      <div className="flex flex-col items-center justify-center max-w-[640px] z-20 w-full relative overflow-hidden rounded-[20px] sm:rounded-[28px] border border-white/10 px-4 py-8 sm:px-10 sm:py-12 md:px-12 md:py-16 shadow-2xl">
        {/* Background Video */}
        {isIntersected ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/src/assets/images/about_video_poster_1781670280076.jpg"
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0C0C0C] z-0" />
        )}

        {/* Custom elegant overlay to ensure elite readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-0" />

        {/* Content of the text container */}
        <div className="flex flex-col items-center justify-center w-full relative z-10 text-center animate-fadeIn">
          {/* Heading */}
          <FadeIn delay={0} y={40} duration={0.8} className="w-full text-center">
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[2.2rem] sm:text-[3rem] md:text-[4.2rem] lg:text-[4.8rem] xl:text-[5.5rem]">
              About me
            </h2>
          </FadeIn>

          {/* Space Spacer 1 */}
          <div className="h-6 sm:h-8 md:h-9 w-full" />

          {/* Animated paragraph */}
          <AnimatedText
            text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[500px] text-sm sm:text-base md:text-lg lg:text-[1.2rem]"
          />

          {/* Space Spacer 2 */}
          <div className="h-8 sm:h-10 md:h-12 w-full" />

          {/* Contact button */}
          <FadeIn delay={0.4} y={30} duration={0.8}>
            <ContactButton
              id="about-contact-button"
              className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-11 md:py-4 text-xs sm:text-sm md:text-base shadow-lg"
              onClick={handleScrollToContact}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
