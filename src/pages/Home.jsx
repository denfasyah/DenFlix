import HeroSection from "../components/movie/HeroSection";
import MovieList from "../components/movie/MovieList";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <MovieList 
        title="Now Playing" 
        endpoint="now_playing" 
        url="/movie/now_playing" 
      />
      <MovieList 
        title="Popular Movies" 
        endpoint="popular" 
        url="/movie/popular" 
      />
      <MovieList 
        title="Top Rated" 
        endpoint="top_rated" 
        url="/movie/top_rated" 
      />
      <MovieList 
        title="Coming Soon" 
        endpoint="upcoming" 
        url="/movie/upcoming" 
      />
    </div>
  );
};

export default Home;
