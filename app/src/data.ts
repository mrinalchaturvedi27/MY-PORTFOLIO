// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Mrinal Chaturvedi',
  handle: 'mrinal',
  tagline: 'I build fast, reliable software — from C++ kernels to Kubernetes to ML pipelines',
  pitch:
    'Final-year undergrad at IIT Kanpur. Software engineering intern at the Linux Foundation (CNCF), open-source contributor to Krkn, WasmEdge, dipy and mlpack, and ML researcher working on sign language translation.',
  status: 'contributing to Krkn-AI (CNCF)',
  seeking: 'Open to SWE & ML roles',
  location: 'IIT Kanpur, India',
  email: 'mrinal.chaturvedi498@gmail.com',
  academicEmail: 'mrinalchat23@iitk.ac.in',
  github: 'https://github.com/mrinalchaturvedi27',
  githubUser: 'mrinalchaturvedi27',
  linkedin: 'https://www.linkedin.com/in/mrinalchaturvedi27/',
}

export const navItems = [
  { id: 'home', label: 'Home', mobile: false },
  { id: 'experience', label: 'Work', mobile: true },
  { id: 'opensource', label: 'Open Source', mobile: true },
  { id: 'projects', label: 'Projects', mobile: true },
  { id: 'research', label: 'Research', mobile: true },
  { id: 'skills', label: 'Skills', mobile: false },
  { id: 'about', label: 'About', mobile: true },
  { id: 'contact', label: 'Contact', mobile: true },
] as const

export type SectionId = (typeof navItems)[number]['id']

export const stats = [
  { value: 'CNCF', label: 'Software Engineer Intern, Linux Foundation' },
  { value: '{prs}', label: 'merged PRs across {repos} open-source projects' },
  { value: '42×', label: 'C++ GEMM speedup (1.7 → 71.7 GFLOPS)' },
  { value: 'Top 50', label: 'of 11,753 teams, AmEx Campus Challenge' },
]

export type Experience = {
  hash: string
  title: string
  role: string
  period: string
  link?: string
  description: string[]
}

export const work: Experience[] = [
  {
    hash: 'c4f2a91',
    title: 'Linux Foundation — Cloud Native Computing Foundation',
    role: 'Software Engineer Intern · Krkn-AI (Kubernetes/OpenShift chaos engineering)',
    period: 'Jun 2026 – Aug 2026',
    link: 'https://github.com/krkn-chaos/krkn-ai',
    description: [
      'Added a dynamic discover mode to Krkn-AI, replacing a static template that required manual edits before use',
      'Enabled only cluster-valid scenarios by reusing the ScenarioFactory validation engine, and auto-populated health-check endpoints from Ingresses and LoadBalancer Services',
      'Scoped PromQL fitness queries to discovered namespaces using live Prometheus metrics, and expanded the catalog with etcd and Kubernetes reliability queries',
      'Shipped a --save-strategy CLI flag to merge, overwrite, or skip existing configs, with unit tests and developer/end-user docs',
      'Sized genetic algorithm parameters dynamically from discovered cluster scale instead of fixed defaults',
      'Merged 8 PRs upstream during the internship: auto-enabled scenarios 4 → 10, returned query series 27 → 4, query catalog expanded to 22',
    ],
  },
]

export const research: Experience[] = [
  {
    hash: 'a3f9c1e',
    title: 'Sign Language Translation — LLM Fine-Tuning & State-Space Models',
    role: 'Prof. Ashutosh Modi · Dept. of CSE, IIT Kanpur',
    period: 'Aug 2025 – Present',
    link: 'https://github.com/mrinalchaturvedi27/Sign-Language-Translation-Benchmark',
    description: [
      'Benchmarked 11 open-source LLMs (1B–12B: Qwen2.5, Phi, Llama, Mistral, Gemma) for sign-language translation under identical evaluation conditions',
      'Built a translation pipeline on How2Sign with a learned video-to-language projection module and a Mamba state-space model',
      'Improved BLEU-4 from 0.0011 to 1.68; a 1.5B model outperformed 12B by ~10×, showing input context mattered more than model size',
    ],
  },
  {
    hash: 'e41b5f3',
    title: 'Spatial Audio Localization — Hybrid SVM/CNN Models',
    role: 'Prof. R.M. Hegde · Dept. of EE, IIT Kanpur',
    period: 'May 2025 – Jul 2025',
    description: [
      'Generated synthetic acoustic scenes with a 32-channel Eigenmike and Pygsound, mapping RIRs into the spherical-harmonic domain',
      'Built a two-stage pipeline pairing SVM-based octant classification with CNNs to resolve azimuth–elevation',
      'Improved localization accuracy 22% at fixed elevation over baselines; work forms the basis of an upcoming paper',
    ],
  },
  {
    hash: '1f8a6d2',
    title: 'European Option Pricing — Path Integral Monte Carlo',
    role: 'Prof. Himanshu Yadav · IIT Kanpur',
    period: 'May 2025 – Jul 2025',
    description: [
      'Priced European derivatives with Path Integral Monte Carlo, sampling log-price paths via Metropolis–Hastings on a Black–Scholes action',
      'Integrated simulated annealing for multi-modal posteriors and modeled stochastic volatility with Heston, calibrated on NSE parameters',
      'Achieved <3% deviation against Black–Scholes and Heston prices across a large set of test cases',
    ],
  },
]

export type Competition = { title: string; result: string; period: string; link?: string; description: string }

export const competitions: Competition[] = [
  {
    title: 'American Express Campus Challenge 2025',
    result: 'Top 50 / 11,753 teams',
    period: 'Aug 2025',
    link: 'https://github.com/mrinalchaturvedi27/Decision_Science_Track_American_Express_Campus_Challenge_2025',
    description:
      'Ranked top-7 offers per customer with LightGBM LambdaRank; 51 features from 21M+ events and 6.3M transactions; MAP@7 0.531 (+195% over baseline) after 847 Optuna trials.',
  },
  {
    title: 'NK Securities Research — Volatility Surface Prediction',
    result: 'Top 20% / 2,095+',
    period: 'Jun 2025',
    link: 'https://github.com/mrinalchaturvedi27/NKSecurity_Hackathon',
    description:
      'Reconstructed NIFTY50 implied-volatility surfaces with a GARCH ensemble (Normal, Student-t, Skewed-t) plus ML regressors; 0.0055 MSE.',
  },
]

export const skills = [
  { category: 'Languages', items: ['C++', 'C', 'Python', 'SQL'] },
  { category: 'Systems & Performance', items: ['SIMD', 'Cache blocking', 'Multithreading', 'Benchmarking', 'CMake'] },
  { category: 'Backend & Infra', items: ['Kubernetes', 'Docker & Compose', 'Prometheus', 'FastAPI', 'PostgreSQL', 'Redis'] },
  { category: 'ML & Data', items: ['PyTorch', 'Transformers', 'scikit-learn', 'LightGBM', 'NumPy / Pandas', 'Optuna'] },
  { category: 'MLOps', items: ['MLflow', 'Airflow', 'Evidently'] },
  { category: 'Tools', items: ['Git / GitHub', 'Linux', 'LaTeX'] },
]

export const projectCategories = ['All', 'Systems', 'ML', 'Quant'] as const
export type ProjectCategory = Exclude<(typeof projectCategories)[number], 'All'>

export type Project = {
  name: string
  // "repo" for repos under profile.githubUser, or "owner/repo" for others
  repo: string
  category: ProjectCategory
  description: string
  metric?: string
  highlights?: string[]
  tech: string[]
  demo?: string
}

export const projects: Project[] = [
  {
    name: 'fastBLAS — High-Performance GEMM',
    repo: 'fluxions-labs/fastBLAS',
    category: 'Systems',
    description: 'Matrix multiplication in C++ from scratch, optimized step by step down to SIMD.',
    metric: '1.7 → 71.7 GFLOPS (~42×)',
    highlights: [
      'Progressive optimization: loop reordering, register accumulation, cache blocking, data packing, SIMD vectorization',
      'Single-threaded 1024×1024 GEMM from 1.7 to 71.7 GFLOPS (~42×)',
      'Multi-level blocking with block sizes tuned across matrix sizes; validated with reproducible benchmarks',
    ],
    tech: ['C++', 'SIMD', 'Cache tiling', 'Benchmarking'],
  },
  {
    name: 'Job Queue System',
    repo: 'multi-threaded-job-processing',
    category: 'Systems',
    description: 'Background job processor in C++ with an HTTP API, worker pool, and Redis queue.',
    metric: 'retries · dead-letter queue · graceful shutdown',
    highlights: [
      'HTTP API for job submission, fixed-size worker pool, Redis-backed job queue',
      'Retries with exponential backoff and a dead-letter queue; job state in Postgres with idempotent execution',
      'Job cancellation and graceful shutdown during queue waits and execution',
      'Whole stack (app, Redis, Postgres) runs with one Docker Compose command',
    ],
    tech: ['C++', 'Redis', 'PostgreSQL', 'Docker Compose'],
  },
  {
    name: 'Mini Analytical Query Engine',
    repo: 'Mini-Analytical-Query-Engine',
    category: 'Systems',
    description: 'Row vs. columnar storage benchmark in C++ across 100K–1M records.',
    metric: '7.5× lower latency, 12× fewer bytes read',
    highlights: [
      'Row-store full scans vs. columnar on-disk arrays so queries read only the columns they need',
      'In-memory sorted index with binary search for range queries; benchmarked COUNT, filtered AVG, AND-filtered COUNT',
      'At 1M records: latency 35.6 ms → 4.7 ms, bytes read 48 MB → 4 MB; index added ~2× with zero data reads for counts',
    ],
    tech: ['C++', 'Columnar storage', 'Indexing'],
  },
  {
    name: 'Fraud Detection MLOps Pipeline',
    repo: 'Automated-Model-Retraining-Promotion-Pipeline',
    category: 'ML',
    description: 'Closed-loop retraining with champion–challenger promotion and drift monitoring.',
    metric: '121 req/s, 0 failures on Kubernetes',
    highlights: [
      'Time-based splits on the ULB credit card dataset (284K+ transactions) to prevent leakage',
      'Champion–challenger gate with unit-tested F1/recall checks: F1 0.849, recall 0.79; rejected 9/9 weaker challengers',
      'Scheduled PSI drift detection with Evidently + Airflow, flagging 6/29 features',
      'FastAPI on Kubernetes with Prometheus: p50 82 ms at 10 concurrent, 408 ms at 50',
    ],
    tech: ['Python', 'MLflow', 'Airflow', 'FastAPI', 'Kubernetes', 'Prometheus'],
  },
  {
    name: 'GitHub Contributor Assistant',
    repo: 'GitHub-Contributor-Assistant',
    category: 'ML',
    description: 'Hybrid RAG over the llama.cpp codebase, issues, and PRs, running fully locally.',
    metric: '0.85 Recall@5, 16/16 citations correct',
    highlights: [
      'Ingests 450+ docs spanning documentation, C/C++ source, issues, PRs, and releases with type-aware chunking',
      'Hybrid retrieval: dense embeddings + BM25 fused with Reciprocal Rank Fusion, then cross-encoder reranking',
      'Evaluation harness measuring Recall@k, faithfulness, citation correctness and latency, including unanswerable queries',
    ],
    tech: ['Python', 'RAG', 'BM25', 'Sentence Transformers', 'Ollama'],
  },
  {
    name: 'Fluxions — Dynamic Neural Network Toolkit',
    repo: 'fluxions',
    category: 'ML',
    description: 'A neural network library with dynamic computation graphs, built from scratch.',
    tech: ['C++', 'Deep Learning'],
  },
  {
    name: 'Portfolio Optimization — Markowitz',
    repo: '-Portfolio-Optimization-Using-Markowitz-Model',
    category: 'Quant',
    description: 'Mean-variance optimizer with efficient frontier and max-Sharpe portfolio.',
    metric: 'Sharpe 1.04 / Sortino 1.40',
    highlights: [
      'Covariance matrix and mean daily returns derived from yfinance price series',
      'Varied target returns to trace the efficient frontier and find the max-Sharpe portfolio',
      'Sharpe, Sortino and max drawdown vs. equal weighting',
    ],
    tech: ['Python', 'NumPy', 'Pandas', 'yfinance'],
  },
  {
    name: 'Neural Networks in C++',
    repo: 'Neural-Networks-CPP-using-Armadillo',
    category: 'ML',
    description: 'Neural networks from scratch in C++ with the Armadillo linear algebra library.',
    tech: ['C++', 'Armadillo', 'Linear Algebra'],
  },
]

// Curated blurbs for the Open Source section; PR lists themselves load live from GitHub.
export const openSourceProjects: Record<string, { name: string; blurb: string }> = {
  'krkn-chaos/krkn-ai': { name: 'Krkn-AI', blurb: 'AI-driven chaos engineering for Kubernetes (CNCF)' },
  'krkn-chaos/website': { name: 'Krkn docs', blurb: 'Documentation site for the Krkn chaos project' },
  'dipy/dipy': { name: 'DIPY', blurb: 'Diffusion MRI & medical imaging library in Python' },
  'WasmEdge/WasmEdge': { name: 'WasmEdge', blurb: 'High-performance WebAssembly runtime in C++ (CNCF)' },
  'mlpack/mlpack': { name: 'mlpack', blurb: 'Fast, header-only C++ machine learning library' },
  'volcano-sh/agentcube': { name: 'AgentCube', blurb: 'Kubernetes tool from the Volcano project' },
  'pygfx/wgpu-py': { name: 'wgpu-py', blurb: 'WebGPU for Python' },
}

export type PullRequest = { repo: string; number: number; title: string; mergedAt: string }

// Fallback snapshot (Oct 2026), used if the GitHub API is unavailable.
export const prSnapshot: PullRequest[] = [
  ['krkn-chaos/krkn-ai', 331, 'fix(config): make elastic config opt-in', '2026-10-14'],
  ['krkn-chaos/krkn-ai', 472, 'feat(discover): size genetic config from cluster targets', '2026-10-13'],
  ['krkn-chaos/krkn-ai', 471, 'feat(dashboard): per-query fitness breakdown', '2026-08-26'],
  ['krkn-chaos/krkn-ai', 468, 'docs: document dynamic discovery features', '2026-08-11'],
  ['krkn-chaos/website', 588, 'docs(krkn_ai): dynamic discover — scenarios, health checks, fitness queries', '2026-08-11'],
  ['krkn-chaos/krkn-ai', 456, 'feat(catalog): add etcd and kubernetes fitness queries', '2026-07-28'],
  ['krkn-chaos/krkn-ai', 406, 'feat(discover): dynamic fitness_function recommendations', '2026-07-21'],
  ['krkn-chaos/krkn-ai', 396, 'feat(discover): dynamic health check discovery', '2026-07-14'],
  ['krkn-chaos/website', 537, 'docs: document --save-strategy for discover', '2026-07-01'],
  ['krkn-chaos/krkn-ai', 381, 'feat(discover): dynamic scenario enablement', '2026-06-30'],
  ['krkn-chaos/krkn-ai', 370, 'docs: add macOS setup instructions to developer_guide', '2026-06-24'],
  ['krkn-chaos/krkn-ai', 375, 'feat: add --save-strategy to discover command', '2026-06-22'],
  ['krkn-chaos/krkn-ai', 207, 'fix(chaos_engines): replace brace counted telemetry extraction with JSON parsing', '2026-06-02'],
  ['krkn-chaos/krkn-ai', 313, 'fix(fitness): reject multi-series Prometheus queries', '2026-06-01'],
  ['krkn-chaos/krkn-ai', 194, 'fix(cli): Resolve --output crash and clean up CLI defaults', '2026-06-01'],
  ['krkn-chaos/krkn-ai', 314, 'fix(genetic): track completed generations', '2026-05-28'],
  ['krkn-chaos/krkn-ai', 342, 'fix(health-check): bound watcher shutdown', '2026-05-26'],
  ['krkn-chaos/krkn-ai', 341, 'fix(deps): pin krkn-lib dependency', '2026-05-25'],
  ['volcano-sh/agentcube', 332, 'fix(makefile): remove unsupported workload-manager run flags', '2026-05-19'],
  ['krkn-chaos/krkn-ai', 245, 'fix(genetic): use active components during scenario mutation', '2026-05-15'],
  ['krkn-chaos/krkn-ai', 250, 'fix(genetic): keep adaptive mutation from changing config', '2026-05-14'],
  ['WasmEdge/WasmEdge', 4832, 'fix(executor): correct WASI socket v2 fallback matching', '2026-05-08'],
  ['WasmEdge/WasmEdge', 4835, 'fix(api): handle null paths in C APIs', '2026-05-07'],
  ['krkn-chaos/krkn-ai', 208, 'fix(chaos_engines): use NamedTemporaryFile for graph JSON creation', '2026-05-06'],
  ['dipy/dipy', 3815, 'TST/DOC: Add rician noise reduction test and improve nlmeans docstring examples', '2026-04-29'],
  ['dipy/dipy', 3702, 'Add QuickBundlesX tutorial for issue #3504', '2026-04-29'],
  ['WasmEdge/WasmEdge', 4777, 'fix(executor): prevent silent override of error code in registerModule() & registerComponent()', '2026-04-15'],
  ['pygfx/wgpu-py', 801, 'Add compute_workgroups example', '2026-04-13'],
  ['dipy/dipy', 3851, 'fixed sphinx documentation issues', '2026-03-30'],
  ['dipy/dipy', 3752, 'CI: Update secrets management', '2026-03-02'],
  ['dipy/dipy', 3796, 'updated the docstring for ls_fit_dki and cls_fit_dki', '2026-02-27'],
  ['dipy/dipy', 3781, 'Fix epsilon docstring mismatch', '2026-02-21'],
  ['mlpack/mlpack', 4116, 'Fixed GitHub Actions workflow bugs', '2026-02-19'],
  ['dipy/dipy', 3694, 'DOC: Fix numpydoc PR03 parameter order in path_length', '2026-02-02'],
].map(([repo, number, title, mergedAt]) => ({ repo, number, title, mergedAt }) as PullRequest)

export const leadership = [
  { role: 'Secretary, Media & Publicity', org: 'E-Cell, IIT Kanpur', period: '2024–25', detail: 'Led digital publicity, influencer outreach, and sponsor acquisition for UpStart' },
  { role: 'Secretary', org: 'Astronomy Club, IIT Kanpur', period: '2024–25', detail: 'Led a 30-member team; 50+ student telescope workshop; events reaching 3000+ attendees' },
  { role: 'Organiser, Events', org: 'Antaragni, IIT Kanpur', period: '2025–26', detail: 'Ran a quiz competition, judge briefing, and on-ground logistics' },
]

export const repoUrl = (repo: string) => (repo.includes('/') ? `https://github.com/${repo}` : `${profile.github}/${repo}`)
export const prUrl = (pr: PullRequest) => `https://github.com/${pr.repo}/pull/${pr.number}`
export const allPrsUrl = `https://github.com/pulls?q=is%3Apr+author%3A${profile.githubUser}+is%3Amerged`
