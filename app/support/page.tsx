import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support - Shadow.CC',
  description: 'Get help with your Shadow.CC purchase or account.',
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/90 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 border border-red-600/60 rounded-md flex items-center justify-center bg-red-600/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wider group-hover:text-red-500 transition-colors">SHADOW<span className="text-red-500">.</span>CC</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/" className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-all font-mono tracking-wide">SHOP</Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// SUPPORT</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3 text-balance">
              Need Help?
            </h1>
            <p className="text-zinc-500 text-sm font-mono max-w-lg mx-auto">
              We are here to help. Reach out through any of the channels below.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-14">
            {/* Email */}
            <a href="mailto:support@shadowcc.shop" className="group bg-[#0a0a0a] border border-zinc-800 hover:border-red-900/40 rounded-lg p-5 sm:p-6 transition-all">
              <div className="w-10 h-10 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center mb-4 group-hover:bg-red-600/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-mono font-bold text-white tracking-wide mb-1">EMAIL</h3>
              <p className="text-red-400 text-sm font-mono">support@shadowcc.shop</p>
              <p className="text-zinc-600 text-xs font-mono mt-2">Response within 24 hours</p>
            </a>

            {/* Phone */}
            <a href="tel:+18102432985" className="group bg-[#0a0a0a] border border-zinc-800 hover:border-red-900/40 rounded-lg p-5 sm:p-6 transition-all">
              <div className="w-10 h-10 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center mb-4 group-hover:bg-red-600/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-sm font-mono font-bold text-white tracking-wide mb-1">PHONE</h3>
              <p className="text-red-400 text-sm font-mono">(810) 243-2985</p>
              <p className="text-zinc-600 text-xs font-mono mt-2">Available during business hours</p>
            </a>

            {/* Discord */}
            <a href="https://discord.gg/Kezxm2TyGY" target="_blank" rel="noopener noreferrer" className="group bg-[#0a0a0a] border border-zinc-800 hover:border-red-900/40 rounded-lg p-5 sm:p-6 transition-all">
              <div className="w-10 h-10 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center mb-4 group-hover:bg-red-600/10 transition-colors">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <h3 className="text-sm font-mono font-bold text-white tracking-wide mb-1">DISCORD</h3>
              <p className="text-red-400 text-sm font-mono">Join our server</p>
              <p className="text-zinc-600 text-xs font-mono mt-2">Fastest response time</p>
            </a>

            {/* Hours */}
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-5 sm:p-6">
              <div className="w-10 h-10 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-mono font-bold text-white tracking-wide mb-1">HOURS</h3>
              <p className="text-zinc-400 text-sm font-mono">Mon - Fri: 9AM - 9PM EST</p>
              <p className="text-zinc-600 text-xs font-mono mt-2">Weekends: Limited</p>
            </div>
          </div>

          {/* Common Issues */}
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-5 sm:p-7">
            <h2 className="text-sm font-mono font-bold text-white tracking-widest mb-6">COMMON ISSUES</h2>
            <div className="space-y-5">
              {[
                { q: 'I did not receive my key after payment', a: 'Check your email (including spam folder). If you still cannot find it, contact us with your payment confirmation and we will resend it immediately.' },
                { q: 'My key is not working', a: 'Make sure you are using the correct executor and that it is up to date. If the issue persists, reach out to support with your key and a screenshot of the error.' },
                { q: 'I want a refund', a: 'We offer refunds within 24 hours of purchase if the product is not working as described. Contact us with your payment details to request a refund.' },
              ].map((item, i) => (
                <div key={i} className="border-b border-zinc-800/50 last:border-0 pb-5 last:pb-0">
                  <h3 className="text-white text-sm font-mono font-medium mb-2">{item.q}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Back to Shop */}
          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 bg-white/[0.02] hover:bg-white/[0.05] text-zinc-300 font-mono font-semibold py-3 px-8 rounded-md transition-all text-sm tracking-wider"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              BACK TO SHOP
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 sm:py-10 px-4 sm:px-6 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 sm:gap-5 md:flex-row md:justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 border border-red-600/40 rounded-md flex items-center justify-center bg-red-600/5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-mono font-bold text-zinc-400 tracking-wider group-hover:text-white transition-colors">SHADOW<span className="text-red-500">.</span>CC</span>
          </Link>
          <p className="text-zinc-700 text-[10px] font-mono tracking-wider">2026 SHADOW.CC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono tracking-wider">SHOP</Link>
            <a href="https://discord.gg/shadow" className="text-zinc-600 hover:text-white transition-colors" aria-label="Discord">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
