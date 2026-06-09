import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export const FloatingNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down more than 120px
      if (window.scrollY > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMenuOpen(false); // Close menu if we scroll back to top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { num: "01", name: "HOME", target: "hero" },
    { num: "02", name: "ABOUT", target: "about" },
    { num: "03", name: "SERVICES / PRICES", target: "services" },
    { num: "04", name: "PROJECTS", target: "projects" },
    { num: "05", name: "LET'S TALK", target: "contact" },
  ];

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-fast {
          animation: marquee 12s linear infinite;
        }
      `}</style>

      <AnimatePresence>
        {isVisible && (
          <div
            id="floating-nav-wrapper"
            className="fixed left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 w-[368px] max-w-[calc(100%-2rem)] md:w-[700px] z-50 select-none"
          >
            {/* Dynamic Expanded Navigation Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  id="floating-nav-dropdown"
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute bottom-[92px] md:bottom-[112px] left-0 right-0 bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-[0_24px_50px_rgba(0,0,0,0.8)] p-5 flex flex-col gap-2 overflow-hidden z-40"
                >
                  <p className="text-[9px] tracking-[0.25em] text-[#D7E2EA]/40 font-black uppercase mb-1.5 px-3">
                    NAVIGATION Menu
                  </p>
                  <div className="flex flex-col gap-1">
                    {navItems.map((item) => (
                      <button
                        key={item.target}
                        id={`floating-nav-item-${item.target}`}
                        onClick={() => handleNavClick(item.target)}
                        className="flex items-center justify-between w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer group"
                      >
                        <span className="font-semibold text-xs sm:text-sm tracking-wide text-[#D7E2EA] group-hover:text-white transition-colors">
                          {item.name}
                        </span>
                        <span className="font-mono text-[9px] sm:text-xs text-[#D7E2EA]/30 group-hover:text-[#D7E2EA]/60 tracking-widest transition-colors">
                          [{item.num}]
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Brand & Small Quick Greeting */}
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between px-3 text-[#D7E2EA]/30 font-mono text-[8px] uppercase tracking-widest">
                    <span>NAGAZAKI © 2026</span>
                    <span>ALL SYSTEMS OPERATIONAL</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Floating Pill / Dock */}
            <motion.div 
              id="floating-nav-pill"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="pl-2 pr-4 md:pr-8 rounded-[20px] md:rounded-[28px] bg-[#111111] border border-white/10 md:border-neutral-800 w-full h-[78px] md:h-[98px] flex items-center justify-between text-[#D7E2EA] relative z-50 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            >
              {/* Left Side: Animated/Cropped Smiley face with Beanie */}
              <div 
                id="floating-nav-avatar"
                className="w-[62px] h-[62px] md:w-[82px] md:h-[82px] bg-[#0c0c0c] rounded-[14px] md:rounded-[18px] border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center relative"
              >
                <video
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-[1.6] origin-center"
                />
              </div>

              {/* Middle Section: Trademark & Continuous Scrolling Marquee Subtitle */}
              <div id="floating-nav-mid" className="flex-1 min-w-0 px-4 md:px-5 flex flex-col justify-center">
                <div className="text-xs sm:text-sm font-black uppercase text-white tracking-[0.2em] leading-none mb-1.5">
                  NAGAZAKI
                </div>
                {/* Custom Gradient-masked Marquee viewport */}
                <div className="relative w-full overflow-hidden h-[14px]">
                  {/* Smooth edge masks */}
                  <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-[#111111] to-transparent z-10" />
                  <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-gradient-to-l from-[#111111] to-transparent z-10" />
                  
                  {/* Double loops to handle native continuous seamless transitions */}
                  <div className="flex w-max whitespace-nowrap animate-marquee-fast">
                    <span className="text-[8.5px] sm:text-[9.5px] uppercase font-bold text-[#D7E2EA]/15 tracking-widest pr-4 select-none">
                      3D DESIGNER • CREATIVE CODER • BRAND CRAFTSMAN • MOTION THINKER •
                    </span>
                    <span className="text-[8.5px] sm:text-[9.5px] uppercase font-bold text-[#D7E2EA]/15 tracking-widest pr-4 select-none">
                      3D DESIGNER • CREATIVE CODER • BRAND CRAFTSMAN • MOTION THINKER •
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Elegant Let's Talk Button & Menu Trigger Button */}
              <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">
                <button
                  id="floating-nav-letstalk-btn"
                  onClick={() => handleNavClick("contact")}
                  className="inline-flex items-center justify-center h-10 md:h-12 px-3.5 md:px-5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] bg-amber-400 hover:bg-amber-300 active:scale-95 text-black rounded-lg md:rounded-xl transition-all duration-300 cursor-pointer shadow-md"
                >
                  LET&apos;S TALK
                </button>

                <button
                  id="floating-nav-menu-btn"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 hover:bg-white/5 active:bg-white/10 rounded-full transition-all cursor-pointer relative"
                  aria-label="Toggle Navigation Menu"
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -45 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.15 }}
                      >
                        <X className="w-4.5 h-4.5 md:w-5 md:h-5 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="dots"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col gap-[4px] items-center"
                      >
                        {/* Premium Custom Hamburger bars */}
                        <div className="w-4.5 md:w-5 h-[2px] bg-white rounded-full" />
                        <div className="w-4.5 md:w-5 h-[2px] bg-white rounded-full" />
                        <div className="w-4.5 md:w-5 h-[2px] bg-white rounded-full" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
