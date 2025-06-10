import { CartItem, EcoMetrics } from '../types/product';

export const calculateCartMetrics = (cartItems: CartItem[]): EcoMetrics => {
  const totalCo2e = cartItems.reduce((sum, item) => sum + (item.co2e * item.quantity), 0);
  const waterUsage = cartItems.reduce((sum, item) => sum + (item.waterUsage * item.quantity), 0);
  const recyclabilityAverage = cartItems.length > 0 
    ? cartItems.reduce((sum, item) => sum + item.recyclabilityPercent, 0) / cartItems.length 
    : 0;
  const ecoFriendlyCount = cartItems.filter(item => item.isEcoFriendly).length;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return {
    totalCo2e: Math.round(totalCo2e * 10) / 10,
    co2eGoal: 15.0, // Target goal in kg
    waterUsage: Math.round(waterUsage),
    recyclabilityAverage: Math.round(recyclabilityAverage),
    ecoFriendlyCount,
    totalItems
  };
};

export const getCO2Color = (current: number, goal: number): string => {
  const percentage = (current / goal) * 100;
  if (percentage <= 80) return 'text-green-600';
  if (percentage <= 100) return 'text-yellow-600';
  return 'text-red-600';
};

export const getCO2Background = (current: number, goal: number): string => {
  const percentage = (current / goal) * 100;
  if (percentage <= 80) return 'bg-green-100 border-green-200';
  if (percentage <= 100) return 'bg-yellow-100 border-yellow-200';
  return 'bg-red-100 border-red-200';
};

export const formatCO2Comparison = (co2: number): string => {
  const milesEquivalent = (co2 * 3).toFixed(1);
  return `${milesEquivalent} miles driven in a gas car`;
};

export const calculateSwapSavings = (original: number, alternative: number): {
  co2Saved: number;
  percentReduction: number;
  treesEquivalent: number;
} => {
  const co2Saved = Math.max(0, original - alternative);
  const percentReduction = original > 0 ? Math.round((co2Saved / original) * 100) : 0;
  const treesEquivalent = Math.round(co2Saved / 0.02); // Roughly 20g CO2 per tree per day
  
  return {
    co2Saved: Math.round(co2Saved * 10) / 10,
    percentReduction,
    treesEquivalent
  };
};