'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { PRODUCTS, Product } from '@/lib/products'
import { startCheckoutSession } from '@/app/actions/stripe'

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null

interface CartItem {
  product: Product
  quantity: number
}

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
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="relative mb-8">
          <div className="w-16 h-16 border-2 border-red-600 rounded-lg flex items-center justify-center bg-red-600/10 glow-red">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="absolute -inset-4 border border-red-600/20 rounded-xl" />
        </div>
        <h1 className="text-2xl font-mono font-bold text-white tracking-[0.3em] mb-6">SHADOW.CC</h1>
        {/* Progress bar */}
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
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

// ── Header ──
function Header({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#030303]/90 backdrop-blur-xl border-b border-red-900/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 border border-red-600/60 rounded-md flex items-center justify-center bg-red-600/10 group-hover:bg-red-600/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wider group-hover:text-red-500 transition-colors">SHADOW<span className="text-red-500">.</span>CC</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {['Products', 'Features', 'FAQ'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-all font-mono tracking-wide">
              {item.toUpperCase()}
            </a>
          ))}
          <a href="/support" className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-all font-mono tracking-wide">SUPPORT</a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onCartClick}
            className="relative border border-red-600/40 hover:border-red-600 bg-red-600/5 hover:bg-red-600/15 rounded-md px-3 py-2 sm:px-4 flex items-center gap-2 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs font-mono text-zinc-300 hidden sm:inline tracking-wider">CART</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

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
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-red-900/20 bg-[#030303]/95 backdrop-blur-xl">
          <div className="flex flex-col px-4 py-2">
            {['Products', 'Features', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white py-3 border-b border-zinc-800/50 font-mono text-sm tracking-wider">{item.toUpperCase()}</a>
            ))}
            <a href="/support" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white py-3 font-mono text-sm tracking-wider">SUPPORT</a>
          </div>
        </nav>
      )}
    </header>
  )
}

// ── Hero ──
function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-24 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 border border-red-600/30 rounded-full px-4 py-1.5 mb-6 sm:mb-8 bg-red-600/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-red-400 text-xs font-mono tracking-widest">STATUS: UNDETECTED</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-4 sm:mb-6 leading-[0.95] tracking-tight text-balance">
          DOMINATE<br />
          <span className="text-red-500 glow-red-text">EVERY GAME</span>
        </h1>

        <p className="text-sm sm:text-lg text-zinc-500 mb-8 sm:mb-10 max-w-xl mx-auto font-mono leading-relaxed text-pretty">
          Premium Roblox scripts. Advanced features. Instant delivery. Updated daily. Join 10,000+ users.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#products"
            className="group relative bg-red-600 hover:bg-red-700 text-white font-mono font-semibold py-3.5 px-8 rounded-md transition-all text-sm tracking-wider flex items-center justify-center gap-2 glow-red"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            GET ACCESS
          </a>
          <a
            href="https://discord.gg/Kezxm2TyGY"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-zinc-700 hover:border-zinc-500 bg-white/[0.02] hover:bg-white/[0.05] text-zinc-300 font-mono font-semibold py-3.5 px-8 rounded-md transition-all text-sm tracking-wider flex items-center justify-center gap-2"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            DISCORD
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Stats ──
function Stats() {
  const stats = [
    { value: '10K+', label: 'ACTIVE USERS' },
    { value: '99.9%', label: 'UPTIME' },
    { value: '24/7', label: 'SUPPORT' },
    { value: '50+', label: 'GAMES' },
  ]

  return (
    <section className="px-4 sm:px-6 py-10 sm:py-14 border-y border-red-900/15">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-red-500 glow-red-text mb-1">{s.value}</div>
            <div className="text-[10px] sm:text-xs font-mono text-zinc-600 tracking-[0.2em]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Product Card ──
function ProductCard({ product, onAddToCart, stock }: { product: Product; onAddToCart: (product: Product) => void; stock: number }) {
  const outOfStock = stock === 0

  return (
    <div className={`relative group transition-all duration-300 ${outOfStock ? 'opacity-50' : ''}`}>
      {/* Outer glow for popular */}
      {product.popular && !outOfStock && (
        <div className="absolute -inset-px rounded-lg bg-gradient-to-b from-red-600/40 via-red-600/10 to-red-600/40 blur-sm" />
      )}
      <div className={`relative bg-[#0a0a0a] border rounded-lg p-6 sm:p-7 h-full flex flex-col ${
        product.popular ? 'border-red-600/50' : 'border-zinc-800 hover:border-red-900/40'
      }`}>
        {/* Badge */}
        {product.popular && !outOfStock && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-mono font-bold px-3 py-0.5 rounded tracking-widest">
            POPULAR
          </div>
        )}
        {outOfStock && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-700 text-zinc-300 text-[10px] font-mono font-bold px-3 py-0.5 rounded tracking-widest">
            SOLD OUT
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-md border border-red-600/30 bg-red-600/5 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-mono font-bold text-white tracking-wide mb-0.5">{product.name}</h3>
          <p className="text-red-500/70 text-xs font-mono tracking-widest">{product.duration.toUpperCase()}</p>
        </div>

        {/* Price */}
        <div className="text-center mb-5">
          <div className="text-4xl font-mono font-bold text-white">
            <span className="text-lg text-zinc-500">$</span>{(product.priceInCents / 100).toFixed(2)}
          </div>
          <p className="text-[10px] font-mono text-zinc-600 mt-1 tracking-wider">ONE-TIME PAYMENT</p>
        </div>

        {/* Stock */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className={`w-1.5 h-1.5 rounded-full ${stock > 10 ? 'bg-green-500' : stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
          <span className={`text-xs font-mono ${stock > 10 ? 'text-green-500/70' : stock > 0 ? 'text-yellow-500/70' : 'text-red-500/70'}`}>
            {stock > 0 ? `${stock} IN STOCK` : 'OUT OF STOCK'}
          </span>
        </div>

        <p className="text-zinc-500 text-xs text-center mb-5 leading-relaxed">{product.description}</p>

        {/* Features */}
        <ul className="space-y-2.5 mb-6 flex-1">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2.5 text-xs text-zinc-400">
              <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => !outOfStock && onAddToCart(product)}
          disabled={outOfStock}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-md font-mono text-sm font-semibold tracking-wider transition-all ${
            outOfStock
              ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              : product.popular
                ? 'bg-red-600 hover:bg-red-700 text-white glow-red'
                : 'border border-red-600/40 hover:border-red-600 bg-red-600/5 hover:bg-red-600/15 text-red-400 hover:text-white'
          }`}
        >
          {outOfStock ? 'SOLD OUT' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  )
}

// ── Products Section ──
function Products({ onAddToCart, stock }: { onAddToCart: (product: Product) => void; stock: Record<string, number> }) {
  return (
    <section id="products" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// PRICING</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">Choose Your Plan</h2>
          <p className="text-zinc-500 text-sm font-mono mt-3 max-w-lg mx-auto">
            All plans include full script access and instant delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} stock={stock[product.id] || 0} />
          ))}
        </div>

        <div className="mt-10 sm:mt-14 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-6 sm:gap-8">
            {[
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'SECURE' },
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'INSTANT' },
              { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', label: '24/7' },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 tracking-[0.2em]">
                <svg className="w-3.5 h-3.5 text-red-600/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Features ──
function ScriptFeatures() {
  const features = [
    { title: 'Auto Farm', desc: 'Automatically farm resources, XP, and currency while AFK', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
    { title: 'ESP & Wallhack', desc: 'See players, items, and NPCs through walls', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { title: 'Speed & Fly', desc: 'Move faster and fly anywhere on the map', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { title: 'Teleport', desc: 'Instantly teleport to any location or player', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { title: 'Aimbot', desc: 'Perfect aim assistance for combat games', icon: 'M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z' },
    { title: 'Anti-AFK', desc: 'Stay in game without getting kicked', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  ]

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 border-y border-red-900/15 relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// FEATURES</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">Powerful Features</h2>
          <p className="text-zinc-500 text-sm font-mono mt-3 max-w-lg mx-auto">
            Everything you need to dominate any Roblox game.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-zinc-800 hover:border-red-900/40 rounded-lg p-5 sm:p-6 transition-all group">
              <div className="w-10 h-10 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center mb-4 group-hover:bg-red-600/10 transition-colors">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                </svg>
              </div>
              <h3 className="text-sm font-mono font-bold text-white tracking-wide mb-1.5">{f.title.toUpperCase()}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Supported Games ──
function SupportedGames() {
  const games = ['Blox Fruits', 'Pet Simulator X', 'Arsenal', 'Murder Mystery 2', 'Jailbreak', 'Adopt Me', 'Tower of Hell', 'King Legacy']

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// COMPATIBILITY</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">Supported Games</h2>
          <p className="text-zinc-500 text-sm font-mono mt-3">Works with 50+ popular Roblox games and counting.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {games.map((game, i) => (
            <span key={i} className="bg-[#0a0a0a] border border-zinc-800 hover:border-red-900/50 rounded-md px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-mono text-zinc-400 hover:text-white transition-all cursor-default">
              {game}
            </span>
          ))}
          <span className="bg-[#0a0a0a] border border-zinc-800 rounded-md px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-mono text-zinc-600">
            +42 more
          </span>
        </div>
      </div>
    </section>
  )
}

// ── FAQ ──
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const faqs = [
    { q: 'How do I get my key after purchase?', a: 'Your license key is delivered instantly after payment. It will be displayed on the success page and sent to your email.' },
    { q: 'Which executors are supported?', a: 'We support all major executors including Synapse X, Script-Ware, Krnl, Fluxus, and more.' },
    { q: 'Is this detectable?', a: 'Our script is updated daily to bypass Roblox anti-cheat. We have a 99.9% undetection rate.' },
    { q: 'Can I use on multiple accounts?', a: 'Each key is HWID locked to one device. You can use it on multiple Roblox accounts on the same PC.' },
    { q: 'What if I get banned?', a: 'Use at your own risk. We recommend using alt accounts. We are not responsible for any bans.' },
  ]

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-red-900/15">
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

// ── Footer ──
function Footer() {
  return (
    <footer className="py-8 sm:py-10 px-4 sm:px-6 border-t border-zinc-800/50">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 sm:gap-5 md:flex-row md:justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 border border-red-600/40 rounded-md flex items-center justify-center bg-red-600/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-sm font-mono font-bold text-zinc-400 tracking-wider group-hover:text-white transition-colors">SHADOW<span className="text-red-500">.</span>CC</span>
        </a>
        <p className="text-zinc-700 text-[10px] font-mono tracking-wider">2026 SHADOW.CC. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-5">
          <a href="/support" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono tracking-wider">SUPPORT</a>
          <a href="https://discord.gg/shadow" className="text-zinc-600 hover:text-white transition-colors" aria-label="Discord">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

// ── Cart Sidebar ──
function CartSidebar({
  isOpen, onClose, cart, onUpdateQuantity, onRemove, onCheckout,
}: {
  isOpen: boolean; onClose: () => void; cart: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void; onCheckout: () => void
}) {
  const total = cart.reduce((sum, item) => sum + item.product.priceInCents * item.quantity, 0)

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/70 z-40" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-zinc-800 z-50 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-zinc-800">
            <h2 className="text-sm font-mono font-bold text-white tracking-widest">YOUR CART</h2>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 border border-zinc-800 rounded-md flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-zinc-600 text-xs font-mono tracking-wider">EMPTY</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.product.id} className="bg-black border border-zinc-800 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white text-sm font-mono font-bold">{item.product.name}</h3>
                        <p className="text-red-500/60 text-xs font-mono">{item.product.duration}</p>
                      </div>
                      <button onClick={() => onRemove(item.product.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))} className="w-7 h-7 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 text-xs font-mono transition-colors">-</button>
                        <span className="text-white w-7 text-center text-xs font-mono">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 text-xs font-mono transition-colors">+</button>
                      </div>
                      <span className="text-white font-mono font-bold text-sm">${((item.product.priceInCents * item.quantity) / 100).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-500 text-xs font-mono tracking-wider">TOTAL</span>
                <span className="text-xl font-mono font-bold text-white">${(total / 100).toFixed(2)}</span>
              </div>
              <button onClick={onCheckout} className="w-full bg-red-600 hover:bg-red-700 text-white font-mono font-semibold py-3.5 rounded-md transition-all text-sm tracking-wider glow-red">
                CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ── Checkout Modal ──
function CheckoutModal({ isOpen, onClose, cart }: { isOpen: boolean; onClose: () => void; cart: CartItem[] }) {
  const [error, setError] = useState<string | null>(null)

  const fetchClientSecret = useCallback(async () => {
    try {
      setError(null)
      const items = cart.map(item => ({ productId: item.product.id, quantity: item.quantity }))
      const result = await startCheckoutSession(items)
      if (!result.clientSecret) throw new Error('Failed to create checkout session')
      return result.clientSecret
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      throw err
    }
  }, [cart])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative w-full sm:max-w-2xl bg-[#0a0a0a] border border-zinc-800 rounded-t-xl sm:rounded-xl overflow-hidden max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <h2 className="text-sm font-mono font-bold text-white tracking-widest">CHECKOUT</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-5 max-h-[70vh] overflow-y-auto">
          {error ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <p className="text-red-400 text-sm font-mono mb-4">{error}</p>
              <button onClick={() => setError(null)} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition-colors text-xs font-mono tracking-wider">
                RETRY
              </button>
            </div>
          ) : !stripePromise ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <p className="text-red-400 text-sm font-mono">Payment system is not configured.</p>
            </div>
          ) : (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
              <EmbeddedCheckout className="stripe-checkout" />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──
export default function ShopPage() {
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [stock, setStock] = useState<Record<string, number>>({})

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch('/api/stock')
        const data = await res.json()
        if (data.stock) setStock(data.stock)
      } catch (error) {
        console.error('Error fetching stock:', error)
      }
    }
    fetchStock()
    const interval = setInterval(fetchStock, 30000)
    return () => clearInterval(interval)
  }, [])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item))
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-[#030303] text-white noise scanline">
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <ParticleBackground />
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Products onAddToCart={addToCart} stock={stock} />
        <ScriptFeatures />
        <SupportedGames />
        <FAQ />
      </main>
      <Footer />
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true) }}
      />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} cart={cart} />
    </div>
  )
}
