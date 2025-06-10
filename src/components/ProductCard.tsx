import React from 'react';
import { Trash2, Leaf, AlertTriangle, Droplets, Recycle } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onRemove?: (id: string) => void;
  showQuantity?: boolean;
}

export default function ProductCard({ product, onRemove, showQuantity }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.brand}</p>
              {showQuantity && 'quantity' in product && (
                <p className="text-sm text-gray-500">Qty: {(product as any).quantity}</p>
              )}
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-lg font-bold text-[#0071ce]">${product.price}</span>
                {product.isEcoFriendly ? (
                  <span className="inline-flex items-center px-2 py-1 bg-[#00a862] bg-opacity-10 text-[#00a862] rounded-full text-xs font-medium">
                    <Leaf className="h-3 w-3 mr-1" />
                    Eco-Friendly
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    High Impact
                  </span>
                )}
              </div>
            </div>
            
            {onRemove && (
              <button
                onClick={() => onRemove(product.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        
        <div className="text-right space-y-1">
          <div className="flex items-center justify-end space-x-1">
            <span className={`text-sm font-semibold ${product.co2e > 5 ? 'text-red-600' : product.co2e > 2 ? 'text-yellow-600' : 'text-[#00a862]'}`}>
              {product.co2e}kg CO₂
            </span>
          </div>
          <div className="flex items-center justify-end space-x-1 text-xs text-gray-500">
            <Droplets className="h-3 w-3" />
            <span>{product.waterUsage}L</span>
          </div>
          <div className="flex items-center justify-end space-x-1 text-xs text-gray-500">
            <Recycle className="h-3 w-3" />
            <span>{product.recyclabilityPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}