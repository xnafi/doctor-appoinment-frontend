import React from "react";

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  label?: string;
  className?: string;
  variant?: "doctor" | "medical" | "team" | "facility" | "service";
}

// SVG-based placeholder images with relevant medical iconography
const variantConfig = {
  doctor: {
    bg: "#1a4f7a",
    accent: "#82b440",
    icon: (
      <g>
        {/* Doctor silhouette */}
        <circle cx="200" cy="110" r="55" fill="#2a6fa8" />
        <ellipse cx="200" cy="260" rx="90" ry="70" fill="#2a6fa8" />
        {/* Stethoscope */}
        <circle cx="200" cy="110" r="42" fill="#82b440" opacity="0.2" />
        <text x="200" y="120" textAnchor="middle" fontSize="48" fill="#82b440">⚕</text>
      </g>
    ),
  },
  medical: {
    bg: "#f4f8fc",
    accent: "#1a4f7a",
    icon: (
      <g>
        <rect x="160" y="120" width="80" height="160" rx="8" fill="#1a4f7a" opacity="0.15" />
        <rect x="140" y="180" width="120" height="40" rx="8" fill="#1a4f7a" opacity="0.15" />
        <text x="200" y="220" textAnchor="middle" fontSize="64" fill="#1a4f7a" opacity="0.5">🏥</text>
      </g>
    ),
  },
  team: {
    bg: "#eaf0f8",
    accent: "#82b440",
    icon: (
      <g>
        <text x="200" y="220" textAnchor="middle" fontSize="80" fill="#1a4f7a" opacity="0.4">👨‍⚕️</text>
      </g>
    ),
  },
  facility: {
    bg: "#0e1e30",
    accent: "#82b440",
    icon: (
      <g>
        <rect x="120" y="100" width="160" height="200" rx="4" fill="#1a4f7a" opacity="0.5" />
        <text x="200" y="230" textAnchor="middle" fontSize="64" fill="#82b440" opacity="0.6">🏨</text>
      </g>
    ),
  },
  service: {
    bg: "#f4f8fc",
    accent: "#1a4f7a",
    icon: (
      <g>
        <text x="200" y="230" textAnchor="middle" fontSize="80" fill="#1a4f7a" opacity="0.35">💊</text>
      </g>
    ),
  },
};

export function PlaceholderImage({
  width = 400,
  height = 300,
  label,
  className = "",
  variant = "doctor",
}: PlaceholderImageProps) {
  const config = variantConfig[variant];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full object-cover ${className}`}
      role="img"
      aria-label={label ?? `${variant} image placeholder`}
    >
      <rect width="400" height="300" fill={config.bg} />
      {/* Grid pattern */}
      <defs>
        <pattern id={`grid-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={config.accent} strokeOpacity="0.08" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#grid-${variant})`} />
      {/* Icon */}
      {config.icon}
      {/* Label */}
      {label && (
        <>
          <rect x="0" y="265" width="400" height="35" fill="rgba(0,0,0,0.35)" />
          <text
            x="200"
            y="288"
            textAnchor="middle"
            fontSize="12"
            fontFamily="DM Sans, sans-serif"
            fill="white"
            fontWeight="500"
          >
            {label}
          </text>
        </>
      )}
    </svg>
  );
}
