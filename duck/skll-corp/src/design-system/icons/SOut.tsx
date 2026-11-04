interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function SOut({ size = 24, className, color = 'currentColor' }: IconProps) {
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
      {/* Upward chevron */}
      <path
        d="M6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289L11.2929 3.29289C11.6834 2.90237 12.3166 2.90237 12.7071 3.29289L17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711C17.3166 10.0976 16.6834 10.0976 16.2929 9.70711L12 5.41421L7.70711 9.70711C7.31658 10.0976 6.68342 10.0976 6.29289 9.70711Z"
        fill={color}
      />
    </svg>
  )
}
