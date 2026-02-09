'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ── Loading Screen ──
function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [statusText, setStatusText] = useState('INITIALIZING')

  useEffect(() => {
    const messages = ['INITIALIZING', 'LOADING MODULES', 'CONNECTING', 'DECRYPTING', 'READY']
    const duration = 2000
    const interval = 16
    const steps = duration / interval
    let step = 0

    const timer = setInterval(() => {
      step++
      const eased = 1 - Math.pow(1 - step / steps, 3)
      const p = Math.min(Math.round(eased * 100), 100)
      setProgress(p)
      setStatusText(messages[Math.min(Math.floor(p / 25), messages.length - 1)])
      if (step >= steps) {
        clearInterval(timer)
        setTimeout(() => {
          setFadeOut(true)
          setTimeout(onFinish, 600)
        }, 400)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onFinish])

  return (
    <div className={`fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center transition-opacity duration-600 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-8">
          <div className="w-16 h-16 border-2 border-red-600 rounded-lg flex items-center justify-center bg-red-600/10 glow-red">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="absolute -inset-4 border border-red-600/20 rounded-xl" />
        </div>
        <h1 className="text-2xl font-mono font-bold text-white tracking-[0.3em] mb-6">SHADOW.CC</h1>
        <div className="w-72 h-[2px] bg-zinc-800/60 mb-3 overflow-hidden">
          <div className="h-full bg-red-600 transition-all duration-100 glow-red" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-between w-72">
          <span className="text-[10px] font-mono text-red-500/70 tracking-widest">{statusText}</span>
          <span className="text-[10px] font-mono text-zinc-600">{progress}%</span>
        </div>
      </div>
    </div>
  )
}

// ── Particle Network Background ──
function ParticleBackground() {
  useEffect(() => {
    const canvas = document.getElementById('particles') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    interface Particle { x: number; y: number; vx: number; vy: number; size: number; alpha: number }
    const particles: Particle[] = []
    const count = window.innerWidth < 640 ? 25 : 60

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 3, 3, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 38, 38, ${p.alpha})`
        ctx.fill()

        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.08 * (1 - dist / 140)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas id="particles" className="fixed inset-0 pointer-events-none z-0" />
}

// ── Header ──
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'PRODUCTS', href: '#products' },
    { label: 'SERVICES', href: '#services' },
    { label: 'REVIEWS', href: '#reviews' },
    { label: 'SUPPORT', href: '/support' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#030303]/90 backdrop-blur-xl border-b border-red-900/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 border border-red-600/60 rounded-md flex items-center justify-center bg-red-600/10 group-hover:bg-red-600/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wider group-hover:text-red-500 transition-colors">SHADOW<span className="text-red-500">.</span>CC</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <Link key={l.label} href={l.href} className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-all font-mono tracking-wide">
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden border border-zinc-700 hover:border-zinc-500 rounded-md p-2 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-red-900/20 bg-[#030303]/95 backdrop-blur-xl">
          <div className="flex flex-col px-4 py-2">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white py-3 border-b border-zinc-800/50 font-mono text-sm tracking-wider last:border-0">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

// ── Product/Service Card ──
interface ServiceCard {
  title: string
  description: string
  icon: string
  href: string
  tag: string
  tagColor: 'red' | 'green' | 'yellow'
  features: string[]
}

function ProductServiceCard({ card }: { card: ServiceCard }) {
  const tagColors = {
    red: 'bg-red-600/10 border-red-600/30 text-red-400',
    green: 'bg-green-500/10 border-green-500/30 text-green-400',
    yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  }

  return (
    <Link href={card.href} className="group relative block">
      <div className="relative bg-[#0a0a0a] border border-zinc-800 hover:border-red-900/40 rounded-lg p-6 sm:p-7 h-full flex flex-col transition-all duration-300 group-hover:translate-y-[-2px]">
        {/* Tag */}
        <div className="flex items-center justify-between mb-5">
          <div className={`w-12 h-12 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center group-hover:bg-red-600/10 transition-colors`}>
            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
            </svg>
          </div>
          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border tracking-widest ${tagColors[card.tagColor]}`}>
            {card.tag}
          </span>
        </div>

        <h3 className="text-lg font-mono font-bold text-white tracking-wide mb-2">{card.title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-5">{card.description}</p>

        {/* Features */}
        <ul className="space-y-2 mb-6 flex-1">
          {card.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2.5 text-xs text-zinc-400">
              <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center justify-between border-t border-zinc-800/50 pt-5">
          <span className="text-xs font-mono text-zinc-500 tracking-wider group-hover:text-red-400 transition-colors">
            {card.tag === 'COMING SOON' ? 'LEARN MORE' : 'VIEW DETAILS'}
          </span>
          <svg className="w-4 h-4 text-zinc-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

// ── Visitor Counter ──
function VisitorCounter() {
  const [stats, setStats] = useState<{ total: number; active: number } | null>(null)

  useEffect(() => {
    fetch('/api/visitors')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {})
  }, [])

  if (!stats) return null

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
          <span className="text-green-400">{stats.active}</span> ONLINE NOW
        </span>
      </div>
      <div className="w-px h-3 bg-zinc-800" />
      <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
        <span className="text-zinc-300">{stats.total.toLocaleString()}</span> TOTAL VISITS
      </span>
    </div>
  )
}

// ── Footer ──
function Footer() {
  return (
    <footer className="py-10 sm:py-14 px-4 sm:px-6 border-t border-zinc-800/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 group mb-3">
              <div className="w-7 h-7 border border-red-600/40 rounded-md flex items-center justify-center bg-red-600/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm font-mono font-bold text-zinc-400 tracking-wider group-hover:text-white transition-colors">SHADOW<span className="text-red-500">.</span>CC</span>
            </Link>
            <p className="text-zinc-600 text-xs font-mono leading-relaxed">Premium digital services. Scripts, websites, bots, AI, and security.</p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-zinc-400 tracking-[0.2em] mb-3">PRODUCTS</h4>
            <div className="flex flex-col gap-2">
              <Link href="/roblox" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono">Roblox Script</Link>
              <Link href="/antivirus" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono">Antivirus</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-zinc-400 tracking-[0.2em] mb-3">SERVICES</h4>
            <div className="flex flex-col gap-2">
              <Link href="/services/website" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono">Website Creation</Link>
              <Link href="/services/discord-bot" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono">Discord Bots</Link>
              <Link href="/services/ai" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono">AI Solutions</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-zinc-400 tracking-[0.2em] mb-3">COMPANY</h4>
            <div className="flex flex-col gap-2">
              <Link href="/support" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono">Support</Link>
              <Link href="/status" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono">Status</Link>
              <Link href="/terms" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono">Terms of Service</Link>
              <a href="https://discord.gg/Kezxm2TyGY" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono">Discord</a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-700 text-[10px] font-mono tracking-wider">2026 SHADOW.CC. ALL RIGHTS RESERVED.</p>
          <a href="https://discord.gg/Kezxm2TyGY" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors" aria-label="Discord">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

// ── Main Homepage ──
export default function HomePage() {
  const [loading, setLoading] = useState(true)

  const products: ServiceCard[] = [
    {
      title: 'Roblox Script',
      description: 'Premium Roblox scripts with advanced features, auto farm, ESP, aimbot, and more. Instant key delivery.',
      icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
      href: '/roblox',
      tag: 'ACTIVE',
      tagColor: 'green',
      features: ['50+ Supported Games', 'Auto Updates Daily', 'Instant Key Delivery', 'Weekly / Monthly / Lifetime'],
    },
    {
      title: 'Website Creation',
      description: 'Custom website design and development tailored to your needs. From landing pages to full web applications.',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      href: '/services/website',
      tag: 'AVAILABLE',
      tagColor: 'green',
      features: ['Custom Design', 'Responsive & Mobile Friendly', 'SEO Optimized', 'Hosting Included'],
    },
    {
      title: 'Discord Bot',
      description: 'Custom Discord bots with moderation, music, ticketing, economy systems, and whatever you need.',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      href: '/services/discord-bot',
      tag: 'AVAILABLE',
      tagColor: 'green',
      features: ['Custom Commands', 'Moderation Tools', 'Music & Entertainment', '24/7 Uptime Hosting'],
    },
    {
      title: 'AI Solutions',
      description: 'Custom AI integrations, chatbots, automation tools, and intelligent systems for your business or project.',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      href: '/services/ai',
      tag: 'AVAILABLE',
      tagColor: 'green',
      features: ['Custom AI Chatbots', 'Process Automation', 'Data Analysis', 'API Integrations'],
    },
    {
      title: 'Android Antivirus',
      description: 'Real-time mobile protection against malware, phishing, and threats. Lightweight and battery-efficient.',
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      href: '/antivirus',
      tag: 'COMING SOON',
      tagColor: 'yellow',
      features: ['Real-Time Scanning', 'Phishing Protection', 'Battery Optimized', 'Privacy Shield'],
    },
    {
      title: 'PC Antivirus',
      description: 'Enterprise-grade PC security with real-time protection, firewall management, and zero-day threat detection.',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
      href: '/antivirus',
      tag: 'COMING SOON',
      tagColor: 'yellow',
      features: ['Real-Time Protection', 'Firewall Manager', 'Zero-Day Detection', 'System Optimizer'],
    },
  ]

  return (
    <div className="min-h-screen bg-[#030303] text-white noise scanline">
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <ParticleBackground />
      <Header />

      <main className="relative z-10">
        {/* ── Hero ── */}
        <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute top-24 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 border border-red-600/30 rounded-full px-4 py-1.5 mb-6 sm:mb-8 bg-red-600/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-red-400 text-xs font-mono tracking-widest">DIGITAL SERVICES PLATFORM</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-4 sm:mb-6 leading-[0.95] tracking-tight text-balance">
              BUILD<span className="text-red-500">.</span> PROTECT<span className="text-red-500">.</span><br />
              <span className="text-red-500 glow-red-text">DOMINATE</span>
            </h1>

            <p className="text-sm sm:text-lg text-zinc-500 mb-8 sm:mb-10 max-w-2xl mx-auto font-mono leading-relaxed text-pretty">
              Premium digital services from custom websites and Discord bots to AI solutions, game scripts, and security software. All under one roof.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <a
                href="#products"
                className="group relative bg-red-600 hover:bg-red-700 text-white font-mono font-semibold py-3.5 px-8 rounded-md transition-all text-sm tracking-wider flex items-center justify-center gap-2 glow-red"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                EXPLORE SERVICES
              </a>
              <a
                href="https://discord.gg/Kezxm2TyGY"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-700 hover:border-zinc-500 bg-white/[0.02] hover:bg-white/[0.05] text-zinc-300 font-mono font-semibold py-3.5 px-8 rounded-md transition-all text-sm tracking-wider flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                DISCORD
              </a>
            </div>

            <VisitorCounter />
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="px-4 sm:px-6 py-10 sm:py-14 border-y border-red-900/15">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: '10K+', label: 'CLIENTS SERVED' },
              { value: '99.9%', label: 'UPTIME' },
              { value: '24/7', label: 'SUPPORT' },
              { value: '6', label: 'SERVICES' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-red-500 glow-red-text mb-1">{s.value}</div>
                <div className="text-[10px] sm:text-xs font-mono text-zinc-600 tracking-[0.2em]">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Products & Services Grid ── */}
        <section id="products" className="py-16 sm:py-24 px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// OUR SERVICES</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">What We Offer</h2>
              <p className="text-zinc-500 text-sm font-mono mt-3 max-w-lg mx-auto">
                From game scripts to enterprise security. Choose your service.
              </p>
            </div>

            <div id="services" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {products.map((card, i) => (
                <ProductServiceCard key={i} card={card} />
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 border-y border-red-900/15 relative">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// PROCESS</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">How It Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                { step: '01', title: 'CHOOSE SERVICE', desc: 'Browse our products and services. Select what you need.' },
                { step: '02', title: 'PURCHASE & DETAILS', desc: 'Complete payment. For custom services, provide your project details and contact info.' },
                { step: '03', title: 'RECEIVE & ENJOY', desc: 'Get instant key delivery for scripts, or we start building your custom project.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-6 sm:p-7 text-center">
                  <div className="text-4xl font-mono font-bold text-red-600/20 mb-3">{item.step}</div>
                  <h3 className="text-sm font-mono font-bold text-white tracking-wide mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// WHY US</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">Why Choose Shadow<span className="text-red-500">.</span>CC</h2>
              <p className="text-zinc-500 text-sm font-mono mt-3 max-w-lg mx-auto">
                We deliver quality at prices that respect your wallet.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                  title: 'LOWEST PRICES',
                  desc: 'Unbeatable rates on all services. Custom bots from $15, websites from $25.',
                },
                {
                  icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                  title: 'INSTANT DELIVERY',
                  desc: 'Script keys delivered immediately after payment. No waiting around.',
                },
                {
                  icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                  title: 'SECURE PAYMENTS',
                  desc: 'Powered by Stripe. Your payment info is never stored on our servers.',
                },
                {
                  icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
                  title: 'REAL SUPPORT',
                  desc: 'Direct Discord and email support from the developer. No bots, no tickets.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-zinc-800 hover:border-red-900/40 rounded-lg p-5 sm:p-6 transition-all group">
                  <div className="w-10 h-10 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center mb-4 group-hover:bg-red-600/10 transition-colors">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xs font-mono font-bold text-white tracking-wider mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="reviews" className="py-16 sm:py-24 px-4 sm:px-6 border-y border-red-900/15 relative">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// REVIEWS</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">What Clients Say</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'Alex M.',
                  role: 'Roblox User',
                  text: 'The script works flawlessly. Auto farm has been running for weeks with no issues. Key delivery was instant too.',
                  rating: 5,
                },
                {
                  name: 'Jordan K.',
                  role: 'Discord Server Owner',
                  text: 'Got a custom bot built for my community. Moderation, tickets, leveling -- everything works perfectly. Best $40 I ever spent.',
                  rating: 5,
                },
                {
                  name: 'Sam T.',
                  role: 'Small Business Owner',
                  text: 'They built my company website in 3 days. Clean design, fast loading, and the price was way cheaper than anywhere else.',
                  rating: 5,
                },
                {
                  name: 'Riley P.',
                  role: 'Content Creator',
                  text: 'The AI chatbot they built for my Discord handles FAQ questions so I do not have to. Saves me hours every week.',
                  rating: 5,
                },
                {
                  name: 'Casey D.',
                  role: 'Game Developer',
                  text: 'Lifetime key was worth every penny. Updates keep coming, new game support added regularly. Support team responds fast.',
                  rating: 5,
                },
                {
                  name: 'Morgan W.',
                  role: 'Startup Founder',
                  text: 'Had a full web app built with auth and database for $175. The quality is insane for the price. Highly recommend.',
                  rating: 5,
                },
              ].map((review, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-zinc-800 hover:border-red-900/40 rounded-lg p-5 sm:p-6 transition-all">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <svg key={j} className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-4">{'"'}{review.text}{'"'}</p>
                  <div className="border-t border-zinc-800/50 pt-3">
                    <p className="text-white text-xs font-mono font-bold">{review.name}</p>
                    <p className="text-zinc-600 text-[10px] font-mono tracking-wider">{review.role.toUpperCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Latest Updates ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// CHANGELOG</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">Latest Updates</h2>
              <p className="text-zinc-500 text-sm font-mono mt-3 max-w-lg mx-auto">
                We ship fast. Here is what we have been working on.
              </p>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-zinc-800" />
              <div className="space-y-6">
                {[
                  { date: 'FEB 2026', title: 'New Pricing Launched', desc: 'Slashed prices across all services. Discord bots starting at $15, websites at $25, and AI solutions at $25.', tag: 'PRICING' },
                  { date: 'FEB 2026', title: 'Antivirus Development Begins', desc: 'Started development on Android and PC antivirus software. Join Discord for early access.', tag: 'NEW' },
                  { date: 'JAN 2026', title: 'AI Solutions Service Added', desc: 'Custom AI chatbots, automation pipelines, and intelligent systems now available to order.', tag: 'SERVICE' },
                  { date: 'JAN 2026', title: 'Script V3.2 Update', desc: 'Added support for 10 new games including King Legacy and Tower of Hell. Performance improvements across the board.', tag: 'UPDATE' },
                  { date: 'DEC 2025', title: 'Stripe Payments Integration', desc: 'Secure checkout with Stripe. Instant key delivery and promo code support.', tag: 'FEATURE' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 sm:gap-5">
                    <div className="relative flex-shrink-0 mt-1.5">
                      <div className="w-[15px] h-[15px] rounded-full border-2 border-red-600/50 bg-[#030303] flex items-center justify-center">
                        <div className="w-[5px] h-[5px] rounded-full bg-red-500" />
                      </div>
                    </div>
                    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-4 sm:p-5 flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] font-mono text-zinc-600 tracking-widest">{item.date}</span>
                        <span className="text-[10px] font-mono font-bold text-red-400 bg-red-600/10 border border-red-600/30 px-2 py-0.5 rounded tracking-widest">{item.tag}</span>
                      </div>
                      <h3 className="text-sm font-mono font-bold text-white tracking-wide mb-1.5">{item.title}</h3>
                      <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-red-900/15 relative">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="max-w-3xl mx-auto relative z-10 text-center">
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-8 sm:p-12">
              <div className="w-14 h-14 border border-red-600/30 bg-red-600/5 rounded-lg flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3 text-balance">Ready to Get Started?</h2>
              <p className="text-zinc-500 text-sm font-mono mb-6 max-w-md mx-auto leading-relaxed">
                Join thousands of satisfied clients. Whether you need scripts, a website, a bot, or an AI solution -- we have got you covered at the best prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#products"
                  className="group bg-red-600 hover:bg-red-700 text-white font-mono font-semibold py-3.5 px-8 rounded-md transition-all text-sm tracking-wider flex items-center justify-center gap-2 glow-red"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  VIEW SERVICES
                </a>
                <a
                  href="https://discord.gg/Kezxm2TyGY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-zinc-700 hover:border-zinc-500 bg-white/[0.02] hover:bg-white/[0.05] text-zinc-300 font-mono font-semibold py-3.5 px-8 rounded-md transition-all text-sm tracking-wider flex items-center justify-center gap-2"
                >
                  JOIN DISCORD
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  )
}

// ── FAQ Section (with state) ──
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const faqs = [
    { q: 'How do custom services work?', a: 'After purchasing a custom service (website, bot, or AI), you will be taken to a form where you provide your project details and contact information. We will reach out within 24 hours to discuss your project.' },
    { q: 'How fast is Roblox script key delivery?', a: 'Instant. Your license key is delivered immediately after payment on the success page and via email.' },
    { q: 'Why are your prices so low?', a: 'We keep overhead minimal and pass the savings to you. No middlemen, no corporate markup. Discord bots from $15, websites from $25, AI solutions from $25. Quality does not have to be expensive.' },
    { q: 'Do you offer refunds?', a: 'We offer refunds within 24 hours of purchase if the product is not working as described. For custom services, refunds are handled on a case-by-case basis before work begins.' },
    { q: 'Are the antivirus products available yet?', a: 'Both Android and PC antivirus software are currently in development. Join our Discord to be notified when they launch.' },
    { q: 'Can I request custom features?', a: 'Absolutely. Every custom service (website, bot, AI) is built to your exact specifications. Just describe what you need in the order form and we will make it happen.' },
    { q: 'How do I get support?', a: 'Visit our support page for email, phone, and Discord contact options. We respond within 24 hours.' },
  ]

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// FAQ</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">Questions</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-zinc-800 hover:border-zinc-700 rounded-lg overflow-hidden transition-colors">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4"
              >
                <span className="text-white text-sm font-mono">{faq.q}</span>
                <svg className={`w-4 h-4 text-red-500/60 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                  <p className="text-zinc-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
