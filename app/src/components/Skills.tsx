import { skills } from '@/data'
import { SectionHeading } from './SectionHeading'

export function Skills() {
  return (
    <section id="skills" className="bg-bg-2 px-4 py-20 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading command="cat skills.json | jq" title="Technical Skills" />

        <div className="grid gap-5 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category} className="rounded-lg border bg-bg p-5">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-fg-muted">
                <span className="text-accent">"</span>
                {group.category}
                <span className="text-accent">"</span>:
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border bg-bg-2 px-2.5 py-1 text-xs text-fg transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
