import React, { useRef } from "react";
import { useScroll, useTransform, MotionValue, motion } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Hook targeting scroll progress of this element relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");
  // Pre-calculate total characters to allocate step portions
  let charCounter = 0;
  
  // Count total non-space characters or simply total letters for accurate mapping
  const totalChars = text.length;

  return (
    <p ref={containerRef} className={`flex flex-wrap items-center justify-center ${className}`}>
      {words.map((word, wordIdx) => {
        const characters = word.split("");
        const elements = (
          <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
            {characters.map((char, charIdx) => {
              const globalIdx = charCounter;
              charCounter++;

              // Calculate start and end range for this specific character
              const start = globalIdx / totalChars;
              const end = Math.min(1, (globalIdx + 1.2) / totalChars); // Slight overlap makes it smoother

              return (
                <Character
                  key={charIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
        return elements;
      })}
    </p>
  );
};

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block select-none">
      {/* Invisible placeholder for size and spacing */}
      <span className="opacity-0">{char}</span>
      {/* Animated visual display overlay */}
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 text-[#D7E2EA] font-medium"
      >
        {char}
      </motion.span>
    </span>
  );
};
