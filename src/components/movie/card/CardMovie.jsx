import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const CardMovie = ({ movie }) => {
  const imagePath = movie.poster_path || movie.profile_path;
  const img = `${import.meta.env.VITE_APP_IMAGEURL}/${imagePath}`;
  
  const displayTitle = movie.title || movie.name || "Untitled";

  // Deteksi Tipe Media
  const isTv = movie.media_type === "tv" || (!movie.title && movie.name && !movie.known_for_department);
  const isPerson = movie.media_type === "person" || movie.known_for_department !== undefined; 
  
  const linkCard = isPerson 
    ? `/person/detail/${movie.id}` 
    : isTv ? `/tv/detail/${movie.id}` : `/movie/detail/${movie.id}`;

  return (
    <div className="carousel-item">
      <Link
        to={linkCard}
        className="hover:scale-105 transition-transform duration-300 block group"
      >
        <div className="relative h-48 w-32 md:h-52 md:w-36 overflow-hidden rounded-xl shadow-2xl border border-white/5">
          
          {/* Label Badge (Pojok Kiri Atas) */}
          <div className={`absolute top-0 left-0 z-10 text-[8px] md:text-[10px] font-black px-2 py-1 rounded-br-lg shadow-lg uppercase tracking-tighter ${
            isPerson ? "bg-blue-600 text-white" : 
            isTv ? "bg-denflix-primary text-black" : 
            "bg-red-600 text-white"
          }`}>
            {isPerson ? "Cast" : isTv ? "TV" : "Movie"}
          </div>

          {/* Rating (Pojok Kanan Atas) - Sembunyikan jika Person */}
          {!isPerson && movie.vote_average > 0 && (
            <div className="absolute flex items-center gap-1 top-0 right-0 z-10 bg-black/60 backdrop-blur-md text-white font-bold text-[9px] md:text-xs px-2 py-1 rounded-bl-xl border-l border-b border-white/10">
              <AiFillStar className="text-denflix-primary" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          )}
          
          <img
            src={imagePath ? img : "https://via.placeholder.com/500x750?text=No+Image"}
            alt={displayTitle}
            className="object-cover h-full w-full"
          />

          {/* Overlay Gradient & Title */}
          <div className="absolute flex items-end justify-center w-full h-full inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-2">
            <h3 className="text-center text-white text-[10px] md:text-xs font-bold line-clamp-1  group-hover:text-denflix-primary transition-colors">
              {displayTitle}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardMovie;