interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Cmplx({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="2" width="9" height="9" rx="2" fill={color} />
      <rect x="13" y="2" width="9" height="9" rx="2" fill={color} />
      <rect x="2" y="13" width="9" height="9" rx="2" fill={color} />
      <rect x="13" y="13" width="9" height="9" rx="2" fill={color} />
    </svg>
  )
}
