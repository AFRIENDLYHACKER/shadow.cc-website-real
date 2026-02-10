'use client'

import { useState, useCallback } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import Link from 'next/link'

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null

export interface ServiceTier {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
}

export interface ServicePageProps {
  title: string
  subtitle: string
  description: string
  icon: string
  tiers: ServiceTier[]
  features: { title: string; desc: string; icon: string }[]
  processSteps: string[]
}

export default function ServicePage({ title, subtitle, description, icon, tiers, features, processSteps }: ServicePageProps) {
  const [selectedTier, setSelectedTier] = useState<ServiceTier | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discord: '',
    details: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTier) return

    setSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          discord: formData.discord,
          details: formData.details,
          serviceName: title,
          tierName: selectedTier.name,
          tierPrice: selectedTier.price,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setSubmitError('Network error. Please try again or contact support.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white noise scanline">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/90 backdrop-blur-xl border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 border border-red-600/60 rounded-md flex items-center justify-center bg-red-600/10 group-hover:bg-red-600/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wider group-hover:text-red-500 transition-colors">SHADOW<span className="text-red-500">.</span>CC</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-all font-mono tracking-wide">HOME</Link>
            <Link href="/support" className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-all font-mono tracking-wide">SUPPORT</Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-6">
          <div className="absolute top-24 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
          <div className="max-w-5xl mx-auto text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-red-400 font-mono text-xs tracking-wider mb-6 transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              BACK TO ALL SERVICES
            </Link>
            <div className="inline-flex items-center justify-center w-16 h-16 border border-red-600/30 bg-red-600/5 rounded-lg mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
            </div>
            <span className="block text-[10px] font-mono text-red-500/60 tracking-[0.3em] mb-3">{subtitle}</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight text-balance">{title}</h1>
            <p className="text-sm sm:text-lg text-zinc-500 max-w-2xl mx-auto font-mono leading-relaxed">{description}</p>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 sm:px-6 py-10 sm:py-14 border-y border-red-900/15">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em]">// PROCESS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {processSteps.map((step, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-5 text-center">
                  <div className="text-3xl font-mono font-bold text-red-600/20 mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <p className="text-xs font-mono text-zinc-400 tracking-wide">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// WHAT YOU GET</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Features Included</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-zinc-800 hover:border-red-900/40 rounded-lg p-5 transition-all group">
                  <div className="w-10 h-10 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center mb-4 group-hover:bg-red-600/10 transition-colors">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} /></svg>
                  </div>
                  <h3 className="text-sm font-mono font-bold text-white tracking-wide mb-1.5">{f.title.toUpperCase()}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing & Contact Form */}
        <section id="order" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-red-900/15 relative">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// ORDER</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Get Started</h2>
              <p className="text-zinc-500 text-sm font-mono mt-3">Select a tier, then provide your project details. We will reach out within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="bg-[#0a0a0a] border border-green-500/30 rounded-lg p-8 text-center max-w-lg mx-auto">
                <div className="w-14 h-14 border border-green-500/30 bg-green-500/5 rounded-md flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-mono font-bold text-white tracking-wide mb-2">CHECK YOUR EMAIL</h3>
                <p className="text-zinc-500 text-sm font-mono mb-2">We sent a confirmation email to <strong className="text-white">{formData.email}</strong></p>
                <p className="text-yellow-500/80 text-xs font-mono mb-6">You must click the CONFIRM ORDER button in the email to finalize your order.</p>
                <Link href="/" className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 bg-white/[0.02] text-zinc-300 font-mono font-semibold py-3 px-6 rounded-md text-xs tracking-wider transition-all">
                  BACK TO HOME
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tier Selection */}
                <div>
                  <h3 className="text-sm font-mono font-bold text-white tracking-widest mb-4">SELECT A TIER</h3>
                  <div className="space-y-3">
                    {tiers.map((tier, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedTier(tier)}
                        className={`w-full text-left bg-[#0a0a0a] border rounded-lg p-5 transition-all ${
                          selectedTier?.name === tier.name
                            ? 'border-red-600/50 bg-red-600/5'
                            : 'border-zinc-800 hover:border-red-900/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-mono font-bold text-sm">{tier.name}</span>
                          <div className="flex items-center gap-2">
                            {tier.popular && <span className="text-[10px] font-mono font-bold text-red-400 bg-red-600/10 border border-red-600/30 px-2 py-0.5 rounded tracking-widest">POPULAR</span>}
                            <span className="text-red-500 font-mono font-bold">{tier.price}</span>
                          </div>
                        </div>
                        <p className="text-zinc-500 text-xs mb-3">{tier.description}</p>
                        <ul className="space-y-1">
                          {tier.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-2 text-xs text-zinc-400">
                              <svg className="w-3 h-3 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h3 className="text-sm font-mono font-bold text-white tracking-widest mb-4">YOUR DETAILS</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 tracking-widest mb-1.5">NAME *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-red-600/50 rounded-md px-4 py-3 text-sm font-mono text-white outline-none transition-colors placeholder:text-zinc-700"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 tracking-widest mb-1.5">EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-red-600/50 rounded-md px-4 py-3 text-sm font-mono text-white outline-none transition-colors placeholder:text-zinc-700"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 tracking-widest mb-1.5">DISCORD</label>
                      <input
                        type="text"
                        value={formData.discord}
                        onChange={e => setFormData(prev => ({ ...prev, discord: e.target.value }))}
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-red-600/50 rounded-md px-4 py-3 text-sm font-mono text-white outline-none transition-colors placeholder:text-zinc-700"
                        placeholder="username#0000"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 tracking-widest mb-1.5">PROJECT DETAILS *</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.details}
                        onChange={e => setFormData(prev => ({ ...prev, details: e.target.value }))}
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-red-600/50 rounded-md px-4 py-3 text-sm font-mono text-white outline-none transition-colors resize-none placeholder:text-zinc-700"
                        placeholder="Describe what you need built..."
                      />
                    </div>
                    {submitError && (
                      <div className="bg-red-600/5 border border-red-600/20 rounded-md p-3">
                        <p className="text-red-400 text-xs font-mono">{submitError}</p>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={!selectedTier || submitting}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-md font-mono text-sm font-semibold tracking-wider transition-all ${
                        selectedTier && !submitting
                          ? 'bg-red-600 hover:bg-red-700 text-white glow-red'
                          : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                      }`}
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          SUBMITTING...
                        </>
                      ) : selectedTier ? (
                        `SUBMIT ORDER - ${selectedTier.price}`
                      ) : (
                        'SELECT A TIER FIRST'
                      )}
                    </button>
                    <p className="text-[10px] font-mono text-zinc-600 text-center tracking-wider">
                      Payment will be arranged after we discuss your project. A confirmation email will be sent.
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 sm:py-10 px-4 sm:px-6 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 border border-red-600/40 rounded-md flex items-center justify-center bg-red-600/5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-sm font-mono font-bold text-zinc-400 tracking-wider group-hover:text-white transition-colors">SHADOW<span className="text-red-500">.</span>CC</span>
          </Link>
          <p className="text-zinc-700 text-[10px] font-mono tracking-wider">2026 SHADOW.CC. ALL RIGHTS RESERVED.</p>
          <Link href="/support" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono tracking-wider">SUPPORT</Link>
        </div>
      </footer>
    </div>
  )
}
