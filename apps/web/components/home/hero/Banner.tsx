import { ChevronRight } from 'lucide-react';

const Banner = () => (
  <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-2xl p-8 overflow-hidden">
    <div className="relative z-10 flex items-center justify-between">
      <div className="max-w-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        LIFE’S SHORT .
          <br />
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          DOUBLE IT
          </span>
        </h1>
        <p className="text-xl text-white/90 mb-6">Enjoy the fun with casino</p>
        <button className="px-8 py-3 bg-gradient-to-r from-purple-800 to-purple-900 text-white rounded-xl hover:from-purple-900 hover:to-black transition-all transform hover:scale-105 font-semibold">
          Play Now
        </button>
      </div>
      
      <div className="hidden lg:block">
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-6xl font-bold text-white shadow-2xl">
            777
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full animate-pulse delay-75"></div>
        </div>
      </div>
    </div>
  </div>
);

export default Banner;