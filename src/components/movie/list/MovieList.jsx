import { useEffect, useState } from "react";
import { getMovies } from "../../../Services/movieService";
import HeaderMovieList from "../list/HeaderMovieList";
import CardMovie from "../card/CardMovie";
import Loading from "../../common/Loading";
  
const MovieList = ({ endpoint, title, url }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const data = await getMovies(endpoint);
        setMovies(data.slice(0, 12));
      } catch (error) {
        console.error(`Error fetching ${endpoint} movies:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieList();
  }, [endpoint]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto pr-6 ">
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
