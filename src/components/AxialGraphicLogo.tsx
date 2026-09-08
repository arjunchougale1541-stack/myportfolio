import React from 'react';

interface AxialGraphicLogoProps {
  className?: string;
  color?: string; // Default '#4757fe'
}

export const AxialGraphicLogo: React.FC<AxialGraphicLogoProps> = ({
  className = "h-14 sm:h-16 md:h-20 w-auto",
  color = "#4757fe",
}) => {
  return (
    <svg
      viewBox="0 0 540 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-label="Axial Graphic - Driven by Design"
    >
      <defs>
        <style>
          {`
            .axial-text {
              font-family: -apple-system, BlinkMacSystemFont, 'Montserrat', 'Arial Black', Impact, sans-serif;
              font-weight: 900;
              text-transform: lowercase;
              fill: ${color};
            }
            .tagline-text {
              font-family: -apple-system, BlinkMacSystemFont, 'Montserrat', 'Inter', 'Segoe UI', sans-serif;
              font-weight: 900;
              letter-spacing: 0.38em;
              fill: ${color};
            }
          `}
        </style>
      </defs>

      {/* Main Vector Shape Group in brand color */}
      <g fill={color}>
        {/* ROW 1: "axial" */}
        {/* 'a' */}
        <g transform="translate(14, 15)">
          <path
            d="M 12,0 L 52,0 C 60,0 66,6 66,14 L 66,86 C 66,94 60,100 52,100 L 14,100 C 6,100 0,94 0,86 L 0,26 C 0,14 10,0 22,0 Z 
               M 26,24 L 26,42 L 42,42 L 42,24 Z 
               M 26,60 L 26,76 L 42,76 L 42,60 Z"
            fillRule="evenodd"
          />
        </g>

        {/* 'x' */}
        <g transform="translate(88, 27)">
          <path d="M 0,0 L 22,0 L 37,36 L 52,0 L 74,0 L 49,52 L 75,88 L 53,88 L 37,56 L 21,88 L 0,88 L 26,52 Z" />
        </g>

        {/* 'i' */}
        <g transform="translate(170, 15)">
          <rect x="0" y="0" width="22" height="22" rx="4" />
          <rect x="0" y="28" width="22" height="72" rx="4" />
        </g>

        {/* 'a' */}
        <g transform="translate(202, 15)">
          <path
            d="M 12,0 L 52,0 C 60,0 66,6 66,14 L 66,86 C 66,94 60,100 52,100 L 14,100 C 6,100 0,94 0,86 L 0,26 C 0,14 10,0 22,0 Z 
               M 26,24 L 26,42 L 42,42 L 42,24 Z 
               M 26,60 L 26,76 L 42,76 L 42,60 Z"
            fillRule="evenodd"
          />
        </g>

        {/* 'l' */}
        <g transform="translate(276, 15)">
          <rect x="0" y="0" width="22" height="100" rx="4" />
        </g>

        {/* ROW 2: "graphic" */}
        {/* 'g' */}
        <g transform="translate(14, 126)">
          <path
            d="M 12,0 L 52,0 C 60,0 66,6 66,14 L 66,74 C 66,82 60,88 52,88 L 0,88 L 0,66 L 44,66 L 44,52 L 14,52 C 6,52 0,46 0,38 L 0,14 C 0,6 6,0 14,0 Z
               M 22,22 L 44,22 L 44,34 L 22,34 Z"
            fillRule="evenodd"
          />
        </g>

        {/* 'r' */}
        <g transform="translate(88, 126)">
          <path d="M 0,0 L 22,0 L 22,24 C 28,8 40,0 56,0 L 56,24 C 42,24 22,30 22,50 L 22,88 L 0,88 Z" />
        </g>

        {/* 'a' */}
        <g transform="translate(152, 126)">
          <path
            d="M 12,0 L 52,0 C 60,0 66,6 66,14 L 66,74 C 66,82 60,88 52,88 L 14,88 C 6,88 0,82 0,74 L 0,26 C 0,14 10,0 22,0 Z 
               M 24,20 L 24,36 L 44,36 L 44,20 Z 
               M 24,52 L 24,68 L 44,68 L 44,52 Z"
            fillRule="evenodd"
          />
        </g>

        {/* 'p' */}
        <g transform="translate(226, 126)">
          <path
            d="M 0,0 L 46,0 C 58,0 66,8 66,20 L 66,54 C 66,66 58,74 46,74 L 22,74 L 22,100 L 0,100 Z
               M 22,20 L 22,54 L 44,54 L 44,20 Z"
            fillRule="evenodd"
          />
        </g>

        {/* 'h' */}
        <g transform="translate(300, 110)">
          <path
            d="M 0,0 L 22,0 L 22,34 C 28,20 40,16 52,16 C 60,16 66,22 66,30 L 66,104 L 44,104 L 44,42 C 44,34 38,32 30,32 C 24,32 22,36 22,44 L 22,104 L 0,104 Z"
          />
        </g>

        {/* 'i' */}
        <g transform="translate(374, 126)">
          <rect x="0" y="0" width="22" height="20" rx="4" />
          <rect x="0" y="26" width="22" height="62" rx="4" />
        </g>

        {/* 'c' */}
        <g transform="translate(404, 126)">
          <path
            d="M 52,0 C 60,0 66,6 66,14 L 66,26 L 44,26 L 44,20 L 22,20 L 22,68 L 44,68 L 44,62 L 66,62 L 66,74 C 66,82 60,88 52,88 L 14,88 C 6,88 0,82 0,74 L 0,14 C 0,6 6,0 14,0 Z"
          />
        </g>
      </g>

      {/* ROW 3: "DRIVEN BY DESIGN" */}
      <text
        x="240"
        y="262"
        textAnchor="middle"
        className="tagline-text select-none text-[22px] uppercase font-black"
      >
        DRIVEN BY DESIGN
      </text>
    </svg>
  );
};
