import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Status - Shadow.CC',
  description: 'Real-time service status for all Shadow.CC products and services.',
}

const services = [
  { name: 'Roblox Script Hub', status: 'operational' as const, uptime: '99.98%', lastIncident: 'None' },
  { name: 'Key Delivery System', status: 'operational' as const, uptime: '99.99%', lastIncident: 'None' },
  { name: 'Payment Processing (Stripe)', status: 'operational' as const, uptime: '99.99%', lastIncident: 'None' },
  { name: 'Website Builder Services', status: 'operational' as const, uptime: '100%', lastIncident: 'None' },
  { name: 'Discord Bot Hosting', status: 'operational' as const, uptime: '99.95%', lastIncident: 'Jan 28, 2026' },
  { name: 'AI Solutions API', status: 'operational' as const, uptime: '99.97%', lastIncident: 'None' },
  { name: 'Email Notifications', status: 'operational' as const, uptime: '99.90%', lastIncident: 'Feb 5, 2026' },
  { name: 'Android Antivirus', status: 'development' as const, uptime: 'N/A', lastIncident: 'N/A' },
  { name: 'PC Antivirus', status: 'development' as const, uptime: 'N/A', lastIncident: 'N/A' },
]

const statusConfig = {
  operational: { label: 'OPERATIONAL', color: 'bg-green-500', textColor: 'text-green-400', borderColor: 'border-green-500/30', bgColor: 'bg-green-500/10' },
  degraded: { label: 'DEGRADED', color: 'bg-yellow-500', textColor: 'text-yellow-400', borderColor: 'border-yellow-500/30', bgColor: 'bg-yellow-500/10' },
  outage: { label: 'OUTAGE', color: 'bg-red-500', textColor: 'text-red-400', borderColor: 'border-red-500/30', bgColor: 'bg-red-500/10' },
  maintenance: { label: 'MAINTENANCE', color: 'bg-blue-500', textColor: 'text-blue-400', borderColor: 'border-blue-500/30', bgColor: 'bg-blue-500/10' },
  development: { label: 'IN DEVELOPMENT', color: 'bg-zinc-500', textColor: 'text-zinc-400', borderColor: 'border-zinc-500/30', bgColor: 'bg-zinc-500/10' },
}

export default function StatusPage() {
  const allOperational = services.filter(s => s.status !== 'development').every(s => s.status === 'operational')

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
            <Link href="/support" className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-all font-mono tracking-wide">SUPPORT</Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">{'// SYSTEM STATUS'}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3 text-balance">
              Service Status
            </h1>
            <p className="text-zinc-500 text-sm font-mono max-w-lg mx-auto">
              Real-time status of all Shadow.CC services and infrastructure.
            </p>
          </div>

          {/* Overall Status */}
          <div className={`border rounded-lg p-5 sm:p-6 mb-6 ${allOperational ? 'border-green-500/30 bg-green-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${allOperational ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
              <span className={`text-sm font-mono font-bold tracking-wider ${allOperational ? 'text-green-400' : 'text-yellow-400'}`}>
                {allOperational ? 'ALL SYSTEMS OPERATIONAL' : 'SOME SYSTEMS DEGRADED'}
              </span>
            </div>
            <p className="text-zinc-500 text-xs font-mono mt-2 ml-6">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Services List */}
          <div className="space-y-2">
            {services.map((service, i) => {
              const config = statusConfig[service.status]
              return (
                <div key={i} className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${config.color}`} />
                    <span className="text-white text-sm font-mono truncate">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4 ml-5 sm:ml-0">
                    {service.uptime !== 'N/A' && (
                      <span className="text-zinc-600 text-[10px] font-mono tracking-wider">{service.uptime} UPTIME</span>
                    )}
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border tracking-widest ${config.textColor} ${config.borderColor} ${config.bgColor}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Incident History */}
          <div className="mt-10 sm:mt-14">
            <h2 className="text-sm font-mono font-bold text-white tracking-widest mb-5">RECENT INCIDENTS</h2>
            <div className="space-y-3">
              {[
                { date: 'Feb 5, 2026', title: 'Email Delivery Delay', desc: 'Confirmation emails experienced a 15-minute delay due to provider rate limits. Resolved.', severity: 'minor' },
                { date: 'Jan 28, 2026', title: 'Discord Bot Restart', desc: 'Scheduled maintenance caused a 3-minute downtime for hosted Discord bots. All bots recovered automatically.', severity: 'minor' },
              ].map((incident, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono text-zinc-600 tracking-widest">{incident.date.toUpperCase()}</span>
                    <span className="text-[10px] font-mono font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 px-2 py-0.5 rounded tracking-widest">
                      {incident.severity.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-sm font-mono font-bold text-white tracking-wide mb-1">{incident.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{incident.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Back */}
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
        </div>
      </footer>
    </div>
  )
}
