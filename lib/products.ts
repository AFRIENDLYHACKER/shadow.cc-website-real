export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  category: string
  features: string[]
  stock: number
  duration: string
  popular?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'shadow-weekly',
    name: 'Weekly Key',
    description: 'Perfect for trying out Shadow Script. Full access for 7 days.',
    priceInCents: 499,
    category: 'Keys',
    duration: '7 Days',
    features: [
      'Full Script Access',
      'All Game Support',
      'Auto Updates',
      '7 Day Duration',
      'Discord Support',
    ],
    stock: 999,
  },
  {
    id: 'shadow-monthly',
    name: 'Monthly Key',
    description: 'Best value for regular users. Full access for 30 days.',
    priceInCents: 1499,
    category: 'Keys',
    duration: '30 Days',
    popular: true,
    features: [
      'Full Script Access',
      'All Game Support',
      'Auto Updates',
      '30 Day Duration',
      'Priority Discord Support',
      'Early Feature Access',
    ],
    stock: 500,
  },
  {
    id: 'shadow-lifetime',
    name: 'Lifetime Key',
    description: 'One-time purchase. Never pay again with permanent access.',
    priceInCents: 4999,
    category: 'Keys',
    duration: 'Forever',
    features: [
      'Full Script Access',
      'All Game Support',
      'Auto Updates Forever',
      'Lifetime Duration',
      'VIP Discord Support',
      'Early Feature Access',
      'Beta Testing Access',
      'Custom Requests Priority',
    ],
    stock: 100,
  },
]

export const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))]
