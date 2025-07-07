'use server';

import { RouletteGameWithBets } from '@/types/roulette';

const API_URL = process.env.BACKEND_API_URL;

export async function getCurrentGame(): Promise<RouletteGameWithBets> {
  const res = await fetch(`${API_URL}/roulette/current`);
  if (!res.ok) throw new Error('Failed to fetch game');
  return res.json();
}

export async function placeBet(
  gameId: string,
  type: string,
  numbers: number[],
  amount: number
) {
  const res = await fetch(`${API_URL}/roulette/${gameId}/bet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, numbers, amount })
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to place bet');
  }
  
  return res.json();
}

export async function spinWheel(gameId: string) {
  const res = await fetch(`${API_URL}/roulette/${gameId}/spin`, {
    method: 'POST'
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to spin wheel');
  }
  
  return res.json();
}