import { AiFillStar, AiOutlineClockCircle, AiOutlineCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
const TvHero = ({ tv, imageUrl }) => {
  return (
    <div className="relative h-[70vh] w-full">
      <img
        src={`${imageUrl}/${tv.backdrop_path}`}
        className="w-full h-full object-cover opacity-30"
        alt={tv.name}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row gap-10 items-center md:items-end">
        <img
          src={`${imageUrl}/${tv.poster_path}`}
          className="w-24 md:w-64 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-800"
          alt={tv.name}
        />

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">{tv.name}</h1>
          {tv.tagline && (
            <p className="text-denflix-primary italic text-lg md:text-xl mb-4">"{tv.tagline}"</p>
          )}

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm md:text-base mb-6">
            <span className="flex items-center gap-1 bg-denflix-primary text-black px-2 py-1 rounded font-bold">
              <AiFillStar /> {tv.vote_average.toFixed(1)}
            </span>
            <span className="flex items-center gap-1 text-white"><AiOutlineClockCircle /> {tv.runtime} min</span>
            <span className="flex items-center gap-1"><AiOutlineCalendar /> {tv.air_date}</span>
            <span className="border border-gray-600 px-2 py-1 rounded text-xs uppercase tracking-widest text-white">{tv.status}</span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {tv.genres.map((genre) => (
              <Link to={`/genre/${genre.id}`} key={genre.id} className="bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded-full text-sm transition-colors cursor-default text-white">
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvHero;