import { Text, Card, SectionHeading, Icon, type IconName } from '../../design-system'

const iconNames: IconName[] = [
  'home', 'config', 'user', 'chat', 'folder', 'filter', 'cmplx', 'reload',
  'open', 'close', 'arrow', 'edit', 'lens', 'info', 'go', 'add',
  'good', 'minus', 'list', 'delete', 'stack-in', 'stacked', 'stack-empty',
  'stack-x', 'stack-out', 'plus',
]

export default function IconsPage() {
  return (
    <div className="space-y-8">
      <div>
        <Text variant="display">Icons</Text>
        <Text variant="body" className="text-ds-text-secondary mt-2">
          26 custom icons matching the Duck visual language. All use currentColor for theming.
        </Text>
      </div>

      <SectionHeading title="Icon Gallery" />
      <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
        {iconNames.map((name) => (
          <Card key={name} variant="outlined" className="p-4 flex flex-col items-center gap-2">
            <Icon name={name} size={24} />
            <Text variant="caption" className="font-mono text-ds-text-muted text-[10px]">{name}</Text>
          </Card>
        ))}
      </div>

      <SectionHeading title="Sizes" />
      <Card variant="outlined" className="p-5 flex items-end gap-6">
        {[16, 20, 24, 32, 40, 48].map((size) => (
          <div key={size} className="text-center">
            <Icon name="home" size={size} />
            <Text variant="caption" className="mt-1 font-mono text-ds-text-muted text-[10px]">{size}px</Text>
          </div>
        ))}
      </Card>

      <SectionHeading title="Usage" />
      <Card variant="filled" className="p-5">
        <pre className="text-ds-xs font-mono text-ds-text-secondary overflow-x-auto whitespace-pre">{`import { Icon } from './design-system'

<Icon name="home" size={24} />
<Icon name="config" size={20} color="var(--ds-accent)" />

// Or import individual icons
import { Home, Config } from './design-system'
<Home size={24} />`}</pre>
      </Card>
    </div>
  )
}
