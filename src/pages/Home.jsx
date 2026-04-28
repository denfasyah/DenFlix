import useFetch from "../hooks/useFetch";
import { getMovies } from "../Services/movieService"; // Sesuaikan path file
import HeroSection from "../components/fragments/HeroSection";
import MovieList from "../components/movie/list/MovieList";
import Genre from "../components/common/Genre";

const Home = () => {
const { data: nowPlaying } = useFetch(() => getMovies("now_playing"));

  return (
    <div>
     <HeroSection movies={nowPlaying} />
      <MovieList 
        title="Now Playing" 
        endpoint="now_playing" 
        url="/movie/now_playing" 
      />
     <Genre />
      <MovieList 
        title="Popular" 
        endpoint="popular" 
        url="/movie/popular" 
      />
      <MovieList 
        title="Top Rated" 
        endpoint="top_rated" 
        url="/movie/top_rated" 
      />
      <MovieList 
        title="Upcoming" 
        endpoint="upcoming" 
        url="/movie/upcoming" 
      />
    </div>
  );
};

export default Home;
