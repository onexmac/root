interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Edit({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="2" width="7" height="7" rx="2" fill={color} />
      <rect x="7" y="7" width="15" height="15" rx="2" fill={color} />
      <rect x="9" y="9" width="11" height="11" rx="1" fill={color} opacity="0.85" />
    </svg>
  )
}
