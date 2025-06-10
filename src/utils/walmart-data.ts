import { Product } from '../types/product';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Great Value Ground Beef',
    brand: 'Great Value',
    price: 4.98,
    co2e: 15.2,
    waterUsage: 1847,
    recyclabilityPercent: 20,
    category: 'Meat & Seafood',
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    barcode: '123456789012',
    isEcoFriendly: false,
    alternatives: [
      {
        id: '1a',
        name: 'Beyond Beef Plant-Based Ground',
        brand: 'Beyond Meat',
        price: 5.98,
        co2e: 1.5,
        waterUsage: 164,
        recyclabilityPercent: 85,
        category: 'Plant-Based',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        barcode: '123456789013',
        isEcoFriendly: true
      }
    ]
  },
  {
    id: '2',
    name: 'Great Value Organic Spinach',
    brand: 'Great Value',
    price: 2.48,
    co2e: 0.3,
    waterUsage: 12,
    recyclabilityPercent: 90,
    category: 'Fresh Produce',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    barcode: '123456789014',
    isEcoFriendly: true
  },
  {
    id: '3',
    name: 'Coca-Cola Classic 12-Pack',
    brand: 'Coca-Cola',
    price: 6.48,
    co2e: 4.2,
    waterUsage: 185,
    recyclabilityPercent: 75,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    barcode: '123456789015',
    isEcoFriendly: false,
    alternatives: [
      {
        id: '3a',
        name: 'BUBLY Sparkling Water 12-Pack',
        brand: 'bubly',
        price: 4.98,
        co2e: 0.8,
        waterUsage: 45,
        recyclabilityPercent: 95,
        category: 'Beverages',
        image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        barcode: '123456789016',
        isEcoFriendly: true
      }
    ]
  }
];

export const userBadges = [
  {
    id: '1',
    name: 'Eco Hero',
    description: 'Saved 10kg CO₂ this month',
    icon: '🌱',
    earnedAt: new Date('2024-01-15'),
    rarity: 'rare' as const
  },
  {
    id: '2',
    name: 'Water Warrior',
    description: 'Saved 1000L of water',
    icon: '💧',
    earnedAt: new Date('2024-01-10'),
    rarity: 'common' as const
  },
  {
    id: '3',
    name: 'Plant Pioneer',
    description: 'Chose plant-based 20 times',
    icon: '🌿',
    earnedAt: new Date('2024-01-20'),
    rarity: 'epic' as const
  }
];

export const mockUser = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.j@email.com',
  ecoPoints: 2340,
  walmartCash: 11.50,
  badges: userBadges,
  weeklyRank: 3,
  totalCo2eSaved: 47.8,
  preferences: {
    voiceEnabled: true,
    notifications: true,
    dyslexiaMode: false
  }
};