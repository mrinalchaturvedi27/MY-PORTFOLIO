import { Check, Copy, Github, Linkedin, Mail, GraduationCap } from 'lucide-react'
import { profile } from '@/data'
import { SectionHeading } from './SectionHeading'

type Props = { onCopyEmail: () => void; copied: boolean }

export function Contact({ onCopyEmail, copied }: Props) {
  const links = [
    { icon: Github, href: profile.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
    { icon: GraduationCap, href: `mailto:${profile.academicEmail}`, label: 'IITK email' },
  ]

  return (
    <section id="contact" className="bg-bg-2 px-4 pb-10 pt-20 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading command="./contact.sh" title="Get in Touch" />

        <p className="max-w-xl text-base leading-relaxed text-fg-muted">
          I'm open to software engineering and ML roles, open-source collaborations, and research conversations. The
          fastest way to reach me is email.
        </p>

        <div className="mt-8 flex flex-wrap items-stretch gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="flex min-w-0 items-center gap-2 rounded-md border border-accent px-4 py-2.5 text-sm text-accent transition-all hover:bg-accent/10 hover:shadow-glow"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">{profile.email}</span>
          </a>
          <button
            onClick={onCopyEmail}
            className="flex items-center gap-2 rounded-md border px-3 py-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
            aria-label="Copy email address"
          >
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {links.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-accent/5 hover:text-accent"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </div>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-2 border-t pt-6 text-xs text-fg-muted">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>
            built with React + Tailwind · press <kbd className="rounded bg-bg-3 px-1.5 py-0.5">⌘K</kbd>
          </span>
        </footer>
      </div>
    </section>
  )
}
