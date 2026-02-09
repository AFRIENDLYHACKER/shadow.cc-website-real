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
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-5" />
          <p className="text-zinc-500 text-xs font-mono tracking-wider">PROCESSING PAYMENT...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4 py-8">
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-6 sm:p-8 max-w-md w-full text-center">
          <div className="w-12 h-12 border border-red-600/30 bg-red-600/5 rounded-md flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-lg font-mono font-bold text-white mb-2 tracking-wide">ERROR</h1>
          <p className="text-zinc-500 text-sm font-mono mb-6">{errorMessage || 'Please contact support with your payment confirmation.'}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1 border border-zinc-700 hover:border-zinc-500 bg-white/[0.02] hover:bg-white/[0.05] text-zinc-300 font-mono font-semibold py-3 px-6 rounded-md transition-all text-center text-xs tracking-wider">
              RETURN TO SHOP
            </Link>
            <Link href="/support" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-mono font-semibold py-3 px-6 rounded-md transition-all text-center text-xs tracking-wider glow-red">
              CONTACT SUPPORT
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4 py-8">
      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-5 sm:p-8 max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-green-500/30 bg-green-500/5 rounded-md flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide mb-1">PAYMENT SUCCESSFUL</h1>
          <p className="text-zinc-500 text-xs font-mono">Thank you for your purchase</p>
          {customerEmail && (
            <p className="text-zinc-600 text-[10px] font-mono mt-1 tracking-wider">Receipt sent to {customerEmail}</p>
          )}
        </div>

        {/* Keys */}
        {claimedKeys.map((claimed, index) => (
          <div key={index} className="bg-black border border-zinc-800 rounded-lg p-4 sm:p-5 mb-3">
            <div className="flex items-center justify-between mb-3 gap-2">
              <span className="text-zinc-500 text-xs font-mono tracking-wider">
                {(productNames[claimed.productId] || 'LICENSE KEY').toUpperCase()} #{index + 1}
              </span>
              <span className="bg-red-600/10 border border-red-600/30 text-red-400 text-[10px] font-mono px-2 py-0.5 rounded tracking-widest">SAVE THIS</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-[#0a0a0a] border border-zinc-800 rounded-md px-3 py-2.5 text-sm font-mono text-white tracking-wider overflow-x-auto break-all min-w-0">
                {claimed.key}
              </code>
              <button
                onClick={() => copyToClipboard(claimed.key, index)}
                className="border border-zinc-800 hover:border-zinc-600 bg-[#0a0a0a] rounded-md p-2.5 transition-colors flex-shrink-0"
                title="Copy to clipboard"
              >
                {copiedIndex === index ? (
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}

        {/* How to Redeem */}
        <div className="bg-black border border-zinc-800 rounded-lg p-4 mb-3">
          <h3 className="text-xs font-mono font-bold text-white tracking-widest mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            HOW TO REDEEM
          </h3>
          <ol className="text-zinc-500 text-xs font-mono space-y-1.5 list-decimal list-inside">
            <li>Open your executor and load the script</li>
            <li>When prompted, paste your license key</li>
            <li>Click verify and enjoy the features</li>
          </ol>
        </div>

        {/* Warning */}
        <div className="bg-red-600/5 border border-red-600/20 rounded-lg p-4 mb-6">
          <p className="text-red-400/80 text-xs font-mono flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Save your license key now. This key is tied to your HWID and cannot be recovered if lost.</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1 border border-zinc-700 hover:border-zinc-500 bg-white/[0.02] hover:bg-white/[0.05] text-zinc-300 font-mono font-semibold py-3 px-6 rounded-md transition-all text-center text-xs tracking-wider">
            BACK TO SHOP
          </Link>
          <a href="https://discord.gg/shadow" target="_blank" rel="noopener noreferrer" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-mono font-semibold py-3 px-6 rounded-md transition-all text-center text-xs tracking-wider glow-red">
            JOIN DISCORD
          </a>
        </div>
      </div>
    </div>
  )
}
