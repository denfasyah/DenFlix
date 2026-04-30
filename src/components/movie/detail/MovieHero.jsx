import {
  AiFillStar,
  AiOutlineClockCircle,
  AiOutlineCalendar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
const MovieHero = ({ data, imageUrl }) => {
  const displayTitle = data.title || data.name || "Untitled";
  const releaseDate = data.release_date || data.first_air_date || "Untitled";
  const duration = data.runtime || data.last_episode_to_air?.runtime|| "N/A";
const isTv = !!data.name || !!data.first_air_date;
const currentType = isTv ? "tv" : "movie";
  return (
    <div className="relative h-[70vh] w-full">
      <img
        src={`${imageUrl}/${data.backdrop_path}`}
        className="w-full h-full object-cover opacity-30"
        alt={data.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row gap-10 items-center md:items-end">
        <img
          src={`${imageUrl}/${data.poster_path}`}
          className="w-24 md:w-64 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-800"
          alt={data.title}
        />

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
            {displayTitle}
          </h1>
          {data.tagline && (
            <p className="text-denflix-primary italic text-lg md:text-xl mb-4">
              "{data.tagline}"
            </p>
          )}

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm md:text-base mb-6">
            <span className="flex items-center gap-1 bg-denflix-primary text-black px-2 py-1 rounded font-bold">
              <AiFillStar /> {data.vote_average.toFixed(1)}
            </span>
            <span className="flex items-center gap-1 text-white">
              <AiOutlineClockCircle /> {duration} min
            </span>
            <span className="flex items-center gap-1 text-white">
              <AiOutlineCalendar />
              {releaseDate}
            </span>
            <span className="border border-gray-600 px-2 py-1 rounded text-xs uppercase tracking-widest text-white">
              {data.status}
            </span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {data.genres.map((genre) => (
              <Link
                to={`/genre/${genre.id}?type=${currentType}`}
                key={genre.id}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded-full text-sm transition-colors cursor-default text-white"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
