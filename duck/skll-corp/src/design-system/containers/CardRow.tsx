interface CardRowProps {
  label: string
  value?: React.ReactNode
  badge?: React.ReactNode
  separator?: boolean
  className?: string
}

export default function CardRow({ label, value, badge, separator = true, className = '' }: CardRowProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 ${
        separator ? 'border-b border-ds-border last:border-b-0' : ''
      } ${className}`}
    >
      <span className="flex-1 text-ds-sm text-ds-text-secondary tracking-[0.25px]">{label}</span>
      {badge && <div>{badge}</div>}
      {value && <span className="text-ds-sm font-medium text-ds-text-primary tracking-[0.25px]">{value}</span>}
    </div>
  )
}
