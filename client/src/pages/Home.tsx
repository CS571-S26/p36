import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { getAllComps } from "../api/posts";
import { CompBoard } from "../components/comps/Board";
import { Heart, MessageCircle, ArrowUpRight, ArrowRight } from "lucide-react";

function Home() {

  // const features = [
  //   {
  //     title: "Human Strategy, Not Just Stats",
  //     caption: "Learn the reasoning behind every comp",
  //     description: "Most TFT websites rely on win-rate statistics to define the meta. CompShare focuses on real player insight — strategies, explanations, and creative builds shared by the community.",
  //     icon: Brain
  //   },
  //   {
  //     title: "Community Reviews",
  //     caption: "Real players, real feedback",
  //     description: "See what other players think about a comp before trying it yourself. Read reviews, discuss item choices, and learn from real experiences instead of relying only on data.",
  //     icon: Star
  //   },
  //   {
  //     title: "Discover Creative Builds",
  //     caption: "Innovation beyond the meta",
  //     description: "Explore unique team compositions created by players experimenting with new ideas. CompShare helps you discover strategies that statistics sites might overlook.",
  //     icon: Lightbulb
  //   }
  // ]

  const [topComps, setTopComps] = useState<any[]>([]);
  const [compIdx, setCompIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = (comps: any[]) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCompIdx((prev) => (prev + 1) % comps.length);
    }, 7500);
  };

  useEffect(() => {
    getAllComps("mostLiked").then((data) => {
      const sliced = data.slice(0, 3);
      setTopComps(sliced);
      startInterval(sliced);
    });
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (i: number) => {
    setCompIdx(i);
    startInterval(topComps);
  };

  const current = topComps[compIdx];

  return (
    <div className="w-full min-h-screen">
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-8 pt-12">

          <div className="flex flex-col justify-center items-center">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-3xl mx-auto text-center text-[#0B2026]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            >
              TFT comps that make {" "}
              <span className="text-amber-400">creativity</span> your biggest advantage.
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg md:text-xl text-gray-500 text-center font-medium"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
            >
              Not tier lists. Not win-rate scrapes. Comps by real players.
            </motion.p>
          </div>

          <div className="w-full flex flex-col py-12">
              {topComps.length > 0 && (
                <>
                  <div className="mx-auto w-full max-w-4xl">
                    <span className="inline-flex w-fit rounded-full px-2 py-0.5 bg-sky-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase mb-2">
                      Top 3 Trending
                    </span>

                    <motion.div
                      key={`header-${compIdx}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex w-full flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-[#0B2026]">
                        {current.title}
                        <span className="ml-3 text-base text-gray-500 font-medium">
                          by @{current.username}
                        </span>
                      </h2>

                      <div className="flex items-center gap-5 text-sm text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Heart className="w-4 h-4" />
                          {current.heartCount}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MessageCircle className="w-4 h-4" />
                          {current.commentCount}
                        </span>
                        <Link
                          to={`/comps/${current._id}`}
                          className="inline-flex items-center gap-1.5 text-amber-400 font-bold"
                        >
                          View comp
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>

                    </motion.div>
                  </div>

                  <motion.div
                    key={compIdx}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <CompBoard champions={current.champions} />
                  </motion.div>

                  <div className="flex items-center justify-center gap-3 mt-10">
                    {topComps.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`relative overflow-hidden h-2 rounded-full hover:cursor-pointer ${
                          i === compIdx ? "bg-gray-600/15" : "bg-gray-600 hover:bg-gray-400"
                        }`}
                        animate={{ width: i === compIdx ? "4rem" : "0.5rem" }}
                        transition={{ duration: 0.3 }}
                      >
                        {i === compIdx && (
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full bg-amber-400"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 7.5, ease: "linear" }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}
              <div className="flex flex-wrap mt-14 items-center justify-center gap-4">
                <Link
                  to="/build-comp"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-400 font-bold px-7 py-4 hover:bg-amber-300"
                >
                  Start Building
                  <ArrowRight className="w-4 h-4"/>
                </Link>
                <Link
                  to="/comps"
                  className="font-semibold px-5 py-4"
                >
                  Browse all comps
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* Why Compshare */}
      <section className="bg-[#0B2026]">

      </section>
    </div>
  );
}

export default Home;
