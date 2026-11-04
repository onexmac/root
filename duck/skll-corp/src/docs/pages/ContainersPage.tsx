import { useState } from 'react'
import {
  Text, Card, CardHeader, CardRow, SectionHeading, Accordion, Modal,
  Sheet, Drawer, Popover, Button, ScrollView,
} from '../../design-system'

export default function ContainersPage() {
  const [showModal, setShowModal] = useState(false)
  const [showSheet, setShowSheet] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <Text variant="display">Containers</Text>
        <Text variant="body" className="text-ds-text-secondary mt-2">
          Card, Accordion, Modal, Sheet, Drawer, Popover, ScrollView, and Screen.
        </Text>
      </div>

      <SectionHeading title="Card Variants" />
      <div className="grid md:grid-cols-3 gap-3">
        <Card variant="elevated" className="p-4">
          <Text variant="subheading">Elevated</Text>
          <Text variant="caption" className="text-ds-text-muted">With shadow</Text>
        </Card>
        <Card variant="outlined" className="p-4">
          <Text variant="subheading">Outlined</Text>
          <Text variant="caption" className="text-ds-text-muted">With border</Text>
        </Card>
        <Card variant="filled" className="p-4">
          <Text variant="subheading">Filled</Text>
          <Text variant="caption" className="text-ds-text-muted">Background fill</Text>
        </Card>
      </div>

      <SectionHeading title="Card with Header & Rows" />
      <Card>
        <CardHeader title="Account" subtitle="Billing details" />
        <CardRow label="Plan" value="Pro" />
        <CardRow label="Billing" value="Monthly" />
        <CardRow label="Next payment" value="Apr 15" separator={false} />
      </Card>

      <SectionHeading title="Accordion" />
      <Accordion
        items={[
          { id: '1', title: 'Getting Started', content: 'Install the package and import components from the barrel export.' },
          { id: '2', title: 'Customization', content: 'Override CSS custom properties to customize colors, spacing, and typography.' },
          { id: '3', title: 'Dark Mode', content: 'Add the "dark" class to the html element to enable dark mode.' },
        ]}
      />

      <SectionHeading title="Popover" />
      <Card variant="outlined" className="p-5">
        <Popover
          trigger={<Button variant="secondary" size="sm">Click me</Button>}
          placement="bottom"
        >
          <Text variant="body" className="mb-2">Popover Content</Text>
          <Text variant="caption" className="text-ds-text-secondary">Click outside to dismiss.</Text>
        </Popover>
      </Card>

      <SectionHeading title="Overlays" />
      <Card variant="outlined" className="p-5 flex gap-3">
        <Button variant="secondary" size="sm" onClick={() => setShowModal(true)}>Modal</Button>
        <Button variant="secondary" size="sm" onClick={() => setShowSheet(true)}>Sheet</Button>
        <Button variant="secondary" size="sm" onClick={() => setShowDrawer(true)}>Drawer</Button>
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Modal Title" footer={<Button size="sm" onClick={() => setShowModal(false)}>Close</Button>}>
        <Text variant="body">Modal body content with animated entrance.</Text>
      </Modal>

      <Sheet open={showSheet} onClose={() => setShowSheet(false)}>
        <Text variant="heading" className="mb-2">Bottom Sheet</Text>
        <Text variant="body" className="text-ds-text-secondary">Drag down or tap outside to dismiss.</Text>
      </Sheet>

      <Drawer open={showDrawer} onClose={() => setShowDrawer(false)}>
        <Text variant="heading" className="mb-2">Side Drawer</Text>
        <Text variant="body" className="text-ds-text-secondary">Content slides in from the right.</Text>
      </Drawer>

      <SectionHeading title="ScrollView" />
      <Card variant="outlined">
        <ScrollView maxHeight="150px" fadeEdges>
          <div className="p-4 space-y-3">
            {Array.from({ length: 12 }, (_, i) => (
              <Text key={i} variant="body">Scrollable item {i + 1}</Text>
            ))}
          </div>
        </ScrollView>
      </Card>
    </div>
  )
}
