const MovieInfo = ({ movie }) => {
  return (
    <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
      <h3 className="text-xl font-bold mb-6 border-b border-gray-800 pb-2">
        Movie Info
      </h3>
      <div className="space-y-4 text-sm">
        <div>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
            Original Language
          </p>
          <p className="text-white uppercase">{movie.original_language}</p>
        </div>
        <div>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
            Budget
          </p>
          <p className="text-white">
            ${movie.budget?.toLocaleString() || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
            Revenue
          </p>
          <p className="text-white">
            ${movie.revenue?.toLocaleString() || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
            Production
          </p>
          <p className="text-white">
            {movie.production_companies
              .map((c) => c.name)
              .slice(0, 2)
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
