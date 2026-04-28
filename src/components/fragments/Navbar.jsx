import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineCaretDown,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkStyle =
    "group relative text-white text-md font-semibold hover:cursor-pointer transition-colors duration-300 outline-none hover:text-denflix-primary focus:text-denflix-primary pb-1 flex items-center gap-1";
  const underlineStyle =
    "absolute left-0 bottom-0 w-0 h-[2px] bg-denflix-primary transition-all duration-300 group-hover:w-full group-focus:w-full";

  return (
    <nav className="navbar fixed z-[100] bg-denflix-secondary shadow-lg px-4 md:px-8 h-20">

      <div className="navbar-start lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-all"
        >
          {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

  
      <div className="navbar-start hidden lg:flex items-center">
        <Link
          to="/"
          className="text-denflix-primary text-2xl mr-8 font-extrabold tracking-tighter"
        >
          DENFLIX
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className={navLinkStyle}>
            Home <span className={underlineStyle}></span>
          </Link>

          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className={navLinkStyle}>
              Movies <AiOutlineCaretDown className="text-xs" />{" "}
              <span className={underlineStyle}></span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-2xl bg-denflix-secondary rounded-lg w-52 border border-white/10"
            >
              <li>
                <Link
                  to="/movie/now-playing"
                  className="text-white hover:text-denflix-primary"
                >
                  Now Playing
                </Link>
              </li>
              <li>
                <Link
                  to="/movie/popular"
                  className="text-white hover:text-denflix-primary"
                >
                  Popular
                </Link>
              </li>
              <li>
                <Link
                  to="/movie/top-rated"
                  className="text-white hover:text-denflix-primary"
                >
                  Top Rated
                </Link>
              </li>
              <li>
                <Link
                  to="/movie/coming-soon"
                  className="text-white hover:text-denflix-primary"
                >
                  Coming Soon
                </Link>
              </li>
            </ul>
          </div>


          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className={navLinkStyle}>
              TV Shows <AiOutlineCaretDown className="text-xs" />
              <span className={underlineStyle}></span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-2xl bg-denflix-secondary rounded-lg w-52 border border-white/10"
            >
              <li>
                <Link
                  to="/tv/popular"
                  className="text-white hover:text-denflix-primary"
                >
                  Popular
                </Link>
              </li>
              <li>
                <Link
                  to="/tv/airing-today"
                  className="text-white hover:text-denflix-primary"
                >
                  Airing Today
                </Link>
              </li>
              <li>
                <Link
                  to="/tv/on-the-air"
                  className="text-white hover:text-denflix-primary"
                >
                  On TV
                </Link>
              </li>
              <li>
                <Link
                  to="/tv/top-rated"
                  className="text-white hover:text-denflix-primary"
                >
                  Top Rated
                </Link>
              </li>
            </ul>
          </div>

          <Link to="/cast" className={navLinkStyle}>
            Cast <span className={underlineStyle}></span>
          </Link>
          <Link to="/awards" className={navLinkStyle}>
            Awards <span className={underlineStyle}></span>
          </Link>
        </div>
      </div>


      <div className="navbar-center lg:hidden">
        <Link
          to="/"
          className="text-denflix-primary text-2xl font-extrabold tracking-tighter"
        >
          DENFLIX
        </Link>
      </div>

  
      <div className="navbar-end flex gap-4 md:gap-6 items-center">

   


        {isLoggedIn && (
          <Link
            to="/bookmark"
            className="text-white hover:text-denflix-primary transition-colors text-xl"
            title="Bookmarks"
          >
            <FaRegBookmark />
          </Link>
        )}

 
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-denflix-primary transition-all"
            >
              <div className="w-10 rounded-full bg-denflix-primary flex items-center justify-center">
                <AiOutlineUser className="text-black text-2xl" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-denflix-secondary rounded-lg w-52 border border-white/10"
            >
              <li>
                <Link to="/profile" className="text-white py-2">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-white py-2">
                  Settings
                </Link>
              </li>
              <hr className="border-white/10 my-1" />
              <li>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-red-500 py-2 font-bold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => setIsLoggedIn(true)} 
            className="bg-denflix-primary hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-bold text-sm transition-all active:scale-95 shadow-lg"
          >
            LOGIN
          </button>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-denflix-secondary border-t border-white/10 p-5 flex flex-col gap-4 shadow-2xl animate-fade-in-down">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white font-bold py-2 border-b border-white/5"
          >
            Home
          </Link>
          <div className="collapse collapse-arrow bg-transparent">
            <input type="checkbox" />
            <div className="collapse-title text-white  font-bold p-0 min-h-0 py-2">
              Movies
            </div>
            <div className="collapse-content px-4 flex flex-col gap-2 pt-2">
              <Link to="/movie/now-playing" className="text-gray-400 hover:text-denflix-primary">
                Now Playing
              </Link>
              <Link to="/movie/popular" className="text-gray-400 hover:text-denflix-primary">
                Popular
              </Link>
              <Link to="/movie/top-rated" className="text-gray-400 hover:text-denflix-primary">
                Top Rated
              </Link>
              <Link to="/movie/coming-soon" className="text-gray-400 hover:text-denflix-primary">
                Coming Soon
              </Link>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-transparent">
            <input type="checkbox" />
            <div className="collapse-title text-white  font-bold p-0 min-h-0 py-2">
              Tv Shows
            </div>
            <div className="collapse-content px-4 flex flex-col gap-2 pt-2">
              <Link to="/tv/now-popular" className="text-gray-400 hover:text-denflix-primary">
                Popular
              </Link>
              <Link to="/tv/airing-today" className="text-gray-400 hover:text-denflix-primary">
                Airihng Today
              </Link>
              <Link to="/tv/on-the-air" className="text-gray-400 hover:text-denflix-primary">
                On Tv
              </Link>
              <Link to="/tv/top-rated" className="text-gray-400 hover:text-denflix-primary">
                Top Rated
              </Link>
            </div>
          </div>
          <Link
            to="/cast"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white font-bold py-2 border-b border-white/5"
          >
            Cast
          </Link>
          <Link
            to="/awards"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white font-bold py-2"
          >
            Awards
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
