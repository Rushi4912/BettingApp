'use client';
import { useEffect, useState, useRef } from 'react';
import RouletteWheel from '@/components/RouletteWheel';
import BettingArea from '@/components/BettingArea';
import { placeBet, spinWheel, getCurrentGame } from '@/lib/roulete-actions'; 
import { RouletteGameWithBets } from '@/types/roulette';
import { toast } from 'react-hot-toast';
import { BetType } from '@/types/roulette';
import Navbar from '@/components/home/Navbar';

const RouletteGame = ({ initialGame }: { initialGame: RouletteGameWithBets }) => {
  const [game, setGame] = useState(initialGame);
  const [betAmount, setBetAmount] = useState(10);
  const [selectedBet, setSelectedBet] = useState<{
    type: BetType;
    numbers: number[];
  }>({
    type: 'STRAIGHT',
    numbers: []
  });
  const [isSpinning, setIsSpinning] = useState(false);
  
  const socketRef = useRef<WebSocket | null>(null);
  const gameIdRef = useRef<string | null>(initialGame?.id ?? null);

  // Setup WebSocket connection
  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      // Join the current game room
      ws.send(JSON.stringify({ 
        action: 'join-game', 
        gameId: gameIdRef.current 
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch(data.event) {
        case 'GAME_UPDATED':
          if (data.data.id === gameIdRef.current) {
            setGame(data.data);
          }
          break;
          
        case 'NEW_GAME_STARTED':
          gameIdRef.current = data.data.id;
          setGame(data.data);
          setIsSpinning(false);
          // Join the new game room
          ws.send(JSON.stringify({ 
            action: 'join-game', 
            gameId: data.data.id 
          }));
          break;
          
        case 'BET_PLACED':
          setGame(prev => ({
            ...prev,
            bets: [...prev.bets, data.data]
          }));
          break;
          
        case 'SPIN_STARTED':
          setGame(prev => ({
            ...prev,
            status: 'SPINNING'
          }));
          setIsSpinning(true);
          break;
          
        case 'GAME_RESULT':
          setGame(prev => ({
            ...prev,
            status: 'COMPLETED',
            result: data.data.result,
            bets: prev.bets.map(bet => ({
              ...bet,
              payout: data.data.bets.find((b: any) => b.id === bet.id)?.payout
            }))
          }));
          setIsSpinning(false);
          break;
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  // Handle new game creation after current game ends
  useEffect(() => {
    if (!game) return;
    if (game.status === 'COMPLETED') {
      const timer = setTimeout(async () => {
        try {
          const newGame = await getCurrentGame();
          gameIdRef.current = newGame.id;
          setGame(newGame);
          setIsSpinning(false);
          
          // Join new game room
          if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ 
              action: 'join-game', 
              gameId: newGame.id 
            }));
          }
        } catch (error) {
          toast.error('Failed to start new game');
        }
      }, 10000); // Start new game after 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, [game?.status]);

 
  const handlePlaceBet = async () => {
    if (selectedBet.numbers.length === 0) {
      toast.error('Please select a bet first');
      return;
    }
    
    try {
      await placeBet(game.id, selectedBet.type, selectedBet.numbers, betAmount);
      toast.success('Bet placed!');
      // Reset selected numbers after placing bet
      setSelectedBet(prev => ({
        type: prev.type,  // Keep the same bet type
        numbers: []      
      }));
    } catch (error: any) {
      toast.error(error.message || 'Failed to place bet');
    }
  };

  const handleSpin = async () => {
    if (!game) {
      toast.error("Game not initialized.");
      return;
    }

    if (game.status !== 'WAITING') {
      toast.error("Cannot spin wheel at this time.");
      return;
    }

    if (game.bets.length === 0) {
      toast.error("Please place at least one bet before spinning.");
      return;
    }
  
    try {
      setIsSpinning(true);
      await spinWheel(game.id);
      toast.success("Wheel spinning!");
    } catch (error: any) {
      setIsSpinning(false);
      toast.error(error?.message || "Failed to start spin");
    }
  };

  // Check if spin button should be disabled
  const isSpinDisabled = game?.status !== 'WAITING' || game?.bets.length === 0 || isSpinning;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 ">
     
     <Navbar/>
      {/* Main Game Layout */}
      <div className="container mx-auto px-4 py-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-screen">
          
          {/* Left Side - Roulette Wheel & Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Roulette Wheel Section */}
            <div className="bg-gray-800 border border-gray-600 rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-center mb-6 text-red-400">Roulette Wheel</h2>
              
              {/* Fixed Wheel Container with Perfect Alignment */}
              <div className="flex justify-center items-center mb-6">
  <div className="relative w-[440px] h-[440px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-4 border-gray-600 shadow-2xl overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <RouletteWheel
        isSpinning={isSpinning || game?.status === 'SPINNING'}
        result={game?.result}
      />
    </div>
    {/* pointer stays exactly as before */}
    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-yellow-400 shadow-lg z-20">
      <div className="absolute top-[20px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-yellow-500"></div>
    </div>
  </div>
</div>


              {/* Professional Spin Button */}
              <div className="flex justify-center">
  <button
    onClick={handleSpin}
    disabled={isSpinDisabled}
    className={`
      relative flex items-center justify-center gap-3
      px-8 py-4
      rounded-full
      font-medium text-lg uppercase tracking-wide
      transition-transform duration-200
      ${isSpinDisabled
        ? 'bg-gray-700 text-gray-400 cursor-not-allowed shadow-inner'
        : 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300'
      }
    `}
  >
    {isSpinning || game?.status === 'SPINNING' ? (
      <>
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        Spinning…
      </>
    ) : (
      <>
        Spin Wheel
      </>
    )}
  </button>
</div>


              
              {/* Status Messages */}
              <div className="mt-3 text-center">
                {game?.status === 'WAITING' && game?.bets.length === 0 && (
                  <p className="text-xs text-gray-400">
                    Place a bet to spin the wheel
                  </p>
                )}
                {game?.status === 'SPINNING' && (
                  <p className="text-xs text-yellow-400 animate-pulse">
                    Good luck! 🍀
                  </p>
                )}
                {game?.status === 'COMPLETED' && (
                  <p className="text-xs text-green-400">
                    Game completed! New game starting soon...
                  </p>
                )}
              </div>
            </div>

            {/* Game Status */}
            <div className="bg-gray-800 border border-gray-600 rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-center mb-4 text-red-400">Game Status</h3>
              
              <div className="flex items-center justify-center mb-4">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  game?.status === 'WAITING' ? 'bg-green-500' : 
                  game?.status === 'SPINNING' ? 'bg-yellow-500 animate-pulse' : 
                  'bg-red-500'
                }`}></div>
                <span className="text-sm font-medium">
                  {game?.status === 'WAITING' ? 'Waiting for bets' : 
                   game?.status === 'SPINNING' ? 'Spinning...' : 
                   'Game completed'}
                </span>
              </div>

              {/* Game Result */}
              {game?.status === 'COMPLETED' && game.result !== undefined && (
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 mt-4">
                  <h4 className="font-medium mb-3 text-center text-yellow-400">🎯 Game Result</h4>
                  <div className="flex items-center justify-center mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 border-2 ${
                      game.result === 0 ? 'bg-green-700 border-green-500' : 
                      [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(game.result) 
                        ? 'bg-red-600 border-red-400' : 'bg-gray-900 border-gray-600'
                    }`}>
                      <span className="text-white font-bold text-lg">{game.result}</span>
                    </div>
                    <div>
                      <div className="font-semibold">
                        {game.result === 0 ? 'Green' : 
                        [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(game.result) 
                          ? 'Red' : 'Black'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {game.result % 2 === 0 && game.result !== 0 ? 'Even' : game.result === 0 ? 'Zero' : 'Odd'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Betting Area & Current Bets */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Betting Area */}
            <div className="bg-gray-800 border border-gray-600 rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-center mb-6 text-red-400">Place Your Bets</h2>
              <BettingArea
                selectedBet={selectedBet}
                onSelectBet={(bet: { type: BetType; numbers: number[] }) => setSelectedBet(bet)}
                onPlaceBet={handlePlaceBet}
                betAmount={betAmount}
                onBetAmountChange={setBetAmount}
                disabled={game?.status !== 'WAITING'}
              />
            </div>

            {/* Current Bets */}
            <div className="bg-gray-800 border border-gray-600 rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-center mb-4 text-red-400">Current Bets</h3>
              <div className="max-h-60 overflow-y-auto">
                {game?.bets.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-4xl mb-2">🎰</div>
                    <p className="text-sm">No bets placed yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {game?.bets.map(bet => (
                      <div key={bet.id} className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-green-400 font-semibold">${bet.amount}</span>
                          <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">{bet.type}</span>
                        </div>
                        <div className="text-yellow-400 text-sm mb-1">
                          {bet.numbers.map(n => n >= 0 ? n : {
                            '-1': 'RED',
                            '-2': 'BLACK',
                            '-3': 'ODD',
                            '-4': 'EVEN',
                            '-5': '1st 12',
                            '-6': '2nd 12',
                            '-7': '3rd 12'
                          }[n.toString()]).join(', ')}
                        </div>
                        {bet.payout && (
                          <div className="text-green-400 text-sm font-semibold">
                            Payout: ${bet.payout}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouletteGame;