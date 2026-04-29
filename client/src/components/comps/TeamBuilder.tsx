import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SquareFrame, BuilderBoard } from "./Board";
import { getChampions } from "../../api/champions";
import { createComp } from "../../api/posts";
import AuthModal from "../auth/AuthModal";
import { useAuth } from "../contexts/AuthContext";
import type { Champion } from "../../types";

type DragSource = {
  champion: Champion;
  from?: { row: number; col: number };
} | null;

export default function TeamBuilder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [championPool, setChampionPool] = useState<Champion[]>([]);
  const [boardChampions, setBoardChampions] = useState<Champion[]>([]);
  const [dragSource, setDragSource] = useState<DragSource>(null);
  const [dragOverCell, setDragOverCell] = useState<{ row: number; col: number } | null>(null);
  const [isBenchOver, setIsBenchOver] = useState(false);
  const [title, setTitle] = useState("");
  const [tips, setTips] = useState("");
  const [howToTransition, setHowToTransition] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState("");
  const [openAuth, setOpenAuth] = useState(false);

  useEffect(() => {
    getChampions().then(setChampionPool);
  }, []);

  const clearDragState = () => {
    setDragSource(null);
    setDragOverCell(null);
    setIsBenchOver(false);
  };

  const handleDropToCell = (row: number, col: number) => {
    if (!dragSource) return;

    const placedChampion = {
      ...dragSource.champion,
      position: { row, col },
    };

    setBoardChampions(prev => [
      ...prev.filter(champion => {
        const sameCell = champion.position?.row === row && champion.position?.col === col;
        const sameChampion = champion.championName === dragSource.champion.championName;
        return !sameCell && !sameChampion;
      }),
      placedChampion,
    ]);

    clearDragState();
  };

  const handleDragFromCell = (row: number, col: number) => {
    const champion = boardChampions.find(
      c => c.position?.row === row && c.position?.col === col
    );

    if (champion) {
      setDragSource({ champion, from: { row, col } });
    }
  };

  const handleBenchDrop = () => {
    if (!dragSource?.from) return;

    setBoardChampions(prev =>
      prev.filter(champion =>
        champion.position?.row !== dragSource.from!.row ||
        champion.position?.col !== dragSource.from!.col
      )
    );

    clearDragState();
  };

  const hasRequiredPostFields = Boolean(
    title.trim() &&
    tips.trim() &&
    boardChampions.length > 0
  );

  const handlePost = async () => {
    if (!hasRequiredPostFields || isPosting) return;

    if (!user) {
      setOpenAuth(true);
      return;
    }

    setIsPosting(true);
    setError("");

    try {
      await createComp(user.username, user.token, {
        title: title.trim(),
        tips: tips.trim(),
        howToTransition: howToTransition.trim(),
        champions: boardChampions.map(champion => ({
          championName: champion.championName,
          position: champion.position,
        })),
      });

      navigate(`/users/${user.username}/mycomps`);
    } catch {
      setError("Failed to post comp.");
    } finally {
      setIsPosting(false);
    }
  };
  
  return (
    <>
      <div className="flex justify-center min-h-screen ">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col gap-2 mt-8">

          {/* Upper containers */}
          <div className="flex gap-2">

            {/* Comp details */}
            <div className="flex w-80 shrink-0 flex-col gap-3 border border-2 border-gray-300 py-4 px-4 rounded-xl">
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal focus:border-blue-400 focus:outline-none"
                placeholder="Title (required)"
                maxLength={80}
              />

              <textarea
                value={tips}
                onChange={e => setTips(e.target.value)}
                className="min-h-32 w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal focus:border-blue-400 focus:outline-none"
                placeholder="Tips (required)"
              />

              <textarea
                value={howToTransition}
                onChange={e => setHowToTransition(e.target.value)}
                className="min-h-32 w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal focus:border-blue-400 focus:outline-none"
                placeholder="How to transition (optional)"
              />

              {error && (
                <p className="text-sm font-normal text-red-600">{error}</p>
              )}

              <button
                type="button"
                disabled={!hasRequiredPostFields || isPosting}
                onClick={handlePost}
                className={`mt-auto rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors ${
                  hasRequiredPostFields && !isPosting
                    ? "bg-blue-600 hover:cursor-pointer hover:bg-blue-700"
                    : "bg-gray-300"
                }`}
              >
                {isPosting ? "Posting..." : "Post"}
              </button>
            </div>

            {/* Board container */}
            <div className="border border-2 border-gray-300 py-6 px-10 rounded-xl">
              <BuilderBoard
                champions={boardChampions}
                dragOverCell={dragOverCell}
                onDragOverCell={(row, col) => {
                  if (dragSource) setDragOverCell({ row, col });
                }}
                onDragLeave={() => setDragOverCell(null)}
                onDropToCell={handleDropToCell}
                onDragFromCell={handleDragFromCell}
                onDragEnd={clearDragState}
              />
              <p className="mt-3 text-center text-sm font-normal text-gray-500">
                Drag champions here!
              </p>
            </div>

          </div>

          {/* Champions/Items container */}
          <div
            className={`flex gap-4 border border-2 py-4 px-6 rounded-xl transition-colors ${
              isBenchOver
                ? "border-red-400 bg-red-50 shadow-[0_0_18px_rgba(248,113,113,0.45)]"
                : "border-gray-300"
            }`}
            onDragOver={e => {
              if (!dragSource?.from) return;
              e.preventDefault();
              setIsBenchOver(true);
            }}
            onDragLeave={() => setIsBenchOver(false)}
            onDrop={e => {
              e.preventDefault();
              handleBenchDrop();
            }}
          >
            {/* Champions */}
            <div className="flex flex-wrap gap-2">
              {championPool.map(c => (
                <SquareFrame 
                  key={c.championName}
                  src={c.championImg}
                  alt={`Tile of ${c.championName}`}
                  cost={c.cost}
                  onDragStart={() => setDragSource({ champion: c })}
                  onDragEnd={clearDragState}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
      </div>

      <AuthModal
        open={openAuth}
        onClose={() => setOpenAuth(false)}
        redirectOnAuth={false}
      />
    </>
  );
}
