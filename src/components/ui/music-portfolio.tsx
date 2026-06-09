import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { gsap } from 'gsap';

interface Project {
  id: string | number;
  artist: string;
  album: string;
  category: string;
  label: string;
  year: string;
  image: string;
}

interface Config {
  timeZone?: string;
  timeUpdateInterval?: number;
  idleDelay?: number;
  debounceDelay?: number;
}

interface LocationData {
  latitude?: string;
  longitude?: string;
  display?: boolean;
}

interface SocialLinks {
  spotify?: string;
  email?: string;
  x?: string;
}

interface Callbacks {
  onProjectHover?: (project: Project) => void;
  onProjectLeave?: () => void;
  onContainerLeave?: () => void;
  onIdleStart?: () => void;
  onThemeChange?: (theme: string) => void;
}

// Time Display Component
const TimeDisplay: React.FC<{ CONFIG: Config }> = ({ CONFIG = {} as Config }) => {
  const [time, setTime] = useState({ hours: '', minutes: '', dayPeriod: '' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: CONFIG.timeZone || "America/New_York",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      };
      
      try {
        const formatter = new Intl.DateTimeFormat("en-US", options);
        const parts = formatter.formatToParts(now);
        
        setTime({
          hours: parts.find(part => part.type === "hour")?.value || '',
          minutes: parts.find(part => part.type === "minute")?.value || '',
          dayPeriod: parts.find(part => part.type === "dayPeriod")?.value || ''
        });
      } catch (err) {
        // Fallback for custom timezone issues
        setTime({
          hours: String(now.getHours() % 12 || 12),
          minutes: String(now.getMinutes()).padStart(2, '0'),
          dayPeriod: now.getHours() >= 12 ? 'PM' : 'AM'
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, CONFIG.timeUpdateInterval || 1000);
    return () => clearInterval(interval);
  }, [CONFIG.timeZone, CONFIG.timeUpdateInterval]);

  return (
    <time className="corner-item bottom-right font-mono text-[11px] tracking-widest text-zinc-400 uppercase" id="current-time">
      {time.hours}<span className="time-blink animate-[blink_1s_infinite]">:</span>{time.minutes} {time.dayPeriod}
    </time>
  );
};

// Project Item Component
interface ProjectItemProps {
  project: Project;
  index: number;
  onMouseEnter: (index: number, image: string) => void;
  onMouseLeave: () => void;
  isActive: boolean;
  isIdle: boolean;
}

const ProjectItem = forwardRef<HTMLLIElement, ProjectItemProps>(
  ({ project, index, onMouseEnter, onMouseLeave, isActive, isIdle }, ref) => {
    const textRefs = {
      album: useRef<HTMLSpanElement>(null),
      category: useRef<HTMLSpanElement>(null),
      label: useRef<HTMLSpanElement>(null),
    };

    useEffect(() => {
      if (isActive) {
        // Animate text scramble on hover using custom robust JS scramble effect with GSAP ticker/interpolation
        Object.entries(textRefs).forEach(([key, subRef]) => {
          if (subRef.current) {
            const targetText = project[key as keyof Project] as string;
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#*&%?";
            const duration = 0.8;
            
            const obj = { val: 0 };
            gsap.killTweensOf(subRef.current);
            gsap.killTweensOf(obj);
            
            gsap.to(obj, {
              val: 1,
              duration: duration,
              ease: "power1.out",
              onUpdate: () => {
                const progress = obj.val;
                const currentLength = Math.floor(progress * targetText.length);
                let scrambled = targetText.slice(0, currentLength);
                for (let i = currentLength; i < targetText.length; i++) {
                  scrambled += chars[Math.floor(Math.random() * chars.length)];
                }
                if (subRef.current) {
                  subRef.current.textContent = scrambled;
                }
              },
              onComplete: () => {
                if (subRef.current) {
                  subRef.current.textContent = targetText;
                }
              }
            });
          }
        });
      } else {
        // Reset text smoothly
        Object.entries(textRefs).forEach(([key, subRef]) => {
          if (subRef.current) {
            gsap.killTweensOf(subRef.current);
            subRef.current.textContent = project[key as keyof Project] as string;
          }
        });
      }
    }, [isActive, project]);

    return (
      <li 
        ref={ref}
        className={`project-item group/row grid grid-cols-12 gap-4 items-center py-5 px-4 border-b border-zinc-800/40 cursor-pointer select-none transition-all duration-300 ${
          isActive 
            ? 'opacity-100 z-10' 
            : isIdle 
              ? 'opacity-85' 
              : 'opacity-20 hover:opacity-100'
        }`}
        onMouseEnter={() => onMouseEnter(index, project.image)}
        onMouseLeave={onMouseLeave}
        data-image={project.image}
      >
        <div className="col-span-1 text-[11px] font-mono text-zinc-500 uppercase tracking-wider flex-shrink-0">
          {String(index + 1).padStart(2, '0')}
        </div>
        
        {/* Album / Concept column */}
        <div className="col-span-11 md:col-span-5 flex items-center overflow-hidden min-w-0">
          <span 
            ref={textRefs.album} 
            className={`transition-all duration-150 rounded-sm leading-none py-1 px-1.5 font-mono truncate max-w-full ${
              isActive 
                ? 'bg-amber-300 text-black font-semibold text-xs sm:text-sm uppercase' 
                : 'text-zinc-300 text-xs sm:text-sm group-hover/row:text-amber-300'
            }`}
          >
            {project.album}
          </span>
        </div>

        {/* Category column */}
        <div className="hidden md:flex col-span-3 items-center overflow-hidden min-w-0">
          <span 
            ref={textRefs.category} 
            className={`transition-all duration-150 rounded-sm leading-none py-1 px-1.5 font-mono text-xs truncate max-w-full ${
              isActive 
                ? 'bg-amber-300 text-black font-semibold uppercase' 
                : 'text-zinc-500'
            }`}
          >
            {project.category}
          </span>
        </div>

        {/* Publisher/Label column */}
        <div className="hidden md:flex col-span-3 items-center overflow-hidden min-w-0">
          <span 
            ref={textRefs.label} 
            className={`transition-all duration-150 rounded-sm leading-none py-1 px-1.5 font-mono text-xs truncate max-w-full ${
              isActive 
                ? 'bg-amber-300 text-black font-semibold uppercase' 
                : 'text-zinc-500'
            }`}
          >
            {project.label}
          </span>
        </div>
      </li>
    );
  }
);

ProjectItem.displayName = 'ProjectItem';

// Main Portfolio Component
interface MusicPortfolioProps {
  PROJECTS_DATA: Project[];
  LOCATION?: LocationData;
  CALLBACKS?: Callbacks;
  CONFIG?: Config;
  SOCIAL_LINKS?: SocialLinks;
}

export const MusicPortfolio: React.FC<MusicPortfolioProps> = ({
  PROJECTS_DATA = [],
  LOCATION = {} as LocationData,
  CALLBACKS = {} as Callbacks,
  CONFIG = {} as Config,
  SOCIAL_LINKS = {} as SocialLinks
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  
  const backgroundRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleAnimationRef = useRef<gsap.core.Timeline | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const projectItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  // Preload images
  useEffect(() => {
    PROJECTS_DATA.forEach(project => {
      if (project.image) {
        const img = new Image();
        img.src = project.image;
      }
    });
  }, [PROJECTS_DATA]);

  // Start idle animation loop
  const startIdleAnimation = useCallback(() => {
    if (idleAnimationRef.current) return;
    
    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 2
    });
    
    projectItemsRef.current.forEach((item, index) => {
      if (!item) return;
      
      const hideTime = 0 + index * 0.05;
      const showTime = 0 + (PROJECTS_DATA.length * 0.05 * 0.5) + index * 0.05;
      
      timeline.to(item, {
        opacity: 0.2,
        duration: 0.15,
        ease: "power2.inOut"
      }, hideTime);
      
      timeline.to(item, {
        opacity: 0.85,
        duration: 0.15,
        ease: "power2.inOut"
      }, showTime);
    });
    
    idleAnimationRef.current = timeline;
    if (CALLBACKS.onIdleStart) CALLBACKS.onIdleStart();
  }, [PROJECTS_DATA.length, CALLBACKS]);

  // Stop idle animation loop
  const stopIdleAnimation = useCallback(() => {
    if (idleAnimationRef.current) {
      idleAnimationRef.current.kill();
      idleAnimationRef.current = null;
      
      projectItemsRef.current.forEach(item => {
        if (item) {
          gsap.set(item, { opacity: 1 });
        }
      });
    }
  }, []);

  // Start idle timer to trigger subtle glow animation
  const startIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    
    idleTimerRef.current = setTimeout(() => {
      if (activeIndex === -1) {
        setIsIdle(true);
        startIdleAnimation();
      }
    }, CONFIG.idleDelay || 4000);
  }, [activeIndex, startIdleAnimation, CONFIG.idleDelay]);

  // Stop idle timer
  const stopIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  // Update atmospheric background artwork whenever activeIndex changes
  useEffect(() => {
    if (activeIndex !== -1 && PROJECTS_DATA[activeIndex] && backgroundRef.current) {
      const bg = backgroundRef.current;
      const imageUrl = PROJECTS_DATA[activeIndex].image;
      if (imageUrl) {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        bg.style.transition = "none";
        bg.style.transform = isMobile ? "none" : "scale(1.08)";
        bg.style.backgroundImage = `url(${imageUrl})`;
        bg.style.opacity = "1"; // Highly visible atmospheric full-cover image at maximum high quality
        
        const frame1 = requestAnimationFrame(() => {
          const frame2 = requestAnimationFrame(() => {
            if (bg) {
              if (isMobile) {
                bg.style.transition = "opacity 0.7s ease-out";
                bg.style.transform = "none";
              } else {
                bg.style.transition = "opacity 0.7s ease-out, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
                bg.style.transform = "scale(1.0)";
              }
            }
          });
        });
        return () => {
          cancelAnimationFrame(frame1);
        };
      }
    } else if (activeIndex === -1 && backgroundRef.current) {
      const bg = backgroundRef.current;
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      bg.style.transition = "opacity 0.6s ease-out" + (isMobile ? "" : ", transform 0.6s ease-out");
      bg.style.opacity = "0";
      if (!isMobile) {
        bg.style.transform = "scale(0.96)";
      } else {
        bg.style.transform = "none";
      }
    }
  }, [activeIndex, PROJECTS_DATA]);

  // Handle pointer enter on individual music items
  const handleProjectMouseEnter = useCallback((index: number, imageUrl: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    stopIdleAnimation();
    stopIdleTimer();
    setIsIdle(false);
    
    if (activeIndex === index) return;
    
    setActiveIndex(index);
    if (CALLBACKS.onProjectHover) CALLBACKS.onProjectHover(PROJECTS_DATA[index]);
  }, [activeIndex, stopIdleAnimation, stopIdleTimer, CALLBACKS, PROJECTS_DATA]);

  // Handle pointer leave
  const handleProjectMouseLeave = useCallback(() => {
    if (CALLBACKS.onProjectLeave) CALLBACKS.onProjectLeave();
    debounceRef.current = setTimeout(() => {
      // Handled beautifully via clean transitions
    }, 50);
  }, [CALLBACKS]);

  // Handle total tracker menu mouse exit - keeps selection on the last hovered project
  const handleContainerMouseLeave = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    if (CALLBACKS.onContainerLeave) CALLBACKS.onContainerLeave();
    
    startIdleTimer();
  }, [startIdleTimer, CALLBACKS]);

  // Mount listeners
  useEffect(() => {
    startIdleTimer();
    return () => {
      stopIdleTimer();
      stopIdleAnimation();
    };
  }, [startIdleTimer, stopIdleTimer, stopIdleAnimation]);

  return (
    <div className="music-portfolio-wrapper relative w-full bg-[#060608] min-h-[550px] rounded-3xl overflow-hidden border border-zinc-900 px-6 sm:px-12 py-12 flex flex-col justify-between">
      {/* Immersive background artwork container */}
      <div 
        ref={backgroundRef}
        className="portfolio-bg-image pointer-events-none absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center opacity-0 transition-all duration-750 ease-out z-0"
        style={{ 
          transformOrigin: "center center",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          willChange: "opacity",
          imageRendering: "auto"
        }}
      />
      {/* Clear overlay for crisp project visuals */}
      <div className="pointer-events-none absolute inset-0 bg-transparent z-0" />

      {/* Main interactive directory table */}
      <main 
        ref={containerRef}
        className={`portfolio-container w-full relative z-10 my-auto py-8 ${activeIndex !== -1 ? 'has-active' : ''}`}
        onMouseLeave={handleContainerMouseLeave}
      >
        <h3 className="sr-only">Interactive Track Records</h3>
        
        {/* Table Header Description row */}
        <div className="grid grid-cols-12 gap-4 px-4 pb-4 border-b border-zinc-800 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest select-none">
          <div className="col-span-1">ID</div>
          <div className="col-span-11 md:col-span-5">Album / Concept</div>
          <div className="hidden md:block col-span-3">Category</div>
          <div className="hidden md:block col-span-3">Publisher</div>
        </div>

        <ul className="project-list divide-y divide-zinc-900" role="list">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              onMouseEnter={handleProjectMouseEnter}
              onMouseLeave={handleProjectMouseLeave}
              isActive={activeIndex === index}
              isIdle={isIdle}
              ref={el => { projectItemsRef.current[index] = el; }}
            />
          ))}
        </ul>
      </main>


    </div>
  );
};

export default MusicPortfolio;
