import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getMoviesByGenre } from "../Services/movieService";
import CardMovie from "../components/movie/card/CardMovie";
import Loading from "../components/common/Loading";
import { Link } from "react-router-dom";
import { getGenres } from "../Services/movieService";

const GenrePage = () => {
  const { id } = useParams();

  const { data: movies, loading } = useFetch(() => getMoviesByGenre(id), id);
  const { data: genres } = useFetch(getGenres);
  const currentGenre = genres?.find((g) => g.id === Number(id));
  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-black px-5 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 border-b border-gray-800 pb-4">
         <h1 className="text-denflix-primary text-3xl font-bold">
           Genre {currentGenre ? currentGenre.name : "Movies"}
          </h1>
          
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">
              Menampilkan semua koleksi film {currentGenre?.name}
            </p>
            <Link
              to="/"
              className="text-sm font-medium text-gray-400 hover:text-denflix-primary transition-all flex items-center gap-2"
            >
              <span>←</span> Back
            </Link>
          </div>
        </div>
        <div className="bg-denflix-midnight rounded-lg p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-6 justify-items-center">
          {movies.map((movie) => (
            <CardMovie key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
