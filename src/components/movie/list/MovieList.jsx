import { useEffect, useState } from "react";
import { getMovies } from "../../../Services/movieService";
import HeaderMovieList from "../list/HeaderMovieList";
import CardMovie from "../card/CardMovie";
  
const MovieList = ({ endpoint, title, url }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const data = await getMovies(endpoint);
        setMovies(data.slice(0, 12));
      } catch (error) {
        console.error(`Error fetching ${endpoint} movies:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, [endpoint]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="px-5">
      <div className="bg-denflix-midnight rounded-lg mt-5">
        <HeaderMovieList title={title} url={url} />
        <div className="carousel carousel-center w-full gap-4 px-5 py-5">
          {movies.slice(0, 12).map((movie) => (
            <CardMovie key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
