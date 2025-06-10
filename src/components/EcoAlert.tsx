import React from 'react';
import { AlertTriangle, X, Zap } from 'lucide-react';
import { Product } from '../types/product';
import { formatCO2Comparison } from '../utils/carbonCalculations';

interface EcoAlertProps {
  product: Product;
  onClose: () => void;
}

export default function EcoAlert({ product, onClose }: EcoAlertProps) {
  return (
    <div className="fixed top-4 right-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-lg p-4 max-w-sm z-50 animate-slide-in-right">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-red-800 flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              Gigaton Alert!
            </h3>
            <button 
              onClick={onClose}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2">
            <p className="text-sm text-red-700">
              <strong>{product.name}</strong> has high environmental impact
            </p>
            <p className="text-xs text-red-600 mt-1">
              {product.co2e}kg CO₂ = {formatCO2Comparison(product.co2e)}
            </p>
            {product.alternatives && product.alternatives.length > 0 && (
              <p className="text-xs text-red-600 mt-1 font-medium">
                💡 Eco-friendly alternatives available!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}