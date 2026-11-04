interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Stacked({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bottom bar - full width */}
      <rect x="2" y="18" width="20" height="3.5" rx="1.75" fill={color} />
      {/* Second bar - full width */}
      <rect x="2" y="12.5" width="20" height="3.5" rx="1.75" fill={color} />
      {/* Third bar - full width */}
      <rect x="2" y="7" width="20" height="3.5" rx="1.75" fill={color} />
      {/* Fourth bar - shorter */}
      <rect x="4" y="2.5" width="16" height="3" rx="1.5" fill={color} />
      {/* Fifth bar - shortest (top) */}
      <rect x="6" y="-1.5" width="12" height="3" rx="1.5" fill={color} />
    </svg>
  )
}
