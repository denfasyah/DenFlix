import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../Services/movieService";
import { AiFillStar, AiOutlineClockCircle, AiOutlineCalendar } from "react-icons/ai";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageUrl = import.meta.env.VITE_APP_IMAGEURL;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getMovieDetail(id);
        setMovie(data);
      } catch (error) {
        console.error("Gagal memuat detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="text-white p-10 text-center">Loading...</div>;
  if (!movie) return <div className="text-white p-10 text-center">Film tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="relative h-[70vh] w-full">
        <img 
          src={`${imageUrl}/${movie.backdrop_path}`} 
          className="w-full h-full object-cover opacity-30"
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row gap-10 items-center md:items-end">
          <img 
            src={`${imageUrl}/${movie.poster_path}`} 
            className="w-24 md:w-64 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-800"
            alt={movie.title}
          />
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-denflix-primary italic text-lg md:text-xl mb-4">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm md:text-base mb-6">
              <span className="flex items-center gap-1 bg-denflix-primary text-black px-2 py-1 rounded font-bold">
                <AiFillStar /> {movie.vote_average.toFixed(1)}
              </span>
              <span className="flex items-center gap-1"><AiOutlineClockCircle /> {movie.runtime} min</span>
              <span className="flex items-center gap-1"><AiOutlineCalendar /> {movie.release_date}</span>
              <span className="border border-gray-600 px-2 py-1 rounded text-xs uppercase tracking-widest">{movie.status}</span>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded-full text-sm transition-colors cursor-default">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-denflix-primary mb-4">Storyline</h2>
          <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
        </div>

        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-800 pb-2">Movie Info</h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">Original Language</p>
              <p className="text-white uppercase">{movie.original_language}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">Budget</p>
              <p className="text-white">${movie.budget?.toLocaleString() || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">Revenue</p>
              <p className="text-white">${movie.revenue?.toLocaleString() || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">Production</p>
              <p className="text-white">{movie.production_companies.map(c => c.name).slice(0, 2).join(", ")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;