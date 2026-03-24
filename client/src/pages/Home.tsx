import { Link } from "react-router-dom";
import puzzle from "../assets/puzzle.png";
import FeatureCard from "../components/FeatureCard";
import { Brain, Star, Lightbulb } from "lucide-react";

function Home() {

  const features = [
    {
      title: "Human Strategy, Not Just Stats",
      caption: "Learn the reasoning behind every comp",
      description: "Most TFT websites rely on win-rate statistics to define the meta. CompShare focuses on real player insight — strategies, explanations, and creative builds shared by the community.",
      icon: Brain
    },
    {
      title: "Community Reviews",
      caption: "Real players, real feedback",
      description: "See what other players think about a comp before trying it yourself. Read reviews, discuss item choices, and learn from real experiences instead of relying only on data.",
      icon: Star
    },
    {
      title: "Discover Creative Builds",
      caption: "Innovation beyond the meta",
      description: "Explore unique team compositions created by players experimenting with new ideas. CompShare helps you discover strategies that statistics sites might overlook.",
      icon: Lightbulb
    }
  ]

  return (
    <div className="w-full min-h-screen">
      <section className="bg-gradient-to-br from-amber-50 via-white to-sky-50 shadow">
        <div className="max-w-6xl mx-auto px-8 py-30">

          <div className="flex justify-between items-center">
            <div className="flex flex-col">

              <h1 className="text-7xl font-extrabold">
                Discover
                  <span className="block w-fit my-4 bg-gradient-to-r from-amber-400 to-sky-700 bg-clip-text text-transparent">
                    Creative
                  </span>
                TFT Comps
              </h1>

              <p className="mt-6 text-xl text-gray-600 font-medium">
                Build comps, share with the community, and shape the meta.
              </p>

              <div className="flex gap-4 mt-6 items-center">

                <Link to="#" className="w-fit rounded-2xl bg-amber-400 text-white font-medium px-6 py-4 hover:bg-amber-500">
                  Start Building
                </Link>

                <Link to="#" className="w-fit rounded-2xl border-2 border-gray-300 font-medium px-6 py-4 hover:border-gray-400">
                  View Comps
                </Link>

              </div>

            </div>

            <img src={puzzle} alt="Image of penguin in puzzle" className="max-w-md"/>
          </div>

        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-8 relative">

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Why <span className="bg-gradient-to-r from-amber-400 to-sky-700 text-transparent bg-clip-text">
                CompShare
              </span>?
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              Discover TFT strategies powered by real players. Learn the reasoning behind every comp and explore creative builds from the community.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-6 px-8 py-12">
            {features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature}/>
            ))}

          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;