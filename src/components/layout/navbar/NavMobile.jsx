import { Link } from "react-router-dom";
import NavMobileLink from "./NavMobileLink";

const NavMobile = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden absolute top-20 left-0 w-full bg-denflix-secondary border-t border-white/10 p-5 flex flex-col gap-4 shadow-2xl animate-fade-in-down z-[90]">
      {/* Home Link */}
      <NavMobileLink to="/" title="Home" onClick={onClose} />

      {/* Movies Collapse */}
      <div className="collapse collapse-arrow bg-transparent">
        <input type="checkbox" />
        <div className="collapse-title text-white font-bold p-0 min-h-0 py-2">
          Movies
        </div>
        <div className="collapse-content px-4 flex flex-col gap-2 pt-2">
          <Link to="/movie/now_playing" onClick={onClose} className="text-gray-400 hover:text-denflix-primary">Now Playing</Link>
          <Link to="/movie/popular" onClick={onClose} className="text-gray-400 hover:text-denflix-primary">Popular</Link>
          <Link to="/movie/top_rated" onClick={onClose} className="text-gray-400 hover:text-denflix-primary">Top Rated</Link>
          <Link to="/movie/upcoming" onClick={onClose} className="text-gray-400 hover:text-denflix-primary">Upcoming</Link>
        </div>
      </div>

      {/* TV Shows Collapse */}
      <div className="collapse collapse-arrow bg-transparent">
        <input type="checkbox" />
        <div className="collapse-title text-white font-bold p-0 min-h-0 py-2">
          TV Shows
        </div>
        <div className="collapse-content px-4 flex flex-col gap-2 pt-2">
          <Link to="/tv/popular" onClick={onClose} className="text-gray-400 hover:text-denflix-primary">Popular</Link>
          <Link to="/tv/airing_today" onClick={onClose} className="text-gray-400 hover:text-denflix-primary">Airing Today</Link>
          <Link to="/tv/on_the_air" onClick={onClose} className="text-gray-400 hover:text-denflix-primary">On TV</Link>
          <Link to="/tv/top_rated" onClick={onClose} className="text-gray-400 hover:text-denflix-primary">Top Rated</Link>
        </div>
      </div>

      {/* Static Links */}
      <NavMobileLink to="/cast" title="Cast" onClick={onClose} />
      <NavMobileLink to="/awards" title="Awards" onClick={onClose} />
    </div>
  );
};

export default NavMobile;