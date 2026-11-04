interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Delete({ size = 24, className, color = 'currentColor' }: IconProps) {
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
        d="M8 1.5C8 0.947715 8.44772 0.5 9 0.5H15C15.5523 0.5 16 0.947715 16 1.5V3.5H21C21.5523 3.5 22 3.94772 22 4.5C22 5.05228 21.5523 5.5 21 5.5H3C2.44772 5.5 2 5.05228 2 4.5C2 3.94772 2.44772 3.5 3 3.5H8V1.5Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 7H19.5L18.5 21.5C18.4476 22.3284 17.7523 23 16.9215 23H7.07846C6.24772 23 5.55237 22.3284 5.5 21.5L4.5 7ZM9 10C9 9.44772 9.44772 9 10 9C10.5523 9 11 9.44772 11 10V19C11 19.5523 10.5523 20 10 20C9.44772 20 9 19.5523 9 19V10ZM14 9C13.4477 9 13 9.44772 13 10V19C13 19.5523 13.4477 20 14 20C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9Z"
        fill={color}
      />
    </svg>
  )
}
