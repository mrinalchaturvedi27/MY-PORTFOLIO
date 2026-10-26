import { useEffect, useState } from 'react'
import { prSnapshot, type PullRequest } from '@/data'

const CACHE_KEY = 'gh-prs'
const CACHE_TTL = 60 * 60 * 1000

type SearchItem = {
  number: number
  title: string
  closed_at: string
  repository_url: string
  pull_request?: { merged_at: string | null }
}

function readCache(): PullRequest[] | null {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null')
    if (cached && Date.now() - cached.at < CACHE_TTL) return cached.prs
  } catch {
    // ignore bad cache
  }
  return null
}

// Merged PRs to repos the user doesn't own, from the GitHub search API.
// Starts from the bundled snapshot so the section never renders empty.
export function useOpenSource(user: string) {
  const [prs, setPrs] = useState<PullRequest[]>(() => readCache() ?? prSnapshot)

  useEffect(() => {
    if (readCache()) return
    const controller = new AbortController()
    const q = encodeURIComponent(`author:${user} type:pr is:merged -user:${user}`)
    fetch(`https://api.github.com/search/issues?q=${q}&per_page=100&sort=updated`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { items: SearchItem[] }) => {
        const live = data.items
          .map((i) => ({
            repo: i.repository_url.replace('https://api.github.com/repos/', ''),
            number: i.number,
            title: i.title.trim(),
            mergedAt: (i.pull_request?.merged_at ?? i.closed_at).slice(0, 10),
          }))
          .sort((a, b) => b.mergedAt.localeCompare(a.mergedAt))
        // Only replace the snapshot if the API didn't come back short
        if (live.length >= prSnapshot.length) {
          setPrs(live)
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), prs: live }))
          } catch {
            // storage unavailable
          }
        }
      })
      .catch(() => {})
    return () => controller.abort()
  }, [user])

  return prs
}

export function groupByRepo(prs: PullRequest[]) {
  const groups = new Map<string, PullRequest[]>()
  for (const pr of prs) groups.set(pr.repo, [...(groups.get(pr.repo) ?? []), pr])
  return [...groups.entries()].map(([repo, list]) => ({ repo, prs: list })).sort((a, b) => b.prs.length - a.prs.length)
}

// Conventional-commit style type from a PR title ("fix(api): …" → "fix")
export function prKind(title: string) {
  const m = title.match(/^(feat|fix|docs?|tst|test|ci|refactor|perf|chore)\b/i)
  if (m) {
    const k = m[1].toLowerCase()
    return k === 'doc' ? 'docs' : k === 'tst' ? 'test' : k
  }
  if (/^(fix|fixed)\b/i.test(title)) return 'fix'
  if (/^(add|added)\b/i.test(title)) return 'feat'
  if (/doc|docstring|tutorial|sphinx/i.test(title)) return 'docs'
  return 'other'
}
