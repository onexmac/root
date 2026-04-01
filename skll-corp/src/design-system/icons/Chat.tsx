interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Chat({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2h-5.17L12 20.83 9.17 18H4a2 2 0 01-2-2V6a2 2 0 012-2z" fill={color} />
    </svg>
  )
}
