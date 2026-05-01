import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getCastDetail } from "../Services/movieService";
import CardMovie from "../components/movie/card/CardMovie";
import Loading from "../components/common/Loading";

const CastDetail = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21;

  const { data: person, loading } = useFetch(() => getCastDetail(id), id);

  if (loading) return <Loading />;
  if (!person) return null;

  const credits = person.combined_credits?.cast || [];
  
  const filteredCredits = credits
    .filter((item) => item.poster_path)
    .sort((a, b) => {
      const dateA = new Date(a.release_date || a.first_air_date || 0);
      const dateB = new Date(b.release_date || b.first_air_date || 0);
      return dateB - dateA;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCredits.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCredits.length / itemsPerPage);

  const profileImg = `${import.meta.env.VITE_APP_IMAGEURL}/${person.profile_path}`;

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 mb-16 items-center lg:items-start">
          
          <div className="w-48 sm:w-64 md:w-72 lg:w-80 flex-shrink-0">
            <img 
              src={person.profile_path ? profileImg : "https://via.placeholder.com/500x750?text=No+Image"} 
              alt={person.name}
              className="w-full rounded-2xl shadow-[0_0_30px_rgba(232,255,0,0.15)] border-2 border-denflix-midnight lg:sticky lg:top-24"
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-denflix-primary mb-4">
              {person.name}
            </h1>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-[10px] md:text-xs text-gray-400 mb-8 font-bold uppercase tracking-widest">
              <span className="bg-denflix-midnight text-denflix-primary border border-denflix-primary/30 px-4 py-1.5 rounded-full">
                {person.known_for_department}
              </span>
              {person.birthday && (
                <span className="bg-gray-900 px-4 py-1.5 rounded-full">
                   {person.birthday}
                </span>
              )}
              {person.place_of_birth && (
                <span className="bg-gray-900 px-4 py-1.5 rounded-full hidden sm:inline">
                   {person.place_of_birth}
                </span>
              )}
            </div>

            <div className="max-w-none">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-denflix-primary/20 pb-2 inline-block">Biography</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base text-justify lg:text-left opacity-80">
                {person.biography || `Biografi untuk ${person.name} belum tersedia.`}
              </p>
            </div>
          </div>
        </div>


        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black italic uppercase text-white tracking-tight">
                Filmography
              </h2>
              <p className="text-denflix-primary text-sm font-bold tracking-widest uppercase">
                Total {filteredCredits.length} Productions
              </p>
            </div>

            {totalPages > 1 && (
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-denflix-midnight rounded-lg text-xs font-bold hover:bg-denflix-primary hover:text-black transition-all disabled:opacity-30"
                >
                  PREV
                </button>
                <span className="px-4 py-2 bg-white/5 rounded-lg text-xs font-bold">
                  {currentPage} / {totalPages}
                </span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-denflix-midnight rounded-lg text-xs font-bold hover:bg-denflix-primary hover:text-black transition-all disabled:opacity-30"
                >
                  NEXT
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-4 justify-items-center">
            {currentItems.map((item) => (
              <CardMovie 
                key={`${item.id}-${item.media_type}`} 
                movie={item} 
              />
            ))}
          </div>

{totalPages > 1 && (
  <div className="flex flex-col items-center gap-6 mt-16 pb-10">
    <div className="flex items-center justify-center gap-2 md:gap-4 w-full overflow-hidden">
      
      {/* Button Prev */}
      <button 
        onClick={() => {
          setCurrentPage(prev => Math.max(prev - 1, 1));
          window.scrollTo({ top: 500, behavior: 'smooth' });
        }}
        disabled={currentPage === 1}
        className="min-w-[40px] h-10 md:w-12 md:h-12 flex items-center justify-center bg-denflix-midnight rounded-full border border-white/10 hover:border-denflix-primary transition-all disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <span className="text-xl">←</span>
      </button>

      {/* Page Numbers - Truncated for Mobile */}
      <div className="flex items-center gap-1 md:gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page => {
            // Logika menampilkan: Halaman 1, Halaman Terakhir, dan 1 halaman di sekitar Current Page
            return page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1);
          })
          .map((page, index, array) => (
            <div key={page} className="flex items-center gap-1 md:gap-2">
              {/* Tambahkan titik-titik (...) jika ada lompatan halaman */}
              {index > 0 && page - array[index - 1] > 1 && (
                <span className="text-gray-600 px-1">...</span>
              )}
              
              <button
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 500, behavior: 'smooth' });
                }}
                className={`w-9 h-9 md:w-12 md:h-12 rounded-full text-[12px] md:text-sm font-bold transition-all ${
                  currentPage === page 
                    ? 'bg-denflix-primary text-black scale-110 shadow-[0_0_15px_rgba(232,255,0,0.4)]' 
                    : 'bg-white/5 hover:bg-white/10 text-gray-400'
                }`}
              >
                {page}
              </button>
            </div>
          ))}
      </div>

      <button 
        onClick={() => {
          setCurrentPage(prev => Math.min(prev + 1, totalPages));
          window.scrollTo({ top: 500, behavior: 'smooth' });
        }}
        disabled={currentPage === totalPages}
        className="min-w-[40px] h-10 md:w-12 md:h-12 flex items-center justify-center bg-denflix-midnight rounded-full border border-white/10 hover:border-denflix-primary transition-all disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <span className="text-xl">→</span>
      </button>
    </div>

    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
      Page {currentPage} of {totalPages}
    </p>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default CastDetail;