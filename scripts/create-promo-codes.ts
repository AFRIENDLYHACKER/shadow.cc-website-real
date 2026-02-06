import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

async function createPromoCodes() {
  const codes = [
    { coupon: '5aEZsOrb', code: 'SAVE10' },
    { coupon: 'espohSib', code: 'SAVE25' },
    { coupon: 'pvaYKtRS', code: 'DOLLAROFF' },
  ]

  for (const { coupon, code } of codes) {
    try {
      const promoCode = await stripe.promotionCodes.create({
        coupon,
        code,
        active: true,
      })
      console.log(`Created promotion code: ${promoCode.code} (${promoCode.id})`)
    } catch (error: unknown) {
      const err = error as Error
      console.error(`Failed to create code ${code}:`, err.message)
    }
  }

  console.log('Done!')
}

createPromoCodes()
