import React, { useRef, useState, useEffect } from "react";

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Expand bounding box by padding
      const leftBound = rect.left - padding;
      const rightBound = rect.right + padding;
      const topBound = rect.top - padding;
      const bottomBound = rect.bottom + padding;

      const isInside =
        mouseX >= leftBound &&
        mouseX <= rightBound &&
        mouseY >= topBound &&
        mouseY <= bottomBound;

      if (isInside) {
        setIsHovered(true);
        // Find center of element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Vector from center to mouse
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        // Apply magnetic translation (pull divided by strength)
        setTransform({
          x: deltaX / strength,
          y: deltaY / strength,
        });
      } else {
        setIsHovered(false);
        setTransform({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, strength]);

  const transition = isHovered ? activeTransition : inactiveTransition;

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: transition,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};
