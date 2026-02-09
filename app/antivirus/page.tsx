import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Antivirus - Shadow.CC',
  description: 'Android and PC antivirus software. Currently in development.',
}

export default function AntivirusPage() {
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

      <main className="relative z-10 pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-red-400 font-mono text-xs tracking-wider mb-6 transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              BACK TO ALL SERVICES
            </Link>

            <div className="inline-flex items-center gap-2 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-6 bg-yellow-500/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
              </span>
              <span className="text-yellow-400 text-xs font-mono tracking-widest">IN DEVELOPMENT</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight text-balance">
              ANTIVIRUS<br /><span className="text-red-500 glow-red-text">SOFTWARE</span>
            </h1>
            <p className="text-sm sm:text-lg text-zinc-500 max-w-xl mx-auto font-mono leading-relaxed mb-10">
              Enterprise-grade security for Android and PC. Real-time protection against malware, phishing, and threats.
            </p>
          </div>

          {/* Products in development */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
            {/* Android */}
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-mono font-bold text-white tracking-wide">ANDROID</h3>
                  <span className="text-[10px] font-mono text-yellow-400/70 tracking-widest">COMING SOON</span>
                </div>
              </div>
              <ul className="space-y-2.5">
                {['Real-Time Scanning', 'Phishing Protection', 'App Permission Monitor', 'Battery Optimized', 'Privacy Shield', 'WiFi Security'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-zinc-400">
                    <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* PC */}
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-mono font-bold text-white tracking-wide">PC</h3>
                  <span className="text-[10px] font-mono text-yellow-400/70 tracking-widest">COMING SOON</span>
                </div>
              </div>
              <ul className="space-y-2.5">
                {['Real-Time Protection', 'Firewall Manager', 'Zero-Day Detection', 'Ransomware Shield', 'System Optimizer', 'Browser Protection'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-zinc-400">
                    <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Notify CTA */}
          <div className="text-center">
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-8 max-w-lg mx-auto">
              <div className="w-14 h-14 border border-red-600/30 bg-red-600/5 rounded-lg flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-lg font-mono font-bold text-white tracking-wide mb-2">GET NOTIFIED</h3>
              <p className="text-zinc-500 text-sm font-mono mb-5">Join our Discord to be the first to know when our antivirus software launches.</p>
              <a
                href="https://discord.gg/Kezxm2TyGY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-mono font-semibold py-3 px-6 rounded-md text-sm tracking-wider glow-red transition-all"
              >
                JOIN DISCORD
              </a>
            </div>
          </div>
        </div>
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
