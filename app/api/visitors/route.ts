import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function GET() {
  try {
    // Increment total visits
    const total = await redis.incr('stats:total-visits')

    // Track active visitors (expire after 5 min)
    const visitorId = `visitor:${Date.now()}-${Math.random().toString(36).slice(2)}`
    await redis.set(visitorId, '1', { ex: 300 })

    // Count active visitors by scanning keys
    const keys = await redis.keys('visitor:*')
    const active = keys.length

    return NextResponse.json({ total, active })
  } catch {
    return NextResponse.json({ total: 0, active: 1 })
  }
}
