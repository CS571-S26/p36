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
          <div className="absolute top-12 right-0 bg-white rounded-xl shadow-md border border-gray-200 w-40">
            <button 
              onClick={() => { setSort('mostLiked'); setFilterExpanded(false); }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 font-normal hover:bg-gray-100"
            >
              Most Liked
            </button>
            <button 
              onClick={() => { setSort('recent'); setFilterExpanded(false); }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 font-normal hover:bg-gray-100"
            >
              Recently created
            </button>
          </div>
        )}
      </div>

      {comps.map((comp: any) => (
        <Post key={comp._id} compSpec={comp} activeCompId={compId ?? null}/>
      ))}
    </div>
  );
}