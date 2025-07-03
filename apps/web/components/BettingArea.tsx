'use client';
import { useState, useEffect } from 'react';
import { BetType, RouletteNumber, NumberColor, CHIPS } from '@/types/roulette';

// Roulette number layout with positions
const ROULETTE_NUMBERS: RouletteNumber[] = [
  // Row 1
  { value: 3, color: 'red', row: 1, column: 1, isSelected: false },
  { value: 6, color: 'black', row: 1, column: 2, isSelected: false },
  { value: 9, color: 'red', row: 1, column: 3, isSelected: false },
  { value: 12, color: 'red', row: 1, column: 4, isSelected: false },
  { value: 15, color: 'black', row: 1, column: 5, isSelected: false },
  { value: 18, color: 'red', row: 1, column: 6, isSelected: false },
  { value: 21, color: 'red', row: 1, column: 7, isSelected: false },
  { value: 24, color: 'black', row: 1, column: 8, isSelected: false },
  { value: 27, color: 'red', row: 1, column: 9, isSelected: false },
  { value: 30, color: 'red', row: 1, column: 10, isSelected: false },
  { value: 33, color: 'black', row: 1, column: 11, isSelected: false },
  { value: 36, color: 'red', row: 1, column: 12, isSelected: false },
  
  // Row 2
  { value: 2, color: 'black', row: 2, column: 1, isSelected: false },
  { value: 5, color: 'red', row: 2, column: 2, isSelected: false },
  { value: 8, color: 'black', row: 2, column: 3, isSelected: false },
  { value: 11, color: 'black', row: 2, column: 4, isSelected: false },
  { value: 14, color: 'red', row: 2, column: 5, isSelected: false },
  { value: 17, color: 'black', row: 2, column: 6, isSelected: false },
  { value: 20, color: 'black', row: 2, column: 7, isSelected: false },
  { value: 23, color: 'red', row: 2, column: 8, isSelected: false },
  { value: 26, color: 'black', row: 2, column: 9, isSelected: false },
  { value: 29, color: 'black', row: 2, column: 10, isSelected: false },
  { value: 32, color: 'red', row: 2, column: 11, isSelected: false },
  { value: 35, color: 'black', row: 2, column: 12, isSelected: false },
  
  // Row 3
  { value: 1, color: 'red', row: 3, column: 1, isSelected: false },
  { value: 4, color: 'black', row: 3, column: 2, isSelected: false },
  { value: 7, color: 'red', row: 3, column: 3, isSelected: false },
  { value: 10, color: 'black', row: 3, column: 4, isSelected: false },
  { value: 13, color: 'black', row: 3, column: 5, isSelected: false },
  { value: 16, color: 'red', row: 3, column: 6, isSelected: false },
  { value: 19, color: 'red', row: 3, column: 7, isSelected: false },
  { value: 22, color: 'black', row: 3, column: 8, isSelected: false },
  { value: 25, color: 'red', row: 3, column: 9, isSelected: false },
  { value: 28, color: 'black', row: 3, column: 10, isSelected: false },
  { value: 31, color: 'black', row: 3, column: 11, isSelected: false },
  { value: 34, color: 'red', row: 3, column: 12, isSelected: false },
  
  // Row 4 (0 and 00)
  { value: 0, color: 'green', row: 4, column: 1, isSelected: false },
];

interface BettingAreaProps {
  selectedBet: {
    type: BetType;
    numbers: number[];
  };
  onSelectBet: (bet: { type: BetType; numbers: number[] }) => void;
  onPlaceBet: (amount: number) => void;
  betAmount: number;
  onBetAmountChange: (amount: number) => void;
  disabled: boolean;
}

export default function BettingArea({
  selectedBet,
  onSelectBet,
  onPlaceBet,
  betAmount,
  onBetAmountChange,
  disabled,
}: BettingAreaProps) {
  const [numbers, setNumbers] = useState<RouletteNumber[]>(ROULETTE_NUMBERS);
  const [selectedChip, setSelectedChip] = useState<number>(CHIPS[0].value);
  
  const handleNumberClick = (number: number) => {
    if (disabled) return;
    
    const updatedNumbers = numbers.map(n => 
      n.value === number ? { ...n, isSelected: !n.isSelected } : n
    );
    
    setNumbers(updatedNumbers);
    
    const selectedNumbers = updatedNumbers
      .filter(n => n.isSelected)
      .map(n => n.value);
    
    onSelectBet({
      type: selectedBet.type,
      numbers: selectedNumbers
    });
  };
  
  const handleBetTypeChange = (type: BetType) => {
    onSelectBet({ type, numbers: [] });
    setNumbers(numbers.map(n => ({ ...n, isSelected: false })));
  };
  
  const getColorClass = (color: NumberColor) => {
    switch (color) {
      case 'red': return 'bg-red-600 hover:bg-red-700';
      case 'black': return 'bg-gray-900 hover:bg-black';
      case 'green': return 'bg-green-700 hover:bg-green-800';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className="bg-green-800 p-4 rounded-lg shadow-lg">
      {/* Bet Type Selector */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {(['STRAIGHT', 'SPLIT', 'STREET', 'CORNER', 'LINE', 'RED', 'BLACK', 'ODD', 'EVEN', 'DOZEN', 'COLUMN'] as BetType[]).map(type => (
          <button
            key={type}
            className={`py-2 px-3 rounded text-sm font-semibold ${
              selectedBet.type === type 
                ? 'bg-yellow-500 text-black' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
            onClick={() => handleBetTypeChange(type)}
            disabled={disabled}
          >
            {type}
          </button>
        ))}
      </div>
      
      {/* Roulette Table */}
      <div className="grid grid-cols-13 gap-px bg-gray-600 mb-4">
        {/* Column for 0 */}
        <div 
          className={`col-span-1 flex items-center justify-center p-1 h-16 cursor-pointer ${
            numbers.find(n => n.value === 0)?.isSelected ? 'ring-4 ring-yellow-400' : ''
          } ${getColorClass('green')}`}
          onClick={() => handleNumberClick(0)}
        >
          <span className="text-white font-bold">0</span>
        </div>
        
        {/* Main numbers grid */}
        <div className="col-span-12 grid grid-cols-12 gap-px">
          {[1, 2, 3].map(row => (
            numbers
              .filter(n => n.row === row)
              .map(number => (
                <div
                  key={number.value}
                  className={`flex items-center justify-center p-1 h-16 cursor-pointer ${
                    number.isSelected ? 'ring-4 ring-yellow-400' : ''
                  } ${getColorClass(number.color)}`}
                  onClick={() => handleNumberClick(number.value)}
                >
                  <span className="text-white font-bold">{number.value}</span>
                </div>
              ))
          ))}
        </div>
      </div>
      
      {/* Special Bet Areas */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          className={`py-3 rounded font-bold ${
            selectedBet.numbers.includes(-1) 
              ? 'ring-4 ring-yellow-400 bg-red-700' 
              : 'bg-red-600 hover:bg-red-700'
          } text-white`}
          onClick={() => onSelectBet({ 
            type: 'RED', 
            numbers: [-1] 
          })}
          disabled={disabled}
        >
          RED
        </button>
        <button
          className={`py-3 rounded font-bold ${
            selectedBet.numbers.includes(-2) 
              ? 'ring-4 ring-yellow-400 bg-black' 
              : 'bg-gray-900 hover:bg-black'
          } text-white`}
          onClick={() => onSelectBet({ 
            type: 'BLACK', 
            numbers: [-2] 
          })}
          disabled={disabled}
        >
          BLACK
        </button>
        <button
          className={`py-3 rounded font-bold ${
            selectedBet.numbers.includes(-3) 
              ? 'ring-4 ring-yellow-400 bg-gray-700' 
              : 'bg-gray-600 hover:bg-gray-700'
          } text-white`}
          onClick={() => onSelectBet({ 
            type: 'ODD', 
            numbers: [-3] 
          })}
          disabled={disabled}
        >
          ODD
        </button>
        <button
          className={`py-3 rounded font-bold ${
            selectedBet.numbers.includes(-4) 
              ? 'ring-4 ring-yellow-400 bg-gray-700' 
              : 'bg-gray-600 hover:bg-gray-700'
          } text-white`}
          onClick={() => onSelectBet({ 
            type: 'EVEN', 
            numbers: [-4] 
          })}
          disabled={disabled}
        >
          EVEN
        </button>
        <button
          className={`py-3 rounded font-bold ${
            selectedBet.numbers.includes(-5) 
              ? 'ring-4 ring-yellow-400 bg-gray-700' 
              : 'bg-gray-600 hover:bg-gray-700'
          } text-white`}
          onClick={() => onSelectBet({ 
            type: 'DOZEN', 
            numbers: [-5] 
          })}
          disabled={disabled}
        >
          1st 12
        </button>
        <button
          className={`py-3 rounded font-bold ${
            selectedBet.numbers.includes(-6) 
              ? 'ring-4 ring-yellow-400 bg-gray-700' 
              : 'bg-gray-600 hover:bg-gray-700'
          } text-white`}
          onClick={() => onSelectBet({ 
            type: 'DOZEN', 
            numbers: [-6] 
          })}
          disabled={disabled}
        >
          2nd 12
        </button>
      </div>
      
      {/* Chip Selection */}
      <div className="flex justify-center space-x-2 mb-4">
        {CHIPS.map(chip => (
          <button
            key={chip.value}
            className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
              selectedChip === chip.value
                ? 'border-yellow-400 scale-110'
                : 'border-transparent'
            }`}
            style={{ backgroundColor: chip.color }}
            onClick={() => {
              setSelectedChip(chip.value);
              onBetAmountChange(chip.value);
            }}
            disabled={disabled}
          >
            <span className={`font-bold ${
              chip.color === 'black' ? 'text-white' : 'text-black'
            }`}>
              {chip.value}
            </span>
          </button>
        ))}
      </div>
      
      {/* Bet Controls */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-white mb-2">Bet Amount: ${betAmount}</div>
          <input
            type="range"
            min="1"
            max="1000"
            value={betAmount}
            onChange={(e) => onBetAmountChange(parseInt(e.target.value))}
            className="w-full"
            disabled={disabled}
          />
          <div className="flex justify-between text-white text-sm">
            <span>$1</span>
            <span>$500</span>
            <span>$1000</span>
          </div>
        </div>
        
        <button
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded font-bold disabled:opacity-50"
          onClick={() => onPlaceBet(betAmount)}
          disabled={disabled || selectedBet.numbers.length === 0}
        >
          Place Bet
        </button>
      </div>
    </div>
  );
}