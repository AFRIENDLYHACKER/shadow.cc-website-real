import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import crypto from 'crypto'
import { sendServiceOrderConfirmation } from '@/lib/email'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, discord, details, serviceName, tierName, tierPrice } = body

    if (!name || !email || !details || !serviceName || !tierName || !tierPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Generate a unique order ID
    const orderId = crypto.randomBytes(16).toString('hex')

    // Store the order as pending in Redis (expires in 7 days)
    await redis.set(
      `order:${orderId}`,
      JSON.stringify({
        name,
        email,
        discord: discord || '',
        details,
        serviceName,
        tierName,
        tierPrice,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }),
      { ex: 60 * 60 * 24 * 7 }
    )

    // Only send the customer confirmation email with a CONFIRM button
    // Admin does NOT get notified until customer clicks confirm
    const customerResult = await sendServiceOrderConfirmation({
      customerEmail: email,
      customerName: name,
      serviceName,
      tierName,
      tierPrice,
      discord,
      details,
      orderId,
    })

    if (!customerResult.success) {
      return NextResponse.json(
        { error: 'Failed to send confirmation email. Please try again or contact support.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Order submitted. Check your email to confirm.',
    })
  } catch (error) {
    console.error('Error submitting order:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please contact support.' },
      { status: 500 }
    )
  }
}
