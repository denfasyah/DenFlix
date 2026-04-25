import { useEffect, useState } from "react";
import { getUpcomingMovies } from "../../Services/movieService";
import HeaderMovieList from "../common/HeaderMovieList";
import CardMovieList from "./CardMovieList";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const data = await getUpcomingMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-5 mt-5">
      <div className="bg-denflix-midnight rounded-lg mt-5">
        <HeaderMovieList title="Up Coming" url="/movie" />
        <div className="carousel carousel-center w-full gap-4 px-5 py-5">
          {movies.map((movie) => (
            <CardMovieList key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
