import { NextResponse } from 'next/server'
import { sendServiceOrderConfirmation, sendAdminOrderNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, discord, details, serviceName, tierName, tierPrice } = body

    if (!name || !email || !details || !serviceName || !tierName || !tierPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Send both emails in parallel
    const [customerResult, adminResult] = await Promise.all([
      sendServiceOrderConfirmation({
        customerEmail: email,
        customerName: name,
        serviceName,
        tierName,
        tierPrice,
        discord,
        details,
      }),
      sendAdminOrderNotification({
        customerName: name,
        customerEmail: email,
        serviceName,
        tierName,
        tierPrice,
        discord,
        details,
      }),
    ])

    if (!customerResult.success && !adminResult.success) {
      return NextResponse.json(
        { error: 'Failed to send emails. Your order has been noted. Please contact support.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully',
      emailSent: customerResult.success,
    })
  } catch (error) {
    console.error('Error submitting order:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please contact support.' },
      { status: 500 }
    )
  }
}
