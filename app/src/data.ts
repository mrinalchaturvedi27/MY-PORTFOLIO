// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Mrinal Chaturvedi',
  handle: 'mrinal',
  tagline: 'Machine Learning Researcher building Multimodal & Low-Resource AI',
  pitch:
    'Undergraduate at IIT Kanpur working on sign language translation, spatial audio, and quantitative finance — building models end-to-end, from data pipelines to multi-GPU training.',
  status: 'ISL translation research @ IIT Kanpur',
  seeking: 'Open to ML research & engineering internships',
  location: 'IIT Kanpur, India',
  email: 'mrinal.chaturvedi498@gmail.com',
  academicEmail: 'mrinalchat23@iitk.ac.in',
  github: 'https://github.com/mrinalchaturvedi27',
  githubUser: 'mrinalchaturvedi27',
  linkedin: 'https://www.linkedin.com/in/mrinalchaturvedi27/',
  // Drop your PDF at app/public/resume.pdf
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']

export const stats = [
  { value: 'Top 50', label: 'of 11,753 teams — AmEx Campus Challenge' },
  { value: '+195%', label: 'MAP@7 over baseline (0.180 → 0.531)' },
  { value: '+22%', label: 'spatial audio localization accuracy' },
  { value: '<3%', label: 'Black-Scholes vs Heston pricing deviation' },
]

export type Experience = {
  hash: string
  title: string
  role: string
  period: string
  repo?: string
  description: string[]
}

export const experiences: Experience[] = [
  {
    hash: 'a3f9c1e',
    title: 'Indian Sign Language Translation Research',
    role: 'Research Project · Prof. Ashutosh Modi, Dept. of CSE, IIT Kanpur',
    period: 'Ongoing',
    repo: 'Sign-Language-Translation-Benchmark',
    description: [
      'Researched transformer and JEPA-inspired representation learning for Indian Sign Language (ISL) translation, targeting low-resource, gloss-free settings',
      'Developed and evaluated vision–language pipelines for continuous ISL video-to-text translation under realistic linguistic and data constraints',
      'Built a unified benchmarking framework to study architectural and data-centric tradeoffs in ISL translation models',
      'Enabled large-scale experimentation via multi-GPU distributed training (DDP) for reproducible ISL research',
    ],
  },
  {
    hash: '7c2d08b',
    title: 'American Express Campus Challenge 2025',
    role: 'Decision Science Track · Top 50 Finalist (of 11,753 teams)',
    period: 'Aug 2025',
    repo: 'Decision_Science_Track_American_Express_Campus_Challenge_2025',
    description: [
      'Built an offer ranking system optimizing relevance of top-7 recommendations',
      'Engineered 51 features capturing timing, fatigue, preferences, and semantic signals (TF-IDF)',
      'Applied smart negative sampling to balance data while preserving user behavior patterns',
      'Modeled user behavior with LightGBM Ranker tuned by Optuna and GroupKFold CV',
      'Achieved MAP@7 = 0.531, a 195% improvement over baseline (0.180)',
    ],
  },
  {
    hash: 'e41b5f3',
    title: 'Accelerated ML-Based Spatial Audio Localization',
    role: 'Research Project · Prof. R.M. Hegde, Dept. of EE, IIT Kanpur',
    period: 'May 2025 – Jul 2025',
    description: [
      'Designed a high-accuracy pipeline for robust spatial audio localization in reverberant environments',
      'Sampled synthetic acoustic scenes using a 32-channel Eigenmike and Pygsound simulations',
      'Mapped RIRs to the spherical harmonics domain with Librosa and custom transforms',
      'Combined SVM-based octant classification with CNNs and PINNs for azimuth-elevation classification',
      'Achieved 22% accuracy improvement at fixed elevation over non-Pygsound baselines',
    ],
  },
  {
    hash: '1f8a6d2',
    title: 'European Option Pricing',
    role: 'Research Project · Prof. Himanshu Yadav, Dept. of Cognitive Science, IIT Kanpur',
    period: 'May 2025 – Jul 2025',
    description: [
      'Built a Path Integral Monte Carlo framework to price European derivatives under market dynamics',
      'Applied Metropolis-Hastings sampling over log-price trajectories using the Black-Scholes formulation',
      'Integrated simulated annealing for smoother convergence in multi-modal posterior landscapes',
      'Incorporated stochastic volatility via the Heston model, tested with real NSE parameters',
      'Achieved <3% deviation between Black-Scholes and Heston predictions on real option data',
    ],
  },
]

export const skills = [
  { category: 'Languages', items: ['C++', 'Python', 'JavaScript', 'SQL', 'CUDA'] },
  { category: 'ML / AI', items: ['PyTorch', 'TensorFlow / Keras', 'LightGBM', 'Scikit-learn', 'OpenVINO', 'Armadillo (C++)'] },
  { category: 'Domains', items: ['NLP / Transformers', 'Vision-Language Models', 'Signal Processing', 'Computer Vision', 'Medical Imaging', 'Quant Finance'] },
  { category: 'Tools', items: ['Git / GitHub', 'Multi-GPU (DDP)', 'Jupyter', 'NumPy / Pandas', 'PostgreSQL', 'LaTeX'] },
]

export const projectCategories = ['All', 'ML', 'Quant', 'Systems', 'Applied AI'] as const
export type ProjectCategory = Exclude<(typeof projectCategories)[number], 'All'>

export type Project = {
  name: string
  repo: string
  category: ProjectCategory
  description: string
  tech: string[]
  demo?: string
}

// AmEx and ISL benchmark repos are linked from their Experience entries.
export const projects: Project[] = [
  {
    name: 'Volatility Surface Prediction',
    repo: 'NKSecurity_Hackathon',
    category: 'Quant',
    description:
      'Multi-model ensemble combining GARCH models with ML regressors for implied volatility surface reconstruction of NIFTY50 options.',
    tech: ['Python', 'GARCH', 'Scikit-learn', 'Financial Modeling'],
  },
  {
    name: 'Fluxions: Dynamic Neural Network Toolkit',
    repo: 'fluxions',
    category: 'ML',
    description:
      'Neural network library built from scratch for defining and training architectures with flexible computation graphs.',
    tech: ['Python', 'NumPy', 'Deep Learning'],
  },
  {
    name: 'Neural Networks in C++',
    repo: 'Neural-Networks-CPP-using-Armadillo',
    category: 'ML',
    description:
      'Neural networks from scratch in C++ using the Armadillo linear algebra library for efficient computation.',
    tech: ['C++', 'Armadillo', 'Linear Algebra'],
  },
  {
    name: 'Multi-Modal PDF RAG with Voice Output',
    repo: 'RAG_VoiceOutput',
    category: 'Applied AI',
    description:
      'RAG system for PDF extraction using Ollama LLMs, ChromaDB, and LangChain, with ElevenLabs voice synthesis.',
    tech: ['Python', 'RAG', 'Ollama', 'ChromaDB', 'LangChain'],
  },
  {
    name: 'LiveKit Filler Detection',
    repo: 'livekit-filler-detection',
    category: 'Applied AI',
    description:
      'Real-time filler word detection for video calls using speech processing to improve communication quality.',
    tech: ['Python', 'LiveKit', 'Speech Processing'],
  },
  {
    name: 'Bank Accounts Management System',
    repo: 'Bank-Accounts-Management',
    category: 'Systems',
    description:
      'Command-line PostgreSQL banking system with secure account workflows, transfers, and audit-ready reporting.',
    tech: ['PostgreSQL', 'Python', 'SQL', 'CLI'],
  },
]

export const repoUrl = (repo: string) => `${profile.github}/${repo}`
