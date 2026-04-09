import { Heart, MessageCircle, User } from "lucide-react";
import { CompBoard, HexagonFrame } from "./comps/Board";
import { frameColor } from "../utils/frameColor";
import { DateTime } from "luxon";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postComment } from "../api/posts";

export const Post = ({
  compSpec,
  activeCompId,
}: {
  compSpec: {
    _id: string;
    title: string;
    username: string;
    champions: { championName: string; championImg: string; cost: number }[];
    tips: string;
    howToTransition: string;
    createdAt: string;
    heartCount: number;
    commentCount: number;
    comments: { username: string; content: string; createdAt: string }[];
  };
  activeCompId: string | null;
}) => {
  const champions = compSpec.champions;
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(activeCompId === compSpec._id);
  const [comments, setComments] = useState(compSpec.comments);
  const [commentCount, setCommentCount] = useState(compSpec.commentCount);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setExpanded(activeCompId === compSpec._id);
  }, [activeCompId, compSpec._id]);

  const handleToggle = () => {
    const next = !expanded;
    navigate(next ? `/comps/${compSpec._id}` : "/comps");
    setExpanded(next);
  };

  const addComment = async () => {
    const content = commentRef.current?.value.trim();
    if (!content) return;

    const updatedComments = await postComment(compSpec._id, 'tmdco', content); // TODO: replace with auth user
    setComments(updatedComments);
    setCommentCount(prev => prev + 1);

    if (commentRef.current) {
      commentRef.current.value = '';
    }
  };

  const formatDate = (dateStr: string) => {
    return DateTime.fromISO(dateStr).toLocaleString(DateTime.DATE_MED);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="border border-2 border-gray-100 bg-white shadow-xl rounded-2xl p-6 hover:border-blue-200">
        <div
          className="flex justify-between hover:cursor-pointer"
          onClick={handleToggle}
        >
          <div>
            <h3 className="font-bold text-lg">{compSpec.title}</h3>
            <p className="text-sm text-gray-600 font-normal">
              {compSpec.username} • {formatDate(compSpec.createdAt)}
            </p>
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
              <HexagonFrame
                key={i}
                src={champion.championImg}
                alt={champion.championName}
                frameColor={frameColor(champion.cost)}
              />
            ))}
          </div>
        </div>

        {expanded && (
          <div className="flex flex-col gap-4">
            {/* Tips */}
            <div className="flex flex-col gap-2 p-4 items-center rounded-xl border border-2 border-gray-300 border-xl">
              <h3 className="text-sm font-bold">Tips</h3>
              <p className="text-sm font-normal">{compSpec.tips}</p>
            </div>

            {/* Board positioning */}
            <div className="flex flex-col gap-4 items-center justify-center rounded-xl border border-2 border-gray-300 p-4">
              <h3 className="text-sm font-bold">Board Positioning</h3>
              <div className="mb-2">
                <CompBoard />
              </div>
            </div>

            {/* How to Transition */}
            <div className="flex flex-col gap-2 p-4 items-center rounded-xl border border-2 border-gray-300 border-xl mb-2">
              <h3 className="text-sm font-bold">How to Transition</h3>
              <p className="text-sm font-normal">{compSpec.howToTransition}</p>
            </div>

            {/* Comment Section */}
            <div className="border-t border-gray-300">
              <p className="text-md font-bold py-4">
                Comments ({commentCount})
              </p>
              <div className="flex gap-8 mb-4">
                <textarea
                  ref={commentRef}
                  className="w-full border border-gray-300 rounded-xl p-2 text-sm font-light focus:outline-none"
                  placeholder="Share your thoughts or ask questions..."
                />
                <button
                  className="text-[#0084D1] text-sm font-bold mr-2 hover:cursor-pointer"
                  onClick={addComment}
                >
                  Post
                </button>
              </div>
              <div className="space-y-2">
                {comments.map((comment) => (
                  <div 
                    
                    className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 font-bold text-sm mb-2">
                      <User size={16}/>
                      {comment.username}
                      <p className="text-gray-500 text-xs font-normal">{comment.createdAt.slice(0, 10)}</p>
                    </div>
                    <p className="text-sm font-light">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
