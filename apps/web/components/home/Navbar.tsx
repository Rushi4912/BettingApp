import React from 'react';
import { useState } from 'react';
import { 
    Trophy, 
    Menu,
    Dice1,
    Zap,
} from 'lucide-react';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-900 border-b border-purple-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side - Aligned with sidebar width */}
                    <div className="flex items-center lg:w-64">
                        <button 
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 transition-colors mr-2"
                        >
                            <Menu className="w-5 h-5 text-white" />
                        </button>
                        
                        <div className="flex items-center gap-2 ">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">VELVET ODDS</span>
                        </div>
                    </div>

                    {/* Center - Casino/Sports links */}
                    <div className="flex-1 flex justify-center pl-4 pr-4 lg:pl-0 lg:pr-0">
                        <nav className="hidden md:flex items-center gap-2">
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-purple-700 transition-colors">
                                <Dice1 className="w-4 h-4" />
                                Casino
                            </button>
                            <button className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg font-medium flex items-center gap-2 transition-colors">
                                <Trophy className="w-4 h-4" />
                                Sports
                            </button>
                        </nav>
                    </div>

                    {/* Right side - Aligned with chatbar width */}
                    <div className="flex items-center justify-end w-80">
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 text-white border border-purple-500/30 rounded-lg hover:bg-purple-600/20 transition-colors">
                                Log In
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;