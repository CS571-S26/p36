import { Heart, MessageCircle } from "lucide-react";
import { useState, useEffect } from 'react';
import { CompBoard, HexagonFrame } from './comps/Board';
import { useNavigate } from 'react-router-dom';

export const Post = ({ compSpec, activeCompId }: { 
  compSpec: {
    compId: number;
    title: string;
    username: string;
    champions: { championName: string; championImg: string; frameColor: string; }[];
    tips: string;
    howToTransition: string,
    createdAt: string;
    heartCount: number;
    commentCount: number;};
  activeCompId: number | null;
  }) => {
    const champions = compSpec.champions;
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(activeCompId === compSpec.compId);

    useEffect(() => {
      setExpanded(activeCompId === compSpec.compId);
    }, [activeCompId, compSpec.compId]);

    const handleToggle = () => {
      const next = !expanded;
      navigate(next ? `/comps/${compSpec.compId}` : '/comps');
      setExpanded(next);
    };
    
    return (
      <div className="max-w-5xl mx-auto">
        <div 
          className="border border-2 border-gray-100 bg-white shadow-xl rounded-2xl p-6 hover:border-blue-200"
        >
          <div
            className="flex justify-between hover:cursor-pointer"
            onClick={handleToggle}
          >
            <div>
              <h3 className="font-bold text-lg">{compSpec.title}</h3>
              <p className="text-sm text-gray-600 font-light">{compSpec.username} • {compSpec.createdAt}</p>
            </div>
            <div className="flex gap-4 font-normal">
              <span className="flex gap-2">
                <Heart />
                {compSpec.heartCount}
              </span>

              <span className="flex gap-2">
                <MessageCircle />
                {compSpec.commentCount}
              </span>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-3">
            <div className="flex justify-center p-4">
              {champions.map((champion, i) => (
                <HexagonFrame key={i}
                  src={champion.championImg}
                  alt={champion.championName}
                  frameColor={champion.frameColor}
                />
              ))}
            </div>
          </div>
        
          {expanded && (
            <div className="flex flex-col gap-4">
              {/* Tips */}
              <div className="flex flex-col gap-2 p-4 items-center rounded-xl border border-2 border-gray-300 border-xl">
                <h3 className="text-sm font-bold">Tips</h3>
                <p className="text-sm font-light">{compSpec.tips}</p>
              </div>

              {/* Board positioning */}
              <div className="flex flex-col gap-4 items-center justify-center rounded-xl border border-2 border-gray-300 p-4">
                <h3
                  className="text-sm font-bold"
                >
                  Board Positioning
                </h3>
                <div className="mb-2">
                  <CompBoard />
                </div>
              </div>

              {/* How to Transition */}
              <div className="flex flex-col gap-2 p-4 items-center rounded-xl border border-2 border-gray-300 border-xl mb-2">
                <h3 className="text-sm font-bold">How to Transition</h3>
                <p className="text-sm font-light">{compSpec.howToTransition}</p>
              </div>

              {/* Comment Section */}
              <div className="border-t border-gray-300">
                <p className="text-md font-bold py-4">Comments ({compSpec.commentCount})</p>
                <div className="flex gap-8">
                  <textarea
                    className="w-full border border-gray-300 rounded-xl p-2 text-sm font-light focus:outline-none"
                    placeholder="Share your thoughts or ask questions..."
                  />
                  <button className="text-[#0084D1] text-sm font-bold mr-2 hover:cursor-pointer">Post</button>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    );
}