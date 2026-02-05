import fs from 'fs'
import path from 'path'

const KEYS_FILE_PATH = path.join(process.cwd(), 'data', 'keys.txt')

export interface KeyEntry {
  key: string
  productId: string
}

// Read all keys from file
export function readKeys(): KeyEntry[] {
  try {
    if (!fs.existsSync(KEYS_FILE_PATH)) {
      return []
    }
    
    const content = fs.readFileSync(KEYS_FILE_PATH, 'utf-8')
    const lines = content.split('\n')
    const keys: KeyEntry[] = []
    
    for (const line of lines) {
      const trimmed = line.trim()
      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) continue
      
      const [key, productId] = trimmed.split('|')
      if (key && productId) {
        keys.push({ key: key.trim(), productId: productId.trim() })
      }
    }
    
    return keys
  } catch (error) {
    console.error('Error reading keys file:', error)
    return []
  }
}

// Get stock count for a specific product
export function getStock(productId: string): number {
  const keys = readKeys()
  return keys.filter(k => k.productId === productId).length
}

// Get stock for all products
export function getAllStock(): Record<string, number> {
  const keys = readKeys()
  const stock: Record<string, number> = {}
  
  for (const key of keys) {
    stock[key.productId] = (stock[key.productId] || 0) + 1
  }
  
  return stock
}

// Claim a key for a product (removes it from file)
export function claimKey(productId: string): string | null {
  try {
    const keys = readKeys()
    const keyIndex = keys.findIndex(k => k.productId === productId)
    
    if (keyIndex === -1) {
      return null // No keys available
    }
    
    const claimedKey = keys[keyIndex].key
    
    // Remove the key from the array
    keys.splice(keyIndex, 1)
    
    // Rewrite the file without the claimed key
    const newContent = buildKeysFileContent(keys)
    fs.writeFileSync(KEYS_FILE_PATH, newContent, 'utf-8')
    
    return claimedKey
  } catch (error) {
    console.error('Error claiming key:', error)
    return null
  }
}

// Helper to rebuild keys file content
function buildKeysFileContent(keys: KeyEntry[]): string {
  const header = `# Shadow.CC License Keys
# Format: KEY|PRODUCT_ID
# Add your keys below (one per line):
#
`
  
  // Group keys by product
  const grouped: Record<string, string[]> = {}
  for (const { key, productId } of keys) {
    if (!grouped[productId]) {
      grouped[productId] = []
    }
    grouped[productId].push(key)
  }
  
  let content = header
  
  // Write each group
  const productOrder = ['shadow-weekly', 'shadow-monthly', 'shadow-lifetime']
  const productLabels: Record<string, string> = {
    'shadow-weekly': '# Weekly Keys',
    'shadow-monthly': '# Monthly Keys',
    'shadow-lifetime': '# Lifetime Keys',
  }
  
  for (const productId of productOrder) {
    if (grouped[productId] && grouped[productId].length > 0) {
      content += `${productLabels[productId] || `# ${productId}`}\n`
      for (const key of grouped[productId]) {
        content += `${key}|${productId}\n`
      }
    }
  }
  
  // Add any other products not in the order
  for (const productId of Object.keys(grouped)) {
    if (!productOrder.includes(productId)) {
      content += `# ${productId}\n`
      for (const key of grouped[productId]) {
        content += `${key}|${productId}\n`
      }
    }
  }
  
  return content
}

// Add keys to file (for admin use)
export function addKeys(keys: KeyEntry[]): boolean {
  try {
    const existingKeys = readKeys()
    const allKeys = [...existingKeys, ...keys]
    const newContent = buildKeysFileContent(allKeys)
    fs.writeFileSync(KEYS_FILE_PATH, newContent, 'utf-8')
    return true
  } catch (error) {
    console.error('Error adding keys:', error)
    return false
  }
}
