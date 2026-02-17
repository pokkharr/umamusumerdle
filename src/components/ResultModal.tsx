import type { GameState } from '../types';

interface Props {
  state: GameState;
  onClose: () => void;
}

export function ResultModal({ state, onClose }: Props) {
  if (state.status === 'playing') return null;

  const won = state.status === 'won';
  const attempts = state.guesses.length;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 max-w-sm w-full mx-4 text-center relative">
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-400 hover:text-white text-2xl leading-none"
          aria-label="閉じる"
        >
          ×
        </button>

        <div className="text-4xl mb-3">{won ? '🎉' : '😢'}</div>
        <h2 className="text-2xl font-bold mb-2">
          {won ? 'せいかい！' : 'ざんねん...'}
        </h2>
        <p className="text-zinc-400 mb-1">
          {won
            ? `${attempts}回でわかった！`
            : `${state.maxGuesses}回外れてしまいました`}
        </p>
        <p className="text-lg font-bold text-yellow-400 mb-6">
          答え：{state.answer}
        </p>

        <button
          onClick={onClose}
          className="w-full py-2 rounded bg-zinc-700 text-white font-bold hover:bg-zinc-600"
        >
          履歴を見る
        </button>
      </div>
    </div>
  );
}
