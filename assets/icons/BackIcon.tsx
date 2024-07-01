import * as React from "react";
export const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none">
    <g filter="url(#a)">
      <circle cx={26.5} cy={25.5} r={22.5} fill="#fff" />
      <circle cx={26.5} cy={25.5} r={22} stroke="#F1F1F1" />
    </g>
    <path
      stroke="#074D41"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.25 26.274h15M24.3 32.299l-6.05-6.024 6.05-6.025"
    />
    <defs>
      <filter
        id="a"
        width={53}
        height={53}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.670588 0 0 0 0 0.670588 0 0 0 0 0.670588 0 0 0 0.25 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_575_5415"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_575_5415"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
