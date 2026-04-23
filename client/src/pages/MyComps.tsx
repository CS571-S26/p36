import { Post } from "../components/Post";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMyComps } from "../api/posts";
import { useAuth } from "../components/contexts/AuthContext";

export default function MyComps() {
  const { compId } = useParams();
  const { user } = useAuth();
  const [comps, setComps] = useState([]);

  useEffect(() => {
    if (!user) return;
    getMyComps(user.username, user.token).then(setComps);
  }, [user]);

  if (!user) return null;

  return (
    <div className="mt-8 space-y-4">
      {comps.map((comp: any) => (
        <Post key={comp._id} compSpec={comp} activeCompId={compId ?? null} basePath={`/users/${user.username}/mycomps`} />
      ))}
    </div>
  )
}