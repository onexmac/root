interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function SO({ size = 24, className, color = 'currentColor' }: IconProps) {
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
      <rect x="2" y="14" width="20" height="4" rx="2" fill={color} />
      {/* Top bar */}
      <rect x="2" y="6" width="20" height="4" rx="2" fill={color} />
    </svg>
  )
}
