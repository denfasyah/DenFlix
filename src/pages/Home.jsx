import { useEffect, useState } from "react";
import { getMovies } from "../Services/movieService"; // Sesuaikan path file
import HeroSection from "../components/fragments/HeroSection";
import MovieList from "../components/movie/list/MovieList";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);

 useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies("now_playing");
        setNowPlaying(data); 
      } catch (error) {
        console.error("Gagal mengambil data film:", error);
      }
    };
    fetchMovies();
  }, []);
  return (
    <div>
     <HeroSection movies={nowPlaying} />
      <MovieList 
        title="Now Playing Movies" 
        endpoint="now_playing" 
        url="/movie/now_playing" 
      />
      <MovieList 
        title="Popular Movies" 
        endpoint="popular" 
        url="/movie/popular" 
      />
      <MovieList 
        title="Top Rated Movies" 
        endpoint="top_rated" 
        url="/movie/top_rated" 
      />
      <MovieList 
        title="Upcoming Movies" 
        endpoint="upcoming" 
        url="/movie/upcoming" 
      />
    </div>
  );
};

export default Home;
