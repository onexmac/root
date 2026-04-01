interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Lens({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth="3" />
      <path d="M15.5 15.5L21 21" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
