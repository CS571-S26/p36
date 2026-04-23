import { useEffect, useState } from "react";
import { SquareFrame, BuilderBoard } from "./Board";
import { getChampions } from "../../api/champions";
import type { Champion } from "../../types";

export default function TeamBuilder() {
  const [championPool, setChampionPool] = useState<Champion[]>([]);
  const [boardChampions] = useState<Champion[]>([]);

  useEffect(() => {
    getChampions().then(setChampionPool);
  }, []);
  
  return (
    <div className="flex justify-center min-h-screen ">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col gap-2 mt-8">

          {/* Upper containers */}
          <div className="flex gap-2">

            {/* Traits container */}
            <div className="border border-2 border-gray-300 py-4 px-4 rounded-xl">
              <p className="font-medium text-sm">Traits should go here!</p>
            </div>

            {/* Board container*/}
            <div className="border border-2 border-gray-300 py-6 px-10 rounded-xl">
              <BuilderBoard champions={boardChampions} />
            </div>

          </div>

          {/* Champions/Items container */}
          <div className="flex border border-2 border-gray-300 py-4 px-6 rounded-xl">
            {/* Champions */}
            <div className="flex flex-wrap gap-1">
              {championPool.map(c => (
                <SquareFrame 
                  src={c.championImg}
                  alt={c.championName}
                  cost={c.cost}
                  onDragStart={() => {}}
                />
              ))}
            </div>

            {/* Items */}
            <div>
              <p>Items should go here!</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}