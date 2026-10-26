import { useState } from 'react'
import { ArrowUpRight, GitMerge, GitPullRequest } from 'lucide-react'
import { allPrsUrl, openSourceProjects, prUrl, profile, repoUrl } from '@/data'
import { groupByRepo, prKind } from '@/hooks/useOpenSource'
import type { PullRequest } from '@/data'
import { SectionHeading } from './SectionHeading'

const kindStyle: Record<string, string> = {
  feat: 'text-accent border-accent/40',
  fix: 'text-warn border-warn/40',
  docs: 'text-accent-2 border-accent-2/40',
  test: 'text-accent-2 border-accent-2/40',
  ci: 'text-fg-muted border-line',
  other: 'text-fg-muted border-line',
}

const PREVIEW = 4

function RepoCard({ repo, prs }: { repo: string; prs: PullRequest[] }) {
  const [expanded, setExpanded] = useState(false)
  const meta = openSourceProjects[repo]
  const owner = repo.split('/')[0]
  const shown = expanded ? prs : prs.slice(0, PREVIEW)

  return (
    <article className="flex flex-col rounded-lg border bg-bg-2 p-5 transition-colors hover:border-accent/50">
      <header className="flex items-start gap-3">
        <img
          src={`https://github.com/${owner}.png?size=64`}
          alt=""
          width={36}
          height={36}
          loading="lazy"
          className="h-9 w-9 shrink-0 rounded-md border bg-bg-3"
        />
        <div className="min-w-0 flex-1">
          <a
            href={repoUrl(repo)}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate font-semibold text-fg hover:text-accent"
          >
            {meta?.name ?? repo.split('/')[1]}
          </a>
          <p className="truncate text-xs text-fg-muted">{meta?.blurb ?? repo}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
          <GitMerge className="h-3.5 w-3.5" />
          {prs.length}
        </span>
      </header>

      <ul className="mt-4 space-y-2">
        {shown.map((pr) => {
          const kind = prKind(pr.title)
          return (
            <li key={pr.number} className="flex items-start gap-2 text-xs">
              <span className={`mt-px shrink-0 rounded border px-1.5 text-[10px] uppercase ${kindStyle[kind]}`}>{kind}</span>
              <a
                href={prUrl(pr)}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 text-fg-muted hover:text-fg"
              >
                {pr.title} <span className="opacity-60">#{pr.number}</span>
              </a>
            </li>
          )
        })}
      </ul>

      {prs.length > PREVIEW && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-3 self-start text-xs text-accent hover:underline">
          {expanded ? 'show less' : `+ ${prs.length - PREVIEW} more`}
        </button>
      )}
    </article>
  )
}

export function OpenSource({ prs }: { prs: PullRequest[] }) {
  const groups = groupByRepo(prs)
  const kinds = prs.reduce<Record<string, number>>((acc, pr) => {
    const k = prKind(pr.title)
    acc[k] = (acc[k] ?? 0) + 1
    return acc
  }, {})
  const orgs = new Set(prs.map((p) => p.repo.split('/')[0])).size

  return (
    <section id="opensource" className="px-4 py-20 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading command={`gh pr list --author ${profile.githubUser} --state merged`} title="Open Source" />

        <div className="mb-8 grid grid-cols-3 gap-px overflow-hidden rounded-lg border bg-line">
          {[
            { value: prs.length, label: 'merged PRs' },
            { value: groups.length, label: 'projects' },
            { value: orgs, label: 'organizations' },
          ].map((s) => (
            <div key={s.label} className="bg-bg-2 p-4">
              <p className="text-2xl font-bold text-accent">{s.value}</p>
              <p className="text-xs text-fg-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <p className="mb-6 flex flex-wrap items-center gap-2 text-xs text-fg-muted">
          <GitPullRequest className="h-4 w-4" />
          {Object.entries(kinds)
            .sort((a, b) => b[1] - a[1])
            .map(([k, n]) => (
              <span key={k} className={`rounded border px-1.5 py-0.5 uppercase ${kindStyle[k]}`}>
                {k} {n}
              </span>
            ))}
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {groups.map((g) => (
            <RepoCard key={g.repo} repo={g.repo} prs={g.prs} />
          ))}
        </div>

        <a
          href={allPrsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-1 text-sm text-fg-muted transition-colors hover:text-accent"
        >
          All merged pull requests on GitHub <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
