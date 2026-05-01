import useFetch from "../hooks/useFetch";
import { getMovies } from "../Services/movieService"; // Sesuaikan path file
import HeroSection from "../components/fragments/HeroSection";
import Trending from "../components/common/Trending";
import MovieList from "../components/movie/list/MovieList";
import TvList from "../components/Tv/list/TvList";
import Genre from "../components/common/Genre";
import ExclusiveBanner from "../components/common/ExclusiveBanner";
import CastList from "../components/cast/list/CastList";

const Home = () => {
  const { data: nowPlaying } = useFetch(() => getMovies("now_playing"));

  return (
    <div>
      <HeroSection movies={nowPlaying} />
      <Trending />
      <Genre />
      <MovieList title="Upcoming" endpoint="upcoming" url="/movie/upcoming" />
      <MovieList
        title="Now Playing"
        endpoint="now_playing"
        url="/movie/now_playing"
      />
      <ExclusiveBanner />
      <TvList
        title="Airing Today Tv"
        endpoint="airing_today"
        url="/tv/airing_today"
      />

       <CastList
        title="Popular Cast"
        endpoint="popular"
        url="/person/popular"
      />

    </div>
  );
};

export default Home;
