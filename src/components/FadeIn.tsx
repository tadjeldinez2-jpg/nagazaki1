import React from "react";
import { motion } from "motion/react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: React.ElementType;
  className?: string;
  id?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
  className = "",
  id,
}) => {
  // We can create the motion component dynamically using standard motion[as]
  // or default to motion.div if it's not a standard animated tag.
  // We can safely use a typeassertion or just use motion(as) or motion.div / motion.span
  const tagString = typeof as === "string" ? as : "div";
  const MotionComponent = (motion as any)[tagString] || motion.div;

  return (
    <MotionComponent
      id={id}
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1], // [0.25, 0.1, 0.25, 1] as requested
      }}
    >
      {children}
    </MotionComponent>
  );
};
