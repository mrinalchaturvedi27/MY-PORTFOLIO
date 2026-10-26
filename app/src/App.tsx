import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { navItems, profile } from '@/data'
import type { SiteActions } from '@/actions'
import { useTheme } from '@/hooks/useTheme'
import { useOpenSource } from '@/hooks/useOpenSource'
import { scrollToSection, useActiveSection } from '@/hooks/useActiveSection'
import { Header } from '@/components/Header'
import { MobileNav, Sidebar } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Work } from '@/components/Work'
import { OpenSource } from '@/components/OpenSource'
import { Research } from '@/components/Research'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'
import { CommandPalette } from '@/components/CommandPalette'
import { MatrixRain } from '@/components/MatrixRain'

const sectionIds = navItems.map((n) => n.id)
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

function App() {
  const { theme, setTheme } = useTheme()
  const active = useActiveSection(sectionIds)
  const prs = useOpenSource(profile.githubUser)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [matrix, setMatrix] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [emailCopied, setEmailCopied] = useState(false)
  const toastTimer = useRef<number | undefined>(undefined)

  const showToast = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => {
      setToast(null)
      setEmailCopied(false)
    }, 2000)
  }, [])

  const actions: SiteActions = useMemo(
    () => ({
      navigate: scrollToSection,
      setTheme,
      toggleCrt: () => document.documentElement.classList.toggle('crt'),
      copyEmail: () => {
        navigator.clipboard?.writeText(profile.email).then(
          () => {
            setEmailCopied(true)
            showToast('Email copied to clipboard')
          },
          () => showToast(profile.email),
        )
      },
      runMatrix: () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          showToast('Matrix disabled: reduced motion is on')
        } else {
          setMatrix(true)
        }
      },
      openPalette: () => setPaletteOpen(true),
    }),
    [setTheme, showToast],
  )

  // ⌘K / Ctrl+K opens the palette; the Konami code triggers the matrix
  useEffect(() => {
    let konami = 0
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
        return
      }
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      konami = e.key === KONAMI[konami] ? konami + 1 : e.key === KONAMI[0] ? 1 : 0
      if (konami === KONAMI.length) {
        konami = 0
        actions.runMatrix()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [actions])

  const endMatrix = useCallback(() => setMatrix(false), [])

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#experience"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <Header
        theme={theme}
        onThemeChange={setTheme}
        onOpenPalette={() => setPaletteOpen(true)}
        onContact={() => scrollToSection('contact')}
      />
      <Sidebar active={active} />
      <MobileNav active={active} />

      <main className="pb-16 pt-[60px] lg:ml-[260px] lg:pb-0">
        <Hero actions={actions} prs={prs} />
        <Work />
        <OpenSource prs={prs} />
        <Projects />
        <Research />
        <Skills />
        <About />
        <Contact onCopyEmail={actions.copyEmail} copied={emailCopied} />
      </main>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} actions={actions} theme={theme} />
      {matrix && <MatrixRain onDone={endMatrix} />}

      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-20 right-4 z-[85] rounded-md border bg-bg-3 px-4 py-2 text-sm text-fg shadow-lg transition-all lg:bottom-6 ${
          toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <span className="mr-2 text-accent">✓</span>
        {toast}
      </div>
    </div>
  )
}

export default App
