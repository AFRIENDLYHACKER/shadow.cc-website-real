import { Redis } from '@upstash/redis'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const PRODUCT_IDS = ['shadow-weekly', 'shadow-monthly', 'shadow-lifetime'] as const
const REDIS_KEYS = PRODUCT_IDS.map((id) => `keys:${id}`)

/**
 * Parse data/keys.txt and return keys grouped by product ID.
 * Format per line: KEY|PRODUCT_ID
 * Lines starting with # or empty lines are ignored.
 */
function parseKeysFile(): Record<string, string[]> {
  const filePath = path.join(process.cwd(), 'data', 'keys.txt')
  const raw = fs.readFileSync(filePath, 'utf-8')
  const result: Record<string, string[]> = {}

  for (const id of PRODUCT_IDS) {
    result[id] = []
  }

  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const [key, productId] = trimmed.split('|')
    if (key && productId && result[productId]) {
      result[productId]!.push(key)
    }
  }

  return result
}

/**
 * Hash the keys.txt content so we can detect changes across deploys.
 */
function getKeysFileHash(): string {
  const filePath = path.join(process.cwd(), 'data', 'keys.txt')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 16)
}

/**
 * Ensure Redis is synced with the current keys.txt.
 * Runs on every cold start / first request. If the hash of keys.txt
 * has changed since the last seed, Redis is cleared and re-seeded.
 */
let _seeded = false
async function ensureKeysSeeded(): Promise<void> {
  if (_seeded) return

  const fileHash = getKeysFileHash()
  const seedFlag = `keys:seed-hash`
  const storedHash = await redis.get<string>(seedFlag)

  if (storedHash === fileHash) {
    _seeded = true
    return
  }

  // Hash mismatch or first seed — clear and re-seed
  const pipeline = redis.pipeline()
  for (const rk of REDIS_KEYS) {
    pipeline.del(rk)
  }
  await pipeline.exec()

  const keys = parseKeysFile()

  for (const productId of PRODUCT_IDS) {
    const productKeys = keys[productId]
    if (!productKeys || productKeys.length === 0) continue

    // Push in batches of 20 to stay within Upstash pipeline limits
    for (let i = 0; i < productKeys.length; i += 20) {
      const batch = productKeys.slice(i, i + 20)
      const batchPipeline = redis.pipeline()
      for (const key of batch) {
        batchPipeline.rpush(`keys:${productId}`, key)
      }
      await batchPipeline.exec()
    }
  }

  // Store the hash so we don't re-seed until keys.txt changes
  await redis.set(seedFlag, fileHash)
  _seeded = true
}

// ── Public API ──

export async function getStock(productId: string): Promise<number> {
  await ensureKeysSeeded()
  return redis.llen(`keys:${productId}`)
}

export async function getAllStock(): Promise<Record<string, number>> {
  await ensureKeysSeeded()

  const stock: Record<string, number> = {}
  const pipeline = redis.pipeline()
  for (const id of PRODUCT_IDS) {
    pipeline.llen(`keys:${id}`)
  }
  const results = await pipeline.exec<number[]>()

  for (let i = 0; i < PRODUCT_IDS.length; i++) {
    stock[PRODUCT_IDS[i]] = results[i] ?? 0
  }
  return stock
}

export async function claimKey(productId: string): Promise<string | null> {
  await ensureKeysSeeded()
  const key = await redis.lpop<string>(`keys:${productId}`)
  return key ?? null
}

export async function addKeys(entries: { key: string; productId: string }[]): Promise<boolean> {
  try {
    const pipeline = redis.pipeline()
    for (const { key, productId } of entries) {
      pipeline.rpush(`keys:${productId}`, key)
    }
    await pipeline.exec()
    return true
  } catch (error) {
    console.error('Error adding keys:', error)
    return false
  }
}
