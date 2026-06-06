import React from "react";

interface LiveProjectButtonProps {
  id: string;
  onClick?: () => void;
  className?: string;
  url?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  id,
  onClick,
  className = "",
  url,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (onClick) {
      onClick();
    }
  };

  const buttonStyleClass = `inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-200 hover:bg-[#D7E2EA]/10 cursor-pointer ${className}`;

  if (url) {
    return (
      <a
        id={id}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyleClass}
        onClick={handleClick as any}
      >
        Live Project
      </a>
    );
  }

  return (
    <button id={id} onClick={handleClick} className={buttonStyleClass}>
      Live Project
    </button>
  );
};
