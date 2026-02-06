'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface ClaimedKey {
  productId: string
  key: string
}

const productNames: Record<string, string> = {
  'shadow-weekly': 'Weekly Key',
  'shadow-monthly': 'Monthly Key',
  'shadow-lifetime': 'Lifetime Key',
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [claimedKeys, setClaimedKeys] = useState<ClaimedKey[]>([])
  const [customerEmail, setCustomerEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      setErrorMessage('No session ID found')
      return
    }

    // Claim key from the keys.txt file
    fetch('/api/claim-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error && !data.keys) {
          setStatus('error')
          setErrorMessage(data.error)
        } else if (data.keys && data.keys.length > 0) {
          setStatus('success')
          setClaimedKeys(data.keys)
          setCustomerEmail(data.email || '')
        } else if (data.key) {
          // Key was already claimed for this session
          setStatus('success')
          setClaimedKeys([{ productId: 'unknown', key: data.key }])
        } else {
          setStatus('error')
          setErrorMessage('Failed to retrieve your license key')
        }
      })
      .catch(err => {
        console.error('Error claiming key:', err)
        setStatus('error')
        setErrorMessage('Something went wrong. Please contact support.')
      })
  }, [sessionId])

  const copyToClipboard = (key: string, index: number) => {
    navigator.clipboard.writeText(key)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Processing your payment and retrieving your key...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Something Went Wrong</h1>
          <p className="text-gray-400 mb-6">{errorMessage || 'Please contact support with your payment confirmation.'}</p>
          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              Return to Shop
            </Link>
            <Link
              href="/support"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-gray-400">Thank you for your purchase</p>
          {customerEmail && (
            <p className="text-gray-500 text-sm mt-1">Receipt sent to {customerEmail}</p>
          )}
        </div>

        {/* Display all claimed keys */}
        {claimedKeys.map((claimed, index) => (
          <div key={index} className="bg-black border border-zinc-700 rounded-xl p-6 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm font-medium">
                {productNames[claimed.productId] || 'LICENSE KEY'} #{index + 1}
              </span>
              <span className="bg-red-600/20 text-red-400 text-xs px-2 py-1 rounded">SAVE THIS</span>
            </div>
            <div className="flex items-center gap-3">
              <code className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-lg font-mono text-white tracking-wider overflow-x-auto">
                {claimed.key}
              </code>
              <button
                onClick={() => copyToClipboard(claimed.key, index)}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-lg p-3 transition-colors flex-shrink-0"
                title="Copy to clipboard"
              >
                {copiedIndex === index ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}

        <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to Redeem
          </h3>
          <ol className="text-gray-400 text-sm space-y-2 list-decimal list-inside">
            <li>Open your executor and load the script</li>
            <li>When prompted, paste your license key</li>
            <li>Click verify and enjoy the features</li>
          </ol>
        </div>

        <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-6">
          <p className="text-red-400 text-sm flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>
              <strong>Important:</strong> Save your license key now! This key is tied to your HWID and cannot be recovered if lost.
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
          >
            Back to Shop
          </Link>
          <a
            href="https://discord.gg/shadow"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
          >
            Join Discord
          </a>
        </div>
      </div>
    </div>
  )
}
