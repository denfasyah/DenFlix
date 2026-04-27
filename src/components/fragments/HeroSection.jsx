import { useEffect, useState } from "react";
import Search from "../common/Search";

const HeroSection = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true); // Untuk kontrol animasi fade
  const imageUrl = import.meta.env.VITE_APP_IMAGEURL;

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    // Timer untuk mengganti gambar setiap 5 detik
    const interval = setInterval(() => {
      // 1. Mulai animasi keluar (fade out) sedikit sebelum ganti gambar
      setFade(false);

      setTimeout(() => {
        // 2. Ganti index gambar
        setCurrentIndex((prevIndex) => 
          prevIndex === movies.length - 1 ? 0 : prevIndex + 1
        );
        // 3. Mulai animasi masuk (fade in)
        setFade(true);
      }, 700); // Durasi ini harus sinkron dengan durasi transisi CSS
    }, 5000); // 5000ms = 5 detik

    return () => clearInterval(interval);
  }, [movies]);

  // Mengambil path gambar berdasarkan index saat ini
  const currentBackdrop = movies?.[currentIndex]?.backdrop_path;

  if (!currentBackdrop) return <div className="h-[40vh] md:h-[60vh] bg-[#0a0a0a]" />;

  return (
    <div className="hero h-[40vh] md:h-[60vh] relative overflow-hidden mb-10">
      {/* --- BACKDROP SYSTEM DENGAN ANIMASI --- */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <img
          src={`${imageUrl}/${currentBackdrop}`}
          alt="Hero Backdrop"
          className={`w-full h-full object-cover transform scale-105 transition-all duration-1000 ease-in-out ${
            fade ? "opacity-60 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        />
        
        {/* Layered Gradients untuk Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="hero-content relative z-10 text-center px-4">
        <div className="max-w-3xl">
          <h1 className="mb-6 px-5 text-3xl md:text-6xl font-black text-white uppercase tracking-tighter italic drop-shadow-2xl">
            Explore Your <span className="text-denflix-primary">Favorite</span> Movies
          </h1>

          <Search />

          <p className="mt-6 text-xs md:text-sm text-gray-400 uppercase tracking-[0.3em] font-medium">
            Trending now on <span className="text-white">DenFlix</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;