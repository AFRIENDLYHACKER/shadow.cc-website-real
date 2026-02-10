import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

async function createPromoCodes() {
  const codes = [
    { coupon: '5aEZsOrb', code: 'SAVE10' },
    { coupon: 'espohSib', code: 'SAVE25' },
    { coupon: 'pvaYKtRS', code: 'DOLLAROFF' },
    { coupon: 'promo_1SzN2wHlAnSAKK2BHB6OPljs', code: 'SHADOWCC' },
  ]

  for (const { coupon, code } of codes) {
    try {
      const promoCode = await stripe.promotionCodes.create({
        promotion: { type: 'coupon', coupon },
        code,
        active: true,
      })
      console.log(`Created promotion code: ${promoCode.code} (${promoCode.id})`)
    } catch (error) {
      console.error(`Failed to create code ${code}:`, error?.message || error)
    }
  }

  console.log('Done!')
}

createPromoCodes()
