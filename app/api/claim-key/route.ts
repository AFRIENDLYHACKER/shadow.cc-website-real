import { NextResponse } from 'next/server'
import { claimKey, getStock } from '@/lib/keys'
import { stripe } from '@/lib/stripe'
import { sendKeyDeliveryEmail } from '@/lib/email'

interface CartItem {
  productId: string
  quantity: number
}

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }
    
    // Verify the Stripe session is paid
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }
    
    // Check if keys were already claimed for this session
    if (session.metadata?.keys_claimed) {
      try {
        const previousKeys = JSON.parse(session.metadata.keys_claimed)
        return NextResponse.json({ 
          success: true,
          keys: previousKeys,
          email: session.customer_details?.email,
          alreadyClaimed: true,
        })
      } catch {
        return NextResponse.json({ 
          error: 'Keys were already claimed for this session. Contact support if you did not receive them.',
        }, { status: 200 })
      }
    }
    
    // Read cart items from session metadata (set during checkout creation)
    const cartItemsRaw = session.metadata?.cart_items
    if (!cartItemsRaw) {
      return NextResponse.json({ error: 'No cart data found in session. Please contact support.' }, { status: 400 })
    }

    let cartItems: CartItem[]
    try {
      cartItems = JSON.parse(cartItemsRaw)
    } catch {
      return NextResponse.json({ error: 'Invalid cart data in session. Please contact support.' }, { status: 400 })
    }

    const claimedKeys: { productId: string; key: string }[] = []
    
    for (const item of cartItems) {
      const { productId, quantity } = item
      
      for (let i = 0; i < quantity; i++) {
        // Check stock before claiming
        const stock = await getStock(productId)
        if (stock === 0) {
          return NextResponse.json({ 
            error: `Out of stock for ${productId}`,
            claimedKeys 
          }, { status: 400 })
        }
        
        const key = await claimKey(productId)
        if (key) {
          claimedKeys.push({ productId, key })
        } else {
          return NextResponse.json({ 
            error: `Failed to claim key for ${productId}`,
            claimedKeys 
          }, { status: 500 })
        }
      }
    }
    
    if (claimedKeys.length === 0) {
      return NextResponse.json({ error: 'No valid products found in session' }, { status: 400 })
    }

    // Store claimed keys in session metadata to prevent double-claiming
    try {
      await stripe.checkout.sessions.update(sessionId, {
        metadata: {
          ...session.metadata,
          keys_claimed: JSON.stringify(claimedKeys),
        },
      })
    } catch (updateError) {
      console.error('Failed to update session metadata:', updateError)
      // Still return the keys even if metadata update fails
    }

    // Send key delivery email to customer
    const customerEmail = session.customer_details?.email
    if (customerEmail) {
      sendKeyDeliveryEmail({
        customerEmail,
        keys: claimedKeys,
      }).catch(err => console.error('Failed to send key delivery email:', err))
    }
    
    return NextResponse.json({ 
      success: true, 
      keys: claimedKeys,
      email: customerEmail 
    })
    
  } catch (error) {
    console.error('Error claiming key:', error)
    return NextResponse.json({ error: 'Failed to claim key. Please contact support.' }, { status: 500 })
  }
}
