interface Props {
  onNewGame: () => void;
  onRules: () => void;
}

export function Header({ onNewGame, onRules }: Props) {
  return (
    <header className="w-full max-w-2xl mx-auto flex flex-col items-center gap-3 py-4 px-2">
      <div className="relative w-full flex items-center justify-center">
        <h1
          className="text-4xl font-black tracking-widest"
          style={{
            background: 'linear-gradient(135deg, #ff4f9a 0%, #ffd166 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 12px rgba(255,79,154,0.45))',
          }}
        >
          ウマ娘ドル
        </h1>
        <button
          onClick={onRules}
          aria-label="遊び方"
          className="absolute right-2 w-8 h-8 rounded-full bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-white flex items-center justify-center text-base font-bold"
        >
          ℹ
        </button>
      </div>
      <button
        onClick={onNewGame}
        className="px-4 py-1 text-sm font-bold rounded bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
      >
        新しい問題
      </button>
    </header>
  );
}
