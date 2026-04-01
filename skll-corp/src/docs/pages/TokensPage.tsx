import { Text, Card, SectionHeading, Divider } from '../../design-system'

const colors = [
  { name: '--ds-bg', label: 'Background', class: 'bg-ds-bg border border-ds-border' },
  { name: '--ds-surface', label: 'Surface', class: 'bg-ds-surface' },
  { name: '--ds-surface-elevated', label: 'Surface Elevated', class: 'bg-ds-surface-elevated' },
  { name: '--ds-accent', label: 'Accent', class: 'bg-ds-accent' },
  { name: '--ds-destructive', label: 'Destructive', class: 'bg-ds-destructive' },
  { name: '--ds-success', label: 'Success', class: 'bg-ds-success' },
  { name: '--ds-warning', label: 'Warning', class: 'bg-ds-warning' },
  { name: '--ds-danger', label: 'Danger', class: 'bg-ds-danger' },
  { name: '--ds-black', label: 'Black', class: 'bg-ds-black' },
  { name: '--ds-white', label: 'White', class: 'bg-ds-white border border-ds-border' },
]

const spacing = ['ds-1', 'ds-2', 'ds-3', 'ds-4', 'ds-6', 'ds-8', 'ds-10', 'ds-12', 'ds-16']

const radii = ['ds-none', 'ds-sm', 'ds-md', 'ds-lg', 'ds-xl', 'ds-2xl', 'ds-full']

export default function TokensPage() {
  return (
    <div className="space-y-8">
      <div>
        <Text variant="display">Design Tokens</Text>
        <Text variant="body" className="text-ds-text-secondary mt-2">
          CSS custom properties powering the entire system. All tokens use the <code className="font-mono text-ds-accent">--ds-</code> prefix.
        </Text>
      </div>

      <SectionHeading title="Colors" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {colors.map((c) => (
          <div key={c.name} className="space-y-1.5">
            <div className={`h-16 rounded-ds-lg ${c.class}`} />
            <Text variant="caption" className="font-medium">{c.label}</Text>
            <Text variant="caption" className="text-ds-text-muted font-mono text-[10px]">{c.name}</Text>
          </div>
        ))}
      </div>

      <SectionHeading title="Typography Scale" />
      <Card variant="outlined" className="p-5 space-y-2">
        <div className="text-ds-xs">xs — 10px</div>
        <div className="text-ds-sm">sm — 13px</div>
        <div className="text-ds-base">base — 15px</div>
        <div className="text-ds-lg">lg — 18px</div>
        <div className="text-ds-xl">xl — 22px</div>
        <div className="text-ds-2xl">2xl — 30px</div>
        <div className="text-ds-3xl">3xl — 40px</div>
      </Card>

      <SectionHeading title="Spacing" />
      <Card variant="outlined" className="p-5 space-y-2">
        {spacing.map((s) => (
          <div key={s} className="flex items-center gap-3">
            <Text variant="caption" className="w-12 font-mono text-ds-text-muted">{s}</Text>
            <div className={`h-3 bg-ds-accent rounded-sm`} style={{ width: `var(--${s.replace('ds-', 'ds-space-')})` }} />
          </div>
        ))}
      </Card>

      <SectionHeading title="Border Radius" />
      <div className="flex items-end gap-3 flex-wrap">
        {radii.map((r) => (
          <div key={r} className="text-center">
            <div className={`w-14 h-14 bg-ds-accent rounded-${r}`} />
            <Text variant="caption" className="mt-1 font-mono text-ds-text-muted text-[10px]">{r}</Text>
          </div>
        ))}
      </div>

      <SectionHeading title="Shadows" />
      <div className="flex gap-6 flex-wrap">
        {['ds-sm', 'ds-md', 'ds-lg'].map((s) => (
          <div key={s} className="text-center">
            <div className={`w-20 h-20 bg-ds-surface rounded-ds-lg shadow-${s}`} />
            <Text variant="caption" className="mt-2 font-mono text-ds-text-muted">{s}</Text>
          </div>
        ))}
      </div>
    </div>
  )
}
