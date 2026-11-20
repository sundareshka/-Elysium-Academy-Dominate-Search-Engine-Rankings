import { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  compact?: boolean;
}

export function BrandLogo({ className = 'h-9', compact = false }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <span className="inline-flex items-center gap-2 font-display-heading text-xl font-bold tracking-tight text-[#2F3E46] whitespace-nowrap shrink-0">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-[#2F3E46] text-xs font-bold text-white">
          EA
        </span>
        {!compact && <span>Elysium Academy</span>}
      </span>
    );
  }

  return (
    <img
      src="/assets/aistudio/ElysiumAcadmemy_a81d78c3.png"
      alt="Elysium Academy"
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className={`${className} w-auto object-contain select-none shrink-0`}
    />
  );
}
