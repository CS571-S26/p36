import { Post } from '../components/Post';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllComps } from '../api/comps';

export default function AllComps() {
  const { compId } = useParams();
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [comps, setComps] = useState([]);
  const [sort, setSort] = useState<'mostLiked' | 'recent'>('mostLiked');

  useEffect(() => {
    getAllComps(sort).then(setComps);
  }, [sort]);

  return (
    <div className="mt-8 space-y-4 ">
      <div className="flex justify-end max-w-5xl mx-auto relative">
        <button 
          className="rounded-full border border-2 border-gray-300 px-4 py-2 text-sm text-gray-700 font-bold hover:cursor-pointer hover:border-gray-400"
          onClick={() => setFilterExpanded(!filterExpanded)}
        >
          Sort by
        </button>

        {filterExpanded && (
          <div className="absolute top-10 right-0 bg-white rounded-xl px-4 py-2 text-sm text-gray-700 hover:cursor-pointer">
            <button onClick={() => { setSort('mostLiked'); setFilterExpanded(false); }}>Most Liked</button>
            <button onClick={() => { setSort('recent'); setFilterExpanded(false); }}>Recently created</button>
          </div>
        )}
      </div>

      {comps.map((comp: any) => (
        <Post key={comp._id} compSpec={comp} activeCompId={compId ?? null}/>
      ))}
    </div>
  );
}