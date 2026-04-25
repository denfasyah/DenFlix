import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const CardMovieList = ({ movie }) => {
  const img = `${import.meta.env.VITE_APP_IMAGEURL}/${movie.poster_path}`;

  return (
    <div className="carousel-item">
      <Link
        to={`/movie/${movie.id}`}
        className="hover:scale-105 transition-transform duration-300 block"
      >
        <div className="relative h-48 w-32 md:h-52 md:w-36 overflow-hidden rounded-xl shadow-2xl">
          <div className="absolute flex gap-1 top-0 right-0 z-5 bg-denflix-secondary text-white font-bold text-xs px-2 py-1 rounded-bl-xl shadow-md">
            <AiFillStar className="text-sm" />
            <span>
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>
          <img
            src={img}
            alt={movie.title}
            className="object-cover h-full w-full"
          />
        </div>
      </Link>
    </div>
  );
};

export default CardMovieList;
