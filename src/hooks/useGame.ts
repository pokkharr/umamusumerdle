import { useCallback, useEffect, useState } from 'react';
import type { GameState, GuessRow } from '../types';
import { evaluateGuess, getRandomAnswer } from '../lib/wordle';

const MAX_GUESSES = 5;

function buildInitialState(names: string[]): GameState {
  return {
    answer: getRandomAnswer(names),
    guesses: [],
    status: 'playing',
    maxGuesses: MAX_GUESSES,
  };
}

export function useGame(names: string[]) {
  const [state, setState] = useState<GameState | null>(null);

  useEffect(() => {
    if (names.length > 0) {
      setState(buildInitialState(names));
    }
  }, [names]);

  // guess: 入力済みの文字列を受け取って判定
  const submitGuess = useCallback((guess: string, validNames: string[]) => {
    setState(prev => {
      if (!prev || prev.status !== 'playing' || !guess) return prev;
      if (!validNames.includes(guess)) return prev;

      const chars = evaluateGuess(guess, prev.answer);
      const newRow: GuessRow = { chars };
      const newGuesses = [...prev.guesses, newRow];

      const won = guess === prev.answer;
      const lost = !won && newGuesses.length >= MAX_GUESSES;

      return {
        ...prev,
        guesses: newGuesses,
        status: won ? 'won' : lost ? 'lost' : 'playing',
      };
    });
  }, []);

  const startNewGame = useCallback(() => {
    if (names.length > 0) {
      setState(buildInitialState(names));
    }
  }, [names]);

  return { state, submitGuess, startNewGame };
}
