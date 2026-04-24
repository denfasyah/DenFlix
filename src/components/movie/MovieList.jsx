import HeaderMovieList from "../common/HeaderMovieList";
import CardMovieList from "./CardMovieList";
const MovieList = () => {
  return (
    <div className="px-5 mt-5">
      <div className="bg-denflix-midnight rounded-lg mt-5">
        <HeaderMovieList title="Coming Soon" url="/movies/coming-soon" />
        <CardMovieList type="Coming Soon" />
      </div>
    </div>
  );
};

export default MovieList;
