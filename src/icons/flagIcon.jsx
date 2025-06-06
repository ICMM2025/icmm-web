export function THFlgIcon(props) {
  return (
    <svg
      viewBox="0 -4 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <rect
          x={0.25}
          y={0.25}
          width={27.5}
          height={19.5}
          rx={1.75}
          fill="#fff"
          stroke="#F5F5F5"
          strokeWidth={0.5}
        />
        <mask
          id="b"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={28}
          height={20}
        >
          <rect
            x={0.25}
            y={0.25}
            width={27.5}
            height={19.5}
            rx={1.75}
            fill="#fff"
            stroke="#fff"
            strokeWidth={0.5}
          />
        </mask>
        <g mask="url(#b)" fillRule="evenodd" clipRule="evenodd">
          <path d="M0 4h28V0H0v4zM0 20h28v-4H0v4z" fill="#F12532" />
          <path d="M0 13.333h28V6.667H0v6.666z" fill="#322B6C" />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <rect width={28} height={20} rx={2} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function USFlgIcon(props) {
  return (
    <svg
      viewBox="0 -4 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <rect width={28} height={20} rx={2} fill="#fff" />
        <mask
          id="b"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={28}
          height={20}
        >
          <rect width={28} height={20} rx={2} fill="#fff" />
        </mask>
        <g mask="url(#b)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28 0H0v1.333h28V0zm0 2.667H0V4h28V2.667zM0 5.333h28v1.334H0V5.333zM28 8H0v1.333h28V8zM0 10.667h28V12H0v-1.333zm28 2.666H0v1.334h28v-1.334zM0 16h28v1.333H0V16zm28 2.667H0V20h28v-1.333z"
            fill="#D02F44"
          />
          <path fill="#46467F" d="M0 0H12V9.33333H0z" />
          <g filter="url(#c)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.667 2a.667.667 0 11-1.334 0 .667.667 0 011.334 0zm2.666 0A.667.667 0 114 2a.667.667 0 011.333 0zm2 .667a.667.667 0 100-1.334.667.667 0 000 1.334zM10.667 2a.667.667 0 11-1.334 0 .667.667 0 011.334 0zM3.333 4a.667.667 0 100-1.333.667.667 0 000 1.333zm3.334-.667a.667.667 0 11-1.334 0 .667.667 0 011.334 0zm2 .667a.667.667 0 100-1.333.667.667 0 000 1.333zm2 .667a.667.667 0 11-1.334 0 .667.667 0 011.334 0zm-3.334.666a.667.667 0 100-1.333.667.667 0 000 1.333zm-2-.666a.667.667 0 11-1.333 0 .667.667 0 011.333 0zM2 5.333A.667.667 0 102 4a.667.667 0 000 1.333zM4 6a.667.667 0 11-1.333 0A.667.667 0 014 6zm2 .667a.667.667 0 100-1.334.667.667 0 000 1.334zM9.333 6A.667.667 0 118 6a.667.667 0 011.333 0zM10 8a.667.667 0 100-1.333A.667.667 0 0010 8zm-2-.667a.667.667 0 11-1.333 0 .667.667 0 011.333 0zM4.667 8a.667.667 0 100-1.333.667.667 0 000 1.333zm-2-.667a.667.667 0 11-1.334 0 .667.667 0 011.334 0z"
              fill="url(#d)"
            />
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="c"
          x={1.33331}
          y={1.33333}
          width={9.33331}
          height={7.66667}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={1} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_503_3486"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_503_3486"
            result="shape"
          />
        </filter>
        <linearGradient
          id="d"
          x1={1.33331}
          y1={1.33333}
          x2={1.33331}
          y2={7.99999}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#F0F0F0" />
        </linearGradient>
        <clipPath id="a">
          <rect width={28} height={20} rx={2} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function CNFlgIcon(props) {
  return (
    <svg
      viewBox="0 -4 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <rect width={28} height={20} rx={2} fill="#fff" />
        <mask
          id="b"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={28}
          height={20}
        >
          <rect width={28} height={20} rx={2} fill="#fff" />
        </mask>
        <g mask="url(#b)">
          <path fill="#F1361D" d="M0 0H28V20H0z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.91 2.769l.965.041.231.937.382-.916.966.023-.728-.608.366-.923-.833.542-.74-.594.215.942-.824.556zm1.84 2.67l.926.273-.003.965.592-.797.932.256-.56-.766.579-.806-.939.323-.574-.755-.02.966-.933.34zm1.56 3.981l-.773.58.285-.952-.763-.594.949-.009.301-.946.302.946.948.01-.762.593.285.951-.773-.579zm-3.19 2.723l.934-.248.499.827.092-.99.93-.264-.877-.364.075-.99-.634.764-.883-.347.485.836-.62.776zM6.667 8.227L4.316 9.903l.867-2.754-2.32-1.718 2.887-.026.917-2.738.917 2.738 2.887.026-2.32 1.718.867 2.754-2.351-1.676z"
            fill="#FFDC42"
          />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <rect width={28} height={20} rx={2} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function JPFlgIcon(props) {
  return (
    <svg
      viewBox="-12.16 -12.16 40.32 40.32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={-12.16}
        y={-12.16}
        width={40.32}
        height={40.32}
        rx={0}
        fill="#fff"
        strokeWidth={0}
      />
      <circle cx={8} cy={8} r={8} fill="#D81441" />
    </svg>
  );
}

export function ESFlgIcon(props) {
  return (
    <svg
      viewBox="0 -4 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <rect width={28} height={20} rx={2} fill="#fff" />
        <mask
          id="b"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={28}
          height={20}
        >
          <rect width={28} height={20} rx={2} fill="#fff" />
        </mask>
        <g mask="url(#b)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 5.333h28V0H0v5.333zM0 20h28v-5.333H0V20z"
            fill="#DD172C"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 14.667h28V5.333H0v9.334z"
            fill="#FFD133"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.333 9.333h1.334V10H7.333v-.667z"
            fill="#FFEDB1"
          />
          <path
            d="M6.391 9h1.884c.195 0 .349.167.333.361l-.172 2.055a1 1 0 01-.996.917h-.213a1 1 0 01-.997-.917L6.06 9.361A.333.333 0 016.391 9z"
            stroke="#A41517"
            strokeWidth={0.666667}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 10h2.667v.667H8L7.333 12l-.666-1.333H6V10z"
            fill="#A41517"
          />
          <rect
            x={4}
            y={8}
            width={1.33333}
            height={4.66667}
            rx={0.666667}
            fill="#A41517"
          />
          <rect
            x={9.33337}
            y={8}
            width={1.33333}
            height={4.66667}
            rx={0.666667}
            fill="#A41517"
          />
          <path
            d="M6 7.733c0-.589.478-1.066 1.067-1.066H7.6c.59 0 1.067.477 1.067 1.066 0 .148-.12.267-.267.267H6.267A.267.267 0 016 7.733z"
            fill="#A41517"
          />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <rect width={28} height={20} rx={2} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function MMFlgIcon(props) {
  return (
    <svg
      viewBox="0 -4 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <rect width={28} height={20} rx={2} fill="#fff" />
        <mask
          id="b"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={28}
          height={20}
        >
          <rect width={28} height={20} rx={2} fill="#fff" />
        </mask>
        <g mask="url(#b)" fillRule="evenodd" clipRule="evenodd">
          <path d="M0 20h28v-6.667H0V20z" fill="#F13D4F" />
          <path d="M0 13.333h28V6.667H0v6.666z" fill="#4AC94B" />
          <path d="M0 6.667h28V0H0v6.667z" fill="#FFD043" />
          <path
            d="M14 12.34l-3.527 2.514 1.301-4.13-3.48-2.578 4.33-.04L14 4l1.375 4.107 4.331.039-3.48 2.577 1.3 4.131L14 12.34z"
            fill="#fff"
          />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <rect width={28} height={20} rx={2} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function LAFlgIcon(props) {
  return (
    <svg
      viewBox="0 -4 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <rect width={28} height={20} rx={2} fill="#fff" />
        <mask
          id="b"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={28}
          height={20}
        >
          <rect width={28} height={20} rx={2} fill="#fff" />
        </mask>
        <g mask="url(#b)" fillRule="evenodd" clipRule="evenodd">
          <path d="M0 14.667h28V5.333H0v9.334z" fill="#073A88" />
          <path
            d="M0 5.333h28V0H0v5.333zM0 20h28v-5.333H0V20z"
            fill="#E2273E"
          />
          <path
            d="M14 13.333a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666z"
            fill="#fff"
          />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <rect width={28} height={20} rx={2} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function KMFlgIcon(props) {
  return (
    <svg
      viewBox="0 -4 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <rect width={28} height={20} rx={2} fill="#fff" />
        <mask
          id="b"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={28}
          height={20}
        >
          <rect width={28} height={20} rx={2} fill="#fff" />
        </mask>
        <g mask="url(#b)" fillRule="evenodd" clipRule="evenodd">
          <path
            d="M0 5.333h28V0H0v5.333zM0 20h28v-5.333H0V20z"
            fill="#0F3EB6"
          />
          <path d="M0 14.667h28V5.333H0v9.334z" fill="#ED1A3C" />
          <path
            d="M12 8.727h1.333V8a.667.667 0 011.334 0v.727H16V10h-4V8.727zM17.333 8a.667.667 0 00-.666.667V10H18V8.667A.667.667 0 0017.333 8zm-6 5.333v-2.666H10l-1.333 2.666h2.666zM12 10.667v2.666h4v-2.666h-4zm4.667 0H18l1.333 2.666h-2.666v-2.666zm-6-2.667a.667.667 0 00-.667.667V10h1.333V8.667A.667.667 0 0010.667 8z"
            fill="#fff"
          />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <rect width={28} height={20} rx={2} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export const icons = {
  THFlgIcon,
  USFlgIcon,
  CNFlgIcon,
  JPFlgIcon,
  ESFlgIcon,
  MMFlgIcon,
  LAFlgIcon,
  KMFlgIcon,
};
