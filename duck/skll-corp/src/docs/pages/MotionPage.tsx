import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Text, Card, SectionHeading, Button, springs, transitions, gestures } from '../../design-system'

export default function MotionPage() {
  const [show, setShow] = useState(true)
  const [key, setKey] = useState(0)

  return (
    <div className="space-y-8">
      <div>
        <Text variant="display">Motion</Text>
        <Text variant="body" className="text-ds-text-secondary mt-2">
          Spring-based animation presets for consistent, buttery motion across all components.
        </Text>
      </div>

      <SectionHeading title="Spring Presets" />
      <div className="grid md:grid-cols-2 gap-3">
        {(Object.entries(springs) as [string, any][]).map(([name, config]) => (
          <Card key={name} variant="outlined" className="p-4">
            <Text variant="subheading" className="font-mono">{name}</Text>
            <Text variant="caption" className="text-ds-text-muted mb-3">
              stiffness: {config.stiffness}, damping: {config.damping}
            </Text>
            <motion.div
              key={`${name}-${key}`}
              className="h-2 bg-ds-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={config}
            />
          </Card>
        ))}
      </div>
      <Button variant="secondary" size="sm" onClick={() => setKey((k) => k + 1)}>
        Replay Springs
      </Button>

      <SectionHeading title="Transition Presets" />
      <Card variant="outlined" className="p-5">
        <Button variant="secondary" size="sm" onClick={() => setShow(!show)} className="mb-4">
          Toggle Element
        </Button>
        <AnimatePresence>
          {show && (
            <motion.div
              className="h-16 bg-ds-accent/20 rounded-ds-lg flex items-center justify-center"
              {...transitions.scaleIn}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <Text variant="body">Animated element</Text>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <SectionHeading title="Gesture Presets" />
      <div className="flex gap-4 flex-wrap">
        {(Object.entries(gestures) as [string, any][]).map(([name, config]) => (
          <motion.div
            key={name}
            className="w-24 h-24 bg-ds-surface-elevated rounded-ds-xl flex items-center justify-center cursor-pointer shadow-ds-sm"
            {...config}
          >
            <Text variant="caption" className="font-mono">{name}</Text>
          </motion.div>
        ))}
      </div>

      <SectionHeading title="Usage" />
      <Card variant="filled" className="p-5">
        <pre className="text-ds-xs font-mono text-ds-text-secondary overflow-x-auto whitespace-pre">{`import { springs, transitions, gestures } from './design-system'

// Spring on any motion component
<motion.div transition={springs.snappy} />

// Full enter transition
<motion.div {...transitions.fadeIn} />

// Gesture presets
<motion.button {...gestures.tap} />`}</pre>
      </Card>
    </div>
  )
}
