import { work } from '@/data'
import { SectionHeading } from './SectionHeading'
import { Timeline } from './Timeline'

export function Work() {
  return (
    <section id="experience" className="bg-bg-2 px-4 py-20 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading command="git log --graph --author=mrinal" title="Work Experience" />
        <Timeline entries={work} head inset />
      </div>
    </section>
  )
}
