import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Shadow.CC',
  description: 'Terms of Service and policies for Shadow.CC digital services.',
}

const sections = [
  {
    title: '1. ACCEPTANCE OF TERMS',
    content: 'By accessing or using Shadow.CC services, you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not use our services. We reserve the right to update these terms at any time.',
  },
  {
    title: '2. SERVICES OFFERED',
    content: 'Shadow.CC provides digital services including but not limited to: Roblox script licenses, custom website development, Discord bot development, AI solutions, and security software. All services are delivered digitally.',
  },
  {
    title: '3. PURCHASES & PAYMENTS',
    content: 'All payments are processed securely through Stripe. Prices are listed in USD. For script keys, delivery is instant after payment. For custom services (websites, bots, AI), work begins after order confirmation and project discussion. Promotional codes may be available and are subject to specific terms.',
  },
  {
    title: '4. LICENSE KEYS',
    content: 'Script license keys are non-transferable and bound to the purchasing account. Weekly keys expire 7 days after activation. Monthly keys expire 30 days after activation. Lifetime keys remain valid indefinitely as long as the service is operational. Sharing or reselling keys is strictly prohibited and will result in immediate revocation without refund.',
  },
  {
    title: '5. REFUND POLICY',
    content: 'We offer refunds within 24 hours of purchase if the product is not working as described. For custom services, refunds are handled on a case-by-case basis and must be requested before work begins. Refund requests should be sent to support@shadowcc.shop with your payment details.',
  },
  {
    title: '6. CUSTOM SERVICES',
    content: 'Custom services (websites, Discord bots, AI solutions) require a confirmed order and project discussion before work begins. Delivery timelines vary based on project complexity. You retain ownership of the final deliverable. We retain the right to showcase completed projects in our portfolio unless otherwise agreed.',
  },
  {
    title: '7. PROHIBITED USE',
    content: 'You may not use our services for any illegal activity, harassment, fraud, or to violate the terms of service of any third-party platform. We reserve the right to refuse service and revoke access without refund for violations.',
  },
  {
    title: '8. LIMITATION OF LIABILITY',
    content: 'Shadow.CC provides services "as is" without warranties of any kind. We are not responsible for any damages resulting from the use of our services, including but not limited to account bans on third-party platforms, data loss, or service interruptions. Maximum liability is limited to the amount paid for the specific service.',
  },
  {
    title: '9. PRIVACY',
    content: 'We collect only the information necessary to provide our services: email address, Discord username, and payment information (processed by Stripe). We do not sell or share your data with third parties. Payment information is handled entirely by Stripe and never stored on our servers.',
  },
  {
    title: '10. CONTACT',
    content: 'For questions about these terms, contact us at support@shadowcc.shop or join our Discord server. We aim to respond within 24 hours.',
  },
]

export default function TermsPage() {
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
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">{'// LEGAL'}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3 text-balance">
              Terms of Service
            </h1>
            <p className="text-zinc-500 text-sm font-mono max-w-lg mx-auto">
              Last updated: February 9, 2026
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-5 sm:p-6">
                <h2 className="text-xs font-mono font-bold text-red-400 tracking-widest mb-3">{section.title}</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

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
