/**
 * Turns a list of { id, word, description, useCase } entries (as returned by
 * the BFF) into a shuffled memory-game deck.
 *
 * Each entry produces two cards that must be matched to each other:
 *   - a "word" card showing the English word
 *   - a "description" card showing its meaning in plain English
 *
 * Both cards share the same pairId so the game logic can validate matches.
 */
export function buildDeck(entries) {
  const cards = entries.flatMap((entry) => [
    { uid: `${entry.id}-word`, pairId: entry.id, kind: "word", text: entry.word },
    {
      uid: `${entry.id}-description`,
      pairId: entry.id,
      kind: "description",
      text: entry.description,
    },
  ]);
  return shuffle(cards);
}

export function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
