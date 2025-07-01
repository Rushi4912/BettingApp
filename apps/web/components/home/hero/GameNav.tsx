import { useState } from 'react';
import { Star, Target, Coins, Dice1, Crown, Zap, TrendingUp } from 'lucide-react';

const GameNav = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const gameCategories = [
    { id: 'All', name: 'All', icon: Star, color: 'from-purple-500 to-pink-500' },
    { id: 'Roulette', name: 'Roulette', icon: Target, color: 'from-red-500 to-orange-500' },
    { id: 'Baccarat', name: 'Baccarat', icon: Coins, color: 'from-green-500 to-emerald-500' },
    { id: 'Andhar bahar', name: 'Andhar bahar', icon: Dice1, color: 'from-blue-500 to-cyan-500' },
    { id: 'Poker', name: 'Poker', icon: Crown, color: 'from-yellow-500 to-orange-500' },
    { id: 'Black jack', name: 'Black jack', icon: Zap, color: 'from-purple-500 to-violet-500' },
    { id: 'Numbers', name: 'Numbers', icon: TrendingUp, color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {gameCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
            }`}
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameNav;