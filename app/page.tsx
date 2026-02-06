'use client'

import { useCallback, useEffect, useState } from 'react'
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

// Particle Background Component
function ParticleBackground() {
  useEffect(() => {
    const canvas = document.getElementById('particles') as HTMLCanvasElement
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []
    const particleCount = 80

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(220, 38, 38, 0.6)'
        ctx.fill()

        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.2 * (1 - dist / 120)})`
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener('resize', resize)
  }, [])

  return <canvas id="particles" className="fixed inset-0 pointer-events-none z-0" />
}

// Header Component
function Header({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">Shadow.CC</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#products" className="text-gray-300 hover:text-red-500 transition-colors">Products</a>
          <a href="#features" className="text-gray-300 hover:text-red-500 transition-colors">Features</a>
          <a href="#faq" className="text-gray-300 hover:text-red-500 transition-colors">FAQ</a>
          <a href="/support" className="text-gray-300 hover:text-red-500 transition-colors">Support</a>
        </nav>

        <button
          onClick={onCartClick}
          className="relative bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-white font-medium">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

// Hero Section
function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/50 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-400 text-sm font-medium">Undetected & Updated Daily</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Dominate Every<br />
          <span className="text-red-500">Roblox Game</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Premium Roblox scripts with advanced features, instant delivery, and 24/7 support. Join thousands of satisfied users.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#products"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Get Started
          </a>
          <a
            href="https://discord.gg/Kezxm2TyGY"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Join Discord
          </a>
        </div>
      </div>
    </section>
  )
}

// Stats Section
function Stats() {
  return (
    <section className="py-12 px-6 border-y border-red-900/30 bg-black/50">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-red-500">10k+</div>
          <div className="text-gray-400 text-sm">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-500">99.9%</div>
          <div className="text-gray-400 text-sm">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-500">24/7</div>
          <div className="text-gray-400 text-sm">Support</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-500">50+</div>
          <div className="text-gray-400 text-sm">Games Supported</div>
        </div>
      </div>
    </section>
  )
}

// Product Card
function ProductCard({ product, onAddToCart, stock }: { product: Product; onAddToCart: (product: Product) => void; stock: number }) {
  const outOfStock = stock === 0
  
  return (
    <div className={`relative bg-black/60 backdrop-blur-sm border rounded-xl p-6 transition-all hover:scale-[1.02] group ${
      product.popular ? 'border-red-500 ring-2 ring-red-500/20' : 'border-red-900/30 hover:border-red-600/50'
    } ${outOfStock ? 'opacity-60' : ''}`}>
      {product.popular && !outOfStock && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full">
          MOST POPULAR
        </div>
      )}
      {outOfStock && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-600 text-white text-xs font-bold px-4 py-1 rounded-full">
          OUT OF STOCK
        </div>
      )}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/20 text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-red-400 font-medium">{product.duration}</p>
      </div>
      
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-white">
          ${(product.priceInCents / 100).toFixed(2)}
        </div>
        <p className="text-gray-500 text-sm mt-1">one-time payment</p>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <span className={`w-2 h-2 rounded-full ${stock > 10 ? 'bg-green-500' : stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
        <span className={`text-sm ${stock > 10 ? 'text-green-400' : stock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
          {stock > 0 ? `${stock} keys in stock` : 'Out of stock'}
        </span>
      </div>

      <p className="text-gray-400 text-sm text-center mb-6">{product.description}</p>
      
      <ul className="space-y-3 mb-6">
        {product.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      
      <button
        onClick={() => !outOfStock && onAddToCart(product)}
        disabled={outOfStock}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors ${
          outOfStock
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : product.popular
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/50'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {outOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  )
}

// Products Section
function Products({ onAddToCart, stock }: { onAddToCart: (product: Product) => void; stock: Record<string, number> }) {
  return (
    <section id="products" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Choose Your Plan</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Select the key duration that works best for you. All plans include full script access and instant delivery.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} stock={stock[product.id] || 0} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Secure Payment
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Instant Delivery
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              24/7 Support
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Script Features Section
function ScriptFeatures() {
  const features = [
    { title: 'Auto Farm', desc: 'Automatically farm resources, XP, and currency while AFK' },
    { title: 'ESP & Wallhack', desc: 'See players, items, and NPCs through walls' },
    { title: 'Speed & Fly', desc: 'Move faster and fly anywhere on the map' },
    { title: 'Teleport', desc: 'Instantly teleport to any location or player' },
    { title: 'Aimbot', desc: 'Perfect aim assistance for combat games' },
    { title: 'Anti-AFK', desc: 'Stay in game without getting kicked' },
  ]

  return (
    <section id="features" className="py-20 px-6 bg-black/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Powerful Features</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Our script includes everything you need to dominate any Roblox game.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-zinc-900/50 border border-red-900/30 rounded-xl p-6 hover:border-red-600/50 transition-colors">
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Supported Games
function SupportedGames() {
  const games = ['Blox Fruits', 'Pet Simulator X', 'Arsenal', 'Murder Mystery 2', 'Jailbreak', 'Adopt Me', 'Tower of Hell', 'King Legacy']
  
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Supported Games</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Works with 50+ popular Roblox games and counting.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {games.map((game, i) => (
            <span key={i} className="bg-zinc-900 border border-red-900/30 rounded-full px-6 py-3 text-white font-medium hover:border-red-500 transition-colors">
              {game}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Section
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
    <section id="faq" className="py-20 px-6 bg-black/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-zinc-900/50 border border-red-900/30 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-white font-medium">{faq.q}</span>
                <svg className={`w-5 h-5 text-red-500 transition-transform ${open === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-red-900/30">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">Shadow.CC</span>
        </a>
        <p className="text-gray-500 text-sm">© 2026 Shadow.CC. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="/support" className="text-gray-400 hover:text-red-500 transition-colors text-sm">Support</a>
          <a href="https://discord.gg/shadow" className="text-gray-400 hover:text-red-500 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

// Cart Sidebar
function CartSidebar({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
  onCheckout: () => void
}) {
  const total = cart.reduce((sum, item) => sum + item.product.priceInCents * item.quantity, 0)

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-red-900/30 z-50 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-red-900/30">
            <h2 className="text-xl font-bold text-white">Your Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.product.id} className="bg-black/50 border border-red-900/30 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{item.product.name}</h3>
                        <p className="text-red-400 text-sm">{item.product.duration}</p>
                      </div>
                      <button onClick={() => onRemove(item.product.id)} className="text-gray-400 hover:text-red-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-white hover:bg-zinc-700"
                        >
                          -
                        </button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-white hover:bg-zinc-700"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-white font-bold">${((item.product.priceInCents * item.quantity) / 100).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-red-900/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Total</span>
                <span className="text-2xl font-bold text-white">${(total / 100).toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-colors"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// Checkout Modal
function CheckoutModal({
  isOpen,
  onClose,
  cart,
}: {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
}) {
  const [error, setError] = useState<string | null>(null)
  
  const fetchClientSecret = useCallback(async () => {
    try {
      setError(null)
      const items = cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      }))
      const result = await startCheckoutSession(items)
      if (!result.clientSecret) {
        throw new Error('Failed to create checkout session')
      }
      return result.clientSecret
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      throw err
    }
  }, [cart])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-red-900/30 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-red-900/30">
          <h2 className="text-xl font-bold text-white">Complete Your Purchase</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {error ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={() => setError(null)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : !stripePromise ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-red-400 mb-4">Payment system is not configured. Please contact support.</p>
            </div>
          ) : (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout className="stripe-checkout" />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </div>
    </div>
  )
}

// Main Page Component
export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [stock, setStock] = useState<Record<string, number>>({})

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch('/api/stock')
        const data = await res.json()
        if (data.stock) {
          setStock(data.stock)
        }
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
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-black text-white">
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
        onCheckout={() => {
          setCartOpen(false)
          setCheckoutOpen(true)
        }}
      />
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
      />
    </div>
  )
}
