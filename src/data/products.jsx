import React from 'react'

// Product catalog - shared between Gallery and Cart
export const products = [
  {
    id: 1,
    title: 'Cozy Blankets',
    description: 'Warm, handcrafted blankets perfect for Himalayan winters',
    price: 2499,
    svg: (
      <svg className="w-full h-48" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="260" height="160" rx="10" fill="#e8bd7d" opacity="0.3" />
        <path d="M40 60 Q80 40 120 60 Q160 80 200 60 Q240 40 280 60" stroke="#75785b" strokeWidth="3" fill="none" />
        <path d="M40 100 Q80 80 120 100 Q160 120 200 100 Q240 80 280 100" stroke="#75785b" strokeWidth="3" fill="none" />
        <path d="M40 140 Q80 120 120 140 Q160 160 200 140 Q240 120 280 140" stroke="#75785b" strokeWidth="3" fill="none" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Amigurumi Toys',
    description: 'Adorable handmade toys for children and collectors',
    price: 899,
    svg: (
      <svg className="w-full h-48" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="150" cy="80" r="35" fill="#e8bd7d" />
        <circle cx="135" cy="75" r="8" fill="#75785b" />
        <circle cx="165" cy="75" r="8" fill="#75785b" />
        <path d="M140 90 Q150 95 160 90" stroke="#75785b" strokeWidth="2" fill="none" />
        <ellipse cx="150" cy="130" rx="40" ry="50" fill="#e8bd7d" opacity="0.7" />
        <circle cx="120" cy="140" r="15" fill="#e8bd7d" opacity="0.5" />
        <circle cx="180" cy="140" r="15" fill="#e8bd7d" opacity="0.5" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Home Decor',
    description: 'Beautiful cushions, wall hangings, and decorative pieces',
    price: 1299,
    svg: (
      <svg className="w-full h-48" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="80" y="40" width="140" height="120" rx="5" fill="#e8bd7d" opacity="0.3" />
        <circle cx="150" cy="100" r="40" fill="#75785b" opacity="0.4" />
        <path d="M130 100 L150 80 L170 100 L150 120 Z" fill="#e8bd7d" />
        <circle cx="150" cy="100" r="15" fill="#75785b" opacity="0.6" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Accessories',
    description: 'Scarves, bags, and fashion accessories',
    price: 699,
    svg: (
      <svg className="w-full h-48" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="150" cy="100" r="60" fill="#e8bd7d" opacity="0.3" />
        <path d="M150 50 L160 80 L190 85 L165 105 L172 135 L150 120 L128 135 L135 105 L110 85 L140 80 Z" fill="#75785b" opacity="0.6" />
        <circle cx="150" cy="100" r="25" fill="#e8bd7d" />
      </svg>
    )
  },
  {
    id: 5,
    title: 'Baby Items',
    description: 'Soft booties, hats, and baby blankets',
    price: 599,
    svg: (
      <svg className="w-full h-48" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="150" cy="90" r="45" fill="#e8bd7d" opacity="0.4" />
        <circle cx="140" cy="85" r="6" fill="#75785b" />
        <circle cx="160" cy="85" r="6" fill="#75785b" />
        <path d="M135 100 Q150 110 165 100" stroke="#75785b" strokeWidth="2" fill="none" />
        <rect x="120" y="130" width="60" height="40" rx="5" fill="#e8bd7d" opacity="0.5" />
      </svg>
    )
  },
  {
    id: 6,
    title: 'Table Runners',
    description: 'Elegant table decor for special occasions',
    price: 1199,
    svg: (
      <svg className="w-full h-48" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="80" width="220" height="60" rx="8" fill="#e8bd7d" opacity="0.3" />
        <circle cx="80" cy="110" r="20" fill="#75785b" opacity="0.4" />
        <circle cx="150" cy="110" r="20" fill="#75785b" opacity="0.4" />
        <circle cx="220" cy="110" r="20" fill="#75785b" opacity="0.4" />
      </svg>
    )
  }
]

// Helper function to get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === id)
}

