import { useState, useEffect } from 'react'
import DocsApp from './docs/DocsApp'
import DemoApp from './demo/DemoApp'

export default function App() {
  const [mode, setMode] = useState<'demo' | 'docs'>('demo')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('docs') === 'true') setMode('docs')
  }, [])

  return mode === 'docs' ? <DocsApp /> : <DemoApp />
}
