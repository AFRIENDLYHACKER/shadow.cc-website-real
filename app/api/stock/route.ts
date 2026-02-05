import { NextResponse } from 'next/server'
import { getAllStock } from '@/lib/keys'

export async function GET() {
  try {
    const stock = getAllStock()
    return NextResponse.json({ stock })
  } catch (error) {
    console.error('Error getting stock:', error)
    return NextResponse.json({ error: 'Failed to get stock' }, { status: 500 })
  }
}
