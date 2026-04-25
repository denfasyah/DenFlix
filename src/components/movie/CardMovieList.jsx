import { Link } from "react-router-dom";

const CardMovieList = ({ movie }) => {
  const img = `${import.meta.env.VITE_APP_IMAGEURL}/${movie.poster_path}`;

  return (
    <div className="carousel-item">
      <Link
        to={`/movie/${movie.id}`}
        className="hover:scale-105 transition-transform duration-300 block"
      >
        <div className="relative h-48 w-32 md:h-52 md:w-36 overflow-hidden rounded-xl shadow-2xl">
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