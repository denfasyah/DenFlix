import YouTube from "react-youtube";
const MovieTrailer = ({ trailer, opts }) => {
  return (
    <div className="mt-12 max-w-6xl mx-auto px-8">
      <h2 className="text-2xl font-bold text-denflix-primary mb-6">
        Official Trailer
      </h2>
      <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        {trailer ? (
          <YouTube
            videoId={trailer.key}
            opts={opts}
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center italic text-gray-500">
            Trailer not available
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieTrailer;
