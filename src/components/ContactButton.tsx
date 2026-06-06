import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ContactButtonProps {
  id: string;
  onClick?: () => void;
  className?: string;
  variant?: "white" | "gradient";
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  id,
  onClick,
  className = "",
  variant = "white",
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-1.5 rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] cursor-pointer shadow-md";
  
  const variantClasses = variant === "white"
    ? "bg-white text-[#0C0C0C] hover:bg-neutral-100 border border-[#D7E2EA]/10"
    : "bg-black/40 text-white backdrop-blur-sm border-2 border-transparent relative hover:shadow-[0_0_20px_rgba(182,0,168,0.3)]";

  const gradientStyles = variant === "gradient" ? {
    backgroundImage: "linear-gradient(#0c0c0c, #0c0c0c), linear-gradient(123deg, #B600A8 10%, #E23E57 50%, #FF8A00 90%)",
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
    border: "2px solid transparent",
  } : {};

  return (
    <button
      id={id}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={gradientStyles}
    >
      <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-widest">LET&apos;S TALK</span>
      <ArrowUpRight className="w-[1.2em] h-[1.2em] flex-shrink-0" strokeWidth={3} />
    </button>
  );
};
