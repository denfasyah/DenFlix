import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getMovieDetail } from "../Services/movieService";
import MovieHero from "../components/movie/MovieHero";
import MovieSynopsis from "../components/movie/MovieSynopsis";
import MovieInfo from "../components/movie/MovieInfo";
import MovieTrailer from "../components/movie/MovieTrailer";

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

  if (loading)
    return <div className="text-white p-10 text-center">Loading...</div>;
  if (!movie)
    return (
      <div className="text-white p-10 text-center">Film tidak ditemukan.</div>
    );

  // Mencari video dengan type 'Trailer' dari list videos
  const trailer = movie.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube",
  );

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const providers = movie["watch/providers"]?.results?.ID;
  const streaming = providers?.flatrate || [];
  const buyOrRent = providers?.buy || providers?.rent || [];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <MovieHero movie={movie} imageUrl={imageUrl} />
      <div className="max-w-6xl mx-auto px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <MovieSynopsis movie={movie} />
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-denflix-primary mb-4">
              Where to Watch
            </h2>

            {streaming.length > 0 ? (
              <div className="flex flex-wrap gap-4 items-center">
                <p className="text-sm text-gray-400 mr-2">Streaming on:</p>
                {streaming.map((provider) => (
                  <Link
                    key={provider.provider_id}
                    to={providers.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block"
                  >
                    <img
                      src={`${imageUrl}${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="w-12 h-12 rounded-xl border border-gray-700 group-hover:border-denflix-primary group-hover:scale-110 transition-all shadow-lg"
                    />

                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 scale-0 group-hover:scale-100 transition-all bg-denflix-primary text-black text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-xl z-20 origin-left">
                      Watch on {provider.provider_name}
                      <div className="absolute top-1/2 -left-2 -translate-y-1/2 border-4 border-transparent border-r-denflix-primary"></div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
                <p className="text-gray-500 text-sm italic">
                  Not available for streaming in your region.
                  {buyOrRent.length > 0 && " Available for rent or purchase."}
                </p>
              </div>
            )}

            {providers?.link && (
              <a
                href={providers.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-[10px] text-gray-600 hover:text-denflix-primary underline"
              >
                Data provided by JustWatch
              </a>
            )}
          </div>
        </div>
        <MovieInfo movie={movie} />
      </div>

      <MovieTrailer trailer={trailer} opts={opts} />

      <div className="mt-12 max-w-6xl mx-auto px-8">
        <h2 className="text-2xl font-bold text-denflix-primary mb-6">Cast</h2>

        <div className="carousel carousel-center w-full gap-4 px-5 py-5">
          {movie.credits?.cast?.length > 0 ? (
            movie.credits.cast
              .filter((person) => person.profile_path !== null)
              .map((person) => (
                <div
                  key={person.id}
                  className="flex-none w-32 md:w-44 group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-gray-800 shadow-xl aspect-[2/3]">
                    <img
                      src={
                        person.profile_path
                          ? `${imageUrl}/${person.profile_path}`
                          : "https://via.placeholder.com/300x450?text=No+Image"
                      }
                      alt={person.name}
                      onError={handleImageError}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />

                    <Link
                      to={`/person/${person.id}`}
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-300"
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-sm font-bold text-white leading-tight mb-0.5 drop-shadow-md">
                          {person.name}
                        </p>
                        <p className="text-[10px] md:text-xs text-denflix-primary font-medium truncate drop-shadow-md">
                          as {person.character}
                        </p>

                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-white/10 backdrop-blur-md rounded text-[8px] uppercase tracking-tighter text-gray-300">
                          {person.known_for_department}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500 italic">
              No cast information available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
