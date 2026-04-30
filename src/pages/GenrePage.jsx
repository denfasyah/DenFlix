import { useParams, useSearchParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getDiscoverByGenre, getGenres } from "../Services/movieService";
import CardMovie from "../components/movie/card/CardMovie";
import Loading from "../components/common/Loading";

const GenrePage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "movie";

  const { data, loading } = useFetch(async () => {
    const [movieResults, genreList] = await Promise.all([
      getDiscoverByGenre(type, id),
      getGenres(type),
    ]);

    return {
      movies: movieResults,
      currentGenre: genreList.find((g) => g.id === Number(id)),
    };
  }, [id, type]);

  if (loading && !data) return <Loading />;

  return (
    <div className="min-h-screen bg-black px-5 py-10">
      <div className="max-w-7xl mx-auto md:pr-6">
        <div className="px-4">
          <h1 className="text-denflix-primary text-3xl font-bold mb-2">
            {data?.currentGenre?.name || "Genre"}
          </h1>
          <div className="mb-5 border-b border-gray-800 pb-6 flex flex-row md:flex-row justify-between items-start md:items-end gap-4">
            <p className="text-gray-500 text-sm mt-2 font-medium">
              koleksi <span className="text-white uppercase">{type}</span> untuk
              genre {data?.currentGenre?.name}.
            </p>
            <Link
              to="/"
              className="text-sm font-medium text-gray-400 hover:text-denflix-primary transition-all flex items-center gap-2"
            >
              <span>←</span> Back
            </Link>
          </div>
        </div>

        {/* Grid List */}
        <div className="bg-denflix-midnight rounded-lg p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-6 justify-items-center">
          {data?.movies?.map((item) => (
            <CardMovie key={item.id} movie={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
