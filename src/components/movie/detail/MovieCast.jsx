import { Link } from "react-router-dom";
const MovieCast = ({ data, imageUrl, handleImageError }) => {
  return (
    <div className="mt-12 max-w-6xl mx-auto px-8">
      <h2 className="text-2xl font-bold text-denflix-primary mb-6">Cast</h2>

      <div className="carousel carousel-center w-full gap-4 px-5 py-5">
        {data.credits?.cast?.length > 0 ? (
          data.credits.cast
            .filter((person) => person.profile_path !== null)
            .map((person) => (
              <div
                key={person.id}
                className="flex-none w-32 md:w-44 group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 shadow-xl aspect-[2/3]">
                  <img
                    src={
                      person.profile_path
                        ? `${imageUrl}/${person.profile_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={person.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />

                  <Link
                    to={`/person/detail/${person.id}`}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-300"
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-sm font-bold text-white leading-tight mb-0.5 drop-shadow-md">
                        {person.name}
                      </p>
                      <p className="text-[10px] md:text-xs text-denflix-primary font-medium truncate drop-shadow-md">
                        as {person.character}
                      </p>

                      <span className="inline-block mt-1 px-1.5 py-0.5 bg-white/10 backdrop-blur-md rounded text-[8px] uppercase tracking-tighter text-gray-300">
                        {person.known_for_department}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))
        ) : (
          <p className="text-gray-500 italic">No cast information available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieCast;
