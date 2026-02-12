import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Shadow.CC',
  description: 'Privacy policy for Shadow.CC. Learn how we collect, use, and protect your personal information.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-5 sm:p-7">
      <h2 className="text-sm font-mono font-bold text-white tracking-widest mb-4">{title}</h2>
      <div className="space-y-3 text-zinc-400 text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export default function PrivacyPage() {
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
          {/* Page Header */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[10px] font-mono text-red-500/60 tracking-[0.3em] block mb-2">// LEGAL</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3 text-balance">
              Privacy Policy
            </h1>
            <p className="text-zinc-500 text-sm font-mono max-w-lg mx-auto">
              Last updated: February 12, 2026
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            <Section title="01 // INTRODUCTION">
              <p>
                Shadow.CC (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the shadowcc.shop website and related digital services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or purchase our products and services.
              </p>
              <p>
                By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of our services.
              </p>
            </Section>

            <Section title="02 // INFORMATION WE COLLECT">
              <p className="text-white font-mono text-xs tracking-wider mb-2">Personal Information</p>
              <p>
                When you make a purchase or contact support, we may collect the following:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  'Email address',
                  'Payment information (processed securely via third-party providers)',
                  'Discord username (if provided for support)',
                  'IP address and browser information',
                  'Any information you voluntarily provide via support channels',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-white font-mono text-xs tracking-wider mt-4 mb-2">Automatically Collected Information</p>
              <p>
                When you access our website, we automatically collect certain information including your device type, operating system, browser type, referring URLs, pages viewed, and access times. This data helps us improve our services and user experience.
              </p>
            </Section>

            <Section title="03 // HOW WE USE YOUR INFORMATION">
              <p>We use the collected information for the following purposes:</p>
              <ul className="space-y-2 ml-4">
                {[
                  'Process and fulfill your purchases and deliver product keys',
                  'Provide customer support and respond to inquiries',
                  'Send transactional emails related to your orders',
                  'Improve and optimize our website and services',
                  'Detect and prevent fraud or unauthorized access',
                  'Comply with legal obligations',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                We do not sell, trade, or rent your personal information to third parties for marketing purposes.
              </p>
            </Section>

            <Section title="04 // THIRD-PARTY SERVICES">
              <p>
                We may employ third-party companies and services to facilitate our operations. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  'Payment Processors: We use Stripe to securely process payments. Your payment details are handled directly by Stripe and are never stored on our servers.',
                  'Analytics: We use Vercel Analytics to understand website traffic and usage patterns. No personally identifiable information is collected through analytics.',
                  'Communication: Discord and email services are used for customer support interactions.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="05 // DATA SECURITY">
              <p>
                We take the security of your information seriously and implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p>
                However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </Section>

            <Section title="06 // COOKIES">
              <p>
                Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              <p>
                We use cookies for essential site functionality, remembering user preferences, and analytics. No cookies are used for advertising or tracking across third-party websites.
              </p>
            </Section>

            <Section title="07 // YOUR RIGHTS">
              <p>Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="space-y-2 ml-4">
                {[
                  'Access: Request a copy of the personal data we hold about you.',
                  'Correction: Request that we correct any inaccurate or incomplete data.',
                  'Deletion: Request that we delete your personal data, subject to legal obligations.',
                  'Objection: Object to the processing of your data in certain circumstances.',
                  'Portability: Request a copy of your data in a structured, machine-readable format.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                To exercise any of these rights, contact us at <a href="mailto:support@shadowcc.shop" className="text-red-400 hover:text-red-300 transition-colors">support@shadowcc.shop</a>.
              </p>
            </Section>

            <Section title="08 // CHILDREN'S PRIVACY">
              <p>
                Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child under 13 without verification of parental consent, we will take steps to remove that information.
              </p>
            </Section>

            <Section title="09 // CHANGES TO THIS POLICY">
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically to stay informed about how we protect your information.
              </p>
              <p>
                Continued use of our services after any modifications to this policy constitutes your acknowledgment and acceptance of those changes.
              </p>
            </Section>

            <Section title="10 // CONTACT US">
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us:
              </p>
              <div className="flex flex-col gap-2 mt-2">
                <a href="mailto:support@shadowcc.shop" className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors font-mono">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@shadowcc.shop
                </a>
                <a href="https://discord.gg/Kezxm2TyGY" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors font-mono">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Discord Server
                </a>
              </div>
            </Section>
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
            <Link href="/support" className="text-zinc-600 hover:text-white transition-colors text-xs font-mono tracking-wider">SUPPORT</Link>
            <a href="https://discord.gg/Kezxm2TyGY" className="text-zinc-600 hover:text-white transition-colors" aria-label="Discord">
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
