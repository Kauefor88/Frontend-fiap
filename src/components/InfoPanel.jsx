import { Sparkles } from "lucide-react";

export default function InfoPanel({ entry }) {
  return (
    <div className="rounded-xl border border-line bg-white/50 p-4">
      <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft/70">
        <Sparkles size={13} /> Último par encontrado
      </p>
      {entry ? (
        <div>
          <p className="font-serif text-xl font-semibold text-teal">{entry.word}</p>
          <p className="mb-2 text-sm text-ink-soft">{entry.description}</p>
          {entry.useCase && (
            <div className="rounded-lg border-l-2 border-ochre bg-ochre-light/60 px-3 py-2">
              <p className="mb-0.5 font-mono text-[10px] uppercase tracking-widest text-ochre">
                Exemplo de uso
              </p>
              <p className="font-serif text-sm italic leading-snug text-ink">
                “{entry.useCase}”
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-ink-soft/60">
          Encontre o primeiro par correto para ver o significado e um exemplo de uso aqui.
        </p>
      )}
    </div>
  );
}
