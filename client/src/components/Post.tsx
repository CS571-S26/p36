import { Heart, MessageCircle, User, Bookmark } from "lucide-react";
import { CompBoard, HexagonFrame } from "./comps/Board";
import { Pagination } from "./shared";
import { frameColor } from "../utils/frameColor";
import { DateTime } from "luxon";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './contexts/AuthContext';
import AuthModal from "./auth/AuthModal";
import { postComment, toggleLike, toggleBookmark } from "../api/posts";
import type { CompSpec } from "../types";
/**
 * TODO: fix heartCount
 */

export const Post = ({
  compSpec,
  activeCompId,
  basePath = "/comps",
}: {
  compSpec: CompSpec;
  activeCompId: string | null;
  basePath?: string;
}) => {
  const COMMENTS_PER_PAGE = 5;
  const champions = compSpec.champions;
  const { user } = useAuth();

  const [expanded, setExpanded] = useState(activeCompId === compSpec._id);
  const [comments, setComments] = useState(compSpec.comments);
  const [commentCount, setCommentCount] = useState(compSpec.commentCount);
  const [currentCommentPg, setCurrentCommentPg] = useState(1);
  const [heartCount, setHeartCount] = useState(compSpec.heartCount);
  const [liked, setLiked] = useState(compSpec.liked ?? false);
  const [bookmarked, setBookmarked] = useState(compSpec.bookmarked ?? false);
  const [openAuth, setOpenAuth] = useState(false);
  const [focusComment, setFocusComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  
  const navigate = useNavigate();
  const commentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setExpanded(activeCompId === compSpec._id);
  }, [activeCompId, compSpec._id]);

  useEffect(() => {
    setLiked(compSpec.liked);
    setHeartCount(compSpec.heartCount);
    setBookmarked(compSpec.bookmarked);
  }, [compSpec.liked, compSpec.heartCount, compSpec.bookmarked])

  useEffect(() => {
    if (!expanded || !focusComment) return;

    commentRef.current?.focus();
    setFocusComment(false);
  }, [expanded, focusComment]);

  const handleToggle = () => {
    const next = !expanded;
    navigate(next ? `${basePath}/${compSpec._id}` : basePath);
    setExpanded(next);
  };

  const handleCommentClick = () => {
    if (!expanded) {
      navigate(`${basePath}/${compSpec._id}`);
      setExpanded(true);
    }

    setFocusComment(true);
  };

  const handleLike = async () => {
    if (!user) {
      setOpenAuth(true);
      return;
    }

    const { liked: newLiked } = await toggleLike(compSpec._id, user.username, user.token);
    setLiked(newLiked);
    setHeartCount(prev => newLiked ? prev + 1 : prev - 1);
  };

  const handleBookmark = async () => {
    if (!user) return;
    const { bookmarked: newBookmarked } = await toggleBookmark(compSpec._id, user.username, user.token);
    setBookmarked(newBookmarked);
  }

  const addComment = async () => {
    const content = commentInput.trim();
    if (!content) return;

    if (!user) {
      setOpenAuth(true);
      return;
    }

    const updatedComments = await postComment(compSpec._id, user.username, content, user.token);
    setComments(updatedComments);
    setCommentCount(prev => prev + 1);
    setCurrentCommentPg(Math.ceil(updatedComments.length / COMMENTS_PER_PAGE));

    setCommentInput("");
  };

  const formatDate = (dateStr: string) => {
    return DateTime.fromISO(dateStr).toLocaleString(DateTime.DATE_MED);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="border border-2 border-gray-100 bg-white shadow-xl rounded-2xl p-4 hover:border-blue-200">
        <div
          className="flex justify-between"
        >
          <div>
            <h3 className="font-bold text-lg">{compSpec.title}</h3>
            <p className="text-sm text-gray-600 font-normal">
              {compSpec.username} • {formatDate(compSpec.createdAt)}
            </p>
          </div>
          <div className="flex gap-4 font-normal">

            <span 
              className="flex gap-2 items-center hover:cursor-pointer"
              onClick={handleLike}
            >
              <Heart className={liked ? "fill-red-500 stroke-red-500" : ""} />
              {heartCount}
            </span>

            <span
              className="flex gap-2 items-center hover:cursor-pointer"
              onClick={handleCommentClick}
            >
              <MessageCircle />
              {commentCount}
            </span>

            {user && user.username !== compSpec.username &&
              <span 
                className={"flex gap-2 items-center hover:cursor-pointer"}
                onClick={handleBookmark}
              >
                <Bookmark className={bookmarked ? "fill-amber-400 stroke-amber-400" : ""} />
              </span>
            }

          </div>
        </div>
        <div className="border-t border-gray-300 mt-3">
          <div className="flex justify-center mt-4 hover:cursor-pointer" onClick={handleToggle}>
            {champions.map((champion, i) => (
              <HexagonFrame
                key={i}
                src={champion.championImg}
                alt={champion.championName}
                color={frameColor(champion.cost)}
              />
            ))}
          </div>
        </div>

        {expanded && (
          <div className="flex flex-col gap-2 mt-4">
            {/* Tips */}
            <div className="flex flex-col gap-2 p-4 items-center rounded-xl border border-2 border-gray-300 border-xl">
              <h3 className="text-sm font-bold">Tips</h3>
              <p className="text-sm font-normal">{compSpec.tips}</p>
            </div>

            {/* Board positioning */}
            <div className="flex flex-col gap-4 items-center justify-center rounded-xl border border-2 border-gray-300 p-4">
              <h3 className="text-sm font-bold">Board Positioning</h3>
              <div className="mb-2">
                <CompBoard champions={compSpec.champions} />
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
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-2 text-sm font-light focus:outline-none"
                  placeholder="Share your thoughts or ask questions..."
                />
                <button
                  disabled={!commentInput.trim()}
                  className={`text-sm font-bold mr-2 ${
                    commentInput.trim()
                      ? "text-[#0084D1] hover:cursor-pointer"
                      : "text-gray-300"
                  }`}
                  onClick={addComment}
                >
                  Post
                </button>
              </div>
              <div className="space-y-2">
                {comments
                  .slice(
                    (currentCommentPg - 1) * COMMENTS_PER_PAGE,
                    currentCommentPg * COMMENTS_PER_PAGE
                  )
                  .map((comment) => (
                    <div 
                      key={comment._id}
                      className="bg-gray-50 border border-gray-300 rounded-xl p-4"
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

              {/* Pagination */}
              <Pagination 
                currentPage={currentCommentPg}
                totalPages={Math.ceil(comments.length / COMMENTS_PER_PAGE)}
                onPageChange={setCurrentCommentPg}
              />
            </div>
          </div>
        )}
        </div>
      </div>

      <AuthModal
        open={openAuth}
        onClose={() => setOpenAuth(false)}
        redirectOnAuth={false}
      />
    </>
  );
};
