import { Text, Card, SectionHeading, Button, IconButton, ButtonGroup, Icon } from '../../design-system'

export default function ButtonsPage() {
  return (
    <div className="space-y-8">
      <div>
        <Text variant="display">Buttons</Text>
        <Text variant="body" className="text-ds-text-secondary mt-2">
          5 variants, 4 sizes, loading state, icon layouts, and circular icon buttons.
        </Text>
      </div>

      <SectionHeading title="Variants" />
      <Card variant="outlined" className="p-5">
        <ButtonGroup>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </ButtonGroup>
      </Card>

      <SectionHeading title="Sizes" />
      <Card variant="outlined" className="p-5">
        <div className="flex items-center gap-2 flex-wrap">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Card>

      <SectionHeading title="States" />
      <Card variant="outlined" className="p-5">
        <ButtonGroup>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </ButtonGroup>
      </Card>

      <SectionHeading title="With Icons" />
      <Card variant="outlined" className="p-5">
        <ButtonGroup>
          <Button layout="icon-left" icon={<Icon name="plus" size={16} />}>Add Item</Button>
          <Button layout="icon-right" icon={<Icon name="arrow" size={16} />} variant="secondary">Next</Button>
          <Button layout="icon-only" icon={<Icon name="edit" size={16} />} variant="ghost" aria-label="Edit" />
        </ButtonGroup>
      </Card>

      <SectionHeading title="Icon Buttons" />
      <Card variant="outlined" className="p-5">
        <div className="flex items-center gap-3">
          <IconButton label="Add" icon={<Icon name="plus" size={18} />} />
          <IconButton variant="secondary" label="Edit" icon={<Icon name="edit" size={18} />} />
          <IconButton variant="ghost" label="Config" icon={<Icon name="config" size={18} />} />
          <IconButton variant="destructive" label="Delete" icon={<Icon name="delete" size={18} />} />
        </div>
        <div className="flex items-center gap-3 mt-3">
          <IconButton size="sm" label="Small" icon={<Icon name="plus" size={14} />} />
          <IconButton size="md" label="Medium" icon={<Icon name="plus" size={18} />} />
          <IconButton size="lg" label="Large" icon={<Icon name="plus" size={22} />} />
        </div>
      </Card>

      <SectionHeading title="Button Group" />
      <Card variant="outlined" className="p-5 space-y-3">
        <ButtonGroup direction="horizontal">
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </ButtonGroup>
        <ButtonGroup direction="vertical">
          <Button>Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Tertiary</Button>
        </ButtonGroup>
      </Card>
    </div>
  )
}
