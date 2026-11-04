interface DividerProps {
  variant?: 'solid' | 'dotted' | 'dashed'
  orientation?: 'horizontal' | 'vertical'
  label?: string
  className?: string
}

export default function Divider({
  variant = 'solid',
  orientation = 'horizontal',
  label,
  className = '',
}: DividerProps) {
  const borderStyle = variant === 'dotted' ? 'dotted' : variant === 'dashed' ? 'dashed' : 'solid'

  if (orientation === 'vertical') {
    return (
      <div
        className={`self-stretch w-px bg-ds-border ${className}`}
        style={{ borderRight: `1px ${borderStyle} var(--ds-border)`, background: 'none' }}
        role="separator"
        aria-orientation="vertical"
      />
    )
  }

  if (label) {
    return (
      <div className={`flex items-center gap-3 ${className}`} role="separator">
        <div className="flex-1 h-px" style={{ borderTop: `1px ${borderStyle} var(--ds-border)` }} />
        <span className="text-ds-xs font-semibold text-ds-text-muted uppercase tracking-[0.4px]">{label}</span>
        <div className="flex-1 h-px" style={{ borderTop: `1px ${borderStyle} var(--ds-border)` }} />
      </div>
    )
  }

  return (
    <div
      className={`w-full h-px ${className}`}
      style={{ borderTop: `1px ${borderStyle} var(--ds-border)` }}
      role="separator"
    />
  )
}
