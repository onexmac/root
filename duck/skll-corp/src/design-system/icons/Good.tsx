interface IconProps {
  size?: number
  className?: string
  color?: string
}

export default function Good({ size = 24, className, color = 'currentColor' }: IconProps) {
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
        d="M4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4ZM17.2071 9.20711C17.5976 8.81658 17.5976 8.18342 17.2071 7.79289C16.8166 7.40237 16.1834 7.40237 15.7929 7.79289L10 13.5858L8.20711 11.7929C7.81658 11.4024 7.18342 11.4024 6.79289 11.7929C6.40237 12.1834 6.40237 12.8166 6.79289 13.2071L9.29289 15.7071C9.68342 16.0976 10.3166 16.0976 10.7071 15.7071L17.2071 9.20711Z"
        fill={color}
      />
    </svg>
  )
}
