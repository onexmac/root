interface CardHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  statusIcon?: React.ReactNode
  className?: string
}

export default function CardHeader({ title, subtitle, actions, statusIcon, className = '' }: CardHeaderProps) {
  return (
    <div className={`flex items-start gap-3 p-4 pb-2 ${className}`}>
      {statusIcon && <div className="mt-0.5 flex-shrink-0 text-ds-text-muted">{statusIcon}</div>}
      <div className="flex-1 min-w-0">
        <h3 className="text-ds-sm font-semibold text-ds-text-primary tracking-[0.25px] truncate">{title}</h3>
        {subtitle && (
          <p className="text-ds-xs text-ds-text-secondary tracking-[0.25px] mt-0.5">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-1 flex-shrink-0">{actions}</div>}
    </div>
  )
}
