import { useEffect, useState } from "react";
import SearchInput from "../common/SearchInput";

const HeroSection = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const imageUrl = import.meta.env.VITE_APP_IMAGEURL;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const words = ["Movie", "TV", "Cast"];
  const typingSpeed = isDeleting ? 50 : 150;

  useEffect(() => {
    const currentFullWord = words[wordIndex];
    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(currentFullWord.substring(0, displayText.length + 1));
        if (displayText === currentFullWord) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentFullWord.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingSpeed, wordIndex, words]);

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
        setFade(true);
      }, 700);
    }, 7000);
    return () => clearInterval(interval);
  }, [movies]);

  const currentBackdrop = movies?.[currentIndex]?.backdrop_path;

  if (!currentBackdrop) return <div className="h-[60vh] bg-[#0a0a0a]" />;

  return (
    // Height ditingkatkan agar full ke belakang navbar, pt-32 agar teks tidak tertutup
    <div className="hero min-h-[40vh] md:h-[60vh] relative overflow-hidden -mt-20  ">
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <img
          src={`${imageUrl}/${currentBackdrop}`}
          alt="Hero Backdrop"
          className={`w-full h-full object-cover transform scale-105 transition-all duration-1000 ease-in-out ${
            fade ? "opacity-40 translate-x-0" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"></div>
      </div>

      <div className="hero-content relative z-10 text-center px-4 w-full mt-24">
        {/* Kontainer Utama dikunci lebarnya */}
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
          
          <h1 className="mb-10 text-3xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-tight">
            Explore Your <br />
            {/* Flex container dengan width stabil */}
            <div className="flex justify-center items-center gap-3 min-h-[1.2em] w-full">
              <span className="text-denflix-primary italic">Favorite</span>
              <div className="text-white flex items-center italic">
                {displayText}
                <span className="inline-block w-1 h-8 md:h-12 bg-denflix-primary ml-2 animate-pulse"></span>
              </div>
            </div>
          </h1>

          {/* Wrapper SearchInput untuk memastikan lebarnya tetap */}
          <div className="w-full max-w-xl">
            <SearchInput />
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;