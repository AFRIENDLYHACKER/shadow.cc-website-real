import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { sendAdminOrderNotification } from '@/lib/email'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

function getSiteUrl(request: Request): string {
  // Use configured site URL, fall back to request origin
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  const url = new URL(request.url)
  return url.origin
}

export async function GET(request: Request) {
  const base = getSiteUrl(request)

  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')

    if (!orderId) {
      return NextResponse.redirect(`${base}/confirm-order?status=invalid`)
    }

    const raw = await redis.get<string>(`order:${orderId}`)

    if (!raw) {
      return NextResponse.redirect(`${base}/confirm-order?status=expired`)
    }

    const order = typeof raw === 'string' ? JSON.parse(raw) : raw

    if (order.status === 'confirmed') {
      return NextResponse.redirect(`${base}/confirm-order?status=already`)
    }

    // Mark as confirmed
    order.status = 'confirmed'
    order.confirmedAt = new Date().toISOString()
    await redis.set(`order:${orderId}`, JSON.stringify(order), { ex: 60 * 60 * 24 * 30 })

    // NOW send the admin notification
    await sendAdminOrderNotification({
      customerName: order.name,
      customerEmail: order.email,
      serviceName: order.serviceName,
      tierName: order.tierName,
      tierPrice: order.tierPrice,
      discord: order.discord,
      details: order.details,
    })

    return NextResponse.redirect(`${base}/confirm-order?status=confirmed`)
  } catch (error) {
    console.error('Error confirming order:', error)
    return NextResponse.redirect(`${base}/confirm-order?status=error`)
  }
}
