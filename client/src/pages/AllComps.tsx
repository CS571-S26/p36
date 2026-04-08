import { Post } from '../components/Post';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function AllComps() {
  const { compId } = useParams();
  const [filterExpanded, setFilterExpanded] = useState(false);

  const testCompSpec1 = {
    compId: 2,
    title: "I AM EVIL!",
    username: "lulujoa",
    champions: [
      { championName: "Lulu",
        championImg: "https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Lulu_0.jpg",
        frameColor: "#C0C0C0"
      },
      { championName: "Tristana",
        championImg: "https://leagueofitems.com/images/champions/tiles/256/18.webp",
        frameColor: "#2ECC71"
      },
      { championName: "Teemo",
        championImg: "https://img.redbull.com/images/c_crop,x_484,y_0,h_716,w_573/c_fill,w_450,h_600/q_auto,f_auto/redbullcom/2019/03/22/e8f08713-04ff-4d2a-87cd-33aeb9ed13a7/teemo-league-of-legends-champion",
        frameColor: "#2ECC71"
      },
      { championName: "Poppy",
        championImg: "https://leagueofitems.com/images/champions/tiles/256/78.webp",
        frameColor: "#2ECC71"
      },
      { championName: "Fizz",
        championImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAwYuR8rMg5mVhN4mAGkF1dhj83c5zHLdWBg&s",
        frameColor: "#9B59B6"
      },
      { championName: "Veigar",
        championImg: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Veigar_0.jpg",
        frameColor: "#9B59B6"
      },
      { championName: "Jiggs",
        championImg: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ziggs_0.jpg",
        frameColor: "#FFD700"
      }
    ],
    tips: "Play when you have Yordle openers with easy access to multiple rods. Veigar carry!",
    howToTransition: "Collect every Yordle and focus on your econ at stage 2. Unlock Poppy ASAP to guarantee 4 Yordle on 2-3.",
    createdAt: "04/07/26",
    heartCount: 46,
    commentCount: 2,
  }

  const testCompSpec2 = {
    compId: 1,
    title: "Freljord Invokers",
    username: "minulion",
    champions: [
      { championName: "Anibia",
        championImg: "https://static.bigbrain.gg/assets/lol/riot_static/16.7.1/img/splash/Anivia_0.jpg",
        frameColor: "#C0C0C0"
      },
      { championName: "Kobuko & Yuumi",
        championImg: "https://tftbuilder.com/wp-content/uploads/2024/04/kobuko-tft.jpg",
        frameColor: "#3498DB"
      },
      { championName: "Sejuani",
        championImg: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sejuani_0.jpg",
        frameColor: "#3498DB"
      },
      { championName: "Taric",
        championImg: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Taric_0.jpg",
        frameColor: "#9B59B6"
      },
      { championName: "Braum",
        championImg: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Braum_0.jpg",
        frameColor: "#9B59B6"
      },
      { championName: "Lissandra",
        championImg: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lissandra_0.jpg",
        frameColor: "#9B59B6"
      },
      { championName: "Ornn",
        championImg: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ornn_0.jpg",
        frameColor: "#FFD700"
      },
      { championName: "Volibear",
        championImg: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Volibear_0.jpg",
        frameColor: "#FFD700"
      },
      { championName: "Zilean",
        championImg: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zilean_0.jpg",
        frameColor: "#FFD700"
      }
    ],
    tips: "S+ tier with Freljord emblem to get 5/7 Freljord.",
    howToTransition: "Play around Leblanc opener and look for 3 Noxus + Bruiser at stage 2. Level to 8 and roll for Lissandra and Braum.",
    createdAt: "04/06/26",
    heartCount: 30,
    commentCount: 8,
  }

  const testComps = [testCompSpec1, testCompSpec2];

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
            <button>Most Liked</button>
            <button>Recently created</button>
          </div>
        )}
      </div>
      {testComps.map((comp) => (
        <Post key={comp.compId} compSpec={comp} activeCompId={compId ? parseInt(compId) : null}/>
      ))}
    </div>
  );
}