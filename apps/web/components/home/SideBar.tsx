import React from 'react';
import { useState } from 'react';
import { 
    Search, 
    Home, 
    Gamepad2, 
    TrendingUp, 
    Radio, 
    Calendar, 
    Users, 
    Trophy, 
    Gift, 
    HelpCircle,
    Target,
} from 'lucide-react';

const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <aside 
            className={`
                fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] 
                bg-black/60 backdrop-blur-xl border-r border-purple-500/20
                transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0
            `}
        >
            <div className="p-4 space-y-6 h-full overflow-y-auto">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search for games"
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Gaming & Betting */}
                <div>
                    <h3 className="text-white/70 text-sm font-medium mb-3">Gaming & Betting</h3>
                    <nav className="space-y-1">
                        {[
                        { icon: Home, label: 'Home', active: true },
                        { icon: Gamepad2, label: 'New Games' },
                        { icon: TrendingUp, label: 'Popular' },
                        { icon: Radio, label: 'Live Games' },
                        { icon: Calendar, label: 'Events' },
                        { icon: Users, label: 'Providers' },
                        { icon: Target, label: 'Sportsbook' }
                        ].map((item, index) => (
                        <button 
                            key={index}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            item.active ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                        ))}
                    </nav>
                </div>

                {/* Player & Support */}
                <div>
                    <h3 className="text-white/70 text-sm font-medium mb-3">Player & Support</h3>
                    <nav className="space-y-1">
                        {[
                        { icon: Trophy, label: 'Leaderboard' },
                        { icon: Gift, label: 'Promotions' },
                        { icon: HelpCircle, label: 'FAQ' }
                        ].map((item, index) => (
                        <button 
                            key={index}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                        ))}
                    </nav>
                </div>
            </div>
        </aside>
    );
}

export default SideBar;