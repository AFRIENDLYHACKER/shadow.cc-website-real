'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

const statuses: Record<string, { icon: string; title: string; desc: string; color: string }> = {
  confirming: {
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    title: 'CONFIRMING ORDER...',
    desc: 'Please wait while we confirm your order.',
    color: 'yellow',
  },
  confirmed: {
    icon: 'M5 13l4 4L19 7',
    title: 'ORDER CONFIRMED',
    desc: 'Your order has been confirmed and we have been notified. We will reach out to you within 24 hours to discuss your project.',
    color: 'green',
  },
  already: {
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'ALREADY CONFIRMED',
    desc: 'This order has already been confirmed. No action needed. We will be in touch soon.',
    color: 'yellow',
  },
  expired: {
    icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'ORDER EXPIRED',
    desc: 'This confirmation link has expired or the order was not found. Please submit a new order or contact support.',
    color: 'red',
  },
  invalid: {
    icon: 'M6 18L18 6M6 6l12 12',
    title: 'INVALID LINK',
    desc: 'This confirmation link is invalid. Please check your email for the correct link or contact support.',
    color: 'red',
  },
  error: {
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z',
    title: 'SOMETHING WENT WRONG',
    desc: 'An error occurred while confirming your order. Please try again or contact support.',
    color: 'red',
  },
}

function ConfirmOrderContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')
  const [statusKey, setStatusKey] = useState(orderId ? 'confirming' : 'invalid')

  useEffect(() => {
    if (!orderId) return

    fetch('/api/confirm-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    })
      .then(res => res.json())
      .then(data => {
        setStatusKey(data.status || 'error')
      })
      .catch(() => {
        setStatusKey('error')
      })
  }, [orderId])

  const status = statuses[statusKey] || statuses.invalid

  const borderColor = status.color === 'green' ? 'border-green-500/30' : status.color === 'yellow' ? 'border-yellow-500/30' : 'border-red-500/30'
  const bgColor = status.color === 'green' ? 'bg-green-500/5' : status.color === 'yellow' ? 'bg-yellow-500/5' : 'bg-red-500/5'
  const iconBorder = status.color === 'green' ? 'border-green-500/30' : status.color === 'yellow' ? 'border-yellow-500/30' : 'border-red-500/30'
  const iconBg = status.color === 'green' ? 'bg-green-500/5' : status.color === 'yellow' ? 'bg-yellow-500/5' : 'bg-red-500/5'
  const iconColor = status.color === 'green' ? 'text-green-500' : status.color === 'yellow' ? 'text-yellow-500' : 'text-red-500'

  return (
    <div className="min-h-screen bg-[#030303] text-white noise scanline flex items-center justify-center px-4">
      <div className={`${bgColor} border ${borderColor} rounded-lg p-8 sm:p-12 text-center max-w-md w-full`}>
        <div className={`w-16 h-16 border ${iconBorder} ${iconBg} rounded-lg flex items-center justify-center mx-auto mb-5`}>
          <svg className={`w-8 h-8 ${iconColor} ${statusKey === 'confirming' ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={status.icon} />
          </svg>
        </div>
        <h1 className="text-xl font-mono font-bold text-white tracking-wider mb-3">{status.title}</h1>
        <p className="text-zinc-400 text-sm font-mono leading-relaxed mb-8">{status.desc}</p>
        {statusKey !== 'confirming' && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-mono font-semibold py-3 px-6 rounded-md text-xs tracking-wider transition-all"
            >
              BACK TO HOME
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 bg-white/[0.02] text-zinc-300 font-mono font-semibold py-3 px-6 rounded-md text-xs tracking-wider transition-all"
            >
              CONTACT SUPPORT
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ConfirmOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center">
        <p className="text-zinc-500 font-mono text-sm animate-pulse">Loading...</p>
      </div>
    }>
      <ConfirmOrderContent />
    </Suspense>
  )
}
