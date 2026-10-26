import { Github } from 'lucide-react'
import { experiences, repoUrl } from '@/data'
import { SectionHeading } from './SectionHeading'

// Experience rendered as `git log --graph`
export function Experience() {
  return (
    <section id="experience" className="px-4 py-20 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading command="git log --graph --oneline" title="Research & Experience" />

        <ol className="relative ml-1 border-l-2 border-dashed">
          {experiences.map((exp, i) => (
            <li key={exp.hash} className="relative pb-10 pl-6 last:pb-0">
              <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-accent" />
              <p className="text-xs">
                <span className="text-warn">commit {exp.hash}</span>
                {i === 0 && (
                  <span className="ml-2 text-accent-2">
                    (<span className="text-accent">HEAD -&gt; main</span>)
                  </span>
                )}
                <span className="ml-2 text-fg-muted">· {exp.period}</span>
              </p>

              <div className="mt-2 rounded-lg border bg-bg-2 p-5 transition-colors hover:border-accent/50">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-fg">{exp.title}</h3>
                    <p className="text-sm text-accent">{exp.role}</p>
                  </div>
                  {exp.repo && (
                    <a
                      href={repoUrl(exp.repo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded border px-2 py-1 text-xs text-fg-muted transition-colors hover:border-accent/50 hover:text-fg"
                    >
                      <Github className="h-3.5 w-3.5" />
                      source
                    </a>
                  )}
                </div>
                <ul className="mt-3 space-y-1.5">
                  {exp.description.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-fg-muted">
                      <span className="mt-px text-accent">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
