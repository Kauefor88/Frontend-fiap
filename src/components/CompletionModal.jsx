import { PartyPopper, RotateCcw, Search } from "lucide-react";
import { formatTime } from "../lib/memoryDeck.js";

export default function CompletionModal({ seconds, attempts, total, onReplay, onNewSearch }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Jogo concluído"
    >
      <div className="w-full max-w-sm rounded-2xl border-2 border-ochre bg-paper p-8 text-center shadow-card">
        <PartyPopper size={36} className="mx-auto mb-3 text-ochre" />
        <h2 className="mb-1 font-serif text-3xl font-semibold text-ink">Tudo encontrado!</h2>
        <p className="mb-6 text-sm text-ink-soft">
          Você combinou todas as palavras com seus significados.
        </p>

        <div className="mb-7 flex justify-center gap-6">
          <div>
            <p className="font-serif text-2xl font-semibold text-teal">{formatTime(seconds)}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft/60">
              Tempo
            </p>
          </div>
          <div>
            <p className="font-serif text-2xl font-semibold text-teal">{attempts}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft/60">
              Tentativas
            </p>
          </div>
          <div>
            <p className="font-serif text-2xl font-semibold text-teal">{total}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft/60">
              Pares
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-5 py-2.5 font-medium text-white transition-colors hover:bg-teal-dark"
          >
            <RotateCcw size={15} /> Jogar de novo
          </button>
          <button
            type="button"
            onClick={onNewSearch}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-2.5 font-medium text-ink-soft transition-colors hover:border-teal hover:text-teal"
          >
            <Search size={15} /> Novo tema
          </button>
        </div>
      </div>
    </div>
  );
}
