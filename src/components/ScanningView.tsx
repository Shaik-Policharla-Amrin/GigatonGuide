import React, { useState, useEffect } from 'react';
import { Camera, Scan, AlertTriangle, CheckCircle, RefreshCw, Mic, Zap } from 'lucide-react';
import { Product, CartItem } from '../types/product';
import { sampleProducts } from '../utils/walmart-data';
import SwapModal from './SwapModal';
import EcoAlert from './EcoAlert';

interface ScanningViewProps {
  onProductScanned: (item: CartItem) => void;
}

export default function ScanningView({ onProductScanned }: ScanningViewProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScannedProduct, setLastScannedProduct] = useState<Product | null>(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showEcoAlert, setShowEcoAlert] = useState(false);
  const [scanAnimation, setScanAnimation] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    setScanAnimation(true);
    
    // Simulate scanning delay with realistic timing
    setTimeout(() => {
      const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
      setLastScannedProduct(randomProduct);
      setIsScanning(false);
      setScanAnimation(false);
      
      // Check if product needs eco alert (high impact items)
      if (randomProduct.co2e > 5) {
        setShowEcoAlert(true);
        // Auto-close alert after 5 seconds
        setTimeout(() => setShowEcoAlert(false), 5000);
      }
      
      // Add to cart with haptic feedback simulation
      const cartItem: CartItem = {
        ...randomProduct,
        quantity: 1,
        scannedAt: new Date()
      };
      onProductScanned(cartItem);
      
      // Show swap modal if alternatives exist and product has high impact
      if (randomProduct.alternatives && randomProduct.alternatives.length > 0 && randomProduct.co2e > 3) {
        setTimeout(() => setShowSwapModal(true), 1500);
      }
    }, 2000);
  };

  const handleVoiceCommand = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      simulateScan();
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white pb-6">
      {/* Enhanced Scanning Interface */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-lg m-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Scan & Go</h2>
          <p className="text-gray-600 mb-3">Scan barcodes to track your carbon footprint in real-time</p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center text-[#0071ce]">
              <Scan className="h-4 w-4 mr-1" />
              <span>Walmart Scan & Go</span>
            </div>
            <div className="flex items-center text-[#00a862]">
              <Zap className="h-4 w-4 mr-1" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>

        {/* Enhanced Camera Viewfinder */}
        <div className="relative aspect-square bg-black rounded-xl mb-6 overflow-hidden border-4 border-gray-200">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0071ce]/20 via-transparent to-[#00a862]/20">
            <div className="flex items-center justify-center h-full">
              <Camera className="h-20 w-20 text-white/60" />
            </div>
          </div>
          
          {/* Enhanced Scanning Animation */}
          {scanAnimation && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-ping absolute h-32 w-32 bg-[#00a862] rounded-full opacity-20"></div>
              <div className="animate-pulse absolute h-24 w-24 bg-[#00a862] rounded-full opacity-40"></div>
              <div className="animate-bounce absolute h-16 w-16 bg-[#00a862] rounded-full opacity-60"></div>
              <Scan className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
          
          {/* Dynamic Scanning Overlay */}
          <div className="absolute inset-6 border-2 border-white/60 rounded-xl">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#00a862]"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#00a862]"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#00a862]"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#00a862]"></div>
            
            {/* Scanning Line Animation */}
            {!scanAnimation && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-0.5 bg-[#00a862] animate-scan-line"></div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={simulateScan}
            disabled={isScanning}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg ${
              isScanning 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#0071ce] to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 active:scale-95'
            }`}
          >
            {isScanning ? (
              <div className="flex items-center justify-center space-x-2">
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Scanning Product...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Scan className="h-5 w-5" />
                <span>Tap to Scan Product</span>
              </div>
            )}
          </button>

          {/* Voice Command Button */}
          <button
            onClick={handleVoiceCommand}
            disabled={isListening || isScanning}
            className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 border-2 ${
              isListening 
                ? 'bg-[#00a862] border-[#00a862] text-white' 
                : 'bg-white border-[#00a862] text-[#00a862] hover:bg-[#00a862] hover:text-white'
            }`}
          >
            {isListening ? (
              <div className="flex items-center justify-center space-x-2">
                <Mic className="h-4 w-4 animate-pulse" />
                <span>Listening...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Mic className="h-4 w-4" />
                <span>Voice Scan</span>
              </div>
            )}
          </button>
        </div>

        {/* Voice Command Hint */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 mb-1">
            💬 Say <strong>"Hey Walmart, scan this item"</strong>
          </p>
          <p className="text-xs text-gray-400">
            Or try: "Find eco-friendly alternatives" | "What's my carbon footprint?"
          </p>
        </div>
      </div>

      {/* Enhanced Last Scanned Product */}
      {lastScannedProduct && (
        <div className="mx-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-md animate-slide-up">
            <div className="flex items-center space-x-4">
              <img 
                src={lastScannedProduct.image} 
                alt={lastScannedProduct.name}
                className="w-20 h-20 object-cover rounded-lg shadow-sm"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{lastScannedProduct.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{lastScannedProduct.brand}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#0071ce]">${lastScannedProduct.price}</span>
                  <div className="flex items-center space-x-2">
                    {lastScannedProduct.isEcoFriendly ? (
                      <div className="flex items-center space-x-1 text-[#00a862]">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Eco-Friendly</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-orange-500">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">High Impact</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className={`font-semibold ${
                    lastScannedProduct.co2e > 5 ? 'text-red-600' : 
                    lastScannedProduct.co2e > 2 ? 'text-yellow-600' : 'text-[#00a862]'
                  }`}>
                    {lastScannedProduct.co2e}kg CO₂
                  </span>
                  <span className="text-gray-500">
                    {lastScannedProduct.waterUsage}L water • {lastScannedProduct.recyclabilityPercent}% recyclable
                  </span>
                </div>
              </div>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="mt-4 flex space-x-2">
              {lastScannedProduct.alternatives && lastScannedProduct.alternatives.length > 0 && (
                <button
                  onClick={() => setShowSwapModal(true)}
                  className="flex-1 bg-[#00a862] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  See Better Options
                </button>
              )}
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Product Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Modals */}
      {showEcoAlert && lastScannedProduct && (
        <EcoAlert
          product={lastScannedProduct}
          onClose={() => setShowEcoAlert(false)}
        />
      )}

      {showSwapModal && lastScannedProduct && lastScannedProduct.alternatives && (
        <SwapModal
          originalProduct={lastScannedProduct}
          alternatives={lastScannedProduct.alternatives}
          onSwap={(alternative) => {
            const cartItem: CartItem = {
              ...alternative,
              quantity: 1,
              scannedAt: new Date()
            };
            onProductScanned(cartItem);
            setShowSwapModal(false);
            setLastScannedProduct(alternative); // Update display
          }}
          onClose={() => setShowSwapModal(false)}
        />
      )}
    </div>
  );
}