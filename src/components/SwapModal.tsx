import React from 'react';
import { X, ArrowRight, TreePine, Droplets, Recycle } from 'lucide-react';
import { Product } from '../types/product';
import { calculateSwapSavings } from '../utils/carbonCalculations';

interface SwapModalProps {
  originalProduct: Product;
  alternatives: Product[];
  onSwap: (alternative: Product) => void;
  onClose: () => void;
}

export default function SwapModal({ originalProduct, alternatives, onSwap, onClose }: SwapModalProps) {
  const bestAlternative = alternatives[0]; // Assuming first is best
  const savings = calculateSwapSavings(originalProduct.co2e, bestAlternative.co2e);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Better Choice Available!</h2>
            <p className="text-sm text-gray-600 mt-1">AI found a more eco-friendly option</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Comparison */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Product */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-center mb-3">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Current Choice
                </span>
              </div>
              <img 
                src={originalProduct.image} 
                alt={originalProduct.name}
                className="w-24 h-24 object-cover rounded-lg mx-auto mb-3"
              />
              <h3 className="font-semibold text-center text-gray-900 mb-2">{originalProduct.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-3">{originalProduct.brand}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Price:</span>
                  <span className="font-semibold">${originalProduct.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>CO₂ Impact:</span>
                  <span className="font-semibold text-red-600">{originalProduct.co2e}kg</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Water Usage:</span>
                  <span className="font-semibold">{originalProduct.waterUsage}L</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Recyclable:</span>
                  <span className="font-semibold">{originalProduct.recyclabilityPercent}%</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="h-8 w-8 text-[#00a862]" />
            </div>

            {/* Alternative Product */}
            <div className="border-2 border-[#00a862] rounded-lg p-4 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="inline-block px-3 py-1 bg-[#00a862] text-white rounded-full text-sm font-medium">
                  Better Choice
                </span>
              </div>
              <div className="mt-4">
                <img 
                  src={bestAlternative.image} 
                  alt={bestAlternative.name}
                  className="w-24 h-24 object-cover rounded-lg mx-auto mb-3"
                />
                <h3 className="font-semibold text-center text-gray-900 mb-2">{bestAlternative.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-3">{bestAlternative.brand}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Price:</span>
                    <span className="font-semibold">${bestAlternative.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>CO₂ Impact:</span>
                    <span className="font-semibold text-[#00a862]">{bestAlternative.co2e}kg</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Water Usage:</span>
                    <span className="font-semibold">{bestAlternative.waterUsage}L</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Recyclable:</span>
                    <span className="font-semibold">{bestAlternative.recyclabilityPercent}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Summary */}
          <div className="mt-6 bg-[#00a862] bg-opacity-10 rounded-lg p-4">
            <h3 className="font-semibold text-[#00a862] mb-3 text-center">Environmental Impact</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <TreePine className="h-8 w-8 text-[#00a862] mb-2" />
                <span className="text-2xl font-bold text-[#00a862]">{savings.treesEquivalent}</span>
                <span className="text-sm text-gray-600">Trees Saved</span>
              </div>
              <div className="flex flex-col items-center">
                <Droplets className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-2xl font-bold text-blue-500">
                  {Math.round(originalProduct.waterUsage - bestAlternative.waterUsage)}L
                </span>
                <span className="text-sm text-gray-600">Water Saved</span>
              </div>
              <div className="flex flex-col items-center">
                <Recycle className="h-8 w-8 text-green-500 mb-2" />
                <span className="text-2xl font-bold text-green-500">{savings.percentReduction}%</span>
                <span className="text-sm text-gray-600">CO₂ Reduction</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Keep Original
            </button>
            <button
              onClick={() => onSwap(bestAlternative)}
              className="flex-1 py-3 px-4 bg-[#00a862] text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Make the Swap
            </button>
          </div>

          {/* EcoPoints Reward */}
          <div className="mt-4 text-center">
            <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              🏆 +50 EcoPoints for this swap
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}