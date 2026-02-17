interface Props {
  onClose: () => void;
}

export function RulesModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-sm w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-zinc-400 hover:text-white text-2xl leading-none"
          aria-label="閉じる"
        >
          ×
        </button>

        <h2 className="text-xl font-bold text-yellow-400 mb-4">遊び方</h2>

        <p className="text-sm text-zinc-300 mb-4">
          ランダムに選ばれた<span className="text-white font-bold">ウマ娘の名前</span>を
          <span className="text-white font-bold"> 5回以内</span>に当ててください。
        </p>

        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-green-600 flex items-center justify-center text-white font-bold shrink-0">
              ス
            </div>
            <p className="text-sm text-zinc-300">
              <span className="text-green-400 font-bold">緑</span>：その文字は<span className="font-bold text-white">正しい位置</span>にあります
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-yellow-500 flex items-center justify-center text-white font-bold shrink-0">
              カ
            </div>
            <p className="text-sm text-zinc-300">
              <span className="text-yellow-400 font-bold">黄</span>：名前に含まれますが<span className="font-bold text-white">位置が違います</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-zinc-700 flex items-center justify-center text-zinc-500 font-bold shrink-0">
              ア
            </div>
            <p className="text-sm text-zinc-300">
              <span className="text-zinc-400 font-bold">グレー</span>：その文字は名前に<span className="font-bold text-white">含まれません</span>
            </p>
          </div>
        </div>

        <ul className="text-xs text-zinc-400 space-y-1 border-t border-zinc-700 pt-3">
          <li>・入力は五十音パネルまたはIMEで直接入力できます</li>
          <li>・有効なウマ娘名のみ確定できます</li>
          <li>・文字数のヒントは表示されません</li>
          <li>・「新しい問題」でいつでもリセットできます</li>
        </ul>
      </div>
    </div>
  );
}
