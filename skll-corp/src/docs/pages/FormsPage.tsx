import { useState } from 'react'
import { Text, Card, SectionHeading, Input, Textarea, Select, Checkbox, Radio, Switch, Slider } from '../../design-system'

export default function FormsPage() {
  const [text, setText] = useState('')
  const [check, setCheck] = useState(false)
  const [radio, setRadio] = useState('a')
  const [sw, setSw] = useState(true)
  const [slider, setSlider] = useState(50)

  return (
    <div className="space-y-8">
      <div>
        <Text variant="display">Forms</Text>
        <Text variant="body" className="text-ds-text-secondary mt-2">
          Input, Textarea, Select, Checkbox, Radio, Switch, and Slider — all with labels, validation, and animation.
        </Text>
      </div>

      <SectionHeading title="Text Input" />
      <Card variant="outlined" className="p-5 space-y-4">
        <Input label="Default" placeholder="Type something..." value={text} onChange={(e) => setText(e.target.value)} />
        <Input label="Small" size="sm" placeholder="Small input" />
        <Input label="With helper" helper="This is helper text" placeholder="Enter value" />
        <Input label="Error state" error="This field is required" />
        <Input label="Clearable" clearable value="Clear me" onChange={() => {}} />
      </Card>

      <SectionHeading title="Textarea" />
      <Card variant="outlined" className="p-5">
        <Textarea label="Description" placeholder="Enter a description..." maxLength={200} />
      </Card>

      <SectionHeading title="Select" />
      <Card variant="outlined" className="p-5">
        <Select
          label="Choose option"
          placeholder="Select..."
          options={[
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
            { label: 'Option C', value: 'c' },
          ]}
        />
      </Card>

      <SectionHeading title="Checkbox" />
      <Card variant="outlined" className="p-5 space-y-3">
        <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
        <Checkbox label="Checked" checked={check} onChange={setCheck} />
        <Checkbox label="Indeterminate" checked={false} indeterminate onChange={() => {}} />
      </Card>

      <SectionHeading title="Radio" />
      <Card variant="outlined" className="p-5 flex gap-4">
        <Radio label="Option A" checked={radio === 'a'} onChange={() => setRadio('a')} />
        <Radio label="Option B" checked={radio === 'b'} onChange={() => setRadio('b')} />
        <Radio label="Option C" checked={radio === 'c'} onChange={() => setRadio('c')} />
      </Card>

      <SectionHeading title="Switch" />
      <Card variant="outlined" className="p-5 space-y-3">
        <Switch label="Notifications" checked={sw} onChange={setSw} />
        <Switch label="Loading" checked={true} loading onChange={() => {}} />
      </Card>

      <SectionHeading title="Slider" />
      <Card variant="outlined" className="p-5">
        <Slider value={slider} onChange={setSlider} min={0} max={100} label={`Value: ${slider}`} />
      </Card>
    </div>
  )
}
