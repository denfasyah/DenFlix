const MovieSynopsis = ({ movie }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-denflix-primary mb-4">Synopsis</h2>
      <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
    </div>
  );
};

export default MovieSynopsis;
