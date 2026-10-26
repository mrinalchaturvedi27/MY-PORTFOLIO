import { Users } from 'lucide-react'
import { leadership, profile } from '@/data'
import { SectionHeading } from './SectionHeading'

const aboutJson = `{
  "name": "${profile.name}",
  "location": "${profile.location}",
  "education": "B.Tech, Civil Engineering",
  "focus": [
    "Systems & performance (C++)",
    "Cloud-native infra (Kubernetes)",
    "Open source",
    "ML research & MLOps"
  ],
  "status": "shipping PRs..."
}`

export function About() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading command="cat about.md" title="About Me" />

        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <pre className="scrollbar-thin overflow-x-auto rounded-lg border bg-bg-2 p-5 text-xs leading-relaxed text-accent">
            {aboutJson}
          </pre>

          <div className="space-y-4 leading-relaxed text-fg">
            <p>
              I'm a final-year undergraduate at IIT Kanpur who likes understanding software all the way down — from cache
              lines and SIMD in a C++ GEMM kernel, to job queues and storage engines, to the Kubernetes clusters that run
              everything.
            </p>
            <p>
              Most of my recent work is in open source: I interned with the Linux Foundation (CNCF) on Krkn-AI, and I've
              had pull requests merged into WasmEdge, DIPY, mlpack and others. On the ML side I do research on sign
              language translation and build MLOps pipelines that actually get deployed and monitored.
            </p>
            <p>I like work I can measure: benchmarks, metrics, and merged PRs.</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['Systems', 'Open Source', 'Cloud Native', 'ML'].map((tag) => (
                <span key={tag} className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs text-accent">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <h3 className="mb-4 mt-14 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fg-muted">
          <Users className="h-4 w-4" />
          Leadership
        </h3>
        <ul className="grid gap-4 md:grid-cols-3">
          {leadership.map((l) => (
            <li key={l.org} className="rounded-lg border bg-bg-2 p-4">
              <p className="text-xs text-fg-muted">{l.period}</p>
              <p className="mt-1 text-sm font-semibold text-fg">{l.role}</p>
              <p className="text-xs text-accent">{l.org}</p>
              <p className="mt-2 text-xs leading-relaxed text-fg-muted">{l.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
