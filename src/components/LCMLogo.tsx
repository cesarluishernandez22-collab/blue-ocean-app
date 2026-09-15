import React from 'react';

interface LCMLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LCMLogo({ className = '', size = 'md' }: LCMLogoProps) {
  const dimensions = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }[size];

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${dimensions} ${className}`} title="LCM - Consultoría & Autoría de Luis César Monroy">
      {/* Metallic Gold SVG Logo Emblem with Gear/Clock and Ascending Arrow */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3e5ab" />
            <stop offset="25%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#aa7c11" />
            <stop offset="75%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#f9f1d0" />
          </linearGradient>
          <linearGradient id="goldBorder" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8c6d1f" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#fbe89d" />
          </linearGradient>
        </defs>

        {/* Outer Circular Gear / Clock Rim */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="#121214" 
          stroke="url(#goldBorder)" 
          strokeWidth="2.5" 
        />
        
        {/* Clock Hour Markers */}
        <line x1="50" y1="10" x2="50" y2="16" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="84" x2="50" y2="90" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="50" x2="16" y2="50" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
        <line x1="84" y1="50" x2="90" y2="50" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />

        {/* Stylized L C M Typographic Monogram */}
        <text 
          x="30" 
          y="56" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="900" 
          fontSize="22" 
          fill="url(#goldGradient)" 
          textAnchor="middle"
          letterSpacing="-1"
        >
          L
        </text>

        {/* Central Clock Hands & Core */}
        <circle cx="50" cy="50" r="3.5" fill="url(#goldGradient)" />
        <line x1="50" y1="50" x2="50" y2="30" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="50" y1="50" x2="64" y2="50" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />

        <text 
          x="70" 
          y="56" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="900" 
          fontSize="20" 
          fill="url(#goldGradient)" 
          textAnchor="middle"
          letterSpacing="-1"
        >
          M
        </text>

        {/* Ascending Performance Arrow (diagonal from center bottom to top right) */}
        <path 
          d="M 32 78 L 74 26 M 60 25 L 75 25 L 75 40" 
          fill="none" 
          stroke="url(#goldGradient)" 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </div>
  );
}
