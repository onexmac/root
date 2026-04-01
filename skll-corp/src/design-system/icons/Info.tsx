interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Info({ size = 24, className, color = 'currentColor' }: IconProps) {
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
        d="M4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7ZM10 9C10 8.44772 10.4477 8 11 8H12C12.5523 8 13 8.44772 13 9V18C13 18.5523 12.5523 19 12 19H11C10.4477 19 10 18.5523 10 18V9Z"
        fill={color}
      />
    </svg>
  )
}
