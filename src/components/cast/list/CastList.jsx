import useFetch from "../../../hooks/useFetch";
import { getCast } from "../../../Services/movieService";
import HeaderMovieList from "../../movie/list/HeaderMovieList";
import CardMovie from "../../movie/card/CardMovie";
import Loading from "../../common/Loading";

const CastList = ({ endpoint, title, url }) => {
  const { data: cast, loading } = useFetch(async () => {
    const data = await getCast(endpoint);
    return data.slice(0, 12);
  }, endpoint);

  if (loading) return <Loading />;
  return (
    <div className="max-w-7xl mx-auto md:pr-6">
      <div className="bg-denflix-midnight rounded-lg mt-5">
        <HeaderMovieList title={title} url={url} />
        <div className="carousel carousel-center w-full gap-4 px-5 py-5">
          {cast.slice(0, 12).map((show) => (
            <CardMovie key={show.id} movie={show} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastList;
