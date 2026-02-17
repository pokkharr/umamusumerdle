import type { TileStatus } from '../types';
import { KANA_GRID } from '../lib/katakana';

interface Props {
  charStatusMap: Map<string, TileStatus>;
  onChar: (char: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  disabled: boolean;
}

const CHAR_COLORS: Record<TileStatus, string> = {
  correct: 'bg-green-600 border-green-600 text-white',
  present: 'bg-yellow-500 border-yellow-500 text-white',
  absent:  'bg-zinc-700 border-zinc-600 text-zinc-500 opacity-50',
  empty:   'bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700 active:bg-zinc-600',
  active:  'bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700 active:bg-zinc-600',
};

export function KanaPanel({ charStatusMap, onChar, onDelete, onSubmit, disabled }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* 五十音グリッド（10行 × 10列、5行目と6行目の間に区切り線） */}
      {KANA_GRID.map((row, rowIdx) => (
        <div key={rowIdx}>
          {rowIdx === 5 && <div className="border-t border-zinc-600 my-1" />}
          <div className="flex gap-1">
            {row.map((kana, colIdx) =>
              kana ? (
                <button
                  key={colIdx}
                  onClick={() => onChar(kana)}
                  disabled={disabled}
                  className={`
                    flex-1 h-10 rounded border text-sm font-bold
                    transition-colors duration-100 select-none min-w-0
                    disabled:cursor-not-allowed
                    ${CHAR_COLORS[charStatusMap.get(kana) ?? 'empty']}
                  `}
                >
                  {kana}
                </button>
              ) : (
                <div key={colIdx} className="flex-1 min-w-0" />
              )
            )}
          </div>
        </div>
      ))}

      {/* 削除・確定ボタン */}
      <div className="flex gap-1 mt-1">
        <button
          onClick={onDelete}
          disabled={disabled}
          className="flex-1 h-10 rounded bg-zinc-700 text-white font-bold hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          ← 削除
        </button>
        <button
          onClick={onSubmit}
          disabled={disabled}
          className="flex-1 h-10 rounded bg-blue-600 text-white font-bold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          確定
        </button>
      </div>
    </div>
  );
}
