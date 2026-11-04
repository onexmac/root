import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Screen, SideNav, PageHeader, Text, springs } from '../design-system'

import OverviewPage from './pages/OverviewPage'
import TokensPage from './pages/TokensPage'
import MotionPage from './pages/MotionPage'
import IconsPage from './pages/IconsPage'
import TypographyPage from './pages/TypographyPage'
import ButtonsPage from './pages/ButtonsPage'
import FormsPage from './pages/FormsPage'
import FeedbackPage from './pages/FeedbackPage'
import NavigationPage from './pages/NavigationPage'
import ContainersPage from './pages/ContainersPage'
import DataPage from './pages/DataPage'
import CompoundsPage from './pages/CompoundsPage'

const pages: Record<string, { title: string; component: React.FC }> = {
  overview: { title: 'Overview', component: OverviewPage },
  tokens: { title: 'Design Tokens', component: TokensPage },
  motion: { title: 'Motion', component: MotionPage },
  icons: { title: 'Icons', component: IconsPage },
  typography: { title: 'Typography', component: TypographyPage },
  buttons: { title: 'Buttons', component: ButtonsPage },
  forms: { title: 'Forms', component: FormsPage },
  feedback: { title: 'Feedback', component: FeedbackPage },
  navigation: { title: 'Navigation', component: NavigationPage },
  containers: { title: 'Containers', component: ContainersPage },
  data: { title: 'Data Display', component: DataPage },
  compounds: { title: 'Compounds', component: CompoundsPage },
}

const navItems = Object.entries(pages).map(([id, { title }]) => ({
  id,
  label: title,
}))

export default function DocsApp() {
  const [activePage, setActivePage] = useState('overview')
  const [dark, setDark] = useState(false)
  const PageComponent = pages[activePage]?.component ?? OverviewPage

  const toggleDark = () => {
    setDark(!dark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <Screen className="flex">
        <aside className="hidden md:flex flex-col border-r border-ds-border p-4 flex-shrink-0">
          <div className="mb-6">
            <Text variant="heading" className="tracking-tight">Duck DS</Text>
            <Text variant="caption" className="text-ds-text-muted">Design System Docs</Text>
          </div>
          <SideNav items={navItems} activeId={activePage} onSelect={setActivePage} />
          <div className="mt-auto pt-4 border-t border-ds-border">
            <button
              className="text-ds-xs text-ds-text-muted hover:text-ds-text-primary cursor-pointer"
              onClick={toggleDark}
            >
              {dark ? '☀ Light mode' : '● Dark mode'}
            </button>
            <a href="/" className="block mt-2 text-ds-xs text-ds-accent font-medium">← Back to Demo</a>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          {/* Mobile nav */}
          <div className="md:hidden p-4 border-b border-ds-border">
            <select
              className="w-full bg-ds-surface border border-ds-border rounded-ds-lg px-3 py-2 text-ds-sm text-ds-text-primary"
              value={activePage}
              onChange={(e) => setActivePage(e.target.value)}
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>

          <div className="max-w-3xl mx-auto px-6 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={springs.smooth}
              >
                <PageComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </Screen>
    </div>
  )
}
