import { useEffect, useState } from 'react'
import { ArrowDown, Briefcase, Github, Linkedin, Mail } from 'lucide-react'
import { profile, stats, type PullRequest } from '@/data'
import type { SiteActions } from '@/actions'
import { TerminalShell } from './TerminalShell'

const asciiName = `
███╗   ███╗██████╗ ██╗███╗   ██╗ █████╗ ██╗
████╗ ████║██╔══██╗██║████╗  ██║██╔══██╗██║
██╔████╔██║██████╔╝██║██╔██╗ ██║███████║██║
██║╚██╔╝██║██╔══██╗██║██║╚██╗██║██╔══██║██║
██║ ╚═╝ ██║██║  ██║██║██║ ╚████║██║  ██║███████╗
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝

 ██████╗██╗  ██╗ █████╗ ████████╗██╗   ██╗██████╗ ██╗   ██╗███████╗██████╗ ██╗
██╔════╝██║  ██║██╔══██╗╚══██╔══╝██║   ██║██╔══██╗██║   ██║██╔════╝██╔══██╗██║
██║     ███████║███████║   ██║   ██║   ██║██████╔╝██║   ██║█████╗  ██║  ██║██║
██║     ██╔══██║██╔══██║   ██║   ██║   ██║██╔══██╗╚██╗ ██╔╝██╔══╝  ██║  ██║██║
╚██████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║ ╚████╔╝ ███████╗██████╔╝██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═════╝ ╚═╝
`

// Types the ASCII name one character at a time (instant with reduced motion)
function useTyped(text: string, delay = 10) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [count, setCount] = useState(reduced ? text.length : 0)
  useEffect(() => {
    if (count >= text.length) return
    const t = setTimeout(() => setCount((c) => c + 1), delay)
    return () => clearTimeout(t)
  }, [count, text, delay])
  return { typed: text.slice(0, count), done: count >= text.length }
}

export function Hero({ actions, prs }: { actions: SiteActions; prs: PullRequest[] }) {
  const { typed, done } = useTyped(asciiName)
  const fill = (text: string) =>
    text.replace('{prs}', `${prs.length}`).replace('{repos}', `${new Set(prs.map((p) => p.repo)).size}`)

  return (
    <section id="home" className="px-4 pb-16 pt-10 sm:px-6 lg:px-12 lg:pt-14">
      <div className="mx-auto max-w-4xl">
        <h1 className="sr-only">{profile.name}</h1>
        <div className="overflow-hidden text-center">
          <pre
            aria-hidden="true"
            className="ascii-art animate-glow-pulse inline-block text-left text-[5.5px] text-accent min-[400px]:text-[7px] sm:text-[9px] md:text-[11px] xl:text-sm"
          >
            {typed}
            {!done && <span className="animate-pulse">_</span>}
          </pre>
        </div>

        <div className={`transition-opacity duration-700 ${done ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          <p className="mt-2 text-base text-accent">{profile.tagline}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-fg-muted">{profile.pitch}</p>

          <ul className="mt-5 flex flex-wrap gap-2 text-xs">
            <li className="flex items-center gap-2 rounded-full border bg-bg-2 px-3 py-1 text-fg">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              currently: {profile.status}
            </li>
            <li className="flex items-center gap-2 rounded-full border bg-bg-2 px-3 py-1 text-fg">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              {profile.seeking}
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => actions.navigate('experience')}
              className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-bg transition-shadow hover:shadow-glow"
            >
              <Briefcase className="h-4 w-4" />
              See my work
            </button>
            <button
              onClick={() => actions.navigate('contact')}
              className="flex items-center gap-2 rounded-md border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </button>
            <div className="ml-1 flex items-center gap-3 text-fg-muted">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-accent">
                <Github className="h-5 w-5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-accent">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-line md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-bg-2 p-4">
                <dt className="sr-only">{fill(s.label)}</dt>
                <dd className="text-xl font-bold text-accent">{fill(s.value)}</dd>
                <dd className="mt-1 text-xs leading-snug text-fg-muted">{fill(s.label)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <p className="mb-2 text-xs text-fg-muted">
              Prefer the command line? Try <code className="text-accent">help</code> below.
            </p>
            <TerminalShell actions={actions} prs={prs} />
          </div>

          <button
            onClick={() => actions.navigate('experience')}
            className="animate-float mx-auto mt-10 flex flex-col items-center gap-1 text-xs text-fg-muted hover:text-fg"
          >
            Scroll to explore
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
