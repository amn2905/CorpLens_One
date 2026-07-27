import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const CorpLensLogo: React.FC<LogoProps> = ({ className = '', size = 36 }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform hover:scale-105 duration-300 drop-shadow-sm"
      >
        <defs>
          {/* Corporate Blue Gradient */}
          <linearGradient id="corpOneBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="60%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Soft Drop Shadow for Inner Geometry */}
          <filter id="innerShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#1E40AF" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Outer Heavy Shield Contour */}
        <path
          d="M50 8 C68 8 83 16 85 33 V52 C85 73 69 88 50 94 C31 88 15 73 15 52 V33 C17 16 32 8 50 8 Z"
          fill="none"
          stroke="url(#corpOneBlueGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner CorpLens One Monogram ("1" & Interlocking Cyber Nodes) */}
        <g filter="url(#innerShadow)">
          {/* Center Numeral "1" Pillar */}
          <path
            d="M42 37 L53 30 V68 H47 V42 L42 45 Z"
            fill="url(#corpOneBlueGrad)"
          />

          {/* Right Structural Wing (Interlocking "L" Hook) */}
          <path
            d="M56 35 L62 38 V50 L71 56 V62 L56 52 Z"
            fill="url(#corpOneBlueGrad)"
          />

          {/* Left Structural Wing (Interlocking "C" Chevron Base) */}
          <path
            d="M44 52 L31 58 V51 L39 46 V39 H44 Z"
            fill="url(#corpOneBlueGrad)"
          />

          {/* Bottom Left Chevron Accent */}
          <path
            d="M39 59 L44 63 V68 H39 L31 63 Z"
            fill="url(#corpOneBlueGrad)"
          />
        </g>
      </svg>
    </div>
  );
};
