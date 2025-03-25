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


export const ActiveTradelineIcon: React.FC<IconProps> = ({
  className,
  ...props
}) => (
  <svg
    width="45"
    height="36"
    viewBox="0 0 45 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <mask
      id="mask0_7446_15275"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="45"
      height="36"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.879883 0.719971H44.0799V35.28H0.879883V0.719971Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_7446_15275)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.7194 35.28C28.3353 35.28 27.9993 35.1356 27.7105 34.8487L23.8712 31.0082C23.4399 30.5768 23.3417 30.0002 23.5352 29.4244C23.7749 28.8949 24.3034 28.5127 24.8791 28.5127H30.6391C33.4705 28.5127 36.1103 27.4084 38.1281 25.4414C40.095 23.4707 41.1992 20.8307 41.1992 17.9992C41.1992 12.1899 36.4482 7.43865 30.6401 7.43865H27.2792C26.4638 7.43865 25.8399 6.81477 25.8399 5.99931C25.8399 5.18288 26.4638 4.55901 27.2792 4.55901H30.6401C38.0309 4.55901 44.0797 10.6081 44.0797 17.9992C44.0797 21.599 42.6885 24.9591 40.1441 27.5037C37.5996 30.0483 34.2397 31.4395 30.6391 31.4395H28.3353L29.7264 32.8316C30.3021 33.4064 30.3021 34.3201 29.7264 34.8467C29.4395 35.1356 29.1036 35.28 28.7194 35.28ZM19.1192 31.4395H14.32C6.92819 31.4395 0.879395 25.3904 0.879395 17.9992C0.879395 14.3995 2.27053 11.0394 4.81501 8.4948C7.35949 5.95021 10.7194 4.55901 14.32 4.55901H18.064L16.6729 3.16781C16.0972 2.59207 16.0972 1.67841 16.6729 1.15177C17.2486 0.576037 18.1612 0.576037 18.6888 1.15177L22.5282 4.99225C22.9595 5.42357 23.0567 6.00027 22.8641 6.57601C22.6706 7.14982 22.0949 7.43865 21.5192 7.43865H14.32C11.4886 7.43865 8.84882 8.54294 6.83095 10.5099C4.86411 12.5278 3.75986 15.1677 3.75986 17.9992C3.75986 23.8086 8.5109 28.5598 14.319 28.5598H19.1192C19.9346 28.5598 20.5594 29.1847 20.5594 30.0002C20.5594 30.8156 19.9346 31.4395 19.1192 31.4395Z"
        fill="#B7BFCA"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.014 24.5076V26.6363H20.973V24.6559C19.5741 24.5904 18.2215 24.2178 17.4292 23.7586L18.054 21.3209C18.931 21.7994 20.1595 22.2355 21.5131 22.2355C22.7049 22.2355 23.5136 21.7782 23.5136 20.9454C23.5136 20.154 22.8464 19.6534 21.308 19.1306C19.0755 18.3815 17.5553 17.3398 17.5553 15.319C17.5553 13.483 18.8444 12.0475 21.077 11.6085V9.62805H23.1199V11.4621C24.5158 11.5257 25.4535 11.8155 26.1428 12.1476L25.5382 14.5054C24.9943 14.2724 24.0344 13.793 22.5355 13.793C21.18 13.793 20.7419 14.3774 20.7419 14.9627C20.7419 15.6482 21.4717 16.0892 23.2431 16.7545C25.725 17.6287 26.7243 18.7763 26.7243 20.6517C26.7233 22.5089 25.4092 24.0908 23.014 24.5076Z"
      fill="#6271EB"
    />
  </svg>
);

export const TradelineGaugeIcon: React.FC<IconProps> = ({
  className,
  ...props
}) => (
  <svg
    width="43"
    height="26"
    viewBox="0 0 43 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <mask
      id="mask0_7446_4191"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="43"
      height="26"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.213135 0.0800171H42.2899V25.6876H0.213135V0.0800171Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_7446_4191)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.89977 25.6876C1.20467 25.6876 0.593087 25.1835 0.479796 24.475C0.303139 23.3699 0.212891 22.2409 0.212891 21.1185C0.212891 9.51772 9.65059 0.0800171 21.2514 0.0800171C32.8522 0.0800171 42.2899 9.51772 42.2899 21.1185C42.2899 22.2389 42.2016 23.3651 42.0259 24.4644C41.8991 25.2508 41.1531 25.7807 40.3764 25.6598C39.5911 25.534 39.0553 24.7947 39.1811 24.0103C39.3328 23.0608 39.4096 22.0882 39.4096 21.1185C39.4096 11.1057 31.2642 2.96029 21.2514 2.96029C11.2395 2.96029 3.09317 11.1057 3.09317 21.1185C3.09317 22.0892 3.17093 23.0656 3.32359 24.0199C3.44936 24.8053 2.91459 25.5445 2.12923 25.6694C2.05243 25.6818 1.97562 25.6876 1.89977 25.6876"
        fill="#B7BFCA"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.7178 18.127C25.155 19.0026 25.6015 20.8719 24.7172 22.3082C23.8272 23.7551 21.9493 24.2063 20.514 23.3307L19.5702 22.4388L8.51953 11.8778L22.8758 17.7785L23.7178 18.127Z"
      fill="#6271EB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.95996 10.3685C1.95996 13.8497 7.17902 13.8497 7.17902 10.3685C7.17902 6.89004 1.95996 6.89004 1.95996 10.3685"
      fill="#6271EB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.95996 10.3685C1.95996 13.8497 7.17902 13.8497 7.17902 10.3685C7.17902 6.89004 1.95996 6.89004 1.95996 10.3685"
      fill="#6271EB"
    />
    <path
      d="M1.95996 10.3685C1.95996 13.8497 7.17902 13.8497 7.17902 10.3685C7.17902 6.89004 1.95996 6.89004 1.95996 10.3685"
      stroke="#F8F9FA"
    />
  </svg>
);
export const NegativeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="37"
    height="41"
    viewBox="0 0 37 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.0341 9.64051C20.0341 10.2953 20.5623 10.831 21.2079 10.831H26.5971L20.0341 4.17435V9.64051ZM30.5272 11.6521C30.5636 11.7476 30.5869 11.8543 30.5869 11.9497C30.5869 11.9754 30.599 12.0226 30.599 12.0226V16.7847C30.599 17.4395 30.0698 17.9752 29.4242 17.9752C28.7787 17.9752 28.2505 17.4395 28.2505 16.7847V13.2121H21.2059C19.2692 13.2121 17.6846 11.6049 17.6846 9.64053V2.49531H3.59748C2.95192 2.49531 2.42372 3.03105 2.42372 3.68584V33.9509C2.42372 34.6046 2.95192 35.1414 3.59748 35.1414H14.9749V35.1394C15.6204 35.1394 16.1486 35.6751 16.1486 36.3299C16.1486 36.9847 15.6204 37.5204 14.9749 37.5204H3.59647C1.66078 37.5204 0.0751953 35.9132 0.0751953 33.9488V3.68687C0.0751953 1.7225 1.66078 0.114258 3.59647 0.114258H18.8715C18.8846 0.114258 18.8971 0.117537 18.9092 0.120711C18.9206 0.123688 18.9316 0.126574 18.9424 0.126574C18.954 0.128225 18.9658 0.129845 18.9778 0.131484C19.0626 0.143088 19.1544 0.155652 19.2368 0.187126C19.2732 0.198416 19.2955 0.198416 19.3188 0.198416C19.325 0.198416 19.3309 0.204576 19.3367 0.210603C19.3423 0.216373 19.3477 0.222021 19.3532 0.222021C19.4706 0.280521 19.5879 0.352363 19.6942 0.4591L30.2469 11.1882C30.3521 11.2837 30.4219 11.4027 30.4816 11.5331C30.4816 11.5387 30.4874 11.5446 30.4933 11.5505C30.4991 11.5564 30.5049 11.5623 30.5049 11.5679C30.5272 11.5916 30.5272 11.6285 30.5272 11.6521ZM4.7726 12.0211C4.7726 11.3663 5.30079 10.8306 5.94636 10.8306H14.1647C14.8103 10.8306 15.3385 11.3663 15.3385 12.0211C15.3385 12.6759 14.8103 13.2116 14.1647 13.2116H5.94636C5.30079 13.2116 4.7726 12.6759 4.7726 12.0211ZM4.7726 17.9759C4.7726 17.3211 5.30079 16.7853 5.94636 16.7853H17.686C18.3315 16.7853 18.8597 17.3211 18.8597 17.9759C18.8597 18.6307 18.3315 19.1664 17.686 19.1664H5.94636C5.30079 19.1664 4.7726 18.6307 4.7726 17.9759Z"
      fill="#B7BFCA"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.7979 29.3516C17.7979 33.9485 21.4841 37.6874 26.0163 37.6874C30.5484 37.6874 34.2346 33.9485 34.2346 29.3516C34.2346 24.7547 30.5484 21.0159 26.0163 21.0159C21.4841 21.0159 17.7979 24.7547 17.7979 29.3516ZM15.4504 29.3516C15.4504 23.4452 20.194 18.6348 26.0163 18.6348C31.8385 18.6348 36.5821 23.4452 36.5821 29.3516C36.5821 35.2581 31.8385 40.0684 26.0163 40.0684C20.194 40.0684 15.4504 35.2581 15.4504 29.3516ZM22.4947 28.1607H29.5393C30.1849 28.1607 30.713 28.6964 30.713 29.3512C30.713 30.006 30.1849 30.5417 29.5393 30.5417H22.4947C21.8491 30.5417 21.3209 30.006 21.3209 29.3512C21.3209 28.6964 21.8491 28.1607 22.4947 28.1607Z"
      fill="#6271EB"
    />
  </svg>
);
export const EmptyWalletIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="67"
    height="65"
    viewBox="0 0 67 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 36.5132L5 30.3932C5 24.1832 10.07 19.1132 16.28 19.1132H50.72C56.93 19.1132 62 24.1832 62 30.3932V34.7132H55.94C54.26 34.7132 52.73 35.3732 51.62 36.5132C50.36 37.7432 49.64 39.5132 49.82 41.4032C50.09 44.6432 53.06 47.0132 56.3 47.0132H62V50.5832C62 56.7932 56.93 61.8632 50.72 61.8632H25.8529"
      stroke="#B7BFCA"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 33.0932V19.3832C5 15.8132 7.19 12.6332 10.52 11.3732L34.34 2.37323C38.06 0.963226 42.05 3.72323 42.05 7.71323V19.1132"
      stroke="#B7BFCA"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M65.1764 43.9537C65.1764 45.6037 63.8564 46.9537 62.1764 47.0137H56.2964C53.0564 47.0137 50.0864 44.6437 49.8164 41.4037C49.6364 39.5137 50.3564 37.7437 51.6164 36.5137C52.7264 35.3737 54.2564 34.7137 55.9364 34.7137H62.1764C63.8564 34.7737 65.1764 36.1237 65.1764 37.7737V43.9537Z"
      stroke="#B7BFCA"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 31.8632H39.5"
      stroke="#B7BFCA"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.26 59.18C21.63 60.26 20.82 61.22 19.89 62C17.79 63.89 15.03 65 12 65C7.62 65 3.81001 62.66 1.74001 59.18C0.630005 57.38 0 55.25 0 53C0 49.22 1.74 45.83 4.5 43.64C6.57 41.99 9.18 41 12 41C18.63 41 24 46.37 24 53C24 55.25 23.37 57.38 22.26 59.18Z"
      fill="#6271EB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.21 50.14C10.21 50.95 9.55 51.62 8.73 51.62C7.92 51.62 7.25 50.96 7.25 50.14C7.25 49.32 7.91 48.66 8.73 48.66C9.54 48.66 10.21 49.32 10.21 50.14ZM8.32 57.02C8.13 57.02 7.94 56.95 7.79 56.8C7.5 56.51 7.5 56.03 7.79 55.74L14.34 49.19C14.63 48.9 15.11 48.9 15.4 49.19C15.69 49.48 15.69 49.96 15.4 50.25L8.85 56.8C8.7 56.95 8.51 57.02 8.32 57.02ZM13.79 55.86C13.79 55.05 14.45 54.38 15.27 54.38C16.08 54.38 16.75 55.04 16.75 55.86C16.75 56.68 16.09 57.34 15.27 57.34C14.46 57.34 13.79 56.68 13.79 55.86Z"
      fill="white"
    />
  </svg>
);

export function InquiriesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="55"
      height="57"
      viewBox="0 0 55 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.0563 12.9884C34.0563 13.8811 34.7934 14.6116 35.6945 14.6116H43.216L34.0563 5.53566V12.9884ZM48.67 15.6163C48.7011 15.6485 48.7011 15.6988 48.7011 15.731C48.752 15.8611 48.7844 16.0067 48.7844 16.1368C48.7844 16.1718 48.8014 16.2362 48.8014 16.2362V28.729C48.8014 29.6217 48.0628 30.3521 47.1618 30.3521C46.2608 30.3521 45.5236 29.6217 45.5236 28.729V17.858H35.6916C32.9886 17.858 30.7771 15.6666 30.7771 12.9884V3.24639H5.03024C4.12924 3.24639 3.39205 3.97683 3.39205 4.86959V51.1338C3.39205 52.0251 4.12924 52.757 5.03024 52.757H26.9951V52.7542C27.8961 52.7542 28.6333 53.4846 28.6333 54.3774C28.6333 55.2701 27.8961 56.0006 26.9951 56.0006H5.02883C2.32723 56.0006 0.114258 53.8092 0.114258 51.131V4.87099C0.114258 2.19271 2.32723 0 5.02883 0H32.4336C32.4518 0 32.4693 0.00447027 32.4862 0.00879782C32.5021 0.0128576 32.5174 0.0167917 32.5325 0.0167917C32.5487 0.0190437 32.5652 0.0212529 32.582 0.0234881C32.7003 0.0393085 32.8283 0.0564382 32.9434 0.0993508C32.9943 0.114743 33.0253 0.114743 33.0578 0.114743C33.0665 0.114743 33.0748 0.123143 33.0829 0.13136C33.0906 0.139227 33.0982 0.146927 33.1058 0.146927C33.2696 0.226688 33.4335 0.324639 33.5817 0.470167L48.3099 15.0985C48.4568 15.2287 48.5542 15.391 48.6376 15.5687C48.6376 15.5764 48.6457 15.5844 48.6538 15.5925C48.6619 15.6005 48.67 15.6086 48.67 15.6163ZM9.32288 18.611H25.8645C26.7655 18.611 27.5027 19.3414 27.5027 20.2342C27.5027 21.127 26.7655 21.8574 25.8645 21.8574H9.32288C8.42188 21.8574 7.68469 21.127 7.68469 20.2342C7.68469 19.3414 8.42188 18.611 9.32288 18.611ZM9.32288 26.7299H30.779C31.68 26.7299 32.4172 27.4604 32.4172 28.3531C32.4172 29.2459 31.68 29.9763 30.779 29.9763H9.32288C8.42188 29.9763 7.68469 29.2459 7.68469 28.3531C7.68469 27.4604 8.42188 26.7299 9.32288 26.7299Z"
        fill="#B7BFCA"
      />
      <path
        d="M53.1212 51.1806C52.4822 52.2606 51.6607 53.2206 50.7174 54.0006C48.5874 55.8906 45.7879 57.0006 42.7146 57.0006C38.2721 57.0006 34.4076 54.6606 32.3081 51.1806C31.1822 49.3806 30.5432 47.2506 30.5432 45.0006C30.5432 41.2206 32.3081 37.8306 35.1075 35.6406C37.2071 33.9906 39.8544 33.0006 42.7146 33.0006C49.4394 33.0006 54.8861 38.3706 54.8861 45.0006C54.8861 47.2506 54.2471 49.3806 53.1212 51.1806Z"
        fill="#6271EB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47.779 42.5363V42.536C47.9269 45.3019 45.7311 47.6004 43.0117 47.6004V48.1544C43.0117 48.8417 42.4571 49.4002 41.7722 49.4002C41.0888 49.4002 40.533 48.8426 40.533 48.1544V46.1661C40.533 45.4787 41.0876 44.9203 41.7722 44.9203H43.0117V44.9191C44.3058 44.9191 45.3319 43.7399 45.0814 42.3934C44.9207 41.5292 44.2161 40.8454 43.3517 40.7084C42.4282 40.5621 41.5966 41.0235 41.1842 41.7552C40.9522 42.1649 40.5414 42.4377 40.0729 42.4377H39.9599C38.984 42.4377 38.3492 41.3898 38.8116 40.5268C39.6304 39.0013 41.2448 37.9696 43.0931 38.0013C45.5692 38.0433 47.6451 40.0502 47.779 42.5363ZM40.285 51.5052C40.285 50.6797 40.9512 50.0101 41.7724 50.0101C42.5935 50.0101 43.2597 50.6797 43.2597 51.5052C43.2597 52.3308 42.5935 53.0007 41.7724 53.0007C40.9512 53.0007 40.285 52.3308 40.285 51.5052Z"
        fill="white"
      />
    </svg>
  );
}
export function RevolvingCreditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="67"
      height="55"
      viewBox="0 0 67 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8.28275 8.16888L7.26987 7.0625L7.26987 7.0625L8.28275 8.16888ZM58.7463 8.16888L59.7592 7.0625L59.7592 7.0625L58.7463 8.16888ZM58.7463 46.8311L59.7592 47.9375L59.7592 47.9375L58.7463 46.8311ZM60.772 49.0439L59.7591 47.9375L59.7591 47.9375L60.772 49.0439ZM60.772 5.95612L59.7591 7.0625L59.7591 7.0625L60.772 5.95612ZM6.25698 5.95612L5.2441 4.84974L5.2441 4.84974L6.25698 5.95612ZM7.26987 7.0625C4.60789 9.49953 3.08594 13.2491 3.08594 18.5H6.08594C6.08594 13.8353 7.4206 10.9918 9.29563 9.27526L7.26987 7.0625ZM18.3002 3.5C13.7353 3.5 9.93203 4.62531 7.26987 7.0625L9.29563 9.27526C11.218 7.51531 14.1865 6.5 18.3002 6.5V3.5ZM48.7288 3.5H18.3002V6.5H48.7288V3.5ZM59.7592 7.0625C57.097 4.62531 53.2937 3.5 48.7288 3.5V6.5C52.8425 6.5 55.811 7.51531 57.7334 9.27526L59.7592 7.0625ZM63.9431 18.5C63.9431 13.2491 62.4211 9.49953 59.7592 7.0625L57.7334 9.27525C59.6084 10.9918 60.9431 13.8353 60.9431 18.5H63.9431ZM63.9431 36.5V18.5H60.9431V36.5H63.9431ZM59.7592 47.9375C62.4211 45.5005 63.9431 41.7509 63.9431 36.5H60.9431C60.9431 41.1647 59.6084 44.0082 57.7334 45.7247L59.7592 47.9375ZM48.7288 51.5C53.2937 51.5 57.097 50.3747 59.7592 47.9375L57.7334 45.7247C55.811 47.4847 52.8425 48.5 48.7288 48.5V51.5ZM33.5145 51.5H48.7288V48.5H33.5145V51.5ZM33.5145 51.5H33.5145V48.5C31.8577 48.5 30.5145 49.8431 30.5145 51.5H33.5145ZM33.5145 51.5H33.5145H30.5145C30.5145 53.1569 31.8577 54.5 33.5145 54.5V51.5ZM48.7288 51.5H33.5145V54.5H48.7288V51.5ZM59.7591 47.9375C57.0969 50.3747 53.2936 51.5 48.7288 51.5V54.5C53.7425 54.5 58.3817 53.2659 61.7849 50.1503L59.7591 47.9375ZM63.9431 36.5C63.9431 41.7507 62.4212 45.5004 59.7591 47.9375L61.7849 50.1503C65.2358 46.991 66.9431 42.3337 66.9431 36.5H63.9431ZM63.9431 18.5V36.5H66.9431V18.5H63.9431ZM59.7591 7.0625C62.4212 9.49961 63.9431 13.2493 63.9431 18.5H66.9431C66.9431 12.6664 65.2358 8.00903 61.7849 4.84974L59.7591 7.0625ZM48.7288 3.5C53.2936 3.5 57.0969 4.62525 59.7591 7.0625L61.7849 4.84974C58.3817 1.73413 53.7425 0.5 48.7288 0.5V3.5ZM18.3002 3.5H48.7288V0.5H18.3002V3.5ZM7.26987 7.0625C9.93209 4.62525 13.7354 3.5 18.3002 3.5V0.5C13.2865 0.5 8.64731 1.73413 5.2441 4.84974L7.26987 7.0625ZM3.08594 18.5C3.08594 13.2493 4.60779 9.49961 7.26987 7.0625L5.2441 4.84974C1.79319 8.00903 0.0859375 12.6664 0.0859375 18.5H3.08594ZM3.08594 24.5V18.5H0.0859375V24.5H3.08594ZM3.08594 24.5H0.0859375C0.0859375 26.1569 1.42908 27.5 3.08594 27.5V24.5ZM3.08594 24.5V27.5C4.74279 27.5 6.08594 26.1569 6.08594 24.5H3.08594ZM3.08594 18.5V24.5H6.08594V18.5H3.08594ZM20.8359 16V13C19.1791 13 17.8359 14.3431 17.8359 16H20.8359ZM20.8359 16H17.8359C17.8359 17.6569 19.1791 19 20.8359 19V16ZM46.1931 16H20.8359V19H46.1931V16ZM46.1931 16V19C47.8499 19 49.1931 17.6569 49.1931 16H46.1931ZM46.1931 16H49.1931C49.1931 14.3431 47.8499 13 46.1931 13V16ZM20.8359 16H46.1931V13H20.8359V16Z" fill="#B7BFCA"/>
      <path d="M22.621 48.68C21.982 49.76 21.1604 50.72 20.2171 51.5C18.0871 53.39 15.2877 54.5 12.2144 54.5C7.77183 54.5 3.9074 52.16 1.80783 48.68C0.681974 46.88 0.0429688 44.75 0.0429688 42.5C0.0429688 38.72 1.80783 35.33 4.60725 33.14C6.70683 31.49 9.35411 30.5 12.2144 30.5C18.9391 30.5 24.3858 35.87 24.3858 42.5C24.3858 44.75 23.7468 46.88 22.621 48.68Z" fill="#6271EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6835 38.2699C13.5129 36.5299 10.3179 36.6399 8.28934 38.6299C7.44748 39.4699 6.90991 40.5399 6.73748 41.7299C6.67663 42.1399 6.97077 42.5199 7.36634 42.5699C7.40691 42.5799 7.43734 42.5799 7.47791 42.5799C7.8532 42.5799 8.17777 42.3099 8.22848 41.9399C8.36034 41.0699 8.74577 40.2899 9.35434 39.6899C10.7541 38.3099 12.9246 38.1599 14.4968 39.2399H13.7361C13.3202 39.2399 12.9753 39.5799 12.9753 39.9899C12.9753 40.3999 13.3202 40.7399 13.7361 40.7399H16.4442C16.8601 40.7399 17.2049 40.3999 17.2049 39.9899V37.3199C17.2049 36.9099 16.8601 36.5699 16.4442 36.5699C16.0283 36.5699 15.6835 36.9099 15.6835 37.3199V38.2699ZM8.73563 46.7299C9.74991 47.5399 10.9772 47.9699 12.2146 47.9699C13.6346 47.9699 15.0546 47.4399 16.1399 46.3699C16.9818 45.5399 17.5193 44.4699 17.7019 43.2599C17.7526 42.8499 17.4686 42.4699 17.0528 42.4099C16.6268 42.3499 16.2515 42.6399 16.1906 43.0499C16.0588 43.9199 15.6733 44.6999 15.0648 45.2999C13.6651 46.6799 11.4945 46.8299 9.92234 45.7499H10.6831C11.0989 45.7499 11.4438 45.4099 11.4438 44.9999C11.4438 44.5899 11.0989 44.2499 10.6831 44.2499H7.97491C7.55906 44.2499 7.2142 44.5899 7.2142 44.9999V47.6699C7.2142 48.0799 7.55906 48.4199 7.97491 48.4199C8.39077 48.4199 8.73563 48.0799 8.73563 47.6699V46.7299Z" fill="white"/>
    </svg>
  );
}



// Export an array of all icons for easy access
export const IconSet = [
  { name: "CreditCard", component: CreditCardIcon },
  { name: "LoanApproved", component: LoanApprovedIcon },
  { name: "Loan", component: LoanIcon },
  { name: "ActiveTradeline", component: ActiveTradelineIcon },
  { name: "TradelineGauge", component: TradelineGaugeIcon },
  { name: "Negative", component: NegativeIcon },
  { name: "EmptyWallet", component: EmptyWalletIcon },
  { name: "Inquiries", component: InquiriesIcon },
  { name: "RevolvingCredit", component: RevolvingCreditIcon },
];
