import { NextResponse } from 'next/server'
import { sendServiceOrderConfirmation, sendAdminOrderNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, discord, details, serviceName, tierName, tierPrice } = body

    if (!name || !email || !details || !serviceName || !tierName || !tierPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log('[v0] Submitting order:', { name, email, serviceName, tierName, tierPrice })

    // Send both emails - don't let one failure block the other
    const [customerResult, adminResult] = await Promise.allSettled([
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

    const customerOk = customerResult.status === 'fulfilled' && customerResult.value.success
    const adminOk = adminResult.status === 'fulfilled' && adminResult.value.success

    console.log('[v0] Email results - customer:', customerOk, 'admin:', adminOk)

    if (customerResult.status === 'rejected') {
      console.error('[v0] Customer email rejected:', customerResult.reason)
    }
    if (adminResult.status === 'rejected') {
      console.error('[v0] Admin email rejected:', adminResult.reason)
    }

    // As long as at least one email worked, call it a success
    if (!customerOk && !adminOk) {
      return NextResponse.json(
        { error: 'Failed to send emails. Your order has been noted. Please contact support.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully',
      emailSent: customerOk,
      adminNotified: adminOk,
    })
  } catch (error) {
    console.error('[v0] Error submitting order:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please contact support.' },
      { status: 500 }
    )
  }
}
