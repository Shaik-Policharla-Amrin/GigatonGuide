import React, { useState } from 'react';
import { ArrowLeft, Sparkles, BarChart3, Target, RefreshCw } from 'lucide-react';
import { CartItem, EcoMetrics } from '../types/product';
import { calculateCartMetrics, getCO2Color, formatCO2Comparison } from '../utils/carbonCalculations';
import ProductCard from './ProductCard';

interface CartOptimizationProps {
  cartItems: CartItem[];
  onBack: () => void;
  onRemoveItem: (id: string) => void;
  onOptimizeCart: () => void;
}

export default function CartOptimization({ cartItems, onBack, onRemoveItem, onOptimizeCart }: CartOptimizationProps) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showOptimized, setShowOptimized] = useState(false);
  
  const currentMetrics = calculateCartMetrics(cartItems);
  
  // Simulate optimized cart (replace high-impact items with alternatives)
  const optimizedItems = cartItems.map(item => {
    if (item.alternatives && item.alternatives.length > 0 && item.co2e > 3) {
      return { ...item, ...item.alternatives[0], quantity: item.quantity };
    }
    return item;
  });
  const optimizedMetrics = calculateCartMetrics(optimizedItems);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsOptimizing(false);
    setShowOptimized(true);
  };

  const metrics = showOptimized ? optimizedMetrics : currentMetrics;
  const items = showOptimized ? optimizedItems : cartItems;

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0071ce] to-[#00a862] text-white p-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Scanning</span>
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-bold">Cart Optimization</h1>
            <p className="text-blue-100">AI-powered sustainability insights</p>
          </div>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <Target className={`h-8 w-8 mx-auto mb-2 ${getCO2Color(metrics.totalCo2e, metrics.co2eGoal)}`} />
            <div className={`text-2xl font-bold ${getCO2Color(metrics.totalCo2e, metrics.co2eGoal)}`}>
              {metrics.totalCo2e}kg
            </div>
            <div className="text-sm text-gray-600">CO₂ Footprint</div>
            <div className="text-xs text-gray-500 mt-1">
              Goal: {metrics.co2eGoal}kg
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{metrics.waterUsage}L</div>
            <div className="text-sm text-gray-600">Water Usage</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{metrics.recyclabilityAverage}%</div>
            <div className="text-sm text-gray-600">Recyclable</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#00a862]">{metrics.ecoFriendlyCount}</div>
            <div className="text-sm text-gray-600">Eco-Friendly Items</div>
          </div>
        </div>

        {/* Optimization CTA */}
        {!showOptimized && (
          <div className="mt-6 text-center">
            <button
              onClick={handleOptimize}
              disabled={isOptimizing}
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                isOptimizing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#0071ce] to-[#00a862] hover:shadow-lg active:scale-95'
              }`}
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>AI Optimizing Cart...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Optimize Entire Cart</span>
                </>
              )}
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Let AI find the best eco-friendly alternatives for your entire cart
            </p>
          </div>
        )}

        {/* Optimization Results */}
        {showOptimized && (
          <div className="mt-6 bg-[#00a862] bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Sparkles className="h-6 w-6 text-[#00a862]" />
              <h3 className="text-lg font-semibold text-[#00a862]">Optimization Complete!</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-500">
                  -{(currentMetrics.totalCo2e - optimizedMetrics.totalCo2e).toFixed(1)}kg
                </div>
                <div className="text-sm text-gray-600">CO₂ Reduced</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  -{currentMetrics.waterUsage - optimizedMetrics.waterUsage}L
                </div>
                <div className="text-sm text-gray-600">Water Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#00a862]">+150</div>
                <div className="text-sm text-gray-600">EcoPoints Earned</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart Items */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {showOptimized ? 'Optimized Cart' : 'Your Cart'} ({items.length} items)
          </h2>
          {showOptimized && (
            <button
              onClick={() => setShowOptimized(false)}
              className="text-[#0071ce] hover:text-blue-700 font-medium"
            >
              View Original
            </button>
          )}
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onRemove={onRemoveItem}
              showQuantity
            />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Impact Summary</h3>
          <div className="text-sm text-gray-600 mb-2">
            Total CO₂ equivalent: <strong>{formatCO2Comparison(metrics.totalCo2e)}</strong>
          </div>
          {metrics.totalCo2e > metrics.co2eGoal && (
            <div className="text-sm text-red-600 font-medium">
              ⚠️ {((metrics.totalCo2e / metrics.co2eGoal - 1) * 100).toFixed(0)}% over your sustainability goal
            </div>
          )}
        </div>
      </div>
    </div>
  );
}