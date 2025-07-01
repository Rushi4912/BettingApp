import React from 'react';
import { useState } from 'react';
import {  
    MessageCircle,
    Coins,
    Send
  } from 'lucide-react';

const ChatBar = () => {
    const chatMessages = [
        { user: 'ShadowBet_07', level: 14, message: 'Just hit 50x on Lightning Roulette! Who\'s feeling lucky tonight! 🔥', time: '2m' },
        { user: 'AceStrike_99', level: 47, message: 'Mega win on Dragon Tiger! I\'m on fire 🔥 Who wants tips?', time: '3m' },
        { user: 'BluffMaster_13', level: 12, message: 'Dealer had 21 three times in a row... this game is RIGGED 😤', time: '5m' },
        { user: 'LuckyShot_05', level: 35, message: 'Pulled a 21 on my last card—Blackjack magic! 🃏', time: '7m' },
        { user: 'BetKing_88', level: 55, message: 'Turned 100 bucks into 10k in Baccarat... I might be the GOAT 🐐', time: '8m' }
      ];
  return (
      
      <aside className="hidden xl:block w-80 bg-black/40 backdrop-blur-xl border-l border-purple-500/20">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                    <h3 className="text-white font-semibold">Chat</h3>
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Live</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Coins className="w-4 h-4" />
                    <span className="text-sm font-medium">1400</span>
                  </div>
                </div>

                <div className="space-y-4 mb-4 h-96 overflow-y-auto">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                          {msg.user.charAt(0)}
                        </div>
                        <span className="text-purple-400 text-sm font-medium">{msg.user}</span>
                        <span className="text-xs text-white/50">Lvl {msg.level}</span>
                        <span className="text-xs text-white/30 ml-auto">{msg.time}</span>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">{msg.message}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Send a message..."
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </aside>
  )
}

export default ChatBar;
