import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.preload = "auto";
      video.play().catch((err) => {
        console.warn("Autofocus play of MP4 background video interrupted:", err);
      });
    }
  }, []);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!pillRef.current) return;
      
      const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
      
      // High-performance direct style assignments
      pillRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
      
      if (navRef.current) {
        navRef.current.style.transform = `rotateY(${xAxis / 2}deg) rotateX(${-yAxis / 2}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (pillRef.current) {
        pillRef.current.style.transition = "transform 0.5s ease-out";
        pillRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
      }
      if (navRef.current) {
        navRef.current.style.transition = "transform 0.5s ease-out";
        navRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
      }
    };

    const handleMouseEnter = () => {
      if (pillRef.current) {
        pillRef.current.style.transition = "none";
      }
      if (navRef.current) {
        navRef.current.style.transition = "none";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
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
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0c] selection:bg-[#6b5c4a]/30"
      style={{ perspective: "1000px" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap');
        
        .font-plus-jakarta {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .glass-pill {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .fade-in {
          animation: heroFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background Video */}
      <video
        id="hero-bg-video"
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4"
      />

      {/* Ambient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none z-1" />

      {/* Hero Content Main Container */}
      <main className="relative w-full h-full flex flex-col items-center justify-center z-10 pointer-events-none">
        {/* Top Navigation Bar */}
        <header
          ref={navRef}
          className={`pointer-events-auto z-50 glass-pill rounded-full px-4 py-2.5 sm:px-8 sm:py-4 flex items-center justify-center shadow-2xl m-0 transition-all duration-300 max-w-[95vw] sm:max-w-none ${
            isScrolled ? "opacity-0 pointer-events-none -translate-y-4" : "opacity-100 translate-y-0"
          }`}
          style={{ transform: "rotateY(0deg) rotateX(0deg)", transformOrigin: "center center" }}
        >
          <div className="flex items-center justify-center gap-3.5 sm:gap-8 font-plus-jakarta">
            <button
              onClick={() => handleScroll("about")}
              className="text-[9px] sm:text-[11px] font-medium tracking-[0.1em] sm:tracking-[0.15em] text-white/80 hover:text-white transition-colors uppercase cursor-pointer text-center"
            >
              ABOUT
            </button>
            <button
              onClick={() => handleScroll("services")}
              className="text-[9px] sm:text-[11px] font-medium tracking-[0.1em] sm:tracking-[0.15em] text-white/80 hover:text-white transition-colors uppercase cursor-pointer text-center"
            >
              SERVICES
            </button>
            <button
              onClick={() => handleScroll("projects")}
              className="text-[9px] sm:text-[11px] font-medium tracking-[0.1em] sm:tracking-[0.15em] text-white/80 hover:text-white transition-colors uppercase cursor-pointer text-center"
            >
              PROJECTS
            </button>
            
            <button
              onClick={() => handleScroll("contact")}
              className="bg-white text-black text-[9px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.15em] px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full font-bold hover:scale-105 transition-all duration-300 flex items-center gap-1 sm:gap-1.5 shrink-0"
            >
              LET'S TALK <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Consistent Vertical Gap (40–60px) */}
        <div className="h-10 sm:h-12 flex-shrink-0 pointer-events-none" />

        {/* Glassmorphic Pill Visual Card */}
        <div
          id="hero-pill"
          ref={pillRef}
          className="relative pointer-events-auto z-20 glass-pill w-[280px] h-auto max-h-[85vh] md:w-[320px] md:h-[640px] rounded-full flex flex-col items-center py-[clamp(1.5rem,4.5vh,2.5rem)] md:py-12 px-6 md:px-8 fade-in shadow-2xl font-plus-jakarta flex-shrink-0"
          style={{ transform: "rotateY(0deg) rotateX(0deg)" }}
        >
          {/* Avatar Circle Container */}
          <div className="w-[clamp(6.5rem,15vh,8.5rem)] h-[clamp(6.5rem,15vh,8.5rem)] md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/20 shadow-inner mb-[clamp(1rem,3vh,1.75rem)] md:mb-10 shrink-0">
            <img
              alt="Artist Portrait"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3J6eFeEJvVSwZ_bURERbQWdwj6kJIDU46CDxKVy-bdr55j4qNPUVpeuUV0Wt4O-8wUXCF16fuwrBGDL0zaPbQ-mFEECA4xcgsJxR10-itW2Boihf1zkKzb2mzMzzyxMdFobj9j6FS9DlcOJMei9KVLqsRYF_YAtJUKKae9_uVVNuxWTjBSv5IQie7T0SeU9Ab-KwlX5wA9_WXhp17syG6kKzYrJOYYf_vXAuCszacyi4sjbdtr2nEKgJklceb7KB8hfA"
            />
          </div>

          {/* Typography Cluster */}
          <div className="flex-none md:flex-grow flex flex-col items-center text-center space-y-[clamp(0.75rem,2.2vh,1.25rem)] md:space-y-6">
            <div>
              <span className="block text-[9px] sm:text-[10px] font-medium text-white/50 tracking-[0.25em] h-4 mb-0.5 md:mb-1 uppercase">
                destination
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-[2.6rem] text-white font-light tracking-[0.05em] leading-none select-none uppercase">
                nagazaki
              </h1>
            </div>

            <div className="space-y-0.5 md:space-y-1">
              <p className="text-[10px] sm:text-[11px] font-medium text-white/70 tracking-[0.15em] uppercase">
                obsessed with
              </p>
              <p className="text-[11px] sm:text-[12px] font-bold text-white tracking-[0.2em] uppercase">
                DESIGN
              </p>
            </div>

            <div className="pt-1 md:pt-4">
              <p className="text-xs sm:text-sm text-white/60 italic tracking-wider">
                Inspired
              </p>
            </div>
          </div>

          {/* Footer Action & Branding */}
          <div className="w-full mt-[clamp(1.25rem,3.5vh,2.25rem)] md:mt-auto flex flex-col items-center space-y-[clamp(0.75rem,2vh,1.25rem)] md:space-y-8">
            <button
              onClick={() => handleScroll("contact")}
              className="group flex items-center justify-center gap-2 bg-[#2a2929] hover:bg-[#383737] active:scale-95 text-white text-[10px] sm:text-[11px] tracking-[0.15em] font-medium px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span>LET'S TALK</span>
            </button>
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-white/30 uppercase">
              Creativestyle.
            </span>
          </div>
        </div>
      </main>
    </section>
  );
};
