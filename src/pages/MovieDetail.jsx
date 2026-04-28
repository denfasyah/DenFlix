import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../Services/movieService";
import MovieHero from "../components/movie/detail/MovieHero";
import MovieSynopsis from "../components/movie/detail/MovieSynopsis";
import MovieInfo from "../components/movie/detail/MovieInfo";
import MovieTrailer from "../components/movie/detail/MovieTrailer";
import MovieCast from "../components/movie/detail/MovieCast";
import WatchProviders from "../components/movie/detail/WatchProviders";
import MovieRecommendations from "../components/movie/detail/MovieRecommendations";
import MovieGallery from "../components/movie/detail/MovieGallery";
import Loading from "../components/common/Loading";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageUrl = import.meta.env.VITE_APP_IMAGEURL;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetail(id);
        setMovie(data);
      } catch (error) {
        console.error("Gagal memuat detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading)
    return <Loading />;
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
      <MovieGallery
        images={movie.images}
        videos={movie.videos}
        imageUrl={imageUrl}
      />
      <MovieRecommendations recommendations={movie.recommendations?.results} />
    </div>
  );
};

export default MovieDetail;
