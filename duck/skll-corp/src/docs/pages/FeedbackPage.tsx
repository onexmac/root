import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  Text, Card, SectionHeading, Button, ProgressBar, ProgressCircle, Spinner,
  Skeleton, Toast, Banner, Tooltip, EmptyState, Dialog, Snackbar, Icon,
} from '../../design-system'

export default function FeedbackPage() {
  const [showToast, setShowToast] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <Text variant="display">Feedback</Text>
        <Text variant="body" className="text-ds-text-secondary mt-2">
          Progress indicators, loading states, notifications, and dialogs.
        </Text>
      </div>

      <SectionHeading title="Progress Bar" />
      <Card variant="outlined" className="p-5 space-y-4">
        <ProgressBar value={35} labelLeft="35% complete" showLabel />
        <ProgressBar value={70} />
        <ProgressBar segments={[{ value: 20 }, { value: 20 }, { value: 20 }]} />
      </Card>

      <SectionHeading title="Progress Circle" />
      <Card variant="outlined" className="p-5 flex items-center gap-6">
        <ProgressCircle value={25} size="sm" />
        <ProgressCircle value={50} size="md" />
        <ProgressCircle value={75} size="lg" />
      </Card>

      <SectionHeading title="Spinner" />
      <Card variant="outlined" className="p-5 flex items-center gap-6">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </Card>

      <SectionHeading title="Skeleton" />
      <Card variant="outlined" className="p-5 space-y-3">
        <Skeleton variant="text" />
        <Skeleton variant="text" width="75%" />
        <div className="flex gap-3">
          <Skeleton variant="circle" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="30%" />
          </div>
        </div>
        <Skeleton variant="rect" height={100} />
      </Card>

      <SectionHeading title="Banners" />
      <Card variant="outlined" className="p-5 space-y-3">
        <Banner variant="info">Info: System update scheduled.</Banner>
        <Banner variant="success">Success: Changes saved.</Banner>
        <Banner variant="warning">Warning: Disk space low.</Banner>
        <Banner variant="error" dismissible>Error: Connection failed.</Banner>
      </Card>

      <SectionHeading title="Tooltip" />
      <Card variant="outlined" className="p-5 flex gap-4">
        <Tooltip content="Top" placement="top"><Button variant="ghost" size="sm">Top</Button></Tooltip>
        <Tooltip content="Bottom" placement="bottom"><Button variant="ghost" size="sm">Bottom</Button></Tooltip>
        <Tooltip content="Left" placement="left"><Button variant="ghost" size="sm">Left</Button></Tooltip>
        <Tooltip content="Right" placement="right"><Button variant="ghost" size="sm">Right</Button></Tooltip>
      </Card>

      <SectionHeading title="Toast & Snackbar" />
      <Card variant="outlined" className="p-5 flex gap-3">
        <Button variant="secondary" size="sm" onClick={() => setShowToast(true)}>Toast</Button>
        <Button variant="secondary" size="sm" onClick={() => setShowSnackbar(true)}>Snackbar</Button>
        <Button variant="secondary" size="sm" onClick={() => setShowDialog(true)}>Dialog</Button>
      </Card>

      <AnimatePresence>
        {showToast && <Toast variant="success" message="Changes applied." onDismiss={() => setShowToast(false)} />}
        {showSnackbar && <Snackbar message="Item deleted" action={{ label: 'Undo', onClick: () => setShowSnackbar(false) }} onDismiss={() => setShowSnackbar(false)} />}
      </AnimatePresence>

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        title="Are you sure?"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={() => setShowDialog(false)}>Delete</Button>
          </>
        }
      >
        This action cannot be undone.
      </Dialog>

      <SectionHeading title="Empty State" />
      <EmptyState
        icon={<Icon name="lens" size={48} />}
        title="No results found"
        description="Try adjusting your search or filters."
        action={<Button size="sm" variant="secondary">Clear Filters</Button>}
      />
    </div>
  )
}
