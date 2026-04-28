import CardMovie from "../card/CardMovie";

const MovieRecommendations = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="mt-12 max-w-6xl mx-auto px-8">
      <h2 className="text-2xl font-bold text-denflix-primary mb-4">
        Recommendations
      </h2>
      
      <div className="carousel carousel-center w-full gap-4 px-5 py-5">
        {recommendations.slice(0, 10).map((movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;