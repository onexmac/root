interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function List({ size = 24, className, color = 'currentColor' }: IconProps) {
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
        d="M3 3C1.89543 3 1 3.89543 1 5V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V5C23 3.89543 22.1046 3 21 3H3ZM5 8C5 7.44772 5.44772 7 6 7H18C18.5523 7 19 7.44772 19 8C19 8.55228 18.5523 9 18 9H6C5.44772 9 5 8.55228 5 8ZM6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H18C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11H6ZM5 16C5 15.4477 5.44772 15 6 15H18C18.5523 15 19 15.4477 19 16C19 16.5523 18.5523 17 18 17H6C5.44772 17 5 16.5523 5 16Z"
        fill={color}
      />
    </svg>
  )
}
