const MovieInfo = ({ data}) => {
  const isTv = !!data.first_air_date;

  return (
    <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
      <h3 className="text-xl font-bold mb-6 border-b border-gray-800 pb-2">
        {isTv ? "TV Show" : "Movie"} Info
      </h3>

      <div className="space-y-4 text-sm">
        <div>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
            Original Language
          </p>
          <p className="text-white uppercase">{data.original_language}</p>
        </div>

        <div>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
            {isTv ? "Seasons" : "Budget"}
          </p>
          <p className="text-white">
            {isTv
              ? data.number_of_seasons || "N/A"
              : `$${data.budget?.toLocaleString() || "N/A"}`}
          </p>
        </div>

        <div>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
            {isTv ? "Episodes" : "Revenue"}
          </p>
          <p className="text-white">
            {isTv
              ? data.number_of_episodes || "N/A"
              : `$${data.revenue?.toLocaleString() || "N/A"}`}
          </p>
        </div>

        {isTv && (
          <>
            <div>
              <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
                Last Air Date
              </p>
              <p className="text-white">{data.last_air_date || "N/A"}</p>
            </div>
          </>
        )}

        <div>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
            Production
          </p>
          <p className="text-white">
            {data.production_companies
              ?.map((c) => c.name)
              .slice(0, 2)
              .join(", ") || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;