interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function User({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="8" r="4.5" fill={color} />
      <path d="M4 20.5c0-4.14 3.58-7.5 8-7.5s8 3.36 8 7.5a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5z" fill={color} />
    </svg>
  )
}
