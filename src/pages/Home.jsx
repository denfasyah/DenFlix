import { useEffect, useState } from "react";
import { getMovies } from "../Services/movieService"; // Sesuaikan path file
import HeroSection from "../components/fragments/HeroSection";
import MovieList from "../components/movie/MovieList";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);

 useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Memanggil fungsi getMovies dengan endpoint 'now_playing'
        const data = await getMovies("now_playing");
        setNowPlaying(data); // getMovies sudah mengembalikan response.data.results
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
