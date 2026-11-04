interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function SX({ size = 24, className, color = 'currentColor' }: IconProps) {
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
      {/* X cross - first diagonal */}
      <path
        d="M8.29289 1.29289C8.68342 0.902369 9.31658 0.902369 9.70711 1.29289L12 3.58579L14.2929 1.29289C14.6834 0.902369 15.3166 0.902369 15.7071 1.29289C16.0976 1.68342 16.0976 2.31658 15.7071 2.70711L13.4142 5L15.7071 7.29289C16.0976 7.68342 16.0976 8.31658 15.7071 8.70711C15.3166 9.09763 14.6834 9.09763 14.2929 8.70711L12 6.41421L9.70711 8.70711C9.31658 9.09763 8.68342 9.09763 8.29289 8.70711C7.90237 8.31658 7.90237 7.68342 8.29289 7.29289L10.5858 5L8.29289 2.70711C7.90237 2.31658 7.90237 1.68342 8.29289 1.29289Z"
        fill={color}
      />
    </svg>
  )
}
