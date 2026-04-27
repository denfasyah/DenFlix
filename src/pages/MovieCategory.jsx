import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovies } from "../Services/movieService";
import { Link } from "react-router-dom";
import CardMovieList from "../components/movie/CardMovieList";

const MovieCategory = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTitle = (slug) => {
    return slug.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const data = await getMovies(category);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [category]);

  if (loading)
    return <div className="text-white p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-black px-5 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 border-b border-gray-800 pb-4">
          <h1 className="text-denflix-primary text-3xl font-bold">
            {formatTitle(category)} Movies
          </h1>
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm mt-1">
              Menampilkan semua koleksi {formatTitle(category)}
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
            <CardMovieList key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCategory;
