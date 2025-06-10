export interface User {
  id: string;
  name: string;
  email: string;
  ecoPoints: number;
  walmartCash: number;
  badges: Badge[];
  weeklyRank: number;
  totalCo2eSaved: number;
  preferences: {
    voiceEnabled: boolean;
    notifications: boolean;
    dyslexiaMode: boolean;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}