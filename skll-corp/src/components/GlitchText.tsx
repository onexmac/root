import { useState, useEffect } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function GlitchText({ text, className = '', as: Tag = 'span' }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setGlitching(false), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Tag
      className={`glitch-text ${glitching ? 'glitch-active' : ''} ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  )
}
