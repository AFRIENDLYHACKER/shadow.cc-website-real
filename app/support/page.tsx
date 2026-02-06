import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support | Shadow.CC',
  description: 'Get help with Shadow.CC products. Contact our support team via email or phone.',
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">Shadow.CC</span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-red-500 transition-colors">Shop</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/50 rounded-full px-4 py-2 mb-6">
              <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-red-400 text-sm font-medium">Support Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
              Need Help?
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto text-pretty">
              Our support team is here to help you with any issues, questions, or concerns about your Shadow.CC products.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Email Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center text-center hover:border-red-900/50 transition-colors">
              <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Email Support</h2>
              <p className="text-gray-400 text-sm mb-5">
                Send us an email and we will get back to you as soon as possible.
              </p>
              <a
                href="mailto:support@shadowcc.shop"
                className="text-red-400 hover:text-red-300 font-medium text-lg transition-colors break-all"
              >
                support@shadowcc.shop
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center text-center hover:border-red-900/50 transition-colors">
              <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Phone Support</h2>
              <p className="text-gray-400 text-sm mb-5">
                Call us directly for immediate assistance with your issue.
              </p>
              <a
                href="tel:+18102432985"
                className="text-red-400 hover:text-red-300 font-medium text-lg transition-colors"
              >
                (810) 243-2985
              </a>
            </div>
          </div>

          {/* Common Issues */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Common Issues</h2>
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-6">
                <h3 className="text-white font-semibold mb-2">I did not receive my key after payment</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  If you completed payment but did not receive your key, please email us at{' '}
                  <a href="mailto:support@shadowcc.shop" className="text-red-400 hover:text-red-300">support@shadowcc.shop</a>{' '}
                  with your payment confirmation or Stripe receipt. We will get your key to you right away.
                </p>
              </div>
              <div className="border-b border-zinc-800 pb-6">
                <h3 className="text-white font-semibold mb-2">My key is not working</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Make sure you are copying the full key without extra spaces. If it still does not work, contact us with your key and we will investigate.
                </p>
              </div>
              <div className="border-b border-zinc-800 pb-6">
                <h3 className="text-white font-semibold mb-2">I need a refund</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Reach out to us via email or phone with your payment details and reason for the refund. We handle refund requests on a case-by-case basis.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">I have a different question</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  No problem! Reach out to us through any of the contact methods above and we will be happy to help.
                </p>
              </div>
            </div>
          </div>

          {/* Back to Shop */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Shop
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-red-900/30">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">Shadow.CC</span>
          </Link>
          <p className="text-gray-500 text-sm">{"© 2026 Shadow.CC. All rights reserved."}</p>
          <div className="flex items-center gap-4">
            <a href="mailto:support@shadowcc.shop" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
              support@shadowcc.shop
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
