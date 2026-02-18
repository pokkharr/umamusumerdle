import type { GuessChar, TileStatus } from '../types';

/**
 * 1回分の推測を判定する
 * - 正しい位置: 'correct' (緑)
 * - 位置が違うが含まれる: 'present' (黄)
 * - 含まれない: 'absent' (灰)
 */
export function evaluateGuess(guess: string, answer: string): GuessChar[] {
  const guessChars = Array.from(guess);
  const answerChars = Array.from(answer);
  const result: GuessChar[] = guessChars.map(char => ({ char, status: 'absent' as TileStatus }));

  // Pass 1: 正解位置をマーク
  const answerRemaining: (string | null)[] = [...answerChars];
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i].status = 'correct';
      answerRemaining[i] = null;
    }
  }

  // Pass 2: 位置違いをマーク（重複カウントを防ぐ）
  for (let i = 0; i < guessChars.length; i++) {
    if (result[i].status === 'correct') continue;
    const idx = answerRemaining.indexOf(guessChars[i]);
    if (idx !== -1) {
      result[i].status = 'present';
      answerRemaining[idx] = null;
    }
  }

  return result;
}

/**
 * これまでの推測結果と矛盾しない候補名の数を返す
 */
export function countRemainingCandidates(names: string[], guesses: GuessChar[][]): number {
  if (guesses.length === 0) return names.length;
  return names.filter(name =>
    guesses.every(guessChars => {
      const guessText = guessChars.map(c => c.char).join('');
      const simulated = evaluateGuess(guessText, name);
      return simulated.every((g, i) => g.status === guessChars[i].status);
    })
  ).length;
}

export function getRandomAnswer(names: string[]): string {
  return names[Math.floor(Math.random() * names.length)];
}

/**
 * 各文字の最良ステータスを集計する（キーパネルの色表示用）
 */
export function buildCharStatusMap(guesses: GuessChar[][]): Map<string, TileStatus> {
  const priority: Record<TileStatus, number> = {
    correct: 3,
    present: 2,
    absent: 1,
    empty: 0,
    active: 0,
  };
  const map = new Map<string, TileStatus>();
  for (const guess of guesses) {
    for (const { char, status } of guess) {
      const current = map.get(char);
      if (!current || priority[status] > priority[current]) {
        map.set(char, status);
      }
    }
  }
  return map;
}
