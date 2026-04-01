import { Text, Card, SectionHeading } from '../../design-system'

const variants = ['display', 'heading', 'subheading', 'body', 'label', 'caption', 'overline'] as const

export default function TypographyPage() {
  return (
    <div className="space-y-8">
      <div>
        <Text variant="display">Typography</Text>
        <Text variant="body" className="text-ds-text-secondary mt-2">
          The Text component provides 7 semantic variants with proper HTML elements and tracking.
        </Text>
      </div>

      <SectionHeading title="Variants" />
      <Card variant="outlined" className="p-5 space-y-4">
        {variants.map((v) => (
          <div key={v} className="flex items-baseline gap-4">
            <Text variant="caption" className="w-24 text-ds-text-muted font-mono flex-shrink-0">{v}</Text>
            <Text variant={v}>The quick brown fox jumps over the lazy dog</Text>
          </div>
        ))}
      </Card>

      <SectionHeading title="Colors" />
      <Card variant="outlined" className="p-5 space-y-2">
        <Text variant="body">Default (primary)</Text>
        <Text variant="body" color="secondary">Secondary color</Text>
        <Text variant="body" color="muted">Muted color</Text>
        <Text variant="body" color="accent">Accent color</Text>
        <Text variant="body" color="destructive">Destructive color</Text>
      </Card>

      <SectionHeading title="Monospace" />
      <Card variant="outlined" className="p-5">
        <Text variant="body" mono>const duck = new DesignSystem()</Text>
      </Card>

      <SectionHeading title="Usage" />
      <Card variant="filled" className="p-5">
        <pre className="text-ds-xs font-mono text-ds-text-secondary overflow-x-auto whitespace-pre">{`import { Text } from './design-system'

<Text variant="display">Hero Title</Text>
<Text variant="body" color="secondary">Description</Text>
<Text variant="caption" mono>code snippet</Text>
<Text variant="heading" as="h3">Custom element</Text>`}</pre>
      </Card>
    </div>
  )
}
