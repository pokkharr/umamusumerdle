import type { GameState } from '../types';
import { GuessTile } from './GuessTile';

interface Props {
  state: GameState;
}

export function GuessGrid({ state }: Props) {
  const { guesses, maxGuesses } = state;
  const remaining = maxGuesses - guesses.length;

  if (guesses.length === 0) {
    return <p className="text-zinc-500 text-sm">まだ回答がありません</p>;
  }

  return (
    <div className="flex flex-col gap-2 items-start w-full">
      {guesses.map((row, i) => (
        <div key={i} className="flex gap-1 flex-wrap">
          {row.chars.map((c, j) => (
            <GuessTile key={j} char={c.char} status={c.status} />
          ))}
        </div>
      ))}
      {state.status === 'playing' && (
        <p className="text-zinc-500 text-xs mt-1">残り {remaining} 回</p>
      )}
    </div>
  );
}
