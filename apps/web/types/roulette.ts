// src/types/roulette.ts
export type BetType = 
  | 'STRAIGHT' 
  | 'SPLIT' 
  | 'STREET' 
  | 'CORNER' 
  | 'LINE' 
  | 'RED' 
  | 'BLACK' 
  | 'ODD' 
  | 'EVEN' 
  | 'DOZEN' 
  | 'COLUMN' 
  | 'BASKET';

export interface RouletteBet {
  id: string;
  userId: number;
  gameId: string;
  type: BetType;
  numbers: number[];
  amount: number;
  payout?: number;
  createdAt: Date;
}

export interface RouletteGame {
  id: string;
  status: 'WAITING' | 'SPINNING' | 'COMPLETED';
  result?: number;
  bets: RouletteBet[];
  createdAt: Date;
  completedAt?: Date;
}

export type RouletteGameWithBets = RouletteGame & {
  bets: RouletteBet[];
};

export type NumberColor = 'red' | 'black' | 'green';
export type NumberStatus = 'active' | 'inactive' | 'winning';

export interface RouletteNumber {
  value: number;
  color: NumberColor;
  row: number;
  column: number;
  isSelected: boolean;
}

export interface Chip {
  value: number;
  color: string;
}

export const CHIPS: Chip[] = [
  { value: 1, color: 'white' },
  { value: 5, color: 'red' },
  { value: 10, color: 'blue' },
  { value: 25, color: 'green' },
  { value: 100, color: 'black' },
];