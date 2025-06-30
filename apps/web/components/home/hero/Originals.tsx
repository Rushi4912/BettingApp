import { ChevronLeft, ChevronRight } from 'lucide-react';

const Originals = () => {
  const originalGames = [
    { name: 'MINES', color: 'from-purple-600 to-pink-600', icon: '💎' },
    { name: 'SLOTS', color: 'from-yellow-600 to-orange-600', icon: '🎰' },
    { name: 'ROULETTE', color: 'from-red-600 to-pink-600', icon: '🎯' },
    { name: 'CRASH', color: 'from-blue-600 to-purple-600', icon: '🚀' },
    { name: 'DICE', color: 'from-green-600 to-emerald-600', icon: '🎲' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Originals</h2>
        <div className="flex gap-2">
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {originalGames.map((game, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-br ${game.color} p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer group relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="relative z-10 text-center">
              <div className="text-3xl mb-3">{game.icon}</div>
              <h3 className="text-white font-bold text-sm">{game.name}</h3>
            </div>
            <div className="absolute top-2 right-2">
              <ChevronRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Originals;