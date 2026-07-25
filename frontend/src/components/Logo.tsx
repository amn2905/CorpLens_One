import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const CorpLensLogo: React.FC<LogoProps> = ({ className = '', size = 36 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform hover:scale-105 duration-300 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#a1a1aa" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>
          <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#e4e4e7" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Cyber Shield Base */}
        <path
          d="M50 8 L85 24 V50 C85 70 70 86 50 92 C30 86 15 70 15 50 V24 L50 8 Z"
          fill="url(#shieldGrad)"
          fillOpacity="0.15"
          stroke="url(#shieldGrad)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Inner Futuristic Lens Aperture Ring */}
        <circle cx="50" cy="48" r="22" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 3" strokeOpacity="0.8" />
        <circle cx="50" cy="48" r="15" stroke="#a1a1aa" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* Optical Aperture Blades */}
        <line x1="50" y1="26" x2="62" y2="40" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="72" y1="48" x2="58" y2="60" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="50" y1="70" x2="38" y2="56" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="48" x2="42" y2="36" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

        {/* Central Quantum Eye / Lens Core */}
        <circle cx="50" cy="48" r="6" fill="url(#coreGlow)" filter="url(#glow)" />
        <circle cx="50" cy="48" r="2" fill="#000000" />
      </svg>
    </div>
  );
};
