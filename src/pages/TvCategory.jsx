import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { getTvShows } from "../Services/movieService";
// import { Link } from "react-router-dom";
import CardMovie from "../components/movie/card/CardMovie";
import Loading from "../components/common/Loading";

const TvCategory = () => {
  const { category } = useParams();
  const { data: tv, loading } = useFetch(() => getTvShows(category), category);

  if (loading) return <Loading />;

  const formatTitle = (slug) => {
    if (!slug) return "";
    return slug
      .replace(/_/g, " ") 
      .split(" ") 
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
      .join(" "); 
  };

  return (
    <div className="min-h-screen bg-black px-5 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 border-b border-gray-800 pb-4">
          <h1 className="text-denflix-primary text-3xl font-bold">
            {formatTitle(category)}
          </h1>
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm mt-1">
              Menampilkan semua koleksi {formatTitle(category)}
            </p>
            {/* <Link
              to="/"
              className="text-sm font-medium text-gray-400 hover:text-denflix-primary transition-all flex items-center gap-2"
            >
              <span>←</span> Back
            </Link> */}
          </div>
        </div>
        <div className="bg-denflix-midnight rounded-lg p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-6 justify-items-center">
          {tv.map((show) => (
            <CardMovie key={show.id} movie={show} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvCategory;
