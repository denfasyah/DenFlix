import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
const getCleanQuery = (text) => text.trim();

  const isValidQuery = (text) => {
    const cleanText = getCleanQuery(text);
    const regex = /^[a-zA-Z0-9 ]+$/; 
    return cleanText.length >= 2 && regex.test(cleanText);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isValidQuery(query)) {
      const finalQuery = getCleanQuery(query);
      navigate(`/search?q=${encodeURIComponent(finalQuery)}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative group">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full py-4 md:py-5 px-6 pl-14 rounded-full bg-white/10 backdrop-blur-md border ${
            query && !isValidQuery(query) ? "border-red-500" : "border-white/20"
          } text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-denflix-primary focus:bg-white/20 transition-all shadow-2xl`}
        />

        <AiOutlineSearch className={`absolute left-5 top-1/2 -translate-y-1/2 text-2xl transition-colors ${
          query && !isValidQuery(query) ? "text-red-500" : "text-gray-400 group-focus-within:text-denflix-primary"
        }`} />

        <button 
          type="submit"
          disabled={!isValidQuery(query)}
          className={`absolute right-2 top-1/2 -translate-y-1/2 px-8 py-2 md:py-3 rounded-full font-bold text-sm transition-all shadow-lg ${
            isValidQuery(query) 
              ? "bg-denflix-primary hover:bg-yellow-500 text-black active:scale-95" 
              : "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
          }`}
        >
          Search
        </button>
      </form>

      {query && !isValidQuery(query) && (
        <p className="text-red-500 text-xs mt-2 ml-6 italic animate-pulse">
          {query.length < 2 
            ? "Search must be more than 2 characters..." 
            : "Symbols are not allowed!"}
        </p>
      )}
    </div>
  );
};

export default SearchInput;