export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  co2e: number; // kg CO₂ equivalent
  waterUsage: number; // liters
  recyclabilityPercent: number;
  category: string;
  image: string;
  barcode: string;
  isEcoFriendly: boolean;
  alternatives?: Product[];
}

export interface CartItem extends Product {
  quantity: number;
  scannedAt: Date;
}

export interface EcoMetrics {
  totalCo2e: number;
  co2eGoal: number;
  waterUsage: number;
  recyclabilityAverage: number;
  ecoFriendlyCount: number;
  totalItems: number;
}