import { motion } from 'framer-motion'

export default function NoiseOverlay() {
  return (
    <>
      <div className="noise-overlay" />
      <motion.div
        className="scanline"
        animate={{ y: ['0vh', '100vh'] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </>
  )
}
