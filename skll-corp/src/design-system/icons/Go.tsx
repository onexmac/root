interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Go({ size = 24, className, color = 'currentColor' }: IconProps) {
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
        d="M4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4ZM9.5 6C9.5 5.72386 9.77386 5.55279 10.0168 5.67082L17.4 10.1708C17.7 10.3708 17.7 10.8 17.4 11L10.0168 18.3292C9.77386 18.4472 9.5 18.2761 9.5 18V6Z"
        fill={color}
      />
    </svg>
  )
}
