import useFetch from "../../../hooks/useFetch";
import { getMovies } from "../../../Services/movieService";
import HeaderMovieList from "../list/HeaderMovieList";
import CardMovie from "../card/CardMovie";
import Loading from "../../common/Loading";

const MovieList = ({ endpoint, title, url }) => {
  const { data: movies, loading } = useFetch(async () => {
    const data = await getMovies(endpoint);
    return data.slice(0, 12);
  }, endpoint);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto md:pr-6">
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
