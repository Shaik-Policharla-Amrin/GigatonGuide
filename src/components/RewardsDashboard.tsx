import React, { useState } from 'react';
import { ArrowLeft, Award, Star, Gift, TrendingUp, Users, Target, Zap, Crown, Share2 } from 'lucide-react';
import { User } from '../types/user';

interface RewardsDashboardProps {
  user: User;
  onBack: () => void;
}

export default function RewardsDashboard({ user, onBack }: RewardsDashboardProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'badges' | 'leaderboard'>('overview');
  
  const progressToNextTier = (user.ecoPoints % 1000) / 1000 * 100;
  const nextTierPoints = 1000 - (user.ecoPoints % 1000);

  const weeklyLeaderboard = [
    { rank: 1, name: 'Alex Chen', points: 3420, co2Saved: 62.1, avatar: '👨‍💼' },
    { rank: 2, name: 'Maria Garcia', points: 3180, co2Saved: 58.3, avatar: '👩‍🔬' },
    { rank: 3, name: 'Sarah Johnson', points: user.ecoPoints, co2Saved: user.totalCo2eSaved, avatar: '👩‍💻' },
    { rank: 4, name: 'David Kim', points: 2890, co2Saved: 45.2, avatar: '👨‍🎨' },
    { rank: 5, name: 'Emma Wilson', points: 2650, co2Saved: 42.8, avatar: '👩‍🚀' },
  ];

  const availableRewards = [
    { id: '1', name: '$5 Walmart Cash', cost: 200, type: 'cash', available: true },
    { id: '2', name: '$10 Walmart Cash', cost: 400, type: 'cash', available: true },
    { id: '3', name: '$25 Walmart Cash', cost: 1000, type: 'cash', available: true },
    { id: '4', name: 'Free Walmart+ Month', cost: 500, type: 'service', available: true },
    { id: '5', name: 'Eco-Friendly Product Bundle', cost: 800, type: 'product', available: true },
  ];

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
            <h1 className="text-2xl font-bold">Gigaton Rewards</h1>
            <p className="text-blue-100">Your sustainability journey</p>
          </div>
        </div>
      </div>

      {/* User Stats Hero */}
      <div className="p-6 bg-gradient-to-br from-[#00a862] to-green-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
              👩‍💻
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-green-100">Eco Champion • Level {Math.floor(user.ecoPoints / 1000) + 1}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span className="font-semibold">{user.ecoPoints} pts</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Gift className="h-4 w-4" />
                  <span className="font-semibold">${user.walmartCash} Cash</span>
                </div>
              </div>
            </div>
          </div>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-lg transition-all">
            <Share2 className="h-6 w-6" />
          </button>
        </div>

        {/* Progress to Next Level */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress to next level</span>
            <span className="text-sm">{nextTierPoints} points to go</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500" 
              style={{ width: `${progressToNextTier}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'badges', label: 'Badges', icon: Star },
            { id: 'leaderboard', label: 'Leaderboard', icon: Users }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedTab(id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                selectedTab === id
                  ? 'border-[#0071ce] text-[#0071ce]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Impact Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <Target className="h-8 w-8 text-[#00a862] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[#00a862]">{user.totalCo2eSaved}kg</div>
                <div className="text-sm text-gray-600">CO₂ Saved This Month</div>
                <div className="text-xs text-gray-500 mt-1">= 144 miles not driven</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                <Crown className="h-8 w-8 text-[#0071ce] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[#0071ce]">#{user.weeklyRank}</div>
                <div className="text-sm text-gray-600">Weekly Rank</div>
                <div className="text-xs text-gray-500 mt-1">Top 5% of shoppers</div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 text-center">
                <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-600">{user.badges.length}</div>
                <div className="text-sm text-gray-600">Badges Earned</div>
                <div className="text-xs text-gray-500 mt-1">Latest: Eco Hero</div>
              </div>
            </div>

            {/* Available Rewards */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Redeem Your Points</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRewards.map((reward) => (
                  <div key={reward.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{reward.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Award className="h-4 w-4 text-[#00a862]" />
                          <span className="text-sm text-gray-600">{reward.cost} points</span>
                        </div>
                      </div>
                      <button
                        disabled={user.ecoPoints < reward.cost}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                          user.ecoPoints >= reward.cost
                            ? 'bg-[#0071ce] text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {user.ecoPoints >= reward.cost ? 'Redeem' : 'Need More'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'badges' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.badges.map((badge) => (
                  <div key={badge.id} className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-1">{badge.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      badge.rarity === 'legendary' ? 'bg-purple-100 text-purple-800' :
                      badge.rarity === 'epic' ? 'bg-orange-100 text-orange-800' :
                      badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {badge.rarity}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Earned {badge.earnedAt.toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon Badges */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Coming Soon</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Carbon Crusader', description: 'Save 100kg CO₂', icon: '🦸‍♀️', requirement: '52.2kg to go' },
                  { name: 'Waste Warrior', description: 'Zero waste shopping streak', icon: '♻️', requirement: '5 trips to go' },
                  { name: 'Influencer', description: 'Refer 10 friends', icon: '📢', requirement: '8 friends to go' }
                ].map((badge, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 text-center opacity-75">
                    <div className="text-4xl mb-3 grayscale">{badge.icon}</div>
                    <h4 className="font-bold text-gray-700 mb-1">{badge.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{badge.description}</p>
                    <p className="text-xs text-[#0071ce] font-medium">{badge.requirement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'leaderboard' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly EcoChampions</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  {weeklyLeaderboard.map((player) => (
                    <div key={player.rank} className={`flex items-center space-x-4 p-3 rounded-lg ${
                      player.name === user.name ? 'bg-[#0071ce] text-white' : 'bg-white'
                    }`}>
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                        player.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                        player.rank === 2 ? 'bg-gray-300 text-gray-800' :
                        player.rank === 3 ? 'bg-orange-400 text-orange-900' :
                        player.name === user.name ? 'bg-white bg-opacity-20 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        #{player.rank}
                      </div>
                      <div className="text-2xl">{player.avatar}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{player.name}</div>
                        <div className={`text-sm ${player.name === user.name ? 'text-blue-100' : 'text-gray-600'}`}>
                          {player.co2Saved}kg CO₂ saved
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{player.points} pts</div>
                        <div className={`text-sm ${player.name === user.name ? 'text-blue-100' : 'text-gray-600'}`}>
                          {player.rank <= 3 && '🏆'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Challenge */}
            <div className="bg-gradient-to-r from-[#00a862] to-green-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Weekly Challenge</h3>
              <p className="mb-4">Reduce your cart's carbon footprint by 20% this week</p>
              <div className="bg-white bg-opacity-20 rounded-full h-3 mb-2">
                <div className="bg-white h-3 rounded-full w-1/3"></div>
              </div>
              <p className="text-sm text-green-100">Progress: 33% complete • 4 days left</p>
              <p className="text-sm font-semibold mt-2">Reward: 500 EcoPoints + Exclusive Badge</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}