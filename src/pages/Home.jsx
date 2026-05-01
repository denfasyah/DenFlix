import useFetch from "../hooks/useFetch";
import { getMovies } from "../Services/movieService"; // Sesuaikan path file
import HeroSection from "../components/fragments/HeroSection";
import Trending from "../components/common/Trending";
import MovieList from "../components/movie/list/MovieList";
import TvList from "../components/Tv/list/TvList";
import Genre from "../components/common/Genre";
import ExclusiveBanner from "../components/common/ExclusiveBanner";
import CastList from "../components/cast/list/CastList";
import { Reveal } from "../components/animations/Reveal";

const Home = () => {
  const { data: nowPlaying } = useFetch(() => getMovies("now_playing"));

  return (
    <div>
      <Reveal>
        <HeroSection movies={nowPlaying} />
      </Reveal>
      <Reveal>
        <Trending />
      </Reveal>
      <Reveal>
        <Genre />
      </Reveal>
      <Reveal>
        <MovieList title="Upcoming" endpoint="upcoming" url="/movie/upcoming" />
      </Reveal>
      <Reveal>
        <MovieList
          title="Now Playing"
          endpoint="now_playing"
          url="/movie/now_playing"
        />
      </Reveal>
      <Reveal>
        <ExclusiveBanner />
      </Reveal>
      <Reveal>
        <TvList
          title="Airing Today Tv"
          endpoint="airing_today"
          url="/tv/airing_today"
        />
      </Reveal>
      <Reveal>
        <CastList
          title="Popular Cast"
          endpoint="popular"
          url="/person/popular"
        />
      </Reveal>
    </div>
  );
};

export default Home;
