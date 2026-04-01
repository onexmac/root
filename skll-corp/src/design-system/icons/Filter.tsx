interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Filter({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="4" width="20" height="3" rx="1.5" fill={color} />
      <rect x="5" y="10.5" width="14" height="3" rx="1.5" fill={color} />
      <rect x="8" y="17" width="8" height="3" rx="1.5" fill={color} />
    </svg>
  )
}
