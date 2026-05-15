/**
 * DoctorImage — branded SVG illustration of a physician.
 * No external dependencies; renders inline as an <svg>.
 * Replace with <Image> from next/image when a real photo is available.
 */
export function DoctorImage({
  className = "",
  width = 480,
  height = 560,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 480 560"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full object-cover ${className}`}
      role="img"
      aria-label="Dr. Tirthankar Bhattacharjee — General Physician"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f2d4a" />
          <stop offset="100%" stopColor="#1a5f8a" />
        </linearGradient>
        <linearGradient id="coatGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0f6ff" />
          <stop offset="100%" stopColor="#d8e8f5" />
        </linearGradient>
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4956a" />
          <stop offset="100%" stopColor="#b87850" />
        </linearGradient>
        <pattern id="dot" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.05)" />
        </pattern>
        <clipPath id="heroClip">
          <rect width="480" height="560" rx="0" />
        </clipPath>
      </defs>

      {/* Background */}
      <rect width="480" height="560" fill="url(#bgGrad)" />
      <rect width="480" height="560" fill="url(#dot)" />

      {/* Decorative circles */}
      <circle cx="420" cy="80" r="120" fill="rgba(130,180,64,0.06)" />
      <circle cx="60" cy="480" r="100" fill="rgba(26,79,122,0.2)" />

      {/* Lab coat body */}
      <ellipse cx="240" cy="480" rx="180" ry="130" fill="url(#coatGrad)" />
      {/* Coat lapels */}
      <path d="M200 360 L240 420 L280 360 L300 350 Q280 440 240 470 Q200 440 180 350 Z" fill="#e0ecfa" />
      {/* Coat collar */}
      <path d="M220 340 L240 370 L260 340 Q250 330 240 335 Q230 330 220 340Z" fill="#c8dff0" />

      {/* Neck */}
      <rect x="220" y="300" width="40" height="50" rx="8" fill="url(#skinGrad)" />

      {/* Head */}
      <ellipse cx="240" cy="270" rx="65" ry="72" fill="url(#skinGrad)" />

      {/* Hair */}
      <path d="M175 255 Q178 190 240 185 Q302 190 305 255 Q295 200 240 198 Q185 200 175 255Z" fill="#1a0f08" />
      <path d="M175 258 Q172 240 175 225 Q185 195 240 192 Q295 195 305 225 Q308 240 305 258 Q300 215 240 210 Q180 215 175 258Z" fill="#2a1a0e" />

      {/* Ears */}
      <ellipse cx="175" cy="278" rx="12" ry="18" fill="#c0845a" />
      <ellipse cx="305" cy="278" rx="12" ry="18" fill="#c0845a" />

      {/* Eyes */}
      <ellipse cx="215" cy="265" rx="10" ry="11" fill="#fff" />
      <ellipse cx="265" cy="265" rx="10" ry="11" fill="#fff" />
      <ellipse cx="216" cy="266" rx="6" ry="7" fill="#2a1a0e" />
      <ellipse cx="266" cy="266" rx="6" ry="7" fill="#2a1a0e" />
      <ellipse cx="218" cy="264" rx="2" ry="2" fill="#fff" />
      <ellipse cx="268" cy="264" rx="2" ry="2" fill="#fff" />
      {/* Eyebrows */}
      <path d="M205 252 Q215 247 225 251" stroke="#1a0f08" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M255 251 Q265 247 275 252" stroke="#1a0f08" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Nose */}
      <path d="M237 272 Q233 285 230 292 Q240 296 250 292 Q247 285 243 272Z" fill="#b87050" />

      {/* Mouth — smile */}
      <path d="M222 308 Q240 320 258 308" stroke="#8a4a30" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Stethoscope */}
      <path d="M260 350 Q310 360 320 400 Q330 430 300 440 Q270 450 260 420" stroke="#888" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="257" cy="418" r="14" fill="#999" stroke="#777" strokeWidth="2" />
      <circle cx="257" cy="418" r="8" fill="#bbb" />
      {/* Ear tips */}
      <circle cx="260" cy="350" r="5" fill="#777" />
      <path d="M260 350 Q250 340 240 338" stroke="#888" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="238" cy="337" r="5" fill="#777" />

      {/* Coat pocket */}
      <rect x="165" y="400" width="55" height="38" rx="4" fill="rgba(255,255,255,0.15)" stroke="rgba(200,220,240,0.4)" strokeWidth="1" />
      {/* Pen in pocket */}
      <rect x="172" y="398" width="5" height="28" rx="2" fill="#82b440" />
      <rect x="181" y="398" width="5" height="25" rx="2" fill="#1a4f7a" />

      {/* ID Badge */}
      <rect x="260" y="390" width="70" height="44" rx="6" fill="#fff" opacity="0.9" />
      <rect x="260" y="390" width="70" height="10" rx="6" fill="#1a4f7a" />
      <text x="295" y="399" textAnchor="middle" fontSize="6" fill="#fff" fontFamily="sans-serif" fontWeight="700">DR. TIRTHANKAR</text>
      <rect x="268" y="405" width="22" height="22" rx="3" fill="#eaf0f8" />
      <text x="279" y="420" textAnchor="middle" fontSize="14" fill="#1a4f7a">⚕</text>
      <rect x="295" y="407" width="28" height="4" rx="2" fill="#d1dce8" />
      <rect x="295" y="414" width="22" height="3" rx="1.5" fill="#d1dce8" />
      <rect x="295" y="420" width="25" height="3" rx="1.5" fill="#d1dce8" />

      {/* Bottom gradient fade */}
      <defs>
        <linearGradient id="fadeOut" x1="0" y1="0" x2="0" y2="1">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#0f2d4a" />
        </linearGradient>
      </defs>
      <rect width="480" height="560" fill="url(#fadeOut)" />

      {/* Credential text at bottom */}
      <text x="240" y="532" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="sans-serif">
        Dr. Tirthankar Bhattacharjee
      </text>
      <text x="240" y="548" textAnchor="middle" fontSize="9.5" fill="rgba(130,180,64,0.8)" fontFamily="sans-serif" fontWeight="600">
        MBBS · General Physician · Moulvibazar
      </text>
    </svg>
  );
}
