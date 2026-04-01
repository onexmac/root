import { Text, Card, CardHeader, CardRow, Badge, Icon, SectionHeading } from '../../design-system'

const stats = [
  { label: 'Components', value: '53+' },
  { label: 'Icons', value: '26' },
  { label: 'Design Tokens', value: '60+' },
  { label: 'Motion Presets', value: '12' },
]

const categories = [
  { name: 'Primitives', count: 15, desc: 'Text, Button, Input, Badge, Tag, Avatar, and more' },
  { name: 'Feedback', count: 10, desc: 'Toast, Banner, Dialog, Progress, Skeleton, Spinner' },
  { name: 'Navigation', count: 7, desc: 'Tabs, BottomNav, Breadcrumbs, Pagination, SideNav' },
  { name: 'Containers', count: 10, desc: 'Card, Modal, Sheet, Drawer, Accordion, Popover' },
  { name: 'Data Display', count: 6, desc: 'ListItem, Table, Tile, KeyValue, DataRow' },
  { name: 'Compounds', count: 5, desc: 'Numpad, ConfirmBar, ButtonGroup, ButtonDock' },
]

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <Text variant="display">Duck Design System</Text>
        <Text variant="body" className="text-ds-text-secondary mt-2 max-w-lg">
          A comprehensive, production-grade design system built with React, TypeScript, Tailwind CSS, and Framer Motion. Inspired by Uber's Base DS with the Duck visual language.
        </Text>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Card key={s.label} variant="filled" className="p-4 text-center">
            <Text variant="display" className="text-ds-accent">{s.value}</Text>
            <Text variant="caption" className="text-ds-text-muted mt-1">{s.label}</Text>
          </Card>
        ))}
      </div>

      <SectionHeading title="Component Categories" />
      <div className="space-y-3">
        {categories.map((cat) => (
          <Card key={cat.name} variant="outlined" className="p-4 flex items-center gap-4">
            <Badge variant="accent" value={cat.count} />
            <div>
              <Text variant="subheading">{cat.name}</Text>
              <Text variant="caption" className="text-ds-text-secondary">{cat.desc}</Text>
            </div>
          </Card>
        ))}
      </div>

      <SectionHeading title="Design Principles" />
      <div className="grid md:grid-cols-3 gap-3">
        <Card variant="filled" className="p-5">
          <Text variant="subheading" className="mb-1">Craft in Motion</Text>
          <Text variant="caption" className="text-ds-text-secondary">Every component has spring-based enter/exit/hover/press animations using Framer Motion.</Text>
        </Card>
        <Card variant="filled" className="p-5">
          <Text variant="subheading" className="mb-1">Dark Mode First</Text>
          <Text variant="caption" className="text-ds-text-secondary">Full dark mode support via CSS custom properties and Tailwind's class strategy.</Text>
        </Card>
        <Card variant="filled" className="p-5">
          <Text variant="subheading" className="mb-1">Typed & Accessible</Text>
          <Text variant="caption" className="text-ds-text-secondary">Full TypeScript types, semantic HTML, ARIA attributes, and keyboard navigation.</Text>
        </Card>
      </div>
    </div>
  )
}
