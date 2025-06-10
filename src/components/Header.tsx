import React, { useState } from 'react';
import { ShoppingCart, Target, Leaf, Award, Mic, MicOff } from 'lucide-react';
import { EcoMetrics } from '../types/product';
import { User } from '../types/user';
import { getCO2Color, getCO2Background, formatCO2Comparison } from '../utils/carbonCalculations';

interface HeaderProps {
  metrics: EcoMetrics;
  user: User;
  onCartClick: () => void;
  onRewardsClick: () => void;
}

export default function Header({ metrics, user, onCartClick, onRewardsClick }: HeaderProps) {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(user.preferences.voiceEnabled);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const overagePercentage = Math.round((metrics.totalCo2e / metrics.co2eGoal) * 100 - 100);
  const isOverGoal = metrics.totalCo2e > metrics.co2eGoal;

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    // In a real app, this would update user preferences
  };

  return (
    <header className="bg-[#0071ce] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-[#00a862] animate-pulse" />
              <div>
                <h1 className="text-xl font-bold">Gigaton Guide</h1>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-blue-200">Powered by</p>
                  <span className="bg-[#00a862] px-2 py-0.5 rounded-full text-xs font-semibold">
                    Project Gigaton
                  </span>
                </div>
              </div>
            </div>

            {/* Voice Control Toggle */}
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isVoiceEnabled 
                  ? 'bg-[#00a862] hover:bg-green-700' 
                  : 'bg-blue-700 hover:bg-blue-800'
              }`}
              title={isVoiceEnabled ? 'Voice commands ON' : 'Voice commands OFF'}
            >
              {isVoiceEnabled ? (
                <Mic className="h-4 w-4" />
              ) : (
                <MicOff className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-6">
            {/* Real-time Carbon Tracker with Enhanced Animation */}
            <div 
              className={`relative flex items-center space-x-3 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${getCO2Background(metrics.totalCo2e, metrics.co2eGoal)} hover:scale-105 cursor-pointer`}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <div className="flex items-center space-x-2">
                <Target className={`h-5 w-5 ${getCO2Color(metrics.totalCo2e, metrics.co2eGoal)} ${isOverGoal ? 'animate-bounce' : ''}`} />
                <div>
                  <div className={`text-sm font-semibold ${getCO2Color(metrics.totalCo2e, metrics.co2eGoal)}`}>
                    Your Cart: {metrics.totalCo2e}kg CO₂e
                  </div>
                  <div className={`text-xs ${getCO2Color(metrics.totalCo2e, metrics.co2eGoal)}`}>
                    Goal: {metrics.co2eGoal}kg 
                    {isOverGoal && (
                      <span className="ml-1 animate-pulse">
                        ({overagePercentage}% over)
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Enhanced Tooltip */}
              {showTooltip && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap z-10 animate-fade-in">
                  <div className="font-semibold">{formatCO2Comparison(metrics.totalCo2e)}</div>
                  <div className="text-gray-300">
                    {isOverGoal ? '⚠️ Consider eco-friendly swaps' : '✅ Great job staying on track!'}
                  </div>
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </div>

            {/* Enhanced EcoPoints Display */}
            <button 
              onClick={onRewardsClick}
              className="relative flex items-center space-x-2 bg-gradient-to-r from-[#00a862] to-green-600 hover:from-green-600 hover:to-green-700 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Award className="h-5 w-5 animate-pulse" />
              <div className="text-left">
                <div className="text-sm font-semibold">{user.ecoPoints} pts</div>
                <div className="text-xs opacity-90">${user.walmartCash} Cash</div>
              </div>
              {/* Notification Dot for New Rewards */}
              <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce font-bold">
                !
              </div>
            </button>

            {/* Enhanced Cart Button */}
            <button 
              onClick={onCartClick}
              className="relative bg-blue-700 hover:bg-blue-800 p-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <ShoppingCart className="h-6 w-6" />
              {metrics.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00a862] text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse font-bold shadow-lg">
                  {metrics.totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar for CO2 Goal */}
        <div className="mt-3">
          <div className="w-full bg-blue-800 bg-opacity-30 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                isOverGoal ? 'bg-red-400 animate-pulse' : 'bg-[#00a862]'
              }`}
              style={{ 
                width: `${Math.min((metrics.totalCo2e / metrics.co2eGoal) * 100, 100)}%` 
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-blue-200 mt-1">
            <span>0kg</span>
            <span className={isOverGoal ? 'text-red-300 font-semibold' : ''}>
              {metrics.co2eGoal}kg goal
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}