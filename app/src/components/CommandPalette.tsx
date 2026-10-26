import { Command } from 'cmdk'
import { ArrowRight, Copy, GitPullRequest, Github, Linkedin, Mail, Monitor, Moon, Sparkles, Sun } from 'lucide-react'
import type { ReactNode } from 'react'
import { allPrsUrl, navItems, profile, projects, repoUrl } from '@/data'
import type { SiteActions } from '@/actions'
import type { Theme } from '@/hooks/useTheme'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  actions: SiteActions
  theme: Theme
}

function Item({ onSelect, icon, children, hint }: { onSelect: () => void; icon: ReactNode; children: ReactNode; hint?: string }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-fg-muted data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent"
    >
      <span className="shrink-0">{icon}</span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {hint && <span className="shrink-0 text-xs opacity-60">{hint}</span>}
    </Command.Item>
  )
}

const groupClass =
  'px-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-fg-muted'

export function CommandPalette({ open, onOpenChange, actions, theme }: Props) {
  const run = (fn: () => void) => () => {
    onOpenChange(false)
    fn()
  }
  const openUrl = (url: string) => run(() => window.open(url, '_blank', 'noopener'))

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command palette"
      overlayClassName="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm animate-fade-in"
      contentClassName="fixed left-1/2 top-[15vh] z-[80] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-lg border bg-bg-2 shadow-2xl animate-fade-in"
    >
      <div className="flex items-center gap-2 border-b px-4">
        <span className="text-accent">❯</span>
        <Command.Input
          autoFocus
          placeholder="Type a command or search…"
          className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-muted"
        />
        <kbd className="rounded bg-bg-3 px-1.5 py-0.5 text-[10px] text-fg-muted">esc</kbd>
      </div>
      <Command.List className="scrollbar-thin max-h-[min(60vh,420px)] overflow-y-auto pb-2">
        <Command.Empty className="px-4 py-8 text-center text-sm text-fg-muted">No results found.</Command.Empty>

        <Command.Group heading="Navigate" className={groupClass}>
          {navItems.map(({ id, label }) => (
            <Item key={id} onSelect={run(() => actions.navigate(id))} icon={<ArrowRight className="h-4 w-4" />} hint="section">
              Go to {label}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions" className={groupClass}>
          <Item onSelect={run(actions.copyEmail)} icon={<Copy className="h-4 w-4" />} hint={profile.email}>
            Copy email address
          </Item>
          <Item onSelect={openUrl(`mailto:${profile.email}`)} icon={<Mail className="h-4 w-4" />}>Send an email</Item>
          <Item
            onSelect={run(() => actions.setTheme(theme === 'dark' ? 'light' : 'dark'))}
            icon={theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          >
            Switch to {theme === 'dark' ? 'light' : 'terminal'} theme
          </Item>
          <Item onSelect={run(actions.toggleCrt)} icon={<Monitor className="h-4 w-4" />}>Toggle CRT scanlines</Item>
          <Item onSelect={run(actions.runMatrix)} icon={<Sparkles className="h-4 w-4" />}>Enter the matrix</Item>
        </Command.Group>

        <Command.Group heading="Links" className={groupClass}>
          <Item onSelect={openUrl(profile.github)} icon={<Github className="h-4 w-4" />}>GitHub</Item>
          <Item onSelect={openUrl(profile.linkedin)} icon={<Linkedin className="h-4 w-4" />}>LinkedIn</Item>
          <Item onSelect={openUrl(allPrsUrl)} icon={<GitPullRequest className="h-4 w-4" />}>Merged pull requests</Item>
        </Command.Group>

        <Command.Group heading="Projects" className={groupClass}>
          {projects.map((p) => (
            <Item key={p.repo} onSelect={openUrl(repoUrl(p.repo))} icon={<Github className="h-4 w-4" />} hint={p.category}>
              {p.name}
            </Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
