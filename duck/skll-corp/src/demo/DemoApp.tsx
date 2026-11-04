import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Screen, Card, CardHeader, CardRow, PageHeader, Tabs, Badge, Tag, Avatar,
  Button, IconButton, Input, Switch, Checkbox, Radio, Slider, Select,
  Textarea, ProgressBar, ProgressCircle, Spinner, Skeleton, Toast,
  Banner, Tooltip, EmptyState, Dialog, Snackbar, BottomNav, Breadcrumbs,
  Pagination, NavPill, Accordion, Modal, Sheet, Numpad, ConfirmBar,
  ButtonGroup, ListItem, SectionHeading, Tile, KeyValue, DataRow, Divider, Text,
  springs, Icon,
} from '../design-system'

export default function DemoApp() {
  const [dark, setDark] = useState(false)
  const [tab, setTab] = useState('overview')
  const [page, setPage] = useState(3)
  const [showDialog, setShowDialog] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showSheet, setShowSheet] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [switchOn, setSwitchOn] = useState(true)
  const [checkVal, setCheckVal] = useState(true)
  const [radioVal, setRadioVal] = useState('a')
  const [sliderVal, setSliderVal] = useState(60)
  const [inputVal, setInputVal] = useState('')

  const toggleDark = () => {
    setDark(!dark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <Screen className="pb-24">
        <div className="max-w-2xl mx-auto px-4">
          <PageHeader
            title="Duck DS"
            subtitle="Comprehensive Design System"
            actions={
              <div className="flex gap-2 items-center">
                <a href="?docs=true" className="text-ds-xs text-ds-accent font-medium tracking-wide">DOCS</a>
                <IconButton
                  variant="ghost"
                  size="sm"
                  onClick={toggleDark}
                  label="Toggle dark mode"
                  icon={dark ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                  )}
                />
              </div>
            }
          />

          <Tabs
            items={[
              { id: 'overview', label: 'Overview' },
              { id: 'forms', label: 'Forms' },
              { id: 'feedback', label: 'Feedback' },
              { id: 'data', label: 'Data' },
            ]}
            activeId={tab}
            onChange={setTab}
            variant="pill"
            className="mb-6"
          />

          <AnimatePresence mode="wait">
            {tab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={springs.smooth} className="space-y-6">
                {/* Typography */}
                <SectionHeading title="Typography" />
                <Card variant="outlined" className="p-5 space-y-2">
                  <Text variant="display">Display</Text>
                  <Text variant="heading">Heading</Text>
                  <Text variant="subheading">Subheading</Text>
                  <Text variant="body">Body text for paragraphs and content.</Text>
                  <Text variant="caption">Caption text</Text>
                  <Text variant="overline">Overline</Text>
                </Card>

                {/* Buttons */}
                <SectionHeading title="Buttons" />
                <Card variant="outlined" className="p-5 space-y-4">
                  <ButtonGroup>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Delete</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button size="xs">XS</Button>
                    <Button size="sm">SM</Button>
                    <Button size="md">MD</Button>
                    <Button size="lg">LG</Button>
                    <Button loading>Loading</Button>
                  </ButtonGroup>
                  <div className="flex gap-2">
                    <IconButton label="Add" icon={<Icon name="plus" size={18} />} />
                    <IconButton variant="secondary" label="Edit" icon={<Icon name="edit" size={18} />} />
                    <IconButton variant="ghost" label="Filter" icon={<Icon name="filter" size={18} />} />
                    <IconButton variant="destructive" label="Delete" icon={<Icon name="delete" size={18} />} />
                  </div>
                </Card>

                {/* Badges & Tags */}
                <SectionHeading title="Badges & Tags" />
                <Card variant="outlined" className="p-5 space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    <Badge value="Default" />
                    <Badge variant="accent" value="Accent" />
                    <Badge variant="success" value="Success" />
                    <Badge variant="warning" value="Warning" />
                    <Badge variant="destructive" value="Error" />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Tag>Neutral</Tag>
                    <Tag color="accent">Accent</Tag>
                    <Tag color="success">Success</Tag>
                    <Tag color="warning" onDismiss={() => {}}>Dismissible</Tag>
                    <Tag color="danger" variant="outline">Danger</Tag>
                  </div>
                </Card>

                {/* Avatars */}
                <SectionHeading title="Avatars" />
                <Card variant="outlined" className="p-5">
                  <div className="flex items-center gap-3">
                    <Avatar size="xs" initials="AB" />
                    <Avatar size="sm" initials="CD" status="online" />
                    <Avatar size="md" initials="EF" />
                    <Avatar size="lg" initials="GH" status="busy" />
                    <Avatar size="xl" initials="IJ" shape="square" />
                  </div>
                </Card>

                {/* Navigation */}
                <SectionHeading title="Navigation" />
                <Card variant="outlined" className="p-5 space-y-4">
                  <Breadcrumbs items={[
                    { label: 'Home', onClick: () => {} },
                    { label: 'Settings', onClick: () => {} },
                    { label: 'Profile' },
                  ]} />
                  <div className="flex gap-2 flex-wrap">
                    <NavPill icon={<Icon name="home" size={16} />} label="Home" active />
                    <NavPill icon={<Icon name="chat" size={16} />} label="Messages" count={5} />
                    <NavPill icon={<Icon name="config" size={16} />} label="Settings" />
                  </div>
                  <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
                </Card>

                {/* Cards */}
                <SectionHeading title="Cards" />
                <Card>
                  <CardHeader title="Card Title" subtitle="With subtitle" actions={<Badge variant="accent" size="sm" value="New" />} />
                  <CardRow label="Status" value="Active" />
                  <CardRow label="Items" value="24" />
                  <CardRow label="Updated" value="Today" separator={false} />
                </Card>

                {/* Overlays */}
                <SectionHeading title="Overlays" />
                <Card variant="outlined" className="p-5">
                  <ButtonGroup>
                    <Button variant="secondary" size="sm" onClick={() => setShowDialog(true)}>Dialog</Button>
                    <Button variant="secondary" size="sm" onClick={() => setShowModal(true)}>Modal</Button>
                    <Button variant="secondary" size="sm" onClick={() => setShowSheet(true)}>Sheet</Button>
                  </ButtonGroup>
                </Card>

                <Dialog
                  open={showDialog}
                  onClose={() => setShowDialog(false)}
                  title="Confirm Action"
                  actions={
                    <>
                      <Button variant="ghost" size="sm" onClick={() => setShowDialog(false)}>Cancel</Button>
                      <Button size="sm" onClick={() => setShowDialog(false)}>Confirm</Button>
                    </>
                  }
                >
                  Are you sure you want to proceed with this action?
                </Dialog>

                <Modal open={showModal} onClose={() => setShowModal(false)} title="Modal" footer={<Button size="sm" onClick={() => setShowModal(false)}>Done</Button>}>
                  <Text variant="body">Modal content with header and footer.</Text>
                </Modal>

                <Sheet open={showSheet} onClose={() => setShowSheet(false)}>
                  <Text variant="heading" className="mb-4">Bottom Sheet</Text>
                  <Text variant="body">Drag down or tap outside to dismiss.</Text>
                  <div className="mt-4">
                    <Numpad onKey={(k) => console.log(k)} onDelete={() => console.log('del')} />
                  </div>
                </Sheet>
              </motion.div>
            )}

            {tab === 'forms' && (
              <motion.div key="forms" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={springs.smooth} className="space-y-6">
                <SectionHeading title="Text Input" />
                <Card variant="outlined" className="p-5 space-y-4">
                  <Input label="Name" placeholder="Enter your name" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                  <Input label="Email" placeholder="email@example.com" size="sm" />
                  <Input label="Error State" error="This field is required" />
                  <Textarea label="Bio" placeholder="Tell us about yourself..." maxLength={200} />
                </Card>

                <SectionHeading title="Selection" />
                <Card variant="outlined" className="p-5 space-y-4">
                  <Select
                    label="Country"
                    options={[
                      { label: 'United States', value: 'us' },
                      { label: 'Canada', value: 'ca' },
                      { label: 'Mexico', value: 'mx' },
                    ]}
                    placeholder="Select country"
                  />
                  <div className="flex items-center gap-6">
                    <Checkbox label="Accept terms" checked={checkVal} onChange={setCheckVal} />
                    <Switch label="Notifications" checked={switchOn} onChange={setSwitchOn} />
                  </div>
                  <div className="flex items-center gap-4">
                    <Radio label="Option A" checked={radioVal === 'a'} onChange={() => setRadioVal('a')} />
                    <Radio label="Option B" checked={radioVal === 'b'} onChange={() => setRadioVal('b')} />
                    <Radio label="Option C" checked={radioVal === 'c'} onChange={() => setRadioVal('c')} />
                  </div>
                </Card>

                <SectionHeading title="Slider" />
                <Card variant="outlined" className="p-5">
                  <Slider value={sliderVal} onChange={setSliderVal} min={0} max={100} label="Volume" />
                </Card>

                <SectionHeading title="Tooltip" />
                <Card variant="outlined" className="p-5 flex gap-4">
                  <Tooltip content="Top tooltip" placement="top"><Button variant="ghost" size="sm">Top</Button></Tooltip>
                  <Tooltip content="Right tooltip" placement="right"><Button variant="ghost" size="sm">Right</Button></Tooltip>
                  <Tooltip content="Bottom tooltip" placement="bottom"><Button variant="ghost" size="sm">Bottom</Button></Tooltip>
                  <Tooltip content="Left tooltip" placement="left"><Button variant="ghost" size="sm">Left</Button></Tooltip>
                </Card>
              </motion.div>
            )}

            {tab === 'feedback' && (
              <motion.div key="feedback" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={springs.smooth} className="space-y-6">
                <SectionHeading title="Progress" />
                <Card variant="outlined" className="p-5 space-y-4">
                  <ProgressBar value={65} labelLeft="Uploading..." showLabel />
                  <ProgressBar value={40} segments={[{ value: 20 }, { value: 20 }, { value: 20 }, { value: 20 }, { value: 20 }]} />
                  <div className="flex items-center gap-6">
                    <ProgressCircle value={75} size="sm" />
                    <ProgressCircle value={50} size="md" />
                    <ProgressCircle value={90} size="lg" />
                  </div>
                </Card>

                <SectionHeading title="Loading" />
                <Card variant="outlined" className="p-5 space-y-4">
                  <div className="flex items-center gap-6">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="80%" />
                    <div className="flex gap-3">
                      <Skeleton variant="circle" width={40} height={40} />
                      <div className="flex-1 space-y-2">
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                      </div>
                    </div>
                  </div>
                </Card>

                <SectionHeading title="Banners" />
                <Card variant="outlined" className="p-5 space-y-3">
                  <Banner variant="info">Informational message.</Banner>
                  <Banner variant="success">Operation completed successfully.</Banner>
                  <Banner variant="warning">Proceed with caution.</Banner>
                  <Banner variant="error" dismissible>Something went wrong.</Banner>
                </Card>

                <SectionHeading title="Notifications" />
                <Card variant="outlined" className="p-5">
                  <ButtonGroup>
                    <Button variant="secondary" size="sm" onClick={() => setShowToast(true)}>Show Toast</Button>
                    <Button variant="secondary" size="sm" onClick={() => setShowSnackbar(true)}>Show Snackbar</Button>
                  </ButtonGroup>
                </Card>

                <AnimatePresence>
                  {showToast && <Toast variant="success" message="Your changes have been saved." onDismiss={() => setShowToast(false)} />}
                  {showSnackbar && <Snackbar message="Item moved to trash" action={{ label: 'Undo', onClick: () => setShowSnackbar(false) }} onDismiss={() => setShowSnackbar(false)} />}
                </AnimatePresence>

                <SectionHeading title="Empty State" />
                <EmptyState
                  icon={<Icon name="folder" size={48} />}
                  title="No files yet"
                  description="Upload your first file to get started."
                  action={<Button size="sm">Upload</Button>}
                />

                <SectionHeading title="Accordion" />
                <Accordion items={[
                  { id: '1', title: 'What is Duck DS?', content: 'A comprehensive design system built with React, Tailwind CSS, and Framer Motion.' },
                  { id: '2', title: 'How do I install it?', content: 'Import components from the design-system barrel export.' },
                  { id: '3', title: 'Is it production ready?', content: 'Yes — every component is typed, animated, and dark-mode ready.' },
                ]} />
              </motion.div>
            )}

            {tab === 'data' && (
              <motion.div key="data" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={springs.smooth} className="space-y-6">
                <SectionHeading title="List Items" />
                <Card variant="outlined">
                  <ListItem
                    leading={<Avatar size="sm" initials="JD" />}
                    title="John Doe"
                    subtitle="Last active 2h ago"
                    trailing={<Badge variant="success" size="sm" value="Online" />}
                    pressable
                  />
                  <ListItem
                    leading={<Avatar size="sm" initials="AS" />}
                    title="Alice Smith"
                    subtitle="Last active 1d ago"
                    trailing={<Badge size="sm" value="Offline" />}
                    pressable
                  />
                  <ListItem
                    leading={<Avatar size="sm" initials="BW" />}
                    title="Bob Wilson"
                    subtitle="Last active 5m ago"
                    trailing={<Badge variant="accent" size="sm" value="Away" />}
                    pressable
                  />
                </Card>

                <SectionHeading title="Key Value" />
                <Card variant="outlined" className="p-5 space-y-2">
                  <KeyValue label="Status" value="Active" />
                  <KeyValue label="Plan" value="Pro" />
                  <KeyValue label="Storage" value="4.2 GB / 10 GB" />
                </Card>

                <SectionHeading title="Data Rows" />
                <Card variant="outlined" className="p-5 space-y-1">
                  <DataRow label="Revenue" value="$12,450" trend="up" trendValue="12%" />
                  <DataRow label="Users" value="1,284" trend="up" trendValue="8%" />
                  <DataRow label="Churn" value="2.1%" trend="down" trendValue="0.3%" />
                  <DataRow label="NPS" value="72" trend="neutral" />
                </Card>

                <SectionHeading title="Tiles" />
                <div className="grid grid-cols-3 gap-3">
                  <Tile icon={<Icon name="user" size={28} />} title="Users" description="1,284" pressable />
                  <Tile icon={<Icon name="chat" size={28} />} title="Messages" description="842" pressable />
                  <Tile icon={<Icon name="folder" size={28} />} title="Files" description="156" pressable />
                </div>

                <SectionHeading title="Confirm Bar" />
                <Card variant="outlined">
                  <ConfirmBar onCancel={() => {}} onConfirm={() => {}} onDelete={() => {}} />
                </Card>

                <SectionHeading title="Divider" />
                <Card variant="outlined" className="p-5 space-y-4">
                  <Divider />
                  <Divider variant="dashed" label="OR" />
                  <Divider variant="dotted" />
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Screen>
    </div>
  )
}
