import React, { useState, useRef, useEffect } from "react";
import Hls from "hls.js";
import { FadeIn } from "./FadeIn";

interface ServiceItem {
  id: string;
  num: string;
  name: string;
  desc: string;
  videoUrl?: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "service-3d-modeling",
    num: "01",
    name: "3D Modeling",
    desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4",
  },
  {
    id: "service-rendering",
    num: "02",
    name: "Rendering",
    desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
    videoUrl: "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8",
  },
  {
    id: "service-motion-design",
    num: "03",
    name: "Motion Design",
    desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4",
  },
  {
    id: "service-branding",
    num: "04",
    name: "Branding",
    desc: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.",
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4",
  },
  {
    id: "service-web-design",
    num: "05",
    name: "Web Design",
    desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_101827_abebfeec-f243-466b-b494-7f6814c0fbbf.mp4",
  },
];

const ServiceRow: React.FC<{ service: ServiceItem; index: number }> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!rowRef.current) return;
      const rect = rowRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how close the row's center is to the middle of the viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      // Distance from center of the screen
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
      // Visibility range scaled to screen height
      const maxDistance = viewportHeight * 0.45;

      let opacity = 0;
      if (distanceFromCenter < maxDistance) {
        // Curve the entry/exit smoothly
        opacity = 1 - (distanceFromCenter / maxDistance);
        opacity = Math.pow(opacity, 1.5); // Elegant quadratic fade curve
      }

      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    // Run initial computation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const isVideoActive = isHovered || scrollOpacity > 0.05;
  const showDarkTheme = !!(service.videoUrl && (isHovered || scrollOpacity > 0.3));

  useEffect(() => {
    let active = true;
    const video = videoRef.current;

    if (service.videoUrl && isVideoActive && video) {
      const isHls = service.videoUrl.includes(".m3u8");

      if (isHls && Hls.isSupported()) {
        const hls = new Hls({
          maxMaxBufferLength: 5,
          enableWorker: true,
          abrEwmaDefaultEstimate: 8000000, // Trigger high-quality stream immediately
        });
        hlsRef.current = hls;
        hls.loadSource(service.videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (hls.levels && hls.levels.length > 0) {
            hls.currentLevel = hls.levels.length - 1;
          }
          if (active && video) {
            video.play().catch(err => {
              console.log("Play interrupted:", err);
            });
          }
        });
      } else {
        video.src = service.videoUrl;
        video.play().catch(err => {
          console.log("Play interrupted:", err);
        });
      }
    } else {
      if (video) {
        video.pause();
        try {
          video.currentTime = 0;
        } catch (_) {}
      }
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    }

    return () => {
      active = false;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isVideoActive, service.videoUrl]);

  return (
    <FadeIn
      id={service.id}
      delay={index * 0.1}
      y={25}
      duration={0.7}
      as="div"
      className="relative overflow-hidden border-b border-[rgba(12,12,12,0.15)] transition-all duration-500"
    >
      <div
        ref={rowRef}
        className="group relative px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 flex items-center justify-between w-full h-full cursor-pointer transition-all duration-500 z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover & Scroll Background - Video for Service with videoUrl */}
        {service.videoUrl && (
          <div 
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-all duration-700 ease-out"
            style={{
              opacity: isHovered ? 1 : scrollOpacity,
              transform: isHovered ? "scale(1)" : `scale(${0.98 + scrollOpacity * 0.02})`,
            }}
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster="/src/assets/images/service_video_poster_1781670306811.jpg"
              className="w-full h-full object-cover"
            />
            {/* Linear gradient overlay: keeps the video elements extremely sharp and crisp while maintaining outstanding text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/15" />
          </div>
        )}

        {/* Regular background for other list items */}
        {!service.videoUrl && (
          <div 
            className="absolute inset-0 bg-[#0C0C0C]/[0.02] transition-opacity duration-300 z-0 pointer-events-none" 
            style={{
              opacity: isHovered ? 1 : scrollOpacity
            }}
          />
        )}

        {/* Content of the service row (Z-index 10) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 md:gap-16 w-full text-left relative z-10 pointer-events-none">
          {/* Number Label */}
          <div 
            className={`font-black uppercase select-none leading-none text-[3rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8.5rem] min-w-[70px] sm:min-w-[120px] md:min-w-[160px] transition-colors duration-500 ${
              showDarkTheme 
                ? "text-white/45" 
                : "text-[#0C0C0C]/20 group-hover:text-[#0C0C0C]/100"
            }`}
          >
            {service.num}
          </div>

          {/* Name & description, wrapped in styled container */}
          <div className="flex flex-col gap-2 md:gap-4 flex-1">
            <h3 
              className={`font-black uppercase tracking-wider text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[2.1rem] leading-tight transition-all duration-500 ${
                showDarkTheme 
                  ? "text-white" 
                  : "text-[#0C0C0C]"
              } ${isHovered && service.videoUrl ? "translate-x-3" : "group-hover:translate-x-1"}`}
            >
              {service.name}
            </h3>
            <p 
              className={`font-semibold uppercase tracking-widest leading-relaxed max-w-2xl text-[10px] sm:text-[11px] md:text-xs lg:text-sm transition-all duration-500 ${
                showDarkTheme 
                  ? "text-white/80" 
                  : "text-[#0C0C0C]/65"
              }`}
            >
              {service.desc}
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-28 w-full relative z-20"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={30} duration={0.8} className="text-center">
          <h2 className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight text-[3rem] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[8rem] xl:text-[10rem]">
            SERVICES
          </h2>
        </FadeIn>

        {/* Separator spacing */}
        <div className="h-12 sm:h-16 md:h-20" />

        {/* Services List container */}
        <div className="flex flex-col w-full max-w-5xl mx-auto border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES_DATA.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
