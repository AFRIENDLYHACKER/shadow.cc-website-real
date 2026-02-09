// Run this script to seed keys into Upstash Redis
// Usage: npx tsx scripts/seed-keys.ts

async function seed() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  
  const res = await fetch(`${baseUrl}/api/seed-keys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: 'shadow-seed-2026',
      counts: {
        weekly: 100,
        monthly: 50,
        lifetime: 20,
      },
    }),
  })

  const data = await res.json()
  console.log('Seed result:', JSON.stringify(data, null, 2))
}

seed().catch(console.error)
