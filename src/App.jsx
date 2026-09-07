import { useEffect, useRef, useState } from "react";
import { BookOpenText, AlertCircle, RotateCcw, Sparkles, Search } from "lucide-react";
import MemoryCard from "./components/MemoryCard.jsx";
import GameStats from "./components/GameStats.jsx";
import InfoPanel from "./components/InfoPanel.jsx";
import CompletionModal from "./components/CompletionModal.jsx";
import { askBff } from "./lib/api.js";
import { buildDeck, shuffle } from "./lib/memoryDeck.js";

// Configuração fixa do BFF — sem tela de ajustes, sem tema de busca.
const BFF_ENDPOINT = "https://fiap-bff-10aojr.onrender.com/ask";
const BFF_METHOD = "GET";

export default function App() {
  const [phase, setPhase] = useState("search"); // search | loading | error | playing
  const [errorMessage, setErrorMessage] = useState("");
  const [entries, setEntries] = useState([]); // palavras trazidas do BFF

  // estado do jogo
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [wrongUids, setWrongUids] = useState([]);
  const [activeEntry, setActiveEntry] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const abortRef = useRef(null);

  const totalPairs = entries.length;
  const isFinished = phase === "playing" && matchedIds.length === totalPairs && totalPairs > 0;

  useEffect(() => {
    if (!running) return undefined;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (isFinished) setRunning(false);
  }, [isFinished]);

  const startGame = (words) => {
    setEntries(words);
    setDeck(buildDeck(words));
    setFlipped([]);
    setMatchedIds([]);
    setWrongUids([]);
    setActiveEntry(null);
    setAttempts(0);
    setLocked(false);
    setSeconds(0);
    setRunning(false);
    setPhase("playing");
  };

  const fetchWords = async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setPhase("loading");
    setErrorMessage("");

    try {
      const results = await askBff({
        endpoint: BFF_ENDPOINT,
        method: BFF_METHOD,
        signal: controller.signal,
      });

      if (results.length < 2) {
        setErrorMessage("O BFF retornou poucas palavras para montar um jogo. Tente novamente.");
        setPhase("error");
        return;
      }

      startGame(results);
    } catch (err) {
      if (err.name === "AbortError") return;
      setErrorMessage(err.message || "Algo deu errado ao consultar o BFF.");
      setPhase("error");
    }
  };

  const handleCardClick = (card) => {
    if (locked || isFinished) return;
    if (flipped.includes(card.uid)) return;
    if (matchedIds.includes(card.pairId)) return;
    if (!running) setRunning(true);

    const nextFlipped = [...flipped, card.uid];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setLocked(true);
      setAttempts((a) => a + 1);

      const [firstUid, secondUid] = nextFlipped;
      const first = deck.find((c) => c.uid === firstUid);
      const second = deck.find((c) => c.uid === secondUid);

      if (first.pairId === second.pairId) {
        window.setTimeout(() => {
          const wordEntry = entries.find((w) => w.id === first.pairId);
          setMatchedIds((m) => [...m, first.pairId]);
          setActiveEntry(wordEntry);
          setFlipped([]);
          setLocked(false);
        }, 550);
      } else {
        setWrongUids(nextFlipped);
        window.setTimeout(() => {
          setFlipped([]);
          setWrongUids([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const handleReplay = () => {
    setDeck(shuffle(buildDeck(entries)));
    setFlipped([]);
    setMatchedIds([]);
    setWrongUids([]);
    setActiveEntry(null);
    setAttempts(0);
    setLocked(false);
    setSeconds(0);
    setRunning(false);
  };

  const handleNewWords = () => {
    setPhase("search");
    setEntries([]);
    setDeck([]);
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <header className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
            <BookOpenText size={13} /> FIAP · Front-end Engineering
          </p>
          <h1 className="font-serif text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
            Vocab <span className="text-teal">Memory</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            Busque palavras em inglês direto do BFF e jogue a memória
            combinando cada palavra ao seu significado.
          </p>
        </header>

        {(phase === "search" || phase === "loading") && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={fetchWords}
              disabled={phase === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-7 py-3.5 font-medium text-white shadow-card transition-colors hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Sparkles size={16} />
              {phase === "loading" ? "Buscando palavras…" : "Buscar palavras e jogar"}
            </button>
          </div>
        )}

        <main className="mt-10">
          {phase === "search" && (
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-line bg-white/40 px-6 py-14 text-center">
              <BookOpenText size={28} className="mx-auto mb-3 text-teal/60" />
              <p className="text-sm leading-relaxed text-ink-soft">
                Clique no botão acima para buscar palavras no BFF e começar o
                jogo da memória.
              </p>
            </div>
          )}

          {phase === "loading" && (
            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl border border-line bg-white/40"
                  style={{ minHeight: "132px", aspectRatio: "3 / 4" }}
                />
              ))}
            </div>
          )}

          {phase === "error" && (
            <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
              <AlertCircle size={26} className="mx-auto mb-3 text-red-500" />
              <p className="mb-4 text-sm leading-relaxed text-red-700">{errorMessage}</p>
              <button
                type="button"
                onClick={fetchWords}
                className="inline-flex items-center gap-2 rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
              >
                <RotateCcw size={14} /> Tentar novamente
              </button>
            </div>
          )}

          {phase === "playing" && (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <div className="mb-5 flex justify-center">
                  <GameStats
                    seconds={seconds}
                    attempts={attempts}
                    matched={matchedIds.length}
                    total={totalPairs}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {deck.map((card) => {
                    const matched = matchedIds.includes(card.pairId);
                    const revealed = matched || flipped.includes(card.uid);
                    const wrong = wrongUids.includes(card.uid);
                    return (
                      <MemoryCard
                        key={card.uid}
                        card={card}
                        revealed={revealed}
                        matched={matched}
                        wrong={wrong}
                        disabled={locked}
                        onClick={() => handleCardClick(card)}
                      />
                    );
                  })}
                </div>
              </div>

              <aside className="flex flex-col gap-4">
                <InfoPanel entry={activeEntry} />
                <button
                  type="button"
                  onClick={handleNewWords}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-teal hover:text-teal"
                >
                  <Search size={14} /> Buscar novas palavras
                </button>
              </aside>
            </div>
          )}
        </main>

        {isFinished && (
          <CompletionModal
            seconds={seconds}
            attempts={attempts}
            total={totalPairs}
            onReplay={handleReplay}
            onNewSearch={handleNewWords}
          />
        )}

        <footer className="mt-16 border-t border-line pt-6 text-center font-mono text-[11px] text-ink-soft/60">
          Consumindo o BFF{" "}
          <a
            href="https://github.com/jaisonschmidt/fiap-bff"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-teal"
          >
            fiap-bff
          </a>{" "}
          · Projeto acadêmico FIAP
        </footer>
      </div>
    </div>
  );
}
