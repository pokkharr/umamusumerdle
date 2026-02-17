import type { TileStatus } from '../types';

interface Props {
  char: string;
  status: TileStatus;
}

const STATUS_CLASSES: Record<TileStatus, string> = {
  correct: 'bg-green-600 border-green-600 text-white',
  present: 'bg-yellow-500 border-yellow-500 text-white',
  absent: 'bg-zinc-700 border-zinc-700 text-white',
  empty: 'bg-transparent border-zinc-600 text-white',
  active: 'bg-transparent border-zinc-400 text-white',
};

export function GuessTile({ char, status }: Props) {
  return (
    <div
      className={`
        flex items-center justify-center
        w-10 h-10 border-2 rounded
        text-lg font-bold
        transition-colors duration-300
        ${STATUS_CLASSES[status]}
      `}
    >
      {char}
    </div>
  );
}
