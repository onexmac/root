interface KeyValueProps {
  label: string
  value: React.ReactNode
  layout?: 'inline' | 'stacked'
  className?: string
}

export default function KeyValue({ label, value, layout = 'inline', className = '' }: KeyValueProps) {
  if (layout === 'stacked') {
    return (
      <div className={className}>
        <dt className="text-ds-xs text-ds-text-muted tracking-[0.4px] uppercase font-medium">{label}</dt>
        <dd className="text-ds-sm text-ds-text-primary font-medium tracking-[0.25px] mt-0.5">{value}</dd>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <dt className="text-ds-sm text-ds-text-secondary tracking-[0.25px]">{label}</dt>
      <dd className="text-ds-sm text-ds-text-primary font-medium tracking-[0.25px] text-right">{value}</dd>
    </div>
  )
}
