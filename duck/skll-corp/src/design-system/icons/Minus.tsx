interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Minus({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L6.70711 16.7071C6.31658 17.0976 5.68342 17.0976 5.29289 16.7071C4.90237 16.3166 4.90237 15.6834 5.29289 15.2929L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z"
        fill={color}
      />
    </svg>
  )
}
