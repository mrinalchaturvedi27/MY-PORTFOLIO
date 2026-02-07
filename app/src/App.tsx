import { useState, useEffect, useRef } from 'react'
import './App.css'
import { 
  Terminal, 
  Sun, 
  Search, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail,
  ChevronRight,
  Code2,
  Terminal as TerminalIcon,
  FolderGit2,
  User,
  Briefcase,
  Send
} from 'lucide-react'

// ASCII Art for name
const asciiName = `
███╗   ███╗██████╗ ██╗███╗   ██╗ █████╗ ██╗     
████╗ ████║██╔══██╗██║████╗  ██║██╔══██╗██║     
██╔████╔██║██████╔╝██║██╔██╗ ██║███████║██║     
██║╚██╔╝██║██╔══██╗██║██║╚██╗██║██╔══██║██║     
██║ ╚═╝ ██║██║  ██║██║██║ ╚████║██║  ██║███████╗
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
                                                  
 ██████╗██╗  ██╗ █████╗ ████████╗██╗   ██╗██████╗ ██╗   ██╗███████╗██████╗ ██╗
██╔════╝██║  ██║██╔══██╗╚══██╔══╝██║   ██║██╔══██╗██║   ██║██╔════╝██╔══██╗██║
██║     ███████║███████║   ██║   ██║   ██║██████╔╝██║   ██║█████╗  ██║  ██║██║
██║     ██╔══██║██╔══██║   ██║   ██║   ██║██╔══██╗╚██╗ ██╔╝██╔══╝  ██║  ██║██║
╚██████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║ ╚████╔╝ ███████╗██████╔╝██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═════╝ ╚═╝
`

// Navigation items
const navItems = [
  { id: 'home', label: 'Home', icon: TerminalIcon },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'contact', label: 'Contact', icon: Send },
]

// Experience data - Research Projects and Competitions
const experiences = [
  {
    company: 'Indian Sign Language Translation Research',
    role: 'Research Project under Prof. Ashutosh Modi, Dept. of Computer Science, IIT Kanpur',
    period: 'Ongoing',
    description: [
      'Researched transformer and JEPA-inspired representation learning for Indian Sign Language (ISL) translation, targeting low-resource, gloss-free settings',
      'Developed and evaluated vision–language pipelines for continuous ISL video-to-text translation under realistic linguistic and data constraints',
      'Built a unified benchmarking framework to study architectural and data-centric tradeoffs in ISL translation models',
      'Enabled large scale experimentation via multi-GPU distributed training, supporting reproducible ISL research rather than systems optimization'
    ],
  },
  {
    company: 'Accelerated ML-Based Spatial Audio Localization',
    role: 'Research Project under Prof. R.M. Hegde, Dept. of Electrical Engineering, IIT Kanpur',
    period: 'May 2025 - Jul 2025',
    description: [
      'Designed high-accuracy pipeline for robust spatial audio localization in reverberant environments',
      'Sampled synthetic acoustic scenes using 32-channel Eigenmike and Pygsound simulations',
      'Developed workflow using Librosa and custom transforms to map RIRs to spherical harmonics domain',
      'Implemented hybrid SVM-based octant classification with CNNs and PINNs for azimuth-elevation classification',
      'Achieved 22% accuracy improvement at fixed elevation over non-Pygsound baselines',
    ],
  },
  {
    company: 'European Option Pricing',
    role: 'Research Project under Prof. Himanshu Yadav, Dept. of Cognitive Science, IIT Kanpur',
    period: 'May 2025 - Jul 2025',
    description: [
      'Built Path Integral Monte Carlo framework to price European derivatives under market dynamics',
      'Applied Metropolis-Hastings sampling over log-price trajectories using Black-Scholes formulation',
      'Integrated simulated annealing for smoother convergence in multi-modal posterior landscapes',
      'Incorporated stochastic volatility via Heston model, tested using real NSE parameters',
      'Achieved <3% deviation between Black-Scholes and Heston predictions on real option data',
    ],
  },
  {
    company: 'American Express Campus Challenge 2025',
    role: 'Decision Science Track — Top 50 Finalist (out of 11,753 teams)',
    period: 'Aug 2025',
    description: [
      'Developed offer ranking system optimizing relevance of top-7 recommendations',
      'Engineered 51 features capturing timing, fatigue, preferences, and semantic signals (TF-IDF)',
      'Applied smart negative sampling preserving user behavior patterns while balancing data',
      'Modeled complex user behavior with LightGBM Ranker tuned by Optuna and GroupKFold CV',
      'Achieved MAP@7 = 0.531, delivering 195% improvement over baseline (0.180)',
    ],
  },
]

// Skills data
const skills = [
  { category: 'Languages', items: [
    { name: 'C++', level: 95 },
    { name: 'Python', level: 90 },
    { name: 'JavaScript', level: 75 },
    { name: 'SQL', level: 70 },
    { name: 'CUDA', level: 55 },
  ]},
  { category: 'ML/AI Frameworks', items: [
    { name: 'PyTorch', level: 90 },
    { name: 'TensorFlow/Keras', level: 85 },
    { name: 'Armadillo (C++)', level: 80 },
    { name: 'OpenVINO', level: 75 },
  ]},
  { category: 'Specialized', items: [
    { name: 'NLP/Transformers', level: 80 },
    { name: 'Medical Imaging', level: 75 },
    { name: 'Signal Processing', level: 70 },
    { name: 'Computer Vision', level: 65 },
  ]},
  { category: 'Tools & Libraries', items: [
    { name: 'Git/GitHub', level: 90 },
    { name: 'Jupyter', level: 85 },
    { name: 'NumPy/Pandas', level: 90 },
    { name: 'LaTeX', level: 60 },
  ]},
]

// Projects data
const projects = [
  {
    name: 'Sign Language Translation Benchmark',
    description: 'Unified multi-GPU training pipeline for benchmarking open-source language models on Indian sign language translation datasets.',
    tech: ['Python', 'PyTorch', 'Transformers', 'DDP', 'Multi-GPU'],
    github: 'https://github.com/mrinalchaturvedi27/Sign-Language-Translation-Benchmark',
    demo: '#',
    stars: 2,
  },
  {
    name: 'American Express Campus Challenge (Top 50/11,753 Teams)',
    description: 'LightGBM-based offer ranking system with 51 engineered features achieving 195% improvement in MAP@7.',
    tech: ['Python', 'LightGBM', 'Optuna', 'GroupKFold', 'TF-IDF'],
    github: 'https://github.com/mrinalchaturvedi27/Decision_Science_Track_American_Express_Campus_Challenge_2025',
    demo: '#',
  },
  {
    name: 'Volatility Surface Prediction',
    description: 'Multi-model ensemble combining GARCH models with ML regressors for implied volatility surface reconstruction of NIFTY50 options.',
    tech: ['Python', 'GARCH', 'Scikit-learn', 'Financial Modeling'],
    github: 'https://github.com/mrinalchaturvedi27/NKSecurity_Hackathon',
    demo: '#',
  },
  {
    name: 'Fluxions: Dynamic Neural Network Toolkit',
    description: 'Custom neural network library for building and training architectures with flexible computation graphs from scratch.',
    tech: ['Python', 'NumPy', 'Deep Learning'],
    github: 'https://github.com/mrinalchaturvedi27/fluxions',
    demo: '#',
  },
  {
    name: 'Neural Networks in C++',
    description: 'Building neural networks from scratch using C++ and Armadillo linear algebra library for efficient computation.',
    tech: ['C++', 'Armadillo', 'Linear Algebra'],
    github: 'https://github.com/mrinalchaturvedi27/Neural-Networks-CPP-using-Armadillo',
    demo: '#',
  },
  {
    name: 'Multi-Modal PDF RAG with Voice Output',
    description: 'RAG system for PDF extraction using Ollama LLMs, ChromaDB, and LangChain with ElevenLabs API for voice synthesis.',
    tech: ['Python', 'RAG', 'Ollama', 'ChromaDB', 'LangChain'],
    github: 'https://github.com/mrinalchaturvedi27/RAG_VoiceOutput',
    demo: '#',
  },
  {
    name: 'Bank Accounts Management System',
    description: 'Command-line PostgreSQL-based banking system with secure account workflows, transfers, and audit-ready reporting.',
    tech: ['PostgreSQL', 'Python', 'SQL', 'CLI'],
    github: 'https://github.com/mrinalchaturvedi27/Bank_Accounts_Management_System',
    demo: '#',
  },
  {
    name: 'LiveKit Filler Detection',
    description: 'Real-time filler word detection system for improving communication quality in video calls using speech processing.',
    tech: ['Python', 'LiveKit', 'Speech Processing'],
    github: 'https://github.com/mrinalchaturvedi27/livekit-filler-detection',
    demo: '#',
  },
]

function App() {
  const [theme, setTheme] = useState<'terminal' | 'light'>('terminal')
  const [activeSection, setActiveSection] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [typedText, setTypedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  // Typing effect for ASCII art
  useEffect(() => {
    const text = asciiName
    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1))
        index++
      } else {
        setIsTypingComplete(true)
        clearInterval(timer)
      }
    }, 10)
    return () => clearInterval(timer)
  }, [])

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Toggle theme
  const toggleTheme = (newTheme: 'terminal' | 'light') => {
    setTheme(newTheme)
    if (newTheme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'terminal' ? 'bg-terminal-bg' : 'bg-white'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 h-[60px] z-50 border-b ${theme === 'terminal' ? 'bg-terminal-bg border-terminal-border' : 'bg-white border-gray-200'} transition-colors duration-300`}>
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded flex items-center justify-center ${theme === 'terminal' ? 'bg-terminal-green/10' : 'bg-green-100'}`}>
              <Code2 className={`w-5 h-5 ${theme === 'terminal' ? 'text-terminal-green' : 'text-green-600'}`} />
            </div>
            <span className={`font-semibold text-sm ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-900'}`}>
              Mrinal Chaturvedi
            </span>
          </div>

          {/* Center - Page Title */}
          <div className="hidden md:flex items-center gap-2">
            <span className={`text-sm ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-500'}`}>
              ~/Mrinal.dev
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggles */}
            <div className={`flex items-center gap-1 p-1 rounded-md ${theme === 'terminal' ? 'bg-terminal-bg-secondary' : 'bg-gray-100'}`}>
              <button
                onClick={() => toggleTheme('terminal')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all ${
                  theme === 'terminal' 
                    ? 'bg-terminal-bg-tertiary text-terminal-green' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Terminal</span>
              </button>
              <button
                onClick={() => toggleTheme('light')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all ${
                  theme === 'light' 
                    ? 'bg-white text-green-600 shadow-sm' 
                    : 'text-terminal-text-muted hover:text-terminal-text'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Light</span>
              </button>
            </div>

            {/* Search */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border ${theme === 'terminal' ? 'bg-terminal-bg border-terminal-border' : 'bg-gray-50 border-gray-200'}`}>
              <Search className={`w-4 h-4 ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`bg-transparent text-sm outline-none w-24 lg:w-32 ${theme === 'terminal' ? 'text-terminal-text placeholder:text-terminal-text-muted' : 'text-gray-900 placeholder:text-gray-400'}`}
              />
              <kbd className={`hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded ${theme === 'terminal' ? 'bg-terminal-bg-tertiary text-terminal-text-muted' : 'bg-gray-200 text-gray-500'}`}>
                ⌘K
              </kbd>
            </div>

            {/* CTA */}
            <button 
              onClick={() => scrollToSection('contact')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all hover:shadow-glow ${
                theme === 'terminal' 
                  ? 'border border-terminal-green text-terminal-green hover:bg-terminal-green/10' 
                  : 'border border-green-600 text-green-600 hover:bg-green-50'
              }`}
            >
              <span className="hidden sm:inline">Get in Touch</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-[60px] bottom-0 w-[280px] border-r overflow-y-auto scrollbar-thin z-40 hidden lg:block ${theme === 'terminal' ? 'bg-terminal-bg border-terminal-border' : 'bg-white border-gray-200'} transition-colors duration-300`}>
        <div className="p-4">
          <div className={`text-xs font-medium mb-3 uppercase tracking-wider ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-500'}`}>
            Table of Contents
          </div>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all text-left ${
                    isActive
                      ? theme === 'terminal'
                        ? 'bg-terminal-bg-tertiary text-terminal-green'
                        : 'bg-green-50 text-green-600'
                      : theme === 'terminal'
                        ? 'text-terminal-text-muted hover:text-terminal-text hover:bg-terminal-green/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <ChevronRight className={`w-4 h-4 ml-auto ${theme === 'terminal' ? 'text-terminal-green' : 'text-green-600'}`} />
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t ${theme === 'terminal' ? 'bg-terminal-bg border-terminal-border' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-md transition-all ${
                  isActive
                    ? theme === 'terminal'
                      ? 'text-terminal-green'
                      : 'text-green-600'
                    : theme === 'terminal'
                      ? 'text-terminal-text-muted'
                      : 'text-gray-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px]">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main 
        ref={mainRef}
        className="lg:ml-[280px] pt-[60px] pb-20 lg:pb-0"
      >
        {/* Hero Section */}
        <section 
          id="home" 
          className={`min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 ${theme === 'terminal' ? 'bg-terminal-bg' : 'bg-white'}`}
        >
          <div className="text-center">
            <pre className={`font-mono text-[8px] sm:text-xs md:text-sm leading-tight whitespace-pre mb-8 ${theme === 'terminal' ? 'text-terminal-green animate-glow-pulse' : 'text-green-600'}`}>
              {typedText}
              {!isTypingComplete && <span className="animate-pulse">_</span>}
            </pre>
            
            {isTypingComplete && (
              <div className="animate-fade-in-up">
                <p className={`text-sm sm:text-base mb-2 ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-500'}`}>
                 Machine Learning Researcher building Multimodal & Low-Resource AI
                </p>
                <div className={`flex items-center justify-center gap-4 mt-6 ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-400'}`}>
                  <a href="https://github.com/mrinalchaturvedi27" target="_blank" rel="noopener noreferrer" className={`hover:text-terminal-green transition-colors ${theme === 'terminal' ? '' : 'hover:text-green-600'}`}>
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/mrinalchaturvedi27/" target="_blank" rel="noopener noreferrer" className={`hover:text-terminal-green transition-colors ${theme === 'terminal' ? '' : 'hover:text-green-600'}`}>
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className={`hover:text-terminal-green transition-colors ${theme === 'terminal' ? '' : 'hover:text-green-600'}`}>
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            )}
          </div>
          
          {isTypingComplete && (
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-float ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-400'}`}>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs">Scroll to explore</span>
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
            </div>
          )}
        </section>

        {/* About Section */}
        <section 
          id="about" 
          className={`min-h-screen py-20 px-4 sm:px-6 lg:px-12 ${theme === 'terminal' ? 'bg-terminal-bg-secondary' : 'bg-gray-50'}`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className={theme === 'terminal' ? 'text-terminal-green' : 'text-green-600'}>##</span>
              <h2 className={`text-2xl font-bold ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-900'}`}>
                About Me
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className={`p-6 rounded-lg border ${theme === 'terminal' ? 'bg-terminal-bg border-terminal-border' : 'bg-white border-gray-200'}`}>
                <pre className={`font-mono text-xs leading-relaxed ${theme === 'terminal' ? 'text-terminal-green' : 'text-green-600'}`}>
{`{
  "name": "Mrinal Chaturvedi",
  "location": "IIT Kanpur, India",
  "education": "B.Tech (Civil Engg.)",
  "cpi": "7.9/10",
  "interests": [
    "Machine Learning",
    "Deep Learning",
    "Quantitative Finance",
    "Computer Vision",
    "Sign Language Translation"
  ],
  "achievements": {
    "jee_advanced": "AIR 5993/1.8L+",
    "jee_mains": "AIR 7575/1.1M+"
  },
  "status": "building neural networks..."
}`}
                </pre>
              </div>
              
              <div className="space-y-4">
                <p className={`leading-relaxed ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-700'}`}>
                  I'm an undergraduate at IIT Kanpur working at the intersection of machine learning, 
                  systems, and applied AI. I enjoy going beyond high-level abstractions—building models 
                  end-to-end and understanding how things work under the hood.
                </p>
                <p className={`leading-relaxed ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-700'}`}>
                  My experience spans computer vision, vision-language models, and real-time ML systems. 
                  I've worked with medical imaging pipelines, sign language translation, spatial audio 
                  localization, and quantitative finance using Python, C++, PyTorch, and TensorFlow.
                </p>
                <p className={`leading-relaxed ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-700'}`}>
                  I actively contribute to open-source projects, participate in competitive programming 
                  and data science competitions, and build tools that balance algorithmic efficiency 
                  with real-world impact.
                </p>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  {['ML Researcher', 'Competitive Programmer', 'Open Source'].map((tag) => (
                    <span 
                      key={tag}
                      className={`px-3 py-1 text-xs rounded-full border ${
                        theme === 'terminal' 
                          ? 'border-terminal-green/30 text-terminal-green bg-terminal-green/5' 
                          : 'border-green-200 text-green-700 bg-green-50'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section 
          id="experience" 
          className={`min-h-screen py-20 px-4 sm:px-6 lg:px-12 ${theme === 'terminal' ? 'bg-terminal-bg' : 'bg-white'}`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <span className={theme === 'terminal' ? 'text-terminal-green' : 'text-green-600'}>##</span>
              <h2 className={`text-2xl font-bold ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-900'}`}>
                Research & Experience
              </h2>
            </div>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className={`relative pl-6 border-l-2 ${theme === 'terminal' ? 'border-terminal-border' : 'border-gray-200'}`}
                >
                  <div className={`absolute left-[-5px] top-0 w-2 h-2 rounded-full ${theme === 'terminal' ? 'bg-terminal-green' : 'bg-green-500'}`} />
                  <div className={`p-6 rounded-lg border transition-all hover:border-terminal-green/50 ${theme === 'terminal' ? 'bg-terminal-bg-secondary border-terminal-border' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className={`text-lg font-semibold ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-900'}`}>
                          {exp.company}
                        </h3>
                        <p className={`text-sm ${theme === 'terminal' ? 'text-terminal-green' : 'text-green-600'}`}>
                          {exp.role}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${theme === 'terminal' ? 'bg-terminal-bg-tertiary text-terminal-text-muted' : 'bg-gray-200 text-gray-600'}`}>
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li 
                          key={i}
                          className={`flex items-start gap-2 text-sm ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-600'}`}
                        >
                          <span className={`${theme === 'terminal' ? 'text-terminal-green' : 'text-green-500'} mt-0.5`}>→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section 
          id="skills" 
          className={`min-h-screen py-20 px-4 sm:px-6 lg:px-12 ${theme === 'terminal' ? 'bg-terminal-bg-secondary' : 'bg-gray-50'}`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <span className={theme === 'terminal' ? 'text-terminal-green' : 'text-green-600'}>##</span>
              <h2 className={`text-2xl font-bold ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-900'}`}>
                Technical Skills
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {skills.map((category, catIndex) => (
                <div 
                  key={catIndex}
                  className={`p-6 rounded-lg border ${theme === 'terminal' ? 'bg-terminal-bg border-terminal-border' : 'bg-white border-gray-200'}`}
                >
                  <h3 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-500'}`}>
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.items.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between mb-1">
                          <span className={`text-sm ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-700'}`}>
                            {skill.name}
                          </span>
                          <span className={`text-xs ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-500'}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className={`h-1.5 rounded-full overflow-hidden ${theme === 'terminal' ? 'bg-terminal-bg-tertiary' : 'bg-gray-200'}`}>
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${theme === 'terminal' ? 'bg-terminal-green' : 'bg-green-500'}`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          className={`min-h-screen py-20 px-4 sm:px-6 lg:px-12 ${theme === 'terminal' ? 'bg-terminal-bg' : 'bg-white'}`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <span className={theme === 'terminal' ? 'text-terminal-green' : 'text-green-600'}>##</span>
              <h2 className={`text-2xl font-bold ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-900'}`}>
                Featured Projects
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className={`group p-6 rounded-lg border transition-all hover:border-terminal-green/50 ${theme === 'terminal' ? 'bg-terminal-bg-secondary border-terminal-border' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme === 'terminal' ? 'bg-terminal-bg-tertiary' : 'bg-gray-200'}`}>
                      <FolderGit2 className={`w-5 h-5 ${theme === 'terminal' ? 'text-terminal-green' : 'text-green-600'}`} />
                    </div>
                    <div className="flex gap-2">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-md transition-colors ${theme === 'terminal' ? 'hover:bg-terminal-bg-tertiary text-terminal-text-muted hover:text-terminal-text' : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'}`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      {project.demo !== '#' && (
                        <a 
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-md transition-colors ${theme === 'terminal' ? 'hover:bg-terminal-bg-tertiary text-terminal-text-muted hover:text-terminal-text' : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-900'}`}>
                    {project.name}
                  </h3>
                  <p className={`text-sm mb-4 ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className={`px-2 py-1 text-xs rounded ${theme === 'terminal' ? 'bg-terminal-bg text-terminal-text-muted' : 'bg-gray-200 text-gray-600'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.stars && (
                    <div className={`mt-3 flex items-center gap-2 text-xs ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-500'}`}>
                      <span>⭐ {project.stars} stars</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          className={`min-h-screen py-20 px-4 sm:px-6 lg:px-12 ${theme === 'terminal' ? 'bg-terminal-bg-secondary' : 'bg-gray-50'}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className={theme === 'terminal' ? 'text-terminal-green' : 'text-green-600'}>##</span>
              <h2 className={`text-2xl font-bold ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-900'}`}>
                Get in Touch
              </h2>
            </div>
            
            <p className={`text-lg mb-8 max-w-xl mx-auto ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-600'}`}>
              I'm always open to discussing machine learning projects, research collaborations, or opportunities in AI/ML and quantitative finance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a 
                href="mailto:mrinal.chaturvedi498@gmail.com"
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all hover:shadow-glow ${
                  theme === 'terminal' 
                    ? 'border-terminal-green text-terminal-green hover:bg-terminal-green/10' 
                    : 'border-green-600 text-green-600 hover:bg-green-50'
                }`}
              >
                <Mail className="w-5 h-5" />
                <span>mrinal.chaturvedi498@gmail.com</span>
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              {[
                { icon: Github, href: 'https://github.com/mrinalchaturvedi27', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/mrinalchaturvedi27/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:mrinalchat23@iitk.ac.in', label: 'Academic Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                    theme === 'terminal' 
                      ? 'text-terminal-text-muted hover:text-terminal-green hover:bg-terminal-green/5' 
                      : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs">{label}</span>
                </a>
              ))}
            </div>
            
            <div className={`mt-20 pt-8 border-t ${theme === 'terminal' ? 'border-terminal-border' : 'border-gray-200'}`}>
              <pre className={`font-mono text-xs inline-block ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-400'}`}>
{`© ${new Date().getFullYear()} Mrinal Chaturvedi. All rights reserved.`}
              </pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
