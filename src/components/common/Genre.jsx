import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getGenres } from "../../Services/movieService";

const GenrePills = () => {
  const [activeType, setActiveType] = useState("movie");

  // Data genre akan otomatis re-fetch saat activeType berubah
  const { data: genres } = useFetch(() => getGenres(activeType), activeType);

  return (
    <div className="max-w-7xl mx-auto md:pr-6">
      <div className="bg-denflix-midnight rounded-lg mt-10">
        <div className="flex flex-row md:flex-row md:items-center gap-4 px-4 pt-2">
          <h2 className="text-denflix-primary font-semibold text-2xl tracking-wide">
            Genre
          </h2>
          {/* Switcher Button */}
          <div className="flex items-center border border-denflix-primary/30 rounded-full p-1 bg-white/5 w-fit">
            {["movie", "tv"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeType === t
                    ? "bg-denflix-primary text-black"
                    : "text-white hover:text-denflix-primary"
                }`}
              >
                {t === "movie" ? "Movies" : "TV"}
              </button>
            ))}
          </div>
        </div>
        {/* Genre List */}
        <div className="carousel carousel-center w-full gap-4 px-5 py-5">
          {genres?.map((genre) => (
            <Link
              key={genre.id}
              to={`/genre/${genre.id}?type=${activeType}`}
              className="px-6 py-2 rounded-bl-xl rounded-tr-xl border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-denflix-primary hover:text-black transition-all whitespace-nowrap active:scale-95"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenrePills;
