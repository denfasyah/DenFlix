import useFetch from "../../hooks/useFetch";
import { getGenres } from "../../Services/movieService";
import { Link } from "react-router-dom";

const Genre = () => {
  const { data: genres, loading } = useFetch(getGenres);

  if (loading) return <div className="h-12"></div>; // Placeholder saat loading

  return (
    <div className="max-w-7xl mx-auto pr-6 mt-5">
     <h2 className="text-2xl px-4 font-bold text-denflix-primary mb-4">Genres</h2>
      <div className="carousel carousel-center w-full gap-2 px-5 py-5">
        {genres?.map((genre) => (
          <Link
            key={genre.id}
            to={`/genre/${genre.id}`}
            className="px-5 py-2 bg-white/5 border border-white/10 text-white rounded-xl
                       whitespace-nowrap transition-all duration-300 
                       hover:bg-denflix-primary hover:text-black hover:border-denflix-primary
                       active:scale-95 font-medium text-sm"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genre;