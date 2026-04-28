import { Link } from "react-router-dom";
const WatchProviders = ({ streaming, buyOrRent, providers, imageUrl }) => {
  return (
    <div className="mt-12">
            <h2 className="text-2xl font-bold text-denflix-primary mb-4">
              Where to Watch
            </h2>

            {streaming.length > 0 ? (
              <div className="flex flex-wrap gap-4 items-center">
                <p className="text-sm text-gray-400 mr-2">Streaming on:</p>
                {streaming.map((provider) => (
                  <Link
                    key={provider.provider_id}
                    to={providers.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block"
                  >
                    <img
                      src={`${imageUrl}${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="w-12 h-12 rounded-xl border border-gray-700 group-hover:border-denflix-primary group-hover:scale-110 transition-all shadow-lg"
                    />

                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 scale-0 group-hover:scale-100 transition-all bg-denflix-primary text-black text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-xl z-20 origin-left">
                      Watch on {provider.provider_name}
                      <div className="absolute top-1/2 -left-2 -translate-y-1/2 border-4 border-transparent border-r-denflix-primary"></div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
                <p className="text-gray-500 text-sm italic">
                  Not available for streaming in your region.
                  {buyOrRent.length > 0 && " Available for rent or purchase."}
                </p>
              </div>
            )}

            {providers?.link && (
              <a
                href={providers.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-[10px] text-gray-600 hover:text-denflix-primary underline"
              >
                Data provided by JustWatch
              </a>
            )}
          </div>
  )
}

export default WatchProviders