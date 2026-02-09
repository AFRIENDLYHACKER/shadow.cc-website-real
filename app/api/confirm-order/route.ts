import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { sendAdminOrderNotification } from '@/lib/email'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')

    if (!orderId) {
      return NextResponse.redirect(new URL('/confirm-order?status=invalid', request.url))
    }

    const raw = await redis.get<string>(`order:${orderId}`)

    if (!raw) {
      return NextResponse.redirect(new URL('/confirm-order?status=expired', request.url))
    }

    const order = typeof raw === 'string' ? JSON.parse(raw) : raw

    if (order.status === 'confirmed') {
      return NextResponse.redirect(new URL('/confirm-order?status=already', request.url))
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

    return NextResponse.redirect(new URL('/confirm-order?status=confirmed', request.url))
  } catch (error) {
    console.error('Error confirming order:', error)
    return NextResponse.redirect(new URL('/confirm-order?status=error', request.url))
  }
}
