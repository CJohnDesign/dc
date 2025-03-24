import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const CreditCardIcon: React.FC<IconProps> = ({
  className,
  ...props
}) => (
  <svg
    width="78"
    height="63"
    viewBox="0 0 78 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect
      width="47.5518"
      height="48.0286"
      rx="6"
      transform="matrix(0.969647 0.244508 -0.23936 0.970931 27.9344 4.06544)"
      fill="url(#paint0_linear_creditcard)"
    />
    <rect
      x="0.262903"
      y="0.437558"
      width="46.8318"
      height="47.3086"
      rx="5.64"
      transform="matrix(0.969647 0.244508 -0.23936 0.970931 28.0472 4.01388)"
      stroke="white"
      strokeOpacity="0.178158"
      strokeWidth="0.72"
    />
    <rect
      width="47.5564"
      height="48.024"
      rx="6"
      transform="matrix(0.965187 -0.26156 0.256103 0.96665 0.613281 13.2888)"
      fill="url(#paint1_linear_creditcard)"
      fillOpacity="0.5"
    />
    <foreignObject x="-0.770284" y="-0.508992" width="60.967" height="61.5792">
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          backdropFilter: "blur(1.36px)",
          clipPath: "url(#bgblur_creditcard_clip_path)",
          height: "100%",
          width: "100%",
        }}
      ></div>
    </foreignObject>
    <rect
      data-figma-bg-blur-radius="2.71828"
      x="0.610645"
      y="0.352545"
      width="46.5564"
      height="47.024"
      rx="5.5"
      transform="matrix(0.965187 -0.26156 0.256103 0.96665 0.544252 13.4603)"
      fill="url(#paint2_linear_creditcard)"
      fillOpacity="0.1"
      stroke="url(#paint3_linear_creditcard)"
    />
    <rect
      x="18.2732"
      y="2.69063"
      width="47.52"
      height="48.06"
      rx="7"
      fill="url(#paint4_linear_creditcard)"
      fillOpacity="0.8"
    />
    <rect
      x="18.7732"
      y="3.19063"
      width="46.52"
      height="47.06"
      rx="6.5"
      stroke="white"
      strokeOpacity="0.176164"
    />
    <ellipse
      cx="42.4732"
      cy="19.0012"
      rx="7.44"
      ry="7.41061"
      fill="url(#paint5_radial_creditcard)"
    />
    <ellipse
      cx="42.4732"
      cy="34.44"
      rx="13.64"
      ry="7.41061"
      fill="url(#paint6_radial_creditcard)"
    />
    <path
      d="M77.1732 45.8556C77.1732 52.4663 71.8759 57.8156 65.3532 57.8156C58.8305 57.8156 53.5332 52.4663 53.5332 45.8556C53.5332 39.245 58.8305 33.8956 65.3532 33.8956C71.8759 33.8956 77.1732 39.245 77.1732 45.8556Z"
      fill="url(#paint7_linear_creditcard)"
      stroke="url(#paint8_linear_creditcard)"
    />
    <path
      d="M69.6761 41.3427C70.1962 40.834 71.0404 40.8332 71.5617 41.3408C72.0355 41.8023 72.0793 42.5251 71.6926 43.0348L71.5636 43.1809L65.1236 49.4786C64.6497 49.942 63.9071 49.9838 63.3847 49.6042L63.2351 49.4776L60.0218 46.3288C59.5021 45.8196 59.5039 44.9957 60.0257 44.4887C60.5 44.0277 61.2408 43.9872 61.762 44.3662L61.9113 44.4925L64.1803 46.7146L69.6761 41.3427Z"
      fill="white"
    />
    <defs>
      <clipPath id="bgblur_creditcard_clip_path">
        <rect
          x="0.610645"
          y="0.352545"
          width="46.5564"
          height="47.024"
          rx="5.5"
          transform="matrix(0.965187 -0.26156 0.256103 0.96665 1.31453 13.9693)"
        />
      </clipPath>
      <linearGradient
        id="paint0_linear_creditcard"
        x1="-29.0065"
        y1="54.2369"
        x2="67.479"
        y2="116.741"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#ACD4FF" />
        <stop offset="1" stopColor="#6271EA" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_creditcard"
        x1="-18.5349"
        y1="27.0905"
        x2="24.0436"
        y2="68.8994"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#B4C7FF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_creditcard"
        x1="-18.5349"
        y1="27.0905"
        x2="24.0436"
        y2="68.8994"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#B4C7FF" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_creditcard"
        x1="0"
        y1="0"
        x2="0"
        y2="48.024"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.390297" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_creditcard"
        x1="-0.247553"
        y1="29.8014"
        x2="42.3616"
        y2="71.5772"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7389DF" />
        <stop offset="1" stopColor="#6271EB" />
      </linearGradient>
      <radialGradient
        id="paint5_radial_creditcard"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(39.2689 16.0592) rotate(52.9009) scale(12.2744 12.2877)"
      >
        <stop stopColor="white" />
        <stop offset="0.204263" stopColor="white" />
        <stop offset="0.61246" stopColor="#E0E0E0" />
        <stop offset="1" stopColor="#C7C7C7" />
      </radialGradient>
      <radialGradient
        id="paint6_radial_creditcard"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(36.5987 31.498) rotate(35.8008) scale(16.7359 16.522)"
      >
        <stop stopColor="white" />
        <stop offset="0.204263" stopColor="white" />
        <stop offset="0.61246" stopColor="#E0E0E0" />
        <stop offset="1" stopColor="#C7C7C7" />
      </radialGradient>
      <linearGradient
        id="paint7_linear_creditcard"
        x1="43.4299"
        y1="47.4531"
        x2="65.5235"
        y2="69.1146"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C1F736" />
        <stop offset="1" stopColor="#98BC3B" />
      </linearGradient>
      <linearGradient
        id="paint8_linear_creditcard"
        x1="51.4815"
        y1="41.6143"
        x2="64.1966"
        y2="60.085"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CCFF48" />
        <stop offset="1" stopColor="#99B949" />
      </linearGradient>
    </defs>
  </svg>
);

export const BusinessIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    width="78"
    height="63"
    viewBox="0 0 78 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect
      width="47.5518"
      height="48.0286"
      rx="6"
      transform="matrix(0.969647 0.244508 -0.23936 0.970931 27.9344 4.06544)"
      fill="url(#paint0_linear_business)"
    />
    <rect
      x="0.262903"
      y="0.437558"
      width="46.8318"
      height="47.3086"
      rx="5.64"
      transform="matrix(0.969647 0.244508 -0.23936 0.970931 28.0472 4.01388)"
      stroke="white"
      strokeOpacity="0.178158"
      strokeWidth="0.72"
    />
    <rect
      width="47.5564"
      height="48.024"
      rx="6"
      transform="matrix(0.965187 -0.26156 0.256103 0.96665 0.613281 13.2888)"
      fill="url(#paint1_linear_business)"
      fillOpacity="0.5"
    />
    <rect
      x="18.2732"
      y="2.69063"
      width="47.52"
      height="48.06"
      rx="7"
      fill="url(#paint2_linear_business)"
      fillOpacity="0.8"
    />
    <rect
      x="18.7732"
      y="3.19063"
      width="46.52"
      height="47.06"
      rx="6.5"
      stroke="white"
      strokeOpacity="0.176164"
    />
    <path
      d="M42.5 15.5V38.5M34.5 19.5V34.5M50.5 19.5V34.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M77.1732 45.8556C77.1732 52.4663 71.8759 57.8156 65.3532 57.8156C58.8305 57.8156 53.5332 52.4663 53.5332 45.8556C53.5332 39.245 58.8305 33.8956 65.3532 33.8956C71.8759 33.8956 77.1732 39.245 77.1732 45.8556Z"
      fill="url(#paint3_linear_business)"
      stroke="url(#paint4_linear_business)"
    />
    <path
      d="M69.6761 41.3427C70.1962 40.834 71.0404 40.8332 71.5617 41.3408C72.0355 41.8023 72.0793 42.5251 71.6926 43.0348L71.5636 43.1809L65.1236 49.4786C64.6497 49.942 63.9071 49.9838 63.3847 49.6042L63.2351 49.4776L60.0218 46.3288C59.5021 45.8196 59.5039 44.9957 60.0257 44.4887C60.5 44.0277 61.2408 43.9872 61.762 44.3662L61.9113 44.4925L64.1803 46.7146L69.6761 41.3427Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_business"
        x1="-29.0065"
        y1="54.2369"
        x2="67.479"
        y2="116.741"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFB6AC" />
        <stop offset="1" stopColor="#EA6271" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_business"
        x1="-18.5349"
        y1="27.0905"
        x2="24.0436"
        y2="68.8994"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#FFB4C7" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_business"
        x1="-0.247553"
        y1="29.8014"
        x2="42.3616"
        y2="71.5772"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DF7389" />
        <stop offset="1" stopColor="#EB6271" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_business"
        x1="43.4299"
        y1="47.4531"
        x2="65.5235"
        y2="69.1146"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C1F736" />
        <stop offset="1" stopColor="#98BC3B" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_business"
        x1="51.4815"
        y1="41.6143"
        x2="64.1966"
        y2="60.085"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CCFF48" />
        <stop offset="1" stopColor="#99B949" />
      </linearGradient>
    </defs>
  </svg>
);

export const LoanIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    width="78"
    height="64"
    viewBox="0 0 78 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="42.2682"
      height="42.6921"
      rx="6"
      transform="matrix(0.969647 0.244508 -0.23936 0.970931 36.5038 11.0268)"
      fill="url(#paint0_linear_7446_6868)"
    />
    <rect
      x="0.262903"
      y="0.437558"
      width="41.5482"
      height="41.9721"
      rx="5.64"
      transform="matrix(0.969647 0.244508 -0.23936 0.970931 36.6165 10.9753)"
      stroke="white"
      strokeOpacity="0.178158"
      strokeWidth="0.72"
    />
    <rect
      width="47.5564"
      height="48.024"
      rx="6"
      transform="matrix(0.965187 -0.26156 0.256103 0.96665 0.779999 13.2888)"
      fill="url(#paint1_linear_7446_6868)"
      fillOpacity="0.5"
    />
    <foreignObject x="-0.603536" y="-0.508992" width="60.967" height="61.5792">
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          backdropFilter: "blur(1.36px)",
          clipPath: "url(#bgblur_0_7446_6868_clip_path)",
          height: "100%",
          width: "100%"
        }}
      ></div>
    </foreignObject>
    <rect
      data-figma-bg-blur-radius="2.71828"
      x="0.610645"
      y="0.352545"
      width="46.5564"
      height="47.024"
      rx="5.5"
      transform="matrix(0.965187 -0.26156 0.256103 0.96665 0.710969 13.4603)"
      fill="url(#paint2_linear_7446_6868)"
      fillOpacity="0.1"
      stroke="url(#paint3_linear_7446_6868)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M64.3248 3.22523L67.509 17.8996C67.6914 18.3635 67.6914 18.8284 67.5997 19.2923C67.2359 21.4286 65.4161 23.1 63.1418 23.1C60.5944 23.1 58.5932 21.0573 58.5932 18.4571C58.5932 21.0573 56.5909 23.1 54.0436 23.1C51.4962 23.1 49.4939 21.0573 49.4939 18.4571C49.4939 21.0573 47.4927 23.1 44.9443 23.1C42.3969 23.1 40.3957 21.0573 40.3957 18.4571C40.3957 21.0573 38.3945 23.1 35.8461 23.1C33.2987 23.1 31.2975 21.0573 31.2975 18.4571C31.2975 21.0573 29.2952 23.1 26.7479 23.1C24.2005 23.1 22.1982 21.0573 22.1982 18.4571C22.1982 21.0573 20.197 23.1 17.6496 23.1C15.3743 23.1 13.5555 21.4286 13.1 19.2923C13.1 18.8284 13.1 18.3635 13.1907 17.8996L16.4666 3.22523C16.648 2.39005 17.3765 1.74001 18.1958 1.74001H62.5049C63.4149 1.74001 64.1424 2.39005 64.3248 3.22523ZM60.4744 50.5826V28.44C61.2995 28.8065 62.2159 29.0817 63.2236 29.0817C63.4986 29.0817 63.865 29.0817 64.14 28.9893V54.2459L63.4114 54.25L16.856 54.2459H16.62V26.3193C16.895 26.4117 17.2614 26.4117 17.5364 26.4117C18.5441 26.4117 19.4605 26.1365 20.2856 25.77V50.5826H60.4744Z"
      fill="url(#paint4_linear_7446_6868)"
    />
    <g filter="url(#filter1_d_7446_6868)">
      <mask id="path-6-inside-1_7446_6868" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M51.3412 35.2384L60.0279 26.66L68.54 35.2384H65.2402V57.8098H54.6415V35.2384H51.3412ZM41.4369 57.81H51.8611V41.6003H41.4369V57.81ZM28.06 57.81H38.6569V50.1855H28.06V57.81Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.3412 35.2384L60.0279 26.66L68.54 35.2384H65.2402V57.8098H54.6415V35.2384H51.3412ZM41.4369 57.81H51.8611V41.6003H41.4369V57.81ZM28.06 57.81H38.6569V50.1855H28.06V57.81Z"
        fill="url(#paint5_linear_7446_6868)"
      />
      <path
        d="M60.0279 26.66L60.7178 25.9754L60.0348 25.287L59.3449 25.9684L60.0279 26.66ZM51.3412 35.2384L50.6582 34.5468L48.9737 36.2104H51.3412V35.2384ZM68.54 35.2384V36.2104H70.8738L69.23 34.5538L68.54 35.2384ZM65.2402 35.2384V34.2664H64.2682V35.2384H65.2402ZM65.2402 57.8098V58.7818H66.2122V57.8098H65.2402ZM54.6415 57.8098H53.6695V58.7818H54.6415V57.8098ZM54.6415 35.2384H55.6135V34.2664H54.6415V35.2384ZM51.8611 57.81V58.782H52.8331V57.81H51.8611ZM41.4369 57.81H40.4649V58.782H41.4369V57.81ZM51.8611 41.6003H52.8331V40.6283H51.8611V41.6003ZM41.4369 41.6003V40.6283H40.4649V41.6003H41.4369ZM38.6569 57.81V58.782H39.6289V57.81H38.6569ZM28.06 57.81H27.088V58.782H28.06V57.81ZM38.6569 50.1855H39.6289V49.2135H38.6569V50.1855ZM28.06 50.1855V49.2135H27.088V50.1855H28.06ZM59.3449 25.9684L50.6582 34.5468L52.0242 35.93L60.7108 27.3516L59.3449 25.9684ZM69.23 34.5538L60.7178 25.9754L59.3379 27.3446L67.85 35.9231L69.23 34.5538ZM65.2402 36.2104H68.54V34.2664H65.2402V36.2104ZM66.2122 57.8098V35.2384H64.2682V57.8098H66.2122ZM54.6415 58.7818H65.2402V56.8378H54.6415V58.7818ZM53.6695 35.2384V57.8098H55.6135V35.2384H53.6695ZM51.3412 36.2104H54.6415V34.2664H51.3412V36.2104ZM51.8611 56.838H41.4369V58.782H51.8611V56.838ZM50.8891 41.6003V57.81H52.8331V41.6003H50.8891ZM41.4369 42.5723H51.8611V40.6283H41.4369V42.5723ZM42.4089 57.81V41.6003H40.4649V57.81H42.4089ZM38.6569 56.838H28.06V58.782H38.6569V56.838ZM37.6849 50.1855V57.81H39.6289V50.1855H37.6849ZM28.06 51.1575H38.6569V49.2135H28.06V51.1575ZM29.032 57.81V50.1855H27.088V57.81H29.032Z"
        fill="url(#paint6_linear_7446_6868)"
        mask="url(#path-6-inside-1_7446_6868)"
      />
    </g>
    <defs>
      <clipPath
        id="bgblur_0_7446_6868_clip_path"
        transform="translate(0.603536 0.508992)"
      >
        <rect
          x="0.610645"
          y="0.352545"
          width="46.5564"
          height="47.024"
          rx="5.5"
          transform="matrix(0.965187 -0.26156 0.256103 0.96665 0.710969 13.4603)"
        />
      </clipPath>
      <filter
        id="filter1_d_7446_6868"
        x="24.06"
        y="22.66"
        width="50.48"
        height="41.15"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="2.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.26834 0 0 0 0 0.299328 0 0 0 0 0.498019 0 0 0 0.351781 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_7446_6868"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_7446_6868"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_7446_6868"
        x1="-25.7835"
        y1="48.2105"
        x2="59.9813"
        y2="103.77"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#ACD4FF" />
        <stop offset="1" stopColor="#6271EA" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_7446_6868"
        x1="-18.5349"
        y1="27.0905"
        x2="24.0436"
        y2="68.8994"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#B4C7FF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_7446_6868"
        x1="-18.5349"
        y1="27.0905"
        x2="24.0436"
        y2="68.8994"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#B4C7FF" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_7446_6868"
        x1="0"
        y1="0"
        x2="0"
        y2="48.024"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.390297" />
        <stop offset="1" stopColor="white" stopOpacity="0.365712" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_7446_6868"
        x1="-8.16456"
        y1="31.361"
        x2="38.3783"
        y2="79.3138"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7389DF" />
        <stop offset="1" stopColor="#6271EB" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_7446_6868"
        x1="12.2831"
        y1="44.2318"
        x2="39.0409"
        y2="78.7113"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FDFDFD" />
        <stop offset="1" stopColor="#ECECEC" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_7446_6868"
        x1="34.5066"
        y1="41.0931"
        x2="37.1783"
        y2="57.6084"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#E0E0E0" stopOpacity="0.01" />
      </linearGradient>
    </defs>
  </svg>
);
export const LoanApprovedIcon: React.FC<IconProps> = ({
  className,
  ...props
}) => (
  <svg
    width="78"
    height="63"
    viewBox="0 0 78 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="47.5518"
      height="48.0286"
      rx="6"
      transform="matrix(0.969647 0.244508 -0.23936 0.970931 27.9344 4.06544)"
      fill="url(#paint0_linear_7446_7136)"
    />
    <rect
      x="0.262903"
      y="0.437558"
      width="46.8318"
      height="47.3086"
      rx="5.64"
      transform="matrix(0.969647 0.244508 -0.23936 0.970931 28.0472 4.01388)"
      stroke="white"
      strokeOpacity="0.178158"
      strokeWidth="0.72"
    />
    <rect
      width="47.5564"
      height="48.024"
      rx="6"
      transform="matrix(0.965187 -0.26156 0.256103 0.96665 0.613281 13.2888)"
      fill="url(#paint1_linear_7446_7136)"
      fillOpacity="0.5"
    />
    <foreignObject x="-0.770284" y="-0.508992" width="60.967" height="61.5792">
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          backdropFilter: "blur(1.36px)",
          clipPath: "url(#bgblur_0_7446_7136_clip_path)",
          height: "100%",
          width: "100%"
        }}
      ></div>
    </foreignObject>
    <rect
      data-figma-bg-blur-radius="2.71828"
      x="0.610645"
      y="0.352545"
      width="46.5564"
      height="47.024"
      rx="5.5"
      transform="matrix(0.965187 -0.26156 0.256103 0.96665 0.544252 13.4603)"
      fill="url(#paint2_linear_7446_7136)"
      fillOpacity="0.1"
      stroke="url(#paint3_linear_7446_7136)"
    />
    <rect
      x="18.2732"
      y="2.69063"
      width="47.52"
      height="48.06"
      rx="7"
      fill="url(#paint4_linear_7446_7136)"
      fillOpacity="0.8"
    />
    <rect
      x="18.7732"
      y="3.19063"
      width="46.52"
      height="47.06"
      rx="6.5"
      stroke="white"
      strokeOpacity="0.176164"
    />
    <ellipse
      cx="42.4732"
      cy="19.0012"
      rx="7.44"
      ry="7.41061"
      fill="url(#paint5_radial_7446_7136)"
    />
    <ellipse
      cx="42.4732"
      cy="34.44"
      rx="13.64"
      ry="7.41061"
      fill="url(#paint6_radial_7446_7136)"
    />
    <path
      d="M77.1732 45.8556C77.1732 52.4663 71.8759 57.8156 65.3532 57.8156C58.8305 57.8156 53.5332 52.4663 53.5332 45.8556C53.5332 39.245 58.8305 33.8956 65.3532 33.8956C71.8759 33.8956 77.1732 39.245 77.1732 45.8556Z"
      fill="url(#paint7_linear_7446_7136)"
      stroke="url(#paint8_linear_7446_7136)"
    />
    <path
      d="M69.6761 41.3427C70.1962 40.834 71.0404 40.8332 71.5617 41.3408C72.0355 41.8023 72.0793 42.5251 71.6926 43.0348L71.5636 43.1809L65.1236 49.4786C64.6497 49.942 63.9071 49.9838 63.3847 49.6042L63.2351 49.4776L60.0218 46.3288C59.5021 45.8196 59.5039 44.9957 60.0257 44.4887C60.5 44.0277 61.2408 43.9872 61.762 44.3662L61.9113 44.4925L64.1803 46.7146L69.6761 41.3427Z"
      fill="white"
    />
    <defs>
      <clipPath
        id="bgblur_0_7446_7136_clip_path"
        transform="translate(0.770284 0.508992)"
      >
        <rect
          x="0.610645"
          y="0.352545"
          width="46.5564"
          height="47.024"
          rx="5.5"
          transform="matrix(0.965187 -0.26156 0.256103 0.96665 0.544252 13.4603)"
        />
      </clipPath>
      <linearGradient
        id="paint0_linear_7446_7136"
        x1="-29.0065"
        y1="54.2369"
        x2="67.479"
        y2="116.741"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#ACD4FF" />
        <stop offset="1" stopColor="#6271EA" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_7446_7136"
        x1="-18.5349"
        y1="27.0905"
        x2="24.0436"
        y2="68.8994"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#B4C7FF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_7446_7136"
        x1="-18.5349"
        y1="27.0905"
        x2="24.0436"
        y2="68.8994"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#B4C7FF" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_7446_7136"
        x1="0"
        y1="0"
        x2="0"
        y2="48.024"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.390297" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_7446_7136"
        x1="-0.247553"
        y1="29.8014"
        x2="42.3616"
        y2="71.5772"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7389DF" />
        <stop offset="1" stopColor="#6271EB" />
      </linearGradient>
      <radialGradient
        id="paint5_radial_7446_7136"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(39.2689 16.0592) rotate(52.9009) scale(12.2744 12.2877)"
      >
        <stop stopColor="white" />
        <stop offset="0.204263" stopColor="white" />
        <stop offset="0.61246" stopColor="#E0E0E0" />
        <stop offset="1" stopColor="#C7C7C7" />
      </radialGradient>
      <radialGradient
        id="paint6_radial_7446_7136"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(36.5987 31.498) rotate(35.8008) scale(16.7359 16.522)"
      >
        <stop stopColor="white" />
        <stop offset="0.204263" stopColor="white" />
        <stop offset="0.61246" stopColor="#E0E0E0" />
        <stop offset="1" stopColor="#C7C7C7" />
      </radialGradient>
      <linearGradient
        id="paint7_linear_7446_7136"
        x1="43.4299"
        y1="47.4531"
        x2="65.5235"
        y2="69.1146"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C1F736" />
        <stop offset="1" stopColor="#98BC3B" />
      </linearGradient>
      <linearGradient
        id="paint8_linear_7446_7136"
        x1="51.4815"
        y1="41.6143"
        x2="64.1966"
        y2="60.085"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CCFF48" />
        <stop offset="1" stopColor="#99B949" />
      </linearGradient>
    </defs>
  </svg>
);

// Export an array of all icons for easy access
export const IconSet = [
  { name: "CreditCard", component: CreditCardIcon },
  { name: "LoanApproved", component: LoanApprovedIcon },
  { name: "Loan", component: LoanIcon },
];
