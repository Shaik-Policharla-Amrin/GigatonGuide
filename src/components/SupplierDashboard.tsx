import React, { useState } from 'react';
import { ArrowLeft, TrendingDown, TrendingUp, Target, Lightbulb, Award, BarChart3, Leaf, Factory } from 'lucide-react';

interface SupplierDashboardProps {
  onBack: () => void;
}

export default function SupplierDashboard({ onBack }: SupplierDashboardProps) {
  const [selectedProduct, setSelectedProduct] = useState('great-value-ground-beef');

  const supplierData = {
    'great-value-ground-beef': {
      name: 'Great Value Ground Beef',
      category: 'Meat & Seafood',
      currentScore: 2.1,
      industryAverage: 3.8,
      co2e: 15.2,
      waterUsage: 1847,
      recyclabilityPercent: 20,
      monthlyVolume: 50000,
      improvements: [
        { action: 'Switch to grass-fed suppliers', impact: '-2.3kg CO₂', cost: 'Medium', timeframe: '6 months' },
        { action: 'Improve packaging materials', impact: '-0.8kg CO₂', cost: 'Low', timeframe: '3 months' },
        { action: 'Optimize cold chain logistics', impact: '-1.1kg CO₂', cost: 'High', timeframe: '12 months' }
      ]
    }
  };

  const currentProduct = supplierData[selectedProduct as keyof typeof supplierData];
  const competitorComparison = [
    { brand: 'Great Value', score: currentProduct.currentScore, isUser: true },
    { brand: 'Tyson', score: 4.2, isUser: false },
    { brand: 'Perdue', score: 3.9, isUser: false },
    { brand: 'Industry Average', score: currentProduct.industryAverage, isUser: false }
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen">
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
            <h1 className="text-2xl font-bold">Supplier Impact Dashboard</h1>
            <p className="text-blue-100">Powered by Project Gigaton</p>
          </div>
        </div>
      </div>

      {/* Project Gigaton Banner */}
      <div className="bg-[#00a862] bg-opacity-10 border-l-4 border-[#00a862] p-4 m-6">
        <div className="flex items-center space-x-3">
          <Factory className="h-6 w-6 text-[#00a862]" />
          <div>
            <h3 className="font-semibold text-[#00a862]">Project Gigaton Partnership</h3>
            <p className="text-sm text-gray-600">
              Help Walmart eliminate 1 billion metric tons of greenhouse gases from supply chains by 2030
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Product Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Product Performance</h2>
          <select 
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full md:w-96 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0071ce] focus:border-transparent"
          >
            <option value="great-value-ground-beef">Great Value Ground Beef</option>
          </select>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
            <Target className="h-8 w-8 text-[#00a862] mx-auto mb-3" />
            <div className="text-3xl font-bold text-[#00a862]">{currentProduct.currentScore}</div>
            <div className="text-sm text-gray-600">EcoScore Rating</div>
            <div className="text-xs text-[#00a862] font-medium mt-1">+0.4 vs last month</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
            <BarChart3 className="h-8 w-8 text-[#0071ce] mx-auto mb-3" />
            <div className="text-3xl font-bold text-[#0071ce]">{currentProduct.co2e}kg</div>
            <div className="text-sm text-gray-600">CO₂e per unit</div>
            <div className="text-xs text-red-500 font-medium mt-1">60% above average</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 text-center">
            <Award className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-yellow-600">{currentProduct.monthlyVolume.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Monthly Volume</div>
            <div className="text-xs text-gray-500 mt-1">Top seller</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
            <Leaf className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-purple-600">{currentProduct.recyclabilityPercent}%</div>
            <div className="text-sm text-gray-600">Recyclable</div>
            <div className="text-xs text-red-500 font-medium mt-1">Below industry average</div>
          </div>
        </div>

        {/* Competitor Comparison */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Competitive Benchmarking</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              {competitorComparison.map((competitor, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
                  competitor.isUser ? 'bg-[#0071ce] text-white' : 'bg-white'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      competitor.isUser ? 'bg-white' : 'bg-gray-400'
                    }`}></div>
                    <span className="font-semibold">{competitor.brand}</span>
                    {competitor.isUser && (
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                        Your Product
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold">{competitor.score}</span>
                    {competitor.score < currentProduct.industryAverage ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Improvement Recommendations */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="h-6 w-6 text-[#00a862]" />
            <h3 className="text-lg font-bold text-gray-900">AI-Powered Improvement Recommendations</h3>
          </div>
          <div className="space-y-4">
            {currentProduct.improvements.map((improvement, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{improvement.action}</h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <TrendingDown className="h-4 w-4 text-[#00a862]" />
                        <span className="font-medium text-[#00a862]">{improvement.impact}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        improvement.cost === 'Low' ? 'bg-green-100 text-green-800' :
                        improvement.cost === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {improvement.cost} Cost
                      </div>
                      <span className="text-gray-600">{improvement.timeframe}</span>
                    </div>
                  </div>
                  <button className="ml-4 px-4 py-2 bg-[#0071ce] text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-gradient-to-r from-[#0071ce] to-[#00a862] rounded-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-4">Impact Calculator</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold">-760 tons</div>
              <div className="text-sm text-blue-100">Annual CO₂ reduction potential</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold">$1.2M</div>
              <div className="text-sm text-blue-100">Estimated cost savings</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold">18 months</div>
              <div className="text-sm text-blue-100">ROI payback period</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}