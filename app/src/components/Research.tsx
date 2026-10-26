import { ArrowUpRight, Trophy } from 'lucide-react'
import { competitions, research } from '@/data'
import { SectionHeading } from './SectionHeading'
import { Timeline } from './Timeline'

export function Research() {
  return (
    <section id="research" className="px-4 py-20 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading command="ls ~/research" title="Research & Competitions" />
        <Timeline entries={research} />

        <h3 className="mb-4 mt-14 text-xs font-semibold uppercase tracking-wider text-fg-muted">Competitions</h3>
        <div className="grid gap-5 md:grid-cols-2">
          {competitions.map((c) => (
            <article key={c.title} className="flex flex-col rounded-lg border bg-bg-2 p-5 transition-colors hover:border-accent/50">
              <div className="flex items-start justify-between gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                  <Trophy className="h-3.5 w-3.5" />
                  {c.result}
                </span>
                <span className="text-xs text-fg-muted">{c.period}</span>
              </div>
              <h4 className="mt-3 font-semibold text-fg">{c.title}</h4>
              <p className="mt-2 flex-1 text-sm text-fg-muted">{c.description}</p>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 self-start text-xs text-fg-muted hover:text-accent"
                >
                  source <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
