import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { sendAdminOrderNotification } from '@/lib/email'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json({ status: 'invalid' }, { status: 400 })
    }

    const raw = await redis.get<string>(`order:${orderId}`)

    if (!raw) {
      return NextResponse.json({ status: 'expired' }, { status: 404 })
    }

    const order = typeof raw === 'string' ? JSON.parse(raw) : raw

    if (order.status === 'confirmed') {
      return NextResponse.json({ status: 'already' })
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

    return NextResponse.json({ status: 'confirmed' })
  } catch (error) {
    console.error('Error confirming order:', error)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
