import type { Theme } from '@/hooks/useTheme'
import type { SectionId } from '@/data'

// Things the command palette and the interactive terminal can both do.
export type SiteActions = {
  navigate: (id: SectionId) => void
  setTheme: (theme: Theme) => void
  toggleCrt: () => void
  copyEmail: () => void
  runMatrix: () => void
  openPalette: () => void
}
