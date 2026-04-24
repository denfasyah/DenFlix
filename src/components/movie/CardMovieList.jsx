import { Link } from "react-router-dom";
const CardMovieList = () => {
  return (
    <div className="container carousel carousel-s gap-5 px-5 py-5">
      <Link
        to={`/movie/`}
        className="carousel-item cursor-pointer hover:scale-105 transition-transform duration-300"
      >
        <div className="relative h-48 md:h-52 w-38 overflow-hidden">
          <img
            src="/img/imgcard.jpg"
            alt="poster card"
            className="rounded-md object-cover h-full w-full"
          />
        </div>
      </Link>
    </div>
  );
};

export default CardMovieList;
