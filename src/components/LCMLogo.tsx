import React from 'react';

interface LCMLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LCMLogo({ className = '', size = 'md' }: LCMLogoProps) {
  // Proporción original del SVG: 1100x480 (~2.29 : 1)
  const dimensions = {
    sm: 'h-8 w-auto min-w-[70px]',
    md: 'h-12 w-auto min-w-[110px]',
    lg: 'h-20 w-auto min-w-[180px]',
    xl: 'h-28 w-auto min-w-[240px]'
  }[size];

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 ${dimensions} ${className}`} 
      title="LCM - L.C. Monroy | Revenue Management & Consultoría Hotelera"
    >
      <img 
        src="/lcm-logo-official.svg" 
        alt="LCM - L.C. Monroy Logotipo Oficial" 
        className="h-full w-auto max-h-full object-contain filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.45)]"
      />
    </div>
  );
}

