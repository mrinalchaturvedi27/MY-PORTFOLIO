import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { experiences, navItems, profile, projects, repoUrl, skills, stats, type SectionId } from '@/data'
import type { SiteActions } from '@/actions'

type Line = { id: number; input?: string; output?: ReactNode }

const files: Record<string, string> = {
  'about.md': 'about',
  'experience.log': 'experience',
  'projects/': 'projects',
  'skills.json': 'skills',
  'stats.txt': 'stats',
  'contact.sh': 'contact',
  'resume.pdf': 'resume',
}

const commandHelp: [string, string][] = [
  ['whoami', 'who is this?'],
  ['about', 'short bio'],
  ['experience', 'research & competitions'],
  ['projects', 'things I have built'],
  ['skills', 'languages, frameworks, tools'],
  ['stats', 'headline numbers'],
  ['contact', 'how to reach me'],
  ['resume', 'open my résumé'],
  ['ls / cat <file>', 'browse the "filesystem"'],
  ['goto <section>', 'scroll to a section'],
  ['theme <dark|light>', 'switch theme'],
  ['crt', 'toggle CRT scanlines'],
  ['clear', 'clear the screen'],
]

const commandNames = [
  'help', 'whoami', 'about', 'experience', 'projects', 'skills', 'stats', 'contact', 'resume',
  'ls', 'cat', 'goto', 'theme', 'crt', 'clear', 'github', 'linkedin', 'email', 'echo', 'date',
  'history', 'matrix', 'sudo',
]

const Accent = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent-2 underline-offset-2 hover:underline">
    {children}
  </a>
)

const welcome: Line = {
  id: 0,
  output: (
    <span>
      Welcome to <Accent>mrinal.sh</Accent> v1.0 — type <Accent>help</Accent> to list commands, <Accent>Tab</Accent> to
      autocomplete.
    </span>
  ),
}

export function TerminalShell({ actions }: { actions: SiteActions }) {
  const [lines, setLines] = useState<Line[]>([welcome])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const nextId = useRef(1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const run = (raw: string): ReactNode | 'clear' => {
    const [cmd = '', ...args] = raw.trim().split(/\s+/)
    const arg = args.join(' ')

    switch (cmd.toLowerCase()) {
      case '':
        return null
      case 'help':
        return (
          <div className="grid grid-cols-[minmax(0,auto)_1fr] gap-x-4">
            {commandHelp.map(([c, d]) => (
              <div key={c} className="contents">
                <Accent>{c}</Accent>
                <span className="text-fg-muted">{d}</span>
              </div>
            ))}
          </div>
        )
      case 'whoami':
        return (
          <span>
            <Accent>{profile.name}</Accent> — {profile.tagline}
          </span>
        )
      case 'about':
        return profile.pitch
      case 'experience':
      case 'exp':
        return (
          <ul>
            {experiences.map((e) => (
              <li key={e.hash}>
                <span className="text-warn">{e.hash}</span> {e.title} <span className="text-fg-muted">({e.period})</span>
              </li>
            ))}
          </ul>
        )
      case 'projects':
        return (
          <ul>
            {projects.map((p) => (
              <li key={p.repo}>
                <Accent>›</Accent> <Link href={repoUrl(p.repo)}>{p.name}</Link>{' '}
                <span className="text-fg-muted">[{p.category}]</span>
              </li>
            ))}
          </ul>
        )
      case 'skills':
        return (
          <ul>
            {skills.map((s) => (
              <li key={s.category}>
                <Accent>{s.category}:</Accent> {s.items.join(', ')}
              </li>
            ))}
          </ul>
        )
      case 'stats':
        return (
          <ul>
            {stats.map((s) => (
              <li key={s.value}>
                <Accent>{s.value.padEnd(7)}</Accent> {s.label}
              </li>
            ))}
          </ul>
        )
      case 'contact':
        return (
          <ul>
            <li>email    <Link href={`mailto:${profile.email}`}>{profile.email}</Link></li>
            <li>github   <Link href={profile.github}>{profile.github.replace('https://', '')}</Link></li>
            <li>linkedin <Link href={profile.linkedin}>{profile.linkedin.replace('https://www.', '')}</Link></li>
          </ul>
        )
      case 'resume':
        actions.openResume()
        return 'Opening résumé in a new tab…'
      case 'github':
        window.open(profile.github, '_blank', 'noopener')
        return 'Opening GitHub…'
      case 'linkedin':
        window.open(profile.linkedin, '_blank', 'noopener')
        return 'Opening LinkedIn…'
      case 'email':
        actions.copyEmail()
        return `Copied ${profile.email} to clipboard.`
      case 'ls':
        return (
          <div className="flex flex-wrap gap-x-5">
            {Object.keys(files).map((f) => (
              <span key={f} className={f.endsWith('/') ? 'text-accent-2' : ''}>
                {f}
              </span>
            ))}
          </div>
        )
      case 'cat': {
        if (!arg) return 'usage: cat <file>  (try ls)'
        const target = files[arg] ?? files[`${arg}/`]
        return target ? run(target) : `cat: ${arg}: No such file or directory`
      }
      case 'goto':
      case 'cd': {
        const id = arg.replace(/\/$/, '').toLowerCase()
        if (!id || id === '~') return `usage: ${cmd} <${navItems.map((n) => n.id).join('|')}>`
        if (navItems.some((n) => n.id === id)) {
          actions.navigate(id as SectionId)
          return `→ ${id}`
        }
        return `${cmd}: no such section: ${arg}`
      }
      case 'theme':
        if (arg === 'dark' || arg === 'light') {
          actions.setTheme(arg)
          return `Theme set to ${arg}.`
        }
        return 'usage: theme <dark|light>'
      case 'crt':
        actions.toggleCrt()
        return 'CRT scanlines toggled.'
      case 'matrix':
        actions.runMatrix()
        return 'Wake up, Neo…'
      case 'echo':
        return arg
      case 'date':
        return new Date().toString()
      case 'history':
        return (
          <ol>
            {history.map((h, i) => (
              <li key={i}>
                <span className="text-fg-muted">{String(i + 1).padStart(3)}</span> {h}
              </li>
            ))}
          </ol>
        )
      case 'sudo':
        if (/^hire\s+mrinal$/i.test(arg)) {
          return (
            <span>
              <Accent>[sudo]</Accent> access granted. Great choice — reach me at{' '}
              <Link href={`mailto:${profile.email}`}>{profile.email}</Link> 🚀
            </span>
          )
        }
        return `${profile.handle} is not in the sudoers file. This incident will be reported. (try: sudo hire mrinal)`
      case 'rm':
        return 'Nice try. 🙂'
      case 'exit':
        return 'There is no escape. Try clear.'
      case 'clear':
        return 'clear'
      default:
        return (
          <span>
            command not found: {cmd}. Type <Accent>help</Accent> for a list of commands.
          </span>
        )
    }
  }

  const submit = () => {
    const value = input
    setInput('')
    setHistoryIndex(null)
    if (value.trim()) setHistory((h) => [...h, value])
    const output = run(value)
    if (output === 'clear') {
      setLines([])
      return
    }
    setLines((prev) => [...prev, { id: nextId.current++, input: value, output }])
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const idx = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(idx)
      setInput(history[idx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === null) return
      const idx = historyIndex + 1
      if (idx >= history.length) {
        setHistoryIndex(null)
        setInput('')
      } else {
        setHistoryIndex(idx)
        setInput(history[idx])
      }
    } else if (e.key === 'Tab') {
      // Empty input: let Tab move focus normally
      if (!input) return
      const [cmd, ...rest] = input.split(' ')
      const pool = rest.length ? (cmd === 'cat' ? Object.keys(files) : navItems.map((n) => n.id)) : commandNames
      const partial = rest.length ? rest.join(' ') : cmd
      const matches = pool.filter((c) => c.startsWith(partial))
      if (matches.length) e.preventDefault()
      if (matches.length === 1) setInput(rest.length ? `${cmd} ${matches[0]}` : `${matches[0]} `)
      else if (matches.length > 1)
        setLines((prev) => [...prev, { id: nextId.current++, input, output: matches.join('  ') }])
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-bg-2 shadow-lg" onClick={() => inputRef.current?.focus()}>
      <div className="flex items-center gap-2 border-b bg-bg-3 px-3 py-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs text-fg-muted">guest@{profile.handle}.dev: ~</span>
      </div>
      <div ref={scrollRef} className="scrollbar-thin h-64 overflow-y-auto p-4 text-[13px] leading-relaxed" aria-live="polite">
        {lines.map((line) => (
          <div key={line.id} className="mb-1">
            {line.input !== undefined && (
              <p>
                <Accent>guest@{profile.handle}</Accent>:<span className="text-accent-2">~</span>$ {line.input}
              </p>
            )}
            {line.output != null && line.output !== '' && <div className="whitespace-pre-wrap text-fg">{line.output}</div>}
          </div>
        ))}
        <label className="flex items-center">
          <span className="sr-only">Terminal input</span>
          <span aria-hidden="true" className="shrink-0">
            <Accent>guest@{profile.handle}</Accent>:<span className="text-accent-2">~</span>$&nbsp;
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="w-full min-w-0 bg-transparent text-fg caret-accent outline-none"
            placeholder={lines.length <= 1 ? 'type help…' : ''}
          />
        </label>
      </div>
    </div>
  )
}
