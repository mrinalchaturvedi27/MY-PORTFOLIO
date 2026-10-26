import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowUpRight, Clock, ExternalLink, FolderGit2, Github, Star, X } from 'lucide-react'
import { profile, projectCategories, projects, repoUrl, type Project } from '@/data'
import { useGithubRepos, type RepoInfo } from '@/hooks/useGithubRepos'
import { SectionHeading } from './SectionHeading'

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })

function RepoMeta({ info }: { info?: RepoInfo }) {
  if (!info) return null
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-muted">
      {info.language && (
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent-2" />
          {info.language}
        </span>
      )}
      {info.stars > 0 && (
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />
          {info.stars}
        </span>
      )}
      <span className="flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" />
        updated {formatDate(info.pushedAt)}
      </span>
    </div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const repos = useGithubRepos(profile.githubUser)

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const info = (p: Project) => repos[p.repo.toLowerCase()]

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading command="ls ~/projects" title="Featured Projects" />

        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {projectCategories.map((cat) => {
            const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length
            if (count === 0) return null
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={filter === cat}
                onClick={() => setFilter(cat)}
                className={`rounded-md border px-3 py-1 text-xs transition-colors ${
                  filter === cat ? 'border-accent bg-accent/10 text-accent' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {cat} <span className="opacity-60">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {visible.map((project) => (
            <article
              key={project.repo}
              className="group flex flex-col rounded-lg border bg-bg-2 p-5 transition-colors hover:border-accent/50"
            >
              <div className="mb-3 flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-bg-3">
                  <FolderGit2 className="h-5 w-5 text-accent" />
                </span>
                <span className="rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider text-fg-muted">
                  {project.category}
                </span>
              </div>

              <h3 className="text-base font-semibold text-fg">
                <button onClick={() => setSelected(project)} className="text-left hover:text-accent">
                  {project.name}
                </button>
              </h3>
              <p className="mt-2 flex-1 text-sm text-fg-muted">{project.description}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li key={t} className="rounded bg-bg px-2 py-0.5 text-xs text-fg-muted">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between gap-2 border-t pt-3">
                <RepoMeta info={info(project)} />
                <div className="ml-auto flex shrink-0 gap-1">
                  <button
                    onClick={() => setSelected(project)}
                    className="rounded-md px-2 py-1 text-xs text-fg-muted transition-colors hover:bg-bg-3 hover:text-fg"
                  >
                    details
                  </button>
                  <a
                    href={repoUrl(project.repo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} on GitHub`}
                    className="rounded-md p-1.5 text-fg-muted transition-colors hover:bg-bg-3 hover:text-fg"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <a
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-1 text-sm text-fg-muted transition-colors hover:text-accent"
        >
          See all repositories on GitHub <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <Dialog.Root open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] animate-fade-in bg-black/60 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[70] max-h-[85vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 animate-fade-in overflow-y-auto rounded-lg border bg-bg-2 shadow-2xl">
            {selected && (
              <>
                <div className="flex items-center justify-between border-b bg-bg-3 px-4 py-2 text-xs text-fg-muted">
                  <span>~/projects/{selected.repo}</span>
                  <Dialog.Close className="rounded p-1 hover:text-fg" aria-label="Close">
                    <X className="h-4 w-4" />
                  </Dialog.Close>
                </div>
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-wider text-accent">{selected.category}</p>
                  <Dialog.Title className="mt-1 text-lg font-semibold text-fg">{selected.name}</Dialog.Title>
                  <Dialog.Description className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {selected.description}
                  </Dialog.Description>

                  <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-fg-muted">Stack</h4>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {selected.tech.map((t) => (
                      <li key={t} className="rounded border bg-bg px-2 py-0.5 text-xs text-fg">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5">
                    <RepoMeta info={info(selected)} />
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <a
                      href={repoUrl(selected.repo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-bg"
                    >
                      <Github className="h-4 w-4" /> View source
                    </a>
                    {selected.demo && (
                      <a
                        href={selected.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-md border border-accent px-3 py-1.5 text-sm text-accent"
                      >
                        <ExternalLink className="h-4 w-4" /> Live demo
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}
