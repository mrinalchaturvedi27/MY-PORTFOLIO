import { Code2, FileText, Moon, Search, Sun } from 'lucide-react'
import type { Theme } from '@/hooks/useTheme'
import { profile } from '@/data'

type Props = {
  theme: Theme
  onThemeChange: (theme: Theme) => void
  onOpenPalette: () => void
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export function Header({ theme, onThemeChange, onOpenPalette }: Props) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[60px] border-b bg-bg/90 backdrop-blur">
      <div className="flex h-full items-center justify-between gap-3 px-4 lg:px-6">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-accent/10">
            <Code2 className="h-5 w-5 text-accent" />
          </span>
          <span className="truncate text-sm font-semibold text-fg">{profile.name}</span>
        </a>

        <span className="hidden text-sm text-fg-muted md:block">~/{profile.handle}.dev</span>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-2 rounded-md border bg-bg-2 px-2.5 py-1.5 text-xs text-fg-muted transition-colors hover:text-fg"
            aria-label="Open command palette"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded bg-bg-3 px-1.5 py-0.5 text-[10px] lg:inline">{isMac ? '⌘' : 'Ctrl+'}K</kbd>
          </button>

          <div className="flex items-center gap-1 rounded-md bg-bg-2 p-1" role="group" aria-label="Theme">
            {(
              [
                { value: 'dark', icon: Moon, label: 'Terminal' },
                { value: 'light', icon: Sun, label: 'Light' },
              ] as const
            ).map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => onThemeChange(value)}
                aria-pressed={theme === value}
                className={`flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium transition-colors ${
                  theme === value ? 'bg-bg-3 text-accent' : 'text-fg-muted hover:text-fg'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">{label}</span>
              </button>
            ))}
          </div>

          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-accent px-3 py-1.5 text-xs font-medium text-accent transition-all hover:bg-accent/10 hover:shadow-glow"
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Résumé</span>
          </a>
        </div>
      </div>
    </header>
  )
}
