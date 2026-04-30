// components/common/DetailLayout.jsx
const DetailLayout = ({ tv, children, type = "tv" }) => {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Hero Backdrop Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <img 
          src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`} 
          className="w-full h-full object-cover"
          alt={tv.title || tv.name}
        />
        
        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 w-full">
          <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
            {tv.title || tv.name}
          </h1>
          <div className="flex items-center gap-4 text-denflix-primary font-bold">
            <span>{tv.vote_average?.toFixed(1)} ★</span>
            <span>{type === "tv" ? tv.release_date?.split('-')[0] : tv.first_air_date?.split('-')[0]}</span>
            {type === "tv" && <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-white">{tv.status}</span>}
          </div>
        </div>
      </div>

      {/* Content Section (Disinilah detail spesifik Movie/TV dimasukkan) */}
      <div className="px-8 md:px-16 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {children}
      </div>
    </div>
  );
};

export default DetailLayout;