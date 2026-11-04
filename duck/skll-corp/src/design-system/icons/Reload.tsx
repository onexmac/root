interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Reload({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4.5 12a7.5 7.5 0 0112.68-5.47L14 10h7V3l-2.8 2.8A9.5 9.5 0 002.5 12h2z" fill={color} />
      <path d="M19.5 12a7.5 7.5 0 01-12.68 5.47L10 14H3v7l2.8-2.8A9.5 9.5 0 0021.5 12h-2z" fill={color} />
    </svg>
  )
}
