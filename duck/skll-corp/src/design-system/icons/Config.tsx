interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Config({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="4" width="4" height="16" rx="2" fill={color} />
      <rect x="10" y="7" width="4" height="13" rx="2" fill={color} />
      <rect x="17" y="2" width="4" height="18" rx="2" fill={color} />
      <circle cx="5" cy="8" r="2.5" fill={color} stroke="var(--ds-surface, #fff)" strokeWidth="1.5" />
      <circle cx="12" cy="14" r="2.5" fill={color} stroke="var(--ds-surface, #fff)" strokeWidth="1.5" />
      <circle cx="19" cy="10" r="2.5" fill={color} stroke="var(--ds-surface, #fff)" strokeWidth="1.5" />
    </svg>
  )
}
