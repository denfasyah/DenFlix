import useFetch from "../hooks/useFetch";
import { useSearchParams, Link } from "react-router-dom";
import { searchMulti } from "../Services/movieService";
import CardMovie from "../components/movie/card/CardMovie";
import SearchInput from "../components/common/SearchInput";
import Loading from "../components/common/Loading";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { data: results, loading } = useFetch(async () => {
    if (!query) return [];
    const data = await searchMulti(query);
    
    return data.filter((item) => item.poster_path || item.profile_path);
  }, query);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-black px-5 py-10">
      <div className="max-w-7xl mx-auto">
        <SearchInput />

        <div className="mt-10">
          <div className="mb-10 border-b border-gray-800 pb-4">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Search Results for:{" "}
                  <span className="text-denflix-primary italic">"{query}"</span>
                </h2>
                <p className="text-gray-400 text-sm mt-2 uppercase tracking-widest font-semibold">
                  Found {results?.length || 0} matches 
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

          {results?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
              {results.map((item) => (
                <CardMovie key={`${item.media_type}-${item.id}`} movie={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-denflix-midnight rounded-3xl border border-dashed border-gray-700">
              <p className="text-gray-500 text-xl italic">
                No results found for "{query}". Try another keyword!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;