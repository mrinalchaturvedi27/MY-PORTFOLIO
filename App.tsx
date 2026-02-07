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
██████╗  █████╗ ██╗   ██╗███████╗██████╗ 
██╔══██╗██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗
██████╔╝███████║ ╚████╔╝ █████╗  ██████╔╝
██╔══██╗██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗
██║  ██║██║  ██║   ██║   ███████╗██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
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

// Experience data
const experiences = [
  {
    company: 'TechCorp Inc.',
    role: 'Senior Full Stack Developer',
    period: '2022 - Present',
    description: [
      'Led development of microservices architecture serving 1M+ users',
      'Reduced API response time by 40% through optimization',
      'Mentored team of 5 junior developers',
    ],
  },
  {
    company: 'StartupXYZ',
    role: 'Full Stack Developer',
    period: '2020 - 2022',
    description: [
      'Built core product features from scratch',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
      'Collaborated with design team on UI/UX improvements',
    ],
  },
  {
    company: 'Digital Agency',
    role: 'Junior Developer',
    period: '2018 - 2020',
    description: [
      'Developed responsive websites for 20+ clients',
      'Maintained and optimized existing codebases',
      'Learned modern web development practices',
    ],
  },
]

// Skills data
const skills = [
  { category: 'Languages', items: [
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'Python', level: 85 },
    { name: 'Go', level: 75 },
    { name: 'Rust', level: 65 },
  ]},
  { category: 'Frontend', items: [
    { name: 'React/Next.js', level: 95 },
    { name: 'Vue.js', level: 80 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Three.js', level: 70 },
  ]},
  { category: 'Backend', items: [
    { name: 'Node.js', level: 90 },
    { name: 'Django/FastAPI', level: 80 },
    { name: 'PostgreSQL', level: 85 },
    { name: 'Redis', level: 75 },
  ]},
  { category: 'DevOps', items: [
    { name: 'Docker/K8s', level: 80 },
    { name: 'AWS/GCP', level: 75 },
    { name: 'CI/CD', level: 85 },
    { name: 'Terraform', level: 70 },
  ]},
]

// Projects data
const projects = [
  {
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    tech: ['Next.js', 'PostgreSQL', 'Stripe', 'Redis'],
    github: '#',
    demo: '#',
  },
  {
    name: 'AI Chat Application',
    description: 'Real-time chat app with AI-powered responses and natural language processing.',
    tech: ['React', 'Python', 'OpenAI', 'WebSocket'],
    github: '#',
    demo: '#',
  },
  {
    name: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for visualizing complex datasets with D3.js and real-time updates.',
    tech: ['D3.js', 'React', 'Node.js', 'MongoDB'],
    github: '#',
    demo: '#',
  },
  {
    name: 'Microservices API Gateway',
    description: 'Scalable API gateway handling 10K+ requests/sec with rate limiting and authentication.',
    tech: ['Go', 'gRPC', 'Docker', 'Kubernetes'],
    github: '#',
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
              Portfolio
            </span>
          </div>

          {/* Center - Page Title */}
          <div className="hidden md:flex items-center gap-2">
            <span className={`text-sm ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-500'}`}>
              ~/portfolio
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
            <button className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all hover:shadow-glow ${
              theme === 'terminal' 
                ? 'border border-terminal-green text-terminal-green hover:bg-terminal-green/10' 
                : 'border border-green-600 text-green-600 hover:bg-green-50'
            }`}>
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
                  Full Stack Developer | Problem Solver | Code Enthusiast
                </p>
                <div className={`flex items-center justify-center gap-4 mt-6 ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-400'}`}>
                  <a href="#" className={`hover:text-terminal-green transition-colors ${theme === 'terminal' ? '' : 'hover:text-green-600'}`}>
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className={`hover:text-terminal-green transition-colors ${theme === 'terminal' ? '' : 'hover:text-green-600'}`}>
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
  "name": "Payer",
  "location": "San Francisco, CA",
  "role": "Full Stack Developer",
  "experience": "5+ years",
  "interests": [
    "Open Source",
    "AI/ML",
    "Distributed Systems",
    "Web Performance"
  ],
  "coffee": "always brewing..."
}`}
                </pre>
              </div>
              
              <div className="space-y-4">
                <p className={`leading-relaxed ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-700'}`}>
                  I'm a passionate full-stack developer with over 5 years of experience building 
                  scalable web applications. I love solving complex problems and creating 
                  intuitive user experiences.
                </p>
                <p className={`leading-relaxed ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-700'}`}>
                  My journey in tech started with a curiosity about how things work on the web. 
                  That curiosity turned into a career where I've had the opportunity to work 
                  with amazing teams and build products that impact millions of users.
                </p>
                <p className={`leading-relaxed ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-700'}`}>
                  When I'm not coding, you'll find me contributing to open-source projects, 
                  writing technical blog posts, or exploring the latest in web technologies.
                </p>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  {['Open Source Contributor', 'Tech Speaker', 'Mentor'].map((tag) => (
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
                Experience
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
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <h3 className={`text-lg font-semibold ${theme === 'terminal' ? 'text-terminal-text' : 'text-gray-900'}`}>
                        {exp.role}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded ${theme === 'terminal' ? 'bg-terminal-bg-tertiary text-terminal-text-muted' : 'bg-gray-200 text-gray-600'}`}>
                        {exp.period}
                      </span>
                    </div>
                    <p className={`text-sm mb-4 ${theme === 'terminal' ? 'text-terminal-green' : 'text-green-600'}`}>
                      @ {exp.company}
                    </p>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li 
                          key={i}
                          className={`flex items-start gap-2 text-sm ${theme === 'terminal' ? 'text-terminal-text-muted' : 'text-gray-600'}`}
                        >
                          <span className={theme === 'terminal' ? 'text-terminal-green' : 'text-green-500'}>→</span>
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
                Skills
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
                Projects
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
                        className={`p-2 rounded-md transition-colors ${theme === 'terminal' ? 'hover:bg-terminal-bg-tertiary text-terminal-text-muted hover:text-terminal-text' : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'}`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a 
                        href={project.demo}
                        className={`p-2 rounded-md transition-colors ${theme === 'terminal' ? 'hover:bg-terminal-bg-tertiary text-terminal-text-muted hover:text-terminal-text' : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
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
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a 
                href="mailto:your.email@example.com"
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all hover:shadow-glow ${
                  theme === 'terminal' 
                    ? 'border-terminal-green text-terminal-green hover:bg-terminal-green/10' 
                    : 'border-green-600 text-green-600 hover:bg-green-50'
                }`}
              >
                <Mail className="w-5 h-5" />
                <span>your.email@example.com</span>
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
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
{`// Built with React + TypeScript + Tailwind
// © ${new Date().getFullYear()} Payer. All rights reserved.`}
              </pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
