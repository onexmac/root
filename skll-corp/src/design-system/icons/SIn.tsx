interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function SIn({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bottom bar */}
      <rect x="2" y="18" width="20" height="4" rx="2" fill={color} />
      {/* Second bar */}
      <rect x="2" y="12" width="20" height="4" rx="2" fill={color} />
      {/* Downward chevron */}
      <path
        d="M6.29289 3.29289C6.68342 2.90237 7.31658 2.90237 7.70711 3.29289L12 7.58579L16.2929 3.29289C16.6834 2.90237 17.3166 2.90237 17.7071 3.29289C18.0976 3.68342 18.0976 4.31658 17.7071 4.70711L12.7071 9.70711C12.3166 10.0976 11.6834 10.0976 11.2929 9.70711L6.29289 4.70711C5.90237 4.31658 5.90237 3.68342 6.29289 3.29289Z"
        fill={color}
      />
    </svg>
  )
}
