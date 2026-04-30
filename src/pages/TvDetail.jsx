import { useParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import { getTvShowDetail } from "../Services/movieService";
import Loading from "../components/common/Loading";
import MovieHero from "../components/movie/detail/MovieHero";
import MovieSynopsis from "../components/movie/detail/MovieSynopsis";
import MovieInfo from "../components/movie/detail/MovieInfo";
import WatchProviders from "../components/movie/detail/WatchProviders";
import MovieTrailer from "../components/movie/detail/MovieTrailer";
import MovieCast from "../components/movie/detail/MovieCast";
import MovieGallery from "../components/movie/detail/MovieGallery";
import MovieRecommendations from "../components/movie/detail/MovieRecommendations";

const TvDetail = () => {
  const { id } = useParams();
  const { data: tv, loading } = useFetch(() => getTvShowDetail(id), id);
  const imageUrl = import.meta.env.VITE_APP_IMAGEURL;

  if (loading) return <Loading />;
  if (!tv) return null;
  const providers = tv["watch/providers"]?.results?.ID;
  const streaming = providers?.flatrate || [];
  const buyOrRent = providers?.buy || providers?.rent || [];
  const trailer = tv.videos?.results?.find(
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
      <MovieHero data={tv} imageUrl={import.meta.env.VITE_APP_IMAGEURL} />
      <div className="max-w-6xl mx-auto px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <MovieSynopsis data={tv} />
          <WatchProviders
            streaming={streaming}
            buyOrRent={buyOrRent}
            providers={providers}
            imageUrl={imageUrl}
          />
        </div>
        <MovieInfo data={tv} />
      </div>
      <MovieTrailer trailer={trailer} opts={opts} />
      <MovieCast
        data={tv}
        imageUrl={imageUrl}
        handleImageError={handleImageError}
      />
      <MovieGallery
        images={tv.images}
        videos={tv.videos}
        imageUrl={imageUrl}
      />
      <MovieRecommendations recommendations={tv.recommendations?.results} />
    </div>
  );
};

export default TvDetail;
