'use client';
import { useState } from 'react';

// Types
type BetType = 'STRAIGHT' | 'SPLIT' | 'STREET' | 'CORNER' | 'LINE' | 'RED' | 'BLACK' | 'ODD' | 'EVEN' | 'DOZEN' | 'COLUMN' | 'LOW' | 'HIGH';
type NumberColor = 'red' | 'black' | 'green';

interface RouletteNumber {
  value: number;
  color: NumberColor;
  row: number;
  column: number;
}

interface BettingAreaProps {
  selectedBet: {
    type: BetType;
    numbers: number[];
  };
  onSelectBet: (bet: { type: BetType; numbers: number[] }) => void;
  onPlaceBet: () => void;
  betAmount: number;
  onBetAmountChange: (amount: number) => void;
  disabled: boolean;
}

const CHIPS = [
  { value: 1, color: '#ffffff', textColor: '#000' },
  { value: 5, color: '#ff0000', textColor: '#fff' },
  { value: 10, color: '#0066cc', textColor: '#fff' },
  { value: 25, color: '#00cc00', textColor: '#000' },
  { value: 100, color: '#000000', textColor: '#fff' },
];

// Roulette numbers with correct colors
const ROULETTE_NUMBERS: RouletteNumber[] = [
  // Row 1 (top)
  { value: 3, color: 'red', row: 1, column: 1 },
  { value: 6, color: 'black', row: 1, column: 2 },
  { value: 9, color: 'red', row: 1, column: 3 },
  { value: 12, color: 'red', row: 1, column: 4 },
  { value: 15, color: 'black', row: 1, column: 5 },
  { value: 18, color: 'red', row: 1, column: 6 },
  { value: 21, color: 'red', row: 1, column: 7 },
  { value: 24, color: 'black', row: 1, column: 8 },
  { value: 27, color: 'red', row: 1, column: 9 },
  { value: 30, color: 'red', row: 1, column: 10 },
  { value: 33, color: 'black', row: 1, column: 11 },
  { value: 36, color: 'red', row: 1, column: 12 },
  
  // Row 2 (middle)
  { value: 2, color: 'black', row: 2, column: 1 },
  { value: 5, color: 'red', row: 2, column: 2 },
  { value: 8, color: 'black', row: 2, column: 3 },
  { value: 11, color: 'black', row: 2, column: 4 },
  { value: 14, color: 'red', row: 2, column: 5 },
  { value: 17, color: 'black', row: 2, column: 6 },
  { value: 20, color: 'black', row: 2, column: 7 },
  { value: 23, color: 'red', row: 2, column: 8 },
  { value: 26, color: 'black', row: 2, column: 9 },
  { value: 29, color: 'black', row: 2, column: 10 },
  { value: 32, color: 'red', row: 2, column: 11 },
  { value: 35, color: 'black', row: 2, column: 12 },
  
  // Row 3 (bottom)
  { value: 1, color: 'red', row: 3, column: 1 },
  { value: 4, color: 'black', row: 3, column: 2 },
  { value: 7, color: 'red', row: 3, column: 3 },
  { value: 10, color: 'black', row: 3, column: 4 },
  { value: 13, color: 'black', row: 3, column: 5 },
  { value: 16, color: 'red', row: 3, column: 6 },
  { value: 19, color: 'red', row: 3, column: 7 },
  { value: 22, color: 'black', row: 3, column: 8 },
  { value: 25, color: 'red', row: 3, column: 9 },
  { value: 28, color: 'black', row: 3, column: 10 },
  { value: 31, color: 'black', row: 3, column: 11 },
  { value: 34, color: 'red', row: 3, column: 12 },
  
  // Zero
  { value: 0, color: 'green', row: 4, column: 1 },
];

function BettingArea({
  selectedBet,
  onSelectBet,
  onPlaceBet,
  betAmount,
  onBetAmountChange,
  disabled,
}: BettingAreaProps) {
  const [selectedChip, setSelectedChip] = useState<number>(CHIPS[0].value);
  
  const handleNumberClick = (number: number) => {
    if (disabled) return;
    
    const isSelected = selectedBet.numbers.includes(number);
    let newNumbers;
    
    if (isSelected) {
      newNumbers = selectedBet.numbers.filter(n => n !== number);
    } else {
      newNumbers = [...selectedBet.numbers, number];
    }
    
    onSelectBet({
      type: selectedBet.type,
      numbers: newNumbers
    });
  };
  
  const handleSpecialBet = (type: BetType, numbers: number[]) => {
    onSelectBet({ type, numbers });
  };
  
  const getNumberColor = (color: NumberColor) => {
    switch (color) {
      case 'red': return 'bg-red-600';
      case 'black': return 'bg-gray-900';
      case 'green': return 'bg-green-600';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-800 to-green-900 p-3 rounded-xl shadow-2xl max-w-4xl mx-auto">
      {/* Main Roulette Table */}
      <div className="bg-green-700 p-2 rounded-lg border-2 border-yellow-600 shadow-inner">
        <div className="flex gap-1">
          {/* Zero Section */}
          <div 
            className={`w-10 h-32 flex items-center justify-center cursor-pointer border border-yellow-600 transition-all duration-200 ${
              selectedBet.numbers.includes(0) 
                ? 'bg-green-400 ring-2 ring-yellow-300 shadow-lg' 
                : 'bg-green-600 hover:bg-green-500'
            }`}
            onClick={() => handleNumberClick(0)}
          >
            <span className="text-white font-bold text-lg">0</span>
          </div>
          
          {/* Main Numbers Grid */}
          <div className="flex-1 ml-1">
            <div className="grid grid-cols-12 gap-1 mb-1">
              {[1, 2, 3].map(row => (
                ROULETTE_NUMBERS
                  .filter(n => n.row === row)
                  .sort((a, b) => a.column - b.column)
                  .map(number => (
                    <div
                      key={number.value}
                      className={`h-10 flex items-center justify-center cursor-pointer border border-yellow-600 transition-all duration-200 ${
                        selectedBet.numbers.includes(number.value) 
                          ? `${getNumberColor(number.color)} ring-2 ring-yellow-300 shadow-lg` 
                          : `${getNumberColor(number.color)} hover:brightness-110`
                      }`}
                      onClick={() => handleNumberClick(number.value)}
                    >
                      <span className="text-white font-bold text-sm">{number.value}</span>
                    </div>
                  ))
              ))}
            </div>
            
            {/* Column Bets (2:1) */}
            <div className="grid grid-cols-12 gap-1">
              {[1, 2, 3].map(column => (
                <div key={column} className="col-span-4">
                  <button
                    className={`w-full h-6 bg-green-600 hover:bg-green-500 border border-yellow-600 text-white font-bold text-xs transition-all duration-200 ${
                      selectedBet.type === 'COLUMN' && selectedBet.numbers.includes(column)
                        ? 'ring-2 ring-yellow-300 bg-green-400'
                        : ''
                    }`}
                    onClick={() => handleSpecialBet('COLUMN', [column])}
                    disabled={disabled}
                  >
                    2:1
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Dozen Bets */}
        <div className="grid grid-cols-3 gap-1 mt-2 mb-2">
          <button
            className={`py-2 bg-green-600 hover:bg-green-500 border border-yellow-600 text-white font-bold text-sm transition-all duration-200 ${
              selectedBet.type === 'DOZEN' && selectedBet.numbers.includes(1)
                ? 'ring-2 ring-yellow-300 bg-green-400'
                : ''
            }`}
            onClick={() => handleSpecialBet('DOZEN', [1])}
            disabled={disabled}
          >
            1 to 12
          </button>
          <button
            className={`py-2 bg-green-600 hover:bg-green-500 border border-yellow-600 text-white font-bold text-sm transition-all duration-200 ${
              selectedBet.type === 'DOZEN' && selectedBet.numbers.includes(2)
                ? 'ring-2 ring-yellow-300 bg-green-400'
                : ''
            }`}
            onClick={() => handleSpecialBet('DOZEN', [2])}
            disabled={disabled}
          >
            13 to 24
          </button>
          <button
            className={`py-2 bg-green-600 hover:bg-green-500 border border-yellow-600 text-white font-bold text-sm transition-all duration-200 ${
              selectedBet.type === 'DOZEN' && selectedBet.numbers.includes(3)
                ? 'ring-2 ring-yellow-300 bg-green-400'
                : ''
            }`}
            onClick={() => handleSpecialBet('DOZEN', [3])}
            disabled={disabled}
          >
            25 to 36
          </button>
        </div>
        
        {/* Even Money Bets */}
        <div className="grid grid-cols-6 gap-1">
          <button
            className={`py-2 bg-green-600 hover:bg-green-500 border border-yellow-600 text-white font-bold text-sm transition-all duration-200 ${
              selectedBet.type === 'LOW' 
                ? 'ring-2 ring-yellow-300 bg-green-400'
                : ''
            }`}
            onClick={() => handleSpecialBet('LOW', [1])}
            disabled={disabled}
          >
            1 to 18
          </button>
          <button
            className={`py-2 bg-green-600 hover:bg-green-500 border border-yellow-600 text-white font-bold text-sm transition-all duration-200 ${
              selectedBet.type === 'EVEN' 
                ? 'ring-2 ring-yellow-300 bg-green-400'
                : ''
            }`}
            onClick={() => handleSpecialBet('EVEN', [1])}
            disabled={disabled}
          >
            Even
          </button>
          <button
            className={`py-2 bg-red-600 hover:bg-red-500 border border-yellow-600 text-white font-bold text-sm transition-all duration-200 ${
              selectedBet.type === 'RED' 
                ? 'ring-2 ring-yellow-300 bg-red-400'
                : ''
            }`}
            onClick={() => handleSpecialBet('RED', [1])}
            disabled={disabled}
          >
            Red
          </button>
          <button
            className={`py-2 bg-gray-900 hover:bg-gray-800 border border-yellow-600 text-white font-bold text-sm transition-all duration-200 ${
              selectedBet.type === 'BLACK' 
                ? 'ring-2 ring-yellow-300 bg-gray-700'
                : ''
            }`}
            onClick={() => handleSpecialBet('BLACK', [1])}
            disabled={disabled}
          >
            Black
          </button>
          <button
            className={`py-2 bg-green-600 hover:bg-green-500 border border-yellow-600 text-white font-bold text-sm transition-all duration-200 ${
              selectedBet.type === 'ODD' 
                ? 'ring-2 ring-yellow-300 bg-green-400'
                : ''
            }`}
            onClick={() => handleSpecialBet('ODD', [1])}
            disabled={disabled}
          >
            Odd
          </button>
          <button
            className={`py-2 bg-green-600 hover:bg-green-500 border border-yellow-600 text-white font-bold text-sm transition-all duration-200 ${
              selectedBet.type === 'HIGH' 
                ? 'ring-2 ring-yellow-300 bg-green-400'
                : ''
            }`}
            onClick={() => handleSpecialBet('HIGH', [1])}
            disabled={disabled}
          >
            19 to 36
          </button>
        </div>
      </div>
      
      <div className="mt-3 bg-green-800 p-3 rounded-lg border border-yellow-600">
        <div className="flex items-center justify-between">
          {/* Chip Selection */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 font-bold text-sm">Chips:</span>
            <div className="flex gap-1">
              {CHIPS.map(chip => (
                <button
                  key={chip.value}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200 ${
                    selectedChip === chip.value
                      ? 'border-yellow-300 scale-110 shadow-lg'
                      : 'border-gray-600 hover:scale-105'
                  }`}
                  style={{ 
                    backgroundColor: chip.color,
                    color: chip.textColor
                  }}
                  onClick={() => {
                    setSelectedChip(chip.value);
                    onBetAmountChange(chip.value);
                  }}
                  disabled={disabled}
                >
                  ${chip.value}
                </button>
              ))}
            </div>
          </div>
          
          {/* Bet Amount and Place Bet */}
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-yellow-300 text-xs font-medium">Bet</div>
              <div className="text-white text-lg font-bold">${betAmount}</div>
            </div>
            
            <button
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                disabled || selectedBet.numbers.length === 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-yellow-600 hover:bg-yellow-500 text-white hover:scale-105 shadow-lg'
              }`}
              onClick={onPlaceBet}
              disabled={disabled || selectedBet.numbers.length === 0}
            >
              Place Bet
            </button>
          </div>
        </div>
      </div>
      
      {/* Balance Display */}
      <div className="mt-2 text-center">
        <div className="text-yellow-300 text-sm">
          Balance: <span className="font-bold text-lg text-white">$2,500</span>
        </div>
      </div>
    </div>
  );
}

export default BettingArea;