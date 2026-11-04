import { useState } from 'react'
import {
  Text, Card, SectionHeading, Numpad, ConfirmBar, BottomBar,
  ButtonGroup, ButtonDock, Button,
} from '../../design-system'

export default function CompoundsPage() {
  const [numVal, setNumVal] = useState('')

  return (
    <div className="space-y-8">
      <div>
        <Text variant="display">Compounds</Text>
        <Text variant="body" className="text-ds-text-secondary mt-2">
          Higher-level components composed from primitives: Numpad, ConfirmBar, BottomBar, ButtonGroup, ButtonDock.
        </Text>
      </div>

      <SectionHeading title="Numpad" />
      <Card variant="outlined" className="p-5 max-w-xs mx-auto">
        <div className="text-center mb-4">
          <Text variant="display" className="tabular-nums">{numVal || '0'}</Text>
        </div>
        <Numpad
          onKey={(k) => setNumVal((v) => v + k)}
          onDelete={() => setNumVal((v) => v.slice(0, -1))}
        />
      </Card>

      <SectionHeading title="Confirm Bar" />
      <Card variant="outlined">
        <ConfirmBar
          onCancel={() => alert('Cancelled')}
          onConfirm={() => alert('Confirmed')}
          onDelete={() => alert('Deleted')}
        />
      </Card>

      <SectionHeading title="Confirm Bar (no delete)" />
      <Card variant="outlined">
        <ConfirmBar
          onCancel={() => {}}
          onConfirm={() => {}}
          cancelLabel="Back"
          confirmLabel="Save"
        />
      </Card>

      <SectionHeading title="Button Group" />
      <Card variant="outlined" className="p-5 space-y-4">
        <Text variant="label">Horizontal</Text>
        <ButtonGroup>
          <Button variant="secondary">Cancel</Button>
          <Button>Save</Button>
        </ButtonGroup>
        <Text variant="label">Vertical</Text>
        <ButtonGroup direction="vertical">
          <Button>Continue</Button>
          <Button variant="secondary">Skip</Button>
          <Button variant="ghost">Learn More</Button>
        </ButtonGroup>
      </Card>

      <SectionHeading title="Button Dock" />
      <Card variant="outlined" className="relative h-48 overflow-hidden">
        <div className="p-4">
          <Text variant="body" className="text-ds-text-secondary">Content above the dock...</Text>
        </div>
        <ButtonDock>
          <Button className="w-full">Continue</Button>
          <Button variant="ghost" className="w-full">Skip for now</Button>
        </ButtonDock>
      </Card>

      <SectionHeading title="Usage" />
      <Card variant="filled" className="p-5">
        <pre className="text-ds-xs font-mono text-ds-text-secondary overflow-x-auto whitespace-pre">{`import { Numpad, ConfirmBar, ButtonDock } from './design-system'

<Numpad onKey={(k) => setValue(v + k)} onDelete={() => setValue(v.slice(0, -1))} />

<ConfirmBar onCancel={close} onConfirm={save} onDelete={remove} />

<ButtonDock>
  <Button className="w-full">Continue</Button>
</ButtonDock>`}</pre>
      </Card>
    </div>
  )
}
