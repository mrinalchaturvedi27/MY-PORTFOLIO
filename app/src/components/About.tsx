import { profile } from '@/data'
import { SectionHeading } from './SectionHeading'

const aboutJson = `{
  "name": "${profile.name}",
  "location": "${profile.location}",
  "education": "B.Tech (Civil Engg.)",
  "interests": [
    "Machine Learning",
    "Vision-Language Models",
    "Sign Language Translation",
    "Quantitative Finance",
    "Computer Vision"
  ],
  "status": "building neural networks..."
}`

export function About() {
  return (
    <section id="about" className="bg-bg-2 px-4 py-20 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading command="cat about.md" title="About Me" />

        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <pre className="scrollbar-thin overflow-x-auto rounded-lg border bg-bg p-5 text-xs leading-relaxed text-accent">
            {aboutJson}
          </pre>

          <div className="space-y-4 leading-relaxed text-fg">
            <p>
              I'm an undergraduate at IIT Kanpur working at the intersection of machine learning, systems, and applied
              AI. I enjoy going beyond high-level abstractions — building models end-to-end and understanding how things
              work under the hood.
            </p>
            <p>
              My experience spans computer vision, vision-language models, and real-time ML systems. I've worked on sign
              language translation, spatial audio localization, medical imaging pipelines, and quantitative finance using
              Python, C++, PyTorch, and TensorFlow.
            </p>
            <p>
              I contribute to open-source projects, take part in competitive programming and data science competitions,
              and like building tools that balance algorithmic efficiency with real-world impact.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['ML Researcher', 'Competitive Programmer', 'Open Source'].map((tag) => (
                <span key={tag} className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs text-accent">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
