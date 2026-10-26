import { useEffect, useState } from 'react'

export type RepoInfo = {
  stars: number
  language: string | null
  pushedAt: string
}

const CACHE_KEY = 'gh-repos'
const CACHE_TTL = 60 * 60 * 1000

type Cached = { at: number; repos: Record<string, RepoInfo> }

// Live star counts / languages from the public GitHub API, cached per session.
// Falls back to an empty map (cards just hide the stats) if the API is unreachable.
export function useGithubRepos(user: string) {
  const [repos, setRepos] = useState<Record<string, RepoInfo>>(() => {
    try {
      const cached: Cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null')
      if (cached && Date.now() - cached.at < CACHE_TTL) return cached.repos
    } catch {
      // ignore bad cache
    }
    return {}
  })

  useEffect(() => {
    if (Object.keys(repos).length > 0) return
    const controller = new AbortController()
    fetch(`https://api.github.com/users/${user}/repos?per_page=100`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { name: string; stargazers_count: number; language: string | null; pushed_at: string }[]) => {
        const map: Record<string, RepoInfo> = {}
        for (const r of data) {
          map[r.name.toLowerCase()] = { stars: r.stargazers_count, language: r.language, pushedAt: r.pushed_at }
        }
        setRepos(map)
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos: map }))
        } catch {
          // storage unavailable
        }
      })
      .catch(() => {})
    return () => controller.abort()
  }, [user, repos])

  return repos
}
