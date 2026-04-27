
import { AiOutlineSearch } from "react-icons/ai";
const Search = () => {
  return (
     <div className="relative max-w-2xl mx-auto group">
            <input
              type="text"
              placeholder="Search for movies, actors, or genres..."
              className="w-full py-4 md:py-5 px-6 pl-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-denflix-primary focus:bg-white/20 transition-all shadow-2xl"
            />
            <AiOutlineSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl group-focus-within:text-denflix-primary transition-colors" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-denflix-primary hover:bg-yellow-500 text-black px-6 py-2 md:py-3 rounded-full font-bold text-sm transition-all active:scale-95">
              Search
            </button>
          </div>
  )
}

export default Search