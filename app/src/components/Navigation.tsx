import { Briefcase, ChevronRight, Code2, FolderGit2, Send, Terminal, User } from 'lucide-react'
import { navItems, profile, type SectionId } from '@/data'
import { scrollToSection } from '@/hooks/useActiveSection'

const icons: Record<SectionId, typeof Terminal> = {
  home: Terminal,
  about: User,
  experience: Briefcase,
  skills: Code2,
  projects: FolderGit2,
  contact: Send,
}

export function Sidebar({ active }: { active: string }) {
  return (
    <aside className="scrollbar-thin fixed bottom-0 left-0 top-[60px] z-40 hidden w-[260px] flex-col overflow-y-auto border-r bg-bg lg:flex">
      <div className="p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-fg-muted">Table of Contents</p>
        <nav className="space-y-0.5">
          {navItems.map(({ id, label }) => {
            const Icon = icons[id]
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  isActive ? 'bg-bg-3 text-accent' : 'text-fg-muted hover:bg-accent/5 hover:text-fg'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto border-t p-4 text-xs text-fg-muted">
        <p className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {profile.seeking}
        </p>
      </div>
    </aside>
  )
}

export function MobileNav({ active }: { active: string }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-bg/95 backdrop-blur lg:hidden">
      <div className="flex items-center justify-around px-1 py-1.5">
        {navItems.map(({ id, label }) => {
          const Icon = icons[id]
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              aria-current={active === id ? 'true' : undefined}
              className={`flex flex-col items-center gap-1 rounded-md p-1.5 transition-colors ${
                active === id ? 'text-accent' : 'text-fg-muted'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px]">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
