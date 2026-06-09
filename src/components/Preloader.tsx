import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  children: React.ReactNode;
}

export const Preloader: React.FC<PreloaderProps> = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Check sessionStorage immediately on mount
  useEffect(() => {
    const played = sessionStorage.getItem("nagazaki-preloader-played-v2");
    if (played === "true") {
      setHasPlayed(true);
      setIsLoaded(true);
    }
  }, []);

  // Set up asset preloading and progress interval
  useEffect(() => {
    if (hasPlayed) return;

    // List of critical creative assets to prefetch
    const criticalAssets = [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3J6eFeEJvVSwZ_bURERbQWdwj6kJIDU46CDxKVy-bdr55j4qNPUVpeuUV0Wt4O-8wUXCF16fuwrBGDL0zaPbQ-mFEECA4xcgsJxR10-itW2Boihf1zkKzb2mzMzzyxMdFobj9j6FS9DlcOJMei9KVLqsRYF_YAtJUKKae9_uVVNuxWTjBSv5IQie7T0SeU9Ab-KwlX5wA9_WXhp17syG6kKzYrJOYYf_vXAuCszacyi4sjbdtr2nEKgJklceb7KB8hfA" // Hero Avatar
    ];

    const criticalVideos = [
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4", // Hero Background Video
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4", // Avatar Smiley Beanie
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4", // About Section Background Video
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4", // Services Concept Web3D Video
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4", // Services Motion Video
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4", // Services Interaction Video
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_101827_abebfeec-f243-466b-b494-7f6814c0fbbf.mp4"  // Services Concept Direction Video
    ];

    let loadedCount = 0;
    const totalAssets = criticalAssets.length + criticalVideos.length;

    // Trigger image preload promises
    const imagePromises = criticalAssets.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          resolve();
        };
        img.onerror = () => {
          loadedCount++; // Fail silently so page isn't blocked
          resolve();
        };
      });
    });

    // Trigger video preload promises with native HTML5 pipeline caching
    const videoPromises = criticalVideos.map((src) => {
      return new Promise<void>((resolve) => {
        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;

        const onReady = () => {
          loadedCount++;
          resolve();
          video.removeEventListener("canplaythrough", onReady);
          video.removeEventListener("error", onError);
        };
        const onError = () => {
          loadedCount++; // Fail silently so page isn't blocked
          resolve();
          video.removeEventListener("canplaythrough", onReady);
          video.removeEventListener("error", onError);
        };

        video.addEventListener("canplaythrough", onReady);
        video.addEventListener("error", onError);
        video.load();
      });
    });

    const preloadPromises = [...imagePromises, ...videoPromises];

    // Check if system fonts are ready
    const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();

    // High performance ticker logic for super-fluid counter animation
    let targetProgress = 0;
    const intervalTime = 16; // ~60fps ticker
    const duration = 2800; // ~2.8s total maximum time
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      // Calculate active preloading weight
      const preloadingWeight = totalAssets > 0 ? (loadedCount / totalAssets) * 80 : 80;
      // Synthesize a fluid natural acceleration as assets load
      targetProgress = Math.min(
        99,
        targetProgress + step * (1 + (preloadingWeight / 100) * 1.5)
      );

      // Smooth step ease tracking
      setProgress((prev) => {
        const next = prev + (targetProgress - prev) * 0.15;
        return next >= 98.7 ? 100 : Math.ceil(next);
      });
    }, intervalTime);

    // Coordinate complete release
    Promise.all([...preloadPromises, fontsPromise]).then(() => {
      // Accelerate the counter to 100% when everything is loaded
      targetProgress = 100;
    });

    return () => clearInterval(timer);
  }, [hasPlayed]);

  // Handle final reveal sequence
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsLoaded(true);
        sessionStorage.setItem("nagazaki-preloader-played-v2", "true");
      }, 700); // Cinematic holding phase at 100%
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  // Respect system reduced-motion preference
  const systemReducedMotion = 
    typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Let's check if the preloader has already finished
  if (hasPlayed) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <motion.div
            id="premium-preloader"
            role="dialog"
            aria-label="Loading portfolio"
            initial={{ opacity: 1, y: 0 }}
            exit={
              systemReducedMotion
                ? { opacity: 0 }
                : {
                    y: "-100%",
                    transition: {
                      duration: 0.95,
                      ease: [0.76, 0, 0.24, 1] // Elite cubic bezier formula for fluid curtain lifts
                    }
                  }
            }
            className="fixed inset-0 z-[9999] w-full h-full bg-[#FAFAFA] text-[#0C0C0C] flex flex-col justify-between p-8 sm:p-14 overflow-hidden select-none"
          >
            {/* Elegant fine-line decorative layout frames (Awwwards design mode) */}
            <div className="absolute inset-x-8 sm:inset-x-14 top-0 h-[1px] bg-black/5" />
            <div className="absolute inset-x-8 sm:inset-x-14 bottom-0 h-[1px] bg-black/5" />
            <div className="absolute inset-y-0 left-8 sm:left-14 w-[1px] bg-black/5" />
            <div className="absolute inset-y-0 right-8 sm:right-14 w-[1px] bg-black/5" />

            {/* TOP HEADER DETAILS */}
            <div className="w-full flex justify-between items-start font-primary text-[10px] tracking-[0.25em] uppercase text-black/40 z-10">
              <div className="flex flex-col gap-1">
                <span>NAGAZAKI STUDIO</span>
                <span className="text-black/25">PORTFOLIO v2.0</span>
              </div>
              <div className="text-right flex flex-col gap-1">
                <span>CREATIVE DIRECTION</span>
                <span className="text-black/25">TOKYO / GLOBAL</span>
              </div>
            </div>

            {/* HIGH-END INTERACTIVE CENTER ANIMATION */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-10">
              <motion.div
                initial={systemReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.91 }}
                animate={systemReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-6"
              >
                {/* Custom Minimal Monoline Drawing Logo Emblem */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  {/* Dynamic spinning fine geometric boundaries */}
                  <div className="absolute inset-0 rounded-full border border-black/5 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full border-[1.5px] border-dashed border-black/15 animate-[spin_6s_linear_infinite_reverse]" />
                  
                  {/* Styled central gothic/cinzel letter transition */}
                  <span className="absolute text-3xl font-display font-black tracking-widest text-[#0C0C0C] select-none text-center">
                    N
                  </span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <h2 className="text-base sm:text-lg font-bold font-primary tracking-[0.35em] text-[#0c0c0c] uppercase">
                    NAGAZAKI
                  </h2>
                  <p className="text-[9px] font-mono tracking-[0.4em] text-black/35 uppercase mt-1">
                    EST. 2023 / INNOVATING IN WEB3D
                  </p>
                </div>
              </motion.div>
            </div>

            {/* BOTTOM FOOTER LOGIC - HIGH-END PERCENTAGE STREAM */}
            <div className="w-full flex justify-between items-end z-10">
              <div className="font-primary text-[10px] uppercase text-black/35 tracking-wider hidden sm:block">
                <span>LOADING INTELLECTUAL EXPERIENCE...</span>
                <div className="w-48 h-[1px] bg-black/10 mt-2.5 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-black"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
              </div>
              
              {/* Giant Premium Mono Counter numbers */}
              <div className="flex items-baseline font-primary text-[60px] sm:text-[90px] md:text-[110px] font-light leading-none tracking-tighter text-[#0C0C0C]">
                <span>
                  {progress < 100 ? `${progress}`.padStart(2, "0") : "100"}
                </span>
                <span className="text-[12px] sm:text-[18px] tracking-normal font-bold opacity-30 ml-2">
                  %
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Container with Luxurious Fade In Cinematic Entrance */}
      <div 
        id="app-creative-stage animate-cinematic"
        className={isLoaded ? "opacity-100 transition-opacity duration-[1100ms] ease-out-quad" : "opacity-0"}
        style={{
          transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
          transform: isLoaded || systemReducedMotion ? "none" : "scale(0.985) translateY(10px)",
          transitionProperty: "opacity, transform",
          transitionDuration: "1400ms"
        }}
      >
        {children}
      </div>
    </>
  );
};
