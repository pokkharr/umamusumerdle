import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { UmaMusume } from './types';
import { useGame } from './hooks/useGame';
import { buildCharStatusMap } from './lib/wordle';
import { Header } from './components/Header';
import { GuessGrid } from './components/GuessGrid';
import { KanaPanel } from './components/KanaPanel';
import { ResultModal } from './components/ResultModal';
import { InvalidGuessToast } from './components/InvalidGuessToast';
import { RulesModal } from './components/RulesModal';

export default function App() {
  const [umaList, setUmaList] = useState<UmaMusume[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);

  // currentGuessはゲーム状態と切り離してコンポーネントで管理（IME対応のため）
  const [currentGuess, setCurrentGuess] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const names = useMemo(() => umaList.map(u => u.name), [umaList]);
  const { state, submitGuess, startNewGame } = useGame(names);

  // JSONデータ読み込み
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/umamusume.json`)
      .then(r => r.json())
      .then(data => setUmaList(data.umamusume))
      .catch(console.error);
  }, []);

  // ゲーム終了時にモーダルを開く
  useEffect(() => {
    if (state?.status === 'won' || state?.status === 'lost') {
      setModalOpen(true);
    }
  }, [state?.status]);

  // 新しいゲーム開始時に入力をクリア
  const prevAnswer = useRef('');
  useEffect(() => {
    if (state?.answer && state.answer !== prevAnswer.current) {
      prevAnswer.current = state.answer;
      setCurrentGuess('');
    }
  }, [state?.answer]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!state || state.status !== 'playing' || !currentGuess) return;
    if (!names.includes(currentGuess)) {
      showToast('そのウマ娘は見つかりません');
      return;
    }
    submitGuess(currentGuess, names);
    setCurrentGuess('');
    inputRef.current?.focus();
  }, [state, currentGuess, names, submitGuess, showToast]);

  // カナパネルのボタン：末尾に追加
  const handleAddChar = useCallback((char: string) => {
    if (state?.status !== 'playing') return;
    setCurrentGuess(prev => prev + char);
  }, [state?.status]);

  // 削除：末尾1文字削除（カタカナの複合文字を考慮）
  const handleDelete = useCallback(() => {
    if (state?.status !== 'playing') return;
    setCurrentGuess(prev => Array.from(prev).slice(0, -1).join(''));
  }, [state?.status]);

  const handleNewGame = useCallback(() => {
    startNewGame();
    setModalOpen(false);
    setCurrentGuess('');
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [startNewGame]);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        読み込み中...
      </div>
    );
  }

  const isPlaying = state.status === 'playing';
  const charStatusMap = buildCharStatusMap(state.guesses.map(g => g.chars));

  return (
    <div className="min-h-screen flex flex-col items-center pb-8">
      <Header onNewGame={handleNewGame} onRules={() => setRulesOpen(true)} />

      <main className="flex flex-col gap-4 px-3 w-full max-w-md">
        {/* 推測履歴 */}
        <GuessGrid state={state} />

        {/* 入力フォーム：IMEで日本語をそのまま入力できる */}
        <input
          ref={inputRef}
          type="text"
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              handleSubmit();
            }
          }}
          disabled={!isPlaying}
          placeholder="ウマ娘の名前を入力"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="w-full bg-zinc-800 border border-zinc-600 text-white rounded px-3 py-2 text-base focus:outline-none focus:border-blue-400 disabled:opacity-50 placeholder-zinc-500"
        />

        {/* 五十音パネル */}
        <KanaPanel
          charStatusMap={charStatusMap}
          onChar={handleAddChar}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          disabled={!isPlaying}
        />
      </main>

      <InvalidGuessToast message={toast} />
      {modalOpen && (
        <ResultModal state={state} onClose={() => setModalOpen(false)} />
      )}
      {rulesOpen && (
        <RulesModal onClose={() => setRulesOpen(false)} />
      )}
    </div>
  );
}
