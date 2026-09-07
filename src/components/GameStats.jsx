import { Clock, Target, BookOpen } from "lucide-react";
import { formatTime } from "../lib/memoryDeck.js";

export default function GameStats({ seconds, attempts, matched, total }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <span className="flex items-center gap-1.5 rounded-full border border-line bg-white/60 px-3 py-1 font-mono text-xs text-ink-soft">
        <Clock size={13} /> <b className="text-ink">{formatTime(seconds)}</b>
      </span>
      <span className="flex items-center gap-1.5 rounded-full border border-line bg-white/60 px-3 py-1 font-mono text-xs text-ink-soft">
        <Target size={13} /> Tentativas: <b className="text-ink">{attempts}</b>
      </span>
      <span className="flex items-center gap-1.5 rounded-full border border-line bg-white/60 px-3 py-1 font-mono text-xs text-ink-soft">
        <BookOpen size={13} /> Pares: <b className="text-ink">{matched}</b>/{total}
      </span>
    </div>
  );
}
