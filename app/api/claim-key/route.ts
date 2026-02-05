import { NextResponse } from 'next/server'
import { claimKey, getStock } from '@/lib/keys'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }
    
    // Verify the Stripe session is paid
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    })
    
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }
    
    // Check if key was already claimed for this session (stored in metadata)
    if (session.metadata?.key_claimed) {
      return NextResponse.json({ 
        error: 'Key already claimed for this session',
        key: session.metadata.claimed_key 
      }, { status: 200 })
    }
    
    // Get the product ID from the session
    const lineItems = session.line_items?.data || []
    const claimedKeys: { productId: string; key: string }[] = []
    
    for (const item of lineItems) {
      const productId = (item.price?.product as { metadata?: { product_id?: string } })?.metadata?.product_id
      const quantity = item.quantity || 1
      
      if (productId) {
        for (let i = 0; i < quantity; i++) {
          // Check stock before claiming
          const stock = getStock(productId)
          if (stock === 0) {
            return NextResponse.json({ 
              error: `Out of stock for ${productId}`,
              claimedKeys 
            }, { status: 400 })
          }
          
          const key = claimKey(productId)
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
    }
    
    if (claimedKeys.length === 0) {
      return NextResponse.json({ error: 'No valid products found' }, { status: 400 })
    }
    
    return NextResponse.json({ 
      success: true, 
      keys: claimedKeys,
      email: session.customer_details?.email 
    })
    
  } catch (error) {
    console.error('Error claiming key:', error)
    return NextResponse.json({ error: 'Failed to claim key' }, { status: 500 })
  }
}
