import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const CardMovie = ({ movie }) => {

  const imagePath = movie.poster_path || movie.profile_path;
  const img = `${import.meta.env.VITE_APP_IMAGEURL}/${imagePath}`;
  
  const displayTitle = movie.title || movie.name || "Untitled";

  const isTv = movie.media_type === "tv" || (!movie.title && movie.name);
  const isPerson = movie.known_for_department !== undefined; 
  

  const linkCard = isPerson 
    ? `/person/detail/${movie.id}` 
    : isTv ? `/tv/detail/${movie.id}` : `/movie/detail/${movie.id}`;

  return (
    <div className="carousel-item">
      <Link
        to={linkCard}
        className="hover:scale-105 transition-transform duration-300 block"
      >
        <div className="relative h-48 w-32 md:h-52 md:w-36 overflow-hidden rounded-xl shadow-2xl">
          {!isPerson && (
            <div className="absolute flex gap-1 top-0 right-0 z-10 bg-denflix-secondary text-white font-bold text-xs px-2 py-1 rounded-bl-xl shadow-md">
              <AiFillStar className="text-sm" />
              <span>
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </span>
            </div>
          )}
          
          <img
            src={imagePath ? img : "https://via.placeholder.com/500x750?text=No+Image"}
            alt={displayTitle}
            className="object-cover h-full w-full"
          />
          <div className="absolute flex items-end justify-center w-full h-full inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-md p-2">
            <h3 className="text-center text-white text-[10px] md:text-xs font-medium line-clamp-1">
              {displayTitle}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardMovie;