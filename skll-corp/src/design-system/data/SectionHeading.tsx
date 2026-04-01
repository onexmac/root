interface SectionHeadingProps {
  title: string
  description?: string
  action?: React.ReactNode
  divider?: boolean
  className?: string
}

export default function SectionHeading({
  title,
  description,
  action,
  divider = true,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${divider ? 'border-b border-ds-border pb-2' : ''} ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <h3 className="text-ds-xs font-semibold text-ds-text-muted uppercase tracking-[1px]">{title}</h3>
          {description && (
            <p className="text-ds-xs text-ds-text-secondary tracking-[0.25px] mt-0.5">{description}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  )
}
