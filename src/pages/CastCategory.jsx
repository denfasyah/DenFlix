import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { getCast } from "../Services/movieService";
import CardMovie from "../components/movie/card/CardMovie";
import Loading from "../components/common/Loading";

const CastCategory = () => {
  const { category } = useParams();
  const { data: cast, loading } = useFetch(() => getCast(category), category);

  if (loading) return <Loading />;

  const formatTitle = (slug) => {
    if (!slug) return "";
    return slug
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const filteredCast = cast?.filter((person) => person.profile_path || person.poster_path);

  return (
    <div className="min-h-screen bg-black px-5 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 border-b border-gray-800 pb-4">
          <h1 className="text-denflix-primary text-3xl font-bold">
            {formatTitle(category)}
          </h1>
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm mt-1">
              Menampilkan {filteredCast?.length} koleksi {formatTitle(category)}
            </p>
          </div>
        </div>

        <div className="bg-denflix-midnight rounded-lg p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-6 justify-items-center">
          {filteredCast && filteredCast.length > 0 ? (
            filteredCast.map((person) => (
              <CardMovie key={person.id} movie={person} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full py-10">Tidak ada data dengan gambar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CastCategory;