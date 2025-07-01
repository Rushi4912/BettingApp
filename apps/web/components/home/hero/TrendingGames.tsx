import { Crown, TrendingUp, Gift, Trophy } from 'lucide-react';

const TrendingGames = () => {
  const trendingGames = [
    {
      title: 'Unlock 3+ memberships',
      description: 'Premium access',
      color: 'from-purple-600 to-purple-800',
      icon: Crown
    },
    {
      title: 'Play more, climb higher, win bigger!',
      description: 'Level up rewards',
      color: 'from-orange-600 to-red-600',
      icon: TrendingUp
    },
    {
      title: 'Spin daily, win big rewards!',
      description: 'Daily bonuses',
      color: 'from-pink-600 to-purple-600',
      icon: Gift
    },
    {
      title: 'Join tournaments',
      description: 'Compete globally',
      color: 'from-blue-600 to-cyan-600',
      icon: Trophy
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Trending Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingGames.map((game, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-r ${game.color} p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer group`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <game.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm leading-tight">{game.title}</h3>
              </div>
            </div>
            <p className="text-white/80 text-xs">{game.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingGames;