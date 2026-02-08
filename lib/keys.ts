import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Redis key naming:
//   keys:{productId}  -> List of available keys for that product
//   keys:seeded:v3    -> Versioned flag to track seeding (bump version to force re-seed)

const SEED_FLAG = 'keys:seeded:v3'
const PRODUCT_IDS = ['shadow-weekly', 'shadow-monthly', 'shadow-lifetime'] as const

// Actual keys from data/keys.txt
const STOCK_KEYS: Record<string, string[]> = {
  'shadow-weekly': [
    'DOPNkEWOdJGYahufUKTQnQqJgQSrsuUy','aultjeIMWYHznwPqVVaEoxPZHslOfJnh',
    'ZabFmCDPvIAovuiFJnDrYHLDmcMNXTsr','JOiZuDjbAbpptTVfvOaNrmgLrAlMZXsI',
    'kPAGUyOlIhHiHTVZQUcCDkmfwkKLBmjC','kZdrsWkzdscojDHaBBaDfDKwMPfwMBKV',
    'cOPhqDJweWDGbIWepBrhGDgdJVZXuHeQ','bxRIlwThWnRAXhaXPQYwkQaWtMsPJLvj',
    'CepFWHvqugAZODbUJUZdWqrHcvWlxakJ','vPnZFCwJdhCfxHBPWucUMjHNEHtjjOGF',
    'WkhJFtsPCbENChKnWvyBPjoQNJnWrTGk','GRzdzxXaJAYwpOqIRqjwicpLzMDqfiXF',
    'MdMYpeIyztFmatzkGEblxEROYKGQRRUo','xTPsYnVZAuEyRfVTPjLgNCJCjEXrnNyc',
    'QzawqTJgYBSAOTRmvpOOMBzPbCcwvWIH','mryZeMoNSpyPEDJuSvTHunTkBWXCQrqy',
    'TwSyROdwgaLYcBKDFwvPsgocvSXbrCTh','IGOQdGhEDsJFiktVBrcjtCgxaGKFldRd',
    'IRjLbypvYzeCLlxyFcRgxhwOUIPnuXpO','duqVaiJfgJptCCzfVOlDpLrzdeWWjiea',
    'aqEFxxTssLtJNdOhwbszJlbbtAwCSnYP','tzZetnjhkcPsIRBumDUrHmUAOWumeUwz',
    'aeirUtBJpYsQFaFveOKSdQTKVADFzAOo','WbbbQxnsTjeRoRkLtoWNhbVAzhsNAfPj',
    'DTGesQgyxZIefmAHGCXgdoXwYmWueSSl','SMFfDjXJJZrKsQTQfgFfjtuZjQVaEHqq',
    'arzqRJyHBXyebHUnHTBdhUaVxDHbwMLy','pMOhqdeZSucqNDVNbqBZbrhMNdbVNwyu',
    'AgCHZYzwYCMjUDRSiBTJdsCEvtPUhQeX','QapGqtJaValcPKtsNQbPBzHvNQKwCKuO',
    'KHLyfkvPDOMAdRXbCBIVXlcMuxiskSzS','bSxPgDoHISrJkncWonkyjRIvBcgUxZfz',
    'TulxpHEKZWxAjMRVrbXUAZquibpyrmyr','fBKKvyKpDjfZJIDjtZriVUvHGTemeBza',
    'zcXbpKEobJzHolMpYhioqyInmQGunGnb','stfIwsiJtAbLhfnuywxnIpwcNCgHPRXg',
    'kKfbxffAiZrpufDCVgbmwahvrdEhbIkg','PYExmeSfQlKrGgAHYRmxScXItUIAIKgc',
    'FbFnYhusSUscuvPbIuuuWdQtMvqAoNFY','UXdMFKzlvrUOqLoyWgIhDOPvrGsrguaZ',
    'CYcYZGgzDUUffxfPPsKSlLnGkYsLxQTB','WMZmErPHqekANOKOMwLbpimxDOSSNvAT',
    'GITzfinZMjSXMvOrOkZsGrfmSEPOQoGl','vFGvQRyqyyKwleAsRnHxKgGICeDkNYGi',
    'ZlIFgYMOJmCWyurUbodMwkqerwzGLVyT','CngGhThzZbRgoVKwrIORntRgEENrWApL',
    'FMgBHbPfqRrtuWgekJzsRwLiOurmHcwk','qjVAfwmwlIZLnQHneqVvLsVzAcpkLsIX',
    'gzhYKAyDvkKZCHDuwFFylmCgfrcqqlfH','RdjQGSBgGALiQxowTBDauwkIMCwvMnxR',
  ],
  'shadow-monthly': [
    'dXdQijzNzktbbaazeVYdpVcqGdKkttHl','mmFPJJRuGQjLHlXopWiAzgCJORFKOLHB',
    'rLzsIJEdhEokvPfPOQSpvwhgfuGHHeEv','lJTXECzkvUGMfQrSDANywabnCppkxwaB',
    'SNebYgqXCEjqbWeSBZFSOyqPuYyBtCAE','xRHjcIHQoHXSTjgDzTZRmTkwIaTKDthq',
    'rIGXGRzUbzrzayBAbgfMqOnRCVztEFMc','iZBRgTaIhSFejqFAnnixOvftbgpDFGVw',
    'EaopApEMBgLyZWfYAUvrUsWaPjLAWyfF','pahnoadmhSltUqjuJCauJIGpKbHLbXzu',
    'KCnLDgWnpQBtKJBQnLdcnPBOgWpJTEft','aqJGMJFaTXbBlAxCVWWTfgjzJezJnCzX',
    'dcpCtrZGXChSyKeZmXOFkIHQNbcpoUih','iMcYJUPCLNXKiHWVUbqZHDNHLVKPrPjf',
    'nybaGClBeuWTNpAviYehMNODiaJbwDSu','kUqOwXxFCXgniUuNbUfbscEyJXuaVfwU',
    'sgExBOFAVsftSwczlpsQIdbuoLajDEPZ','ubuOstXpAYmRrfHYUJsAUEHlGmzOEjYv',
    'RskTkjgVOveJZIELPUoeMbhHnsUnLLGp','bXiQQfdtZHrfFikqlqpvFKDJytwINuCX',
    'UvHjgYrFEvWgJLsbKynRKQTfHafQOdMT','NxIRxzUdwlxaNaXQjaWAtRHZuCdZOvPJ',
    'XlBDdbdZKLZdDoEEbHSuueHswfSsbnQK','nvhEwrevSCpsrFjskfotoPxNinfnGSpD',
    'rtqseXvNjjPowVRImqnCNtoLhFxpTMPL','nutKaVHjwFMlPRzOyGLHxvfffCkjgXDy',
    'MylWgouqlsUscQuBycYCPatxUaBxnUBy','SgYSlfdUizflHeZtAnlaVkgOPIxSqYQJ',
    'gDZpVygAFTpxnIvhjkreaJpQayPeTipl','vWekMjowAUybzYScgDtBSycXgWiUctGX',
    'COIvxBHeqXUFXyGieImBMzDnkRmUNdwe','oYkfVWrmETigWFDKlGjAiBaoxuZeJEyp',
    'VfAXUwFsvuNgoQjGeNEihVlgKInvsoDb','YogUgIfXShPSpzSfhkVazRAeOZOERBpQ',
    'wXEqHgJDTJvdcRJXoddyvhHgMqnAuEUw','NikHXfjCXUqMaObJmUkyoHDoXsBmqpBf',
    'aJqugvLeaZRleIaGUBxdqmVjqclAjyUO','AvmQJaBNnPNNiyemkOCuigDKFevnIDnA',
    'LWQrayILEvBebFKzqPSFlZbXwNbedniy','NXjESRCSSxewhXfTwclyorfuIIPfeeBe',
    'ncFuTlDHIiHAuegmEDoowuGAxpXZhiod','ccRMfYpLAYnlchJHjBEKwzxPoatWVijd',
    'uvAzkctDpvxoNmgUzaNXPljzAcFogFir','AMrwINhnidLMXvLZwflglbepKCUiTYww',
    'hWdDhPqyxVXBdzjqnTnJiFwnzGBMYBTD','REoRuSWHhqKHrTgCZGhJxUmfOoaMAKvn',
    'FgwrTOCKfLdpHcZsugNuKhZOZBWvVlZT','rjOlPLgpUBauvnlRjzaobjFPqkbLnoBN',
    'DhAsCSdwrIrtlmULIdxDZQNnUUGZjORN','FFIUUgCXjSwddMvgUKXshFMwOspdlVNs',
  ],
  'shadow-lifetime': [
    'ZrJVXLpDMhSXrFrcOyCgbfECeNjbXkts','iciEIMDDfqhcpsyAWUTrSlWGjVcBotpv',
    'MbEmKVpoJOBOgiIlTDYdbNdYuYyunJVx','CaveYXHaBQAxLTnOFCvinKcdedcMtBvM',
    'SIMOdDAXkZnUALHlKLYvWbrQahrDHVQU','QOSWvEuPOdUIopjPjyqKSwZvQYDCxykj',
    'DOQgPPCQtDyjreKjEzUytemCdDBDsESC','LZaknEBRBVGymACaUguyrJRiAQcZWmsV',
    'URERbqNiohZlogyedtToZWSiMIfLNiqk','aoWFjoLLZPjmMfGQPnxcjYLClpPUOAZP',
    'RJpkyebErWJoXAESuLHLuvySeQDiBmKs','NAOAvZxbfeuJuDnibJufUmphsWdgMsbe',
    'TNodaTVddPAsrWnBvzJuYazWtdWbZkSZ','AHewnsNApCYhplKyrZXMhQAEgRBJBUcI',
    'ttezLxNpUJAGaguDHvQfUUMTzvOzbunM','SRsBaEdsIiZLCCtCxnZgXjpCSuhVftJp',
    'pciZEuoigQSsRMfDCZFfuUQcciNnCPFW','HqsCbPZXKZBVUhUBUpENFCyllCKfvzyt',
    'xaGgSpwuvNbGPMWHdcqpugYbedsfRYae','XCSbTlrdrlleLLoJHJndMpNXBQteGKLR',
    'PcCbdeFCKOzMKjwKMRRXJYXeTGMqwSeF','mFaUtaxfwFQKuojHBDFhbcQrHeIkVGHO',
    'TTZVrGFdRKPFHeNHqrkuZSEQJtjfHAsA','ekmXugHstJoryqPbYcHLSCQgFhpdkxGC',
    'FFNmVSWIiNJXZyKjpbcsgfZrDABFwcks','PwXGAhnHUHzanAZQzmJODzPfrCVuQDht',
    'NuxaKDXaQJZPdLlJDKyMzbOTXvGUVTiS','VqLdwRpClQPPgcDAnpgkqbpVOHpTOZpK',
    'kDXHHXfwWoDcZVCoEZwQhIwzXqBeXiDT','wUUyhMDjUffruJQATiUNrHpMjpgXeVjT',
    'DQZFtOgBnJIelZVFYvAuIUsImqIVJyIL','PSgmbZBXZzGOXSLqSzOIutWSeRRAsOHL',
    'hlKIPWWNnryfsLGjmspPZUHclOdIFaQV','lDLjrKMIoFLKgOQoQUdQtLujPzGPhLiu',
    'XbaOKLnysztOOGNcXqTfFOoKDtJWguPH','cGZfLBInZDrIWLwJFSTjLaGcAEofskdT',
    'kgXHHFHaFCCztmlIdluoVaMCdRkgepDd','VaslkrIIqStYueJKEIDLsRvcRccQAbCY',
    'gBgLuUACpahRXnvWZEEJtfgNyTPyuSgs','LhIQrfgDIYsJYmcXvPrCBAADrUogCACV',
    'ZYsdZEViYmcKVqLPYzDhpCEHAwqbkNEI','UXYZcbRSCUMzOoMrAwxfdirWsichgmgJ',
    'ILHwLcSkdWoZspFZgExbOlVrHPfbGYeK','zmrVbBWjBNtHYffObhCvFbPXpecbwpBH',
    'JIaKRFjfuvrcDjGbIpFBvLNZKLIpplYj','YTyRBFZZBLTqIeVmyoIZrdceDIyfftIt',
    'aQUebsqHYAZMiuHsYncmEOduXlgVvIBF','xjVJKLsoDXRrUFXwqaLAVHOdySRwVqFy',
    'BNFKjxXzrVIDaKlSggpWeTetLhObDzwT','KRjMAilaiziBwcERloSVDLGcIeSAsoIY',
  ],
}

// Auto-seed keys into Redis if they haven't been seeded yet
async function ensureKeysSeeded(): Promise<void> {
  const alreadySeeded = await redis.get(SEED_FLAG)
  if (alreadySeeded) return

  // Clear any stale data from previous seeding attempts
  await redis.del('keys:shadow-weekly', 'keys:shadow-monthly', 'keys:shadow-lifetime', 'keys:seeded', 'keys:seeded:v2')

  // Seed keys in batches of 20 to stay within Upstash pipeline limits
  for (const productId of PRODUCT_IDS) {
    const keys = STOCK_KEYS[productId]
    for (let i = 0; i < keys.length; i += 20) {
      const batch = keys.slice(i, i + 20)
      const pipeline = redis.pipeline()
      for (const key of batch) {
        pipeline.rpush(`keys:${productId}`, key)
      }
      await pipeline.exec()
    }
  }

  await redis.set(SEED_FLAG, '1')
}

// Get stock count for a specific product
export async function getStock(productId: string): Promise<number> {
  await ensureKeysSeeded()
  return redis.llen(`keys:${productId}`)
}

// Get stock for all products
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

// Claim a key for a product (pops from the list atomically)
export async function claimKey(productId: string): Promise<string | null> {
  await ensureKeysSeeded()
  const key = await redis.lpop<string>(`keys:${productId}`)
  return key ?? null
}

// Add keys to Redis (for admin / seed use)
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
