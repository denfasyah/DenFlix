import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchMovies } from "../Services/movieService";
import CardMovie from "../components/movie/card/CardMovie";
import SearchInput from "../components/common/SearchInput";
import Loading from "../components/common/Loading";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        setLoading(true);
        try {
          const data = await searchMovies(query);

          const filteredData = data.filter(
            (movie) => movie.poster_path !== null,
          );
          setResults(filteredData);
        } catch (error) {
          console.error("Search Error:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSearchResults();
  }, [query]);

    if (loading)
    return <Loading />;

  return (
    <div className="min-h-screen bg-black px-5 py-10">
      <SearchInput />

      <div className="max-w-7xl mx-auto mt-10">
        <div className="mb-10 border-b border-gray-800 pb-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Search Results for:{" "}
                <span className="text-denflix-primary italic">"{query}"</span>
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                Menemukan Sekitar {results.length} film
              </p>
            </div>
            <Link
              to="/"
              className="text-sm font-medium text-gray-400 hover:text-denflix-primary transition-all flex items-center gap-2"
            >
              <span>←</span> Back
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-denflix-primary"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="bg-denflix-midnight rounded-lg p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-6 justify-items-center">
            {results.map((movie) => (
              <CardMovie key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              Maaf, tidak ada film dengan gambar yang ditemukan untuk "{query}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
