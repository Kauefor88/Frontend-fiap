export default function MemoryCard({ card, revealed, matched, wrong, disabled, onClick }) {
  const isDisabled = disabled || revealed;

  const handleKeyDown = (e) => {
    if (isDisabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-label={revealed ? card.text : "Carta virada para baixo"}
      aria-disabled={isDisabled}
      onClick={() => !isDisabled && onClick()}
      onKeyDown={handleKeyDown}
      className={
        "relative w-full select-none outline-none" +
        (isDisabled ? " cursor-default" : " cursor-pointer")
      }
      style={{
        minHeight: "132px",
        aspectRatio: "3 / 4",
        perspective: "800px",
        borderRadius: "12px",
      }}
    >
      <div
        className="relative h-full w-full rounded-xl transition-transform duration-500"
        style={{
          minHeight: "132px",
          transformStyle: "preserve-3d",
          transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)",
          animation: wrong ? "mg-shake 0.5s ease" : undefined,
        }}
      >
        {/* Back face (face down) */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-dashed border-line bg-white/50"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="font-serif text-2xl text-ink-soft/30">?</span>
        </div>

        {/* Front face */}
        <div
          className={
            "absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 text-center shadow-card " +
            (card.kind === "word"
              ? "border-teal bg-teal-light"
              : "border-ochre bg-ochre-light")
          }
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft/60">
            {card.kind === "word" ? "Palavra" : "Significado"}
          </span>
          <span
            className={
              card.kind === "word"
                ? "font-serif text-lg font-semibold leading-tight text-ink sm:text-xl"
                : "text-[13px] leading-snug text-ink"
            }
          >
            {card.text}
          </span>
        </div>
      </div>
    </div>
  );
}
