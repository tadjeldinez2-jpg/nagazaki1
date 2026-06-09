import React from "react";
import { MusicPortfolio } from "./ui/music-portfolio";
import { ArrowUpRight, Compass, Layers, Sparkles } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const projectsData = [
    {
      id: 1,
      artist: "NAGAZAKI STUDIO",
      album: "SPACE VOYAGE",
      category: "3D SPATIAL",
      label: "VITE + SPLINE 3D",
      year: "2024",
      image: "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif"
    },
    {
      id: 2,
      artist: "NAGAZAKI STUDIO",
      album: "CODENEST OS",
      category: "INTERACTIVE DEV",
      label: "REACT + GSAP",
      year: "2024",
      image: "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif"
    },
    {
      id: 3,
      artist: "NAGAZAKI STUDIO",
      album: "VEX VENTURES",
      category: "FINTECH SYSTEM",
      label: "NEXTJS + CANVAS",
      year: "2024",
      image: "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif"
    },
    {
      id: 4,
      artist: "NAGAZAKI STUDIO",
      album: "STELLAR AI V2",
      category: "NEURAL NETWORK",
      label: "GEMINI ENGINE",
      year: "2024",
      image: "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif"
    },
    {
      id: 6,
      artist: "NAGAZAKI STUDIO",
      album: "TRANSFORM DATA",
      category: "DATA VISUALS",
      label: "D3 STATE ENGINE",
      year: "2023",
      image: "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif"
    },
    {
      id: 7,
      artist: "NAGAZAKI STUDIO",
      album: "VITARA HEALTH",
      category: "WELLNESS PORTAL",
      label: "VITARA RESEARCH",
      year: "2023",
      image: "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif"
    },
    {
      id: 8,
      artist: "NAGAZAKI STUDIO",
      album: "TERRA MATRIX",
      category: "GEOSPATIAL GRID",
      label: "WEBGL WRAPPER",
      year: "2023",
      image: "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif"
    },
    {
      id: 9,
      artist: "NAGAZAKI STUDIO",
      album: "SKYELITE AVIATION",
      category: "CHARTER SYSTEM",
      label: "TAILWIND FLOWS",
      year: "2023",
      image: "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif"
    },
    {
      id: 10,
      artist: "NAGAZAKI STUDIO",
      album: "AETHERA MINIMAL",
      category: "OPERATING SYSTEM",
      label: "ELECTRON APP",
      year: "2022",
      image: "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif"
    },
    {
      id: 11,
      artist: "NAGAZAKI STUDIO",
      album: "DESIGNPRO AGENCY",
      category: "CREATIVE SITE",
      label: "Framer Motion",
      year: "2022",
      image: "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif"
    }
  ];

  const config = {
    timeZone: "America/New_York",
    timeUpdateInterval: 1000,
    idleDelay: 4000,
    debounceDelay: 100
  };

  const socialLinks = {
    spotify: "https://open.spotify.com/user/226ilulo57zutgtiwjsjqnqsy?si=0004e7bc669a406e",
    email: "mailto:hi@filip.fyi",
    x: "https://x.com/filipz"
  };

  const location = {
    latitude: "43.9250° N",
    longitude: "19.5530° E",
    display: true
  };

  const callbacks = {
    onProjectHover: (project: any) => console.log('Hovering:', project),
    onProjectLeave: () => console.log('Left project'),
    onContainerLeave: () => console.log('Left container'),
    onIdleStart: () => console.log('Idle animation started'),
    onThemeChange: (theme: string) => console.log(`Theme changed to: ${theme}`)
  };

  return (
    <section 
      id="projects" 
      className="bg-[#050507] text-[#D7E2EA] relative z-30 px-6 sm:px-12 py-24 pb-36 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">


        {/* Centered PROJECTS header */}
        <div className="mb-16 text-center">
          <p className="text-[10px] tracking-[0.3em] font-black uppercase text-amber-400 mb-3 flex items-center justify-center gap-2">
            <Layers className="w-3.5 h-3.5 animate-pulse" />
            SELECTED WORKS
          </p>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-widest">
            WHAT I CAN DO
          </h3>
        </div>

        {/* Complete Custom Music Portfolio component integration */}
        <MusicPortfolio
          PROJECTS_DATA={projectsData}
          CONFIG={config}
          SOCIAL_LINKS={socialLinks}
          LOCATION={location}
          CALLBACKS={callbacks}
        />
      </div>
    </section>
  );
};
