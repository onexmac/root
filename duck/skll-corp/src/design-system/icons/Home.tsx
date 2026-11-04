interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Home({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2.4L2 11h3v9a1 1 0 001 1h4.5v-6h3v6H18a1 1 0 001-1v-9h3L12 2.4z" fill={color} />
    </svg>
  )
}
