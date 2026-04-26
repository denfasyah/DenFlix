import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../Services/movieService";
import MovieHero from "../components/movie/MovieHero";
import MovieSynopsis from "../components/movie/MovieSynopsis";
import MovieInfo from "../components/movie/MovieInfo";
import MovieTrailer from "../components/movie/MovieTrailer";
import MovieCast from "../components/movie/MovieCast";
import WatchProviders from "../components/movie/WatchProviders";

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

  const providers = movie["watch/providers"]?.results?.ID;
  const streaming = providers?.flatrate || [];
  const buyOrRent = providers?.buy || providers?.rent || [];

  const trailer = movie.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube",
  );

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <MovieHero movie={movie} imageUrl={imageUrl} />
      <div className="max-w-6xl mx-auto px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <MovieSynopsis movie={movie} />
          <WatchProviders
            streaming={streaming}
            buyOrRent={buyOrRent}
            providers={providers}
            imageUrl={imageUrl}
          />
        </div>
        <MovieInfo movie={movie} />
      </div>
      <MovieTrailer trailer={trailer} opts={opts} />
      <MovieCast
        movie={movie}
        imageUrl={imageUrl}
        handleImageError={handleImageError}
      />
    </div>
  );
};

export default MovieDetail;
