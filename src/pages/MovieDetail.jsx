import useFetch from "../hooks/UseFetch";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../Services/movieService";
import Loading from "../components/common/Loading";
import MovieHero from "../components/movie/detail/MovieHero";
import MovieSynopsis from "../components/movie/detail/MovieSynopsis";
import MovieInfo from "../components/movie/detail/MovieInfo";
import WatchProviders from "../components/movie/detail/WatchProviders";
import MovieTrailer from "../components/movie/detail/MovieTrailer";
import MovieCast from "../components/movie/detail/MovieCast";
import MovieGallery from "../components/movie/detail/MovieGallery";
import MovieRecommendations from "../components/movie/detail/MovieRecommendations";
import MovieReview from "../components/movie/detail/MovieReview";

const MovieDetail = () => {
  const { id } = useParams();
  const imageUrl = import.meta.env.VITE_APP_IMAGEURL;

  const { data: movie, loading } = useFetch(() => getMovieDetail(id), id);

  if (loading)
    return <Loading />;

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
      <MovieHero data={movie} imageUrl={imageUrl} />
      <div className="max-w-6xl mx-auto px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <MovieSynopsis data={movie} />
          <WatchProviders
            streaming={streaming}
            buyOrRent={buyOrRent}
            providers={providers}
            imageUrl={imageUrl}
          />
        </div>
        <MovieInfo data={movie} />
      </div>
      <MovieTrailer trailer={trailer} opts={opts} />
      <MovieCast
        data={movie}
        imageUrl={imageUrl}
        handleImageError={handleImageError}
      />
      <MovieGallery
        images={movie.images}
        videos={movie.videos}
        imageUrl={imageUrl}
      />
      <MovieRecommendations recommendations={movie.recommendations?.results} />
      <MovieReview type={movie} id={id} />
    </div>
  );
};

export default MovieDetail;

