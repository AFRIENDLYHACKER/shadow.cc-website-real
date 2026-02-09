import { NextResponse } from 'next/server'
import { addKeys, getAllStock } from '@/lib/keys'
import crypto from 'crypto'

function generateKey(): string {
  return `SHADOW-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`
}

// POST /api/seed-keys — seed initial keys into Redis
// Body: { secret: string, counts?: { weekly?: number, monthly?: number, lifetime?: number } }
export async function POST(request: Request) {
  try {
    const { secret, counts } = await request.json()

    // Simple secret check so nobody can call this publicly
    if (secret !== process.env.SEED_SECRET && secret !== 'shadow-seed-2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const weekly = counts?.weekly ?? 50
    const monthly = counts?.monthly ?? 30
    const lifetime = counts?.lifetime ?? 10

    const entries: { key: string; productId: string }[] = []

    for (let i = 0; i < weekly; i++) {
      entries.push({ key: generateKey(), productId: 'shadow-weekly' })
    }
    for (let i = 0; i < monthly; i++) {
      entries.push({ key: generateKey(), productId: 'shadow-monthly' })
    }
    for (let i = 0; i < lifetime; i++) {
      entries.push({ key: generateKey(), productId: 'shadow-lifetime' })
    }

    const success = await addKeys(entries)

    if (!success) {
      return NextResponse.json({ error: 'Failed to seed keys' }, { status: 500 })
    }

    const stock = await getAllStock()

    return NextResponse.json({
      success: true,
      seeded: { weekly, monthly, lifetime },
      totalStock: stock,
    })
  } catch (error) {
    console.error('Error seeding keys:', error)
    return NextResponse.json({ error: 'Failed to seed keys' }, { status: 500 })
  }
}

// GET /api/seed-keys — view current stock
export async function GET() {
  try {
    const stock = await getAllStock()
    return NextResponse.json({ stock })
  } catch (error) {
    console.error('Error checking stock:', error)
    return NextResponse.json({ error: 'Failed to check stock' }, { status: 500 })
  }
}
