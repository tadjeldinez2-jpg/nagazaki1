import React, { useEffect, useRef } from "react";

const ALL_GIF_URLS = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Split images as requested:
  // Row 1: first 11 images
  const row1Base = ALL_GIF_URLS.slice(0, 11);
  const row1Triple = [...row1Base, ...row1Base, ...row1Base];

  // Row 2: remaining 10 images
  const row2Base = ALL_GIF_URLS.slice(11);
  const row2Triple = [...row2Base, ...row2Base, ...row2Base];

  useEffect(() => {
    let ticking = false;

    const updateTransforms = () => {
      if (!sectionRef.current || !row1Ref.current || !row2Ref.current) {
        ticking = false;
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      
      // Calculate scroll offset as specified: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      // Translate 3D with willChange: 'transform' on the refs directly
      const r1Translate = offset - 200;
      const r2Translate = -(offset - 200);

      row1Ref.current.style.transform = `translate3d(${r1Translate}px, 0, 0)`;
      row2Ref.current.style.transform = `translate3d(${r2Translate}px, 0, 0)`;

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateTransforms);
        ticking = true;
      }
    };

    // Calculate initial position on load and scroll
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="marquee-section"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full relative"
    >
      {/* Container holding both rows */}
      <div className="flex flex-col gap-3 md:gap-4 w-full">
        
        {/* Row 1 - Moves RIGHT on scroll */}
        <div className="w-full overflow-visible whitespace-nowrap">
          <div
            ref={row1Ref}
            className="flex gap-3 md:gap-4 select-none"
            style={{
              willChange: "transform",
              transition: "transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            {row1Triple.map((url, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 w-[280px] h-[180px] sm:w-[350px] sm:h-[225px] md:w-[420px] md:h-[270px] rounded-2xl overflow-hidden bg-[#181818]"
              >
                <img
                  src={url}
                  alt={`Marquee row1 work ${index + 1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Moves LEFT on scroll */}
        <div className="w-full overflow-visible whitespace-nowrap">
          <div
            ref={row2Ref}
            className="flex gap-3 md:gap-4 select-none"
            style={{
              willChange: "transform",
              transition: "transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            {row2Triple.map((url, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 w-[280px] h-[180px] sm:w-[350px] sm:h-[225px] md:w-[420px] md:h-[270px] rounded-2xl overflow-hidden bg-[#181818]"
              >
                <img
                  src={url}
                  alt={`Marquee row2 work ${index + 1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
