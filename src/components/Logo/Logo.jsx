export default function Logo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="devoraLogoGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3FE6B0" />
          <stop offset="100%" stopColor="#0C7F62" />
        </linearGradient>
      </defs>
      <path d="M50 8 L88 30 L50 44 L12 30 Z" fill="url(#devoraLogoGrad)" />
      <path d="M50 44 L88 30 L88 44 L50 58 Z" fill="#0C7F62" opacity="0.85" />
      <path d="M50 44 L12 30 L12 44 L50 58 Z" fill="#1FCE9B" />

      <path d="M50 40 L88 52 L50 66 L12 52 Z" fill="url(#devoraLogoGrad)" />
      <path d="M50 66 L88 52 L88 66 L50 80 Z" fill="#0C7F62" opacity="0.85" />
      <path d="M50 66 L12 52 L12 66 L50 80 Z" fill="#1FCE9B" />

      <path d="M50 72 L88 84 L50 98 L12 84 Z" fill="url(#devoraLogoGrad)" />
    </svg>
  );
}
