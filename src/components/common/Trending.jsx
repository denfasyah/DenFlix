import { useState } from "react";
import useFetch from "../../hooks/UseFetch";
import { getTrending } from "../../Services/movieService";
import CardMovie from "../movie/card/CardMovie";

const Trending = () => {
  const [category, setCategory] = useState("all");
  const { data: trendingData } = useFetch(
    () => getTrending(category),
    category,
  );

  const categories = [
    { id: "all", label: "All" },
    { id: "movie", label: "Movies" },
    { id: "tv", label: "TV" },
  ];

  return (
    <div className="max-w-full mx-auto">
      <div className="bg-denflix-midnight rounded-lg">
        <div className="flex flex-row md:flex-row md:items-center gap-4 pt-2">
          <h2 className="text-denflix-primary mx-5 mt-1 text-2xl font-bold uppercase tracking-tight">
            Trending
          </h2>

          <div className="flex items-center border border-denflix-primary/30 rounded-full p-1 bg-white/5 w-fit">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  category === cat.id
                    ? "bg-denflix-primary text-black"
                    : "text-white hover:text-denflix-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="carousel carousel-center w-full gap-4 px-5 py-5">
          {trendingData?.map((item) => (
            <CardMovie movie={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
