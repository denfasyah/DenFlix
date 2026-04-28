import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import NavBrand from "./NavBrand";
import NavLink from "./NavLink";
import NavDropdown from "./NavDropdown";
import NavList from "./NavList";
import NavBookmark from "./NavBookmark";
import NavProfile from "./NavProfile";
import NavMobile from "./NavMobile";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
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
        <NavBrand url="/" />
        <div className="flex items-center gap-6">
          <NavLink
            url="/"
            title="Home"
            navLinkStyle={navLinkStyle}
            underlineStyle={underlineStyle}
          />

          <NavDropdown
            title="Movies"
            navLinkStyle={navLinkStyle}
            underlineStyle={underlineStyle}
          >
            <NavList url="/movie/now_playing" title="Now Playing" />
            <NavList url="/movie/popular" title="Popular" />
            <NavList url="/movie/top_rated" title="Top Rated" />
            <NavList url="/movie/upcoming" title="Coming Soon" />
          </NavDropdown>

          <NavDropdown
            title="TV Shows"
            navLinkStyle={navLinkStyle}
            underlineStyle={underlineStyle}
          >
            <NavList url="/tv/popular" title="Popular" />
            <NavList url="/tv/airing_today" title="Airing Today" />
            <NavList url="/tv/on_the_air" title="On TV" />
            <NavList url="/tv/top_rated" title="Top Rated" />
          </NavDropdown>

          <NavLink
            url="/cast"
            title="Cast"
            navLinkStyle={navLinkStyle}
            underlineStyle={underlineStyle}
          />
          <NavLink
            url="/awards"
            title="Awards"
            navLinkStyle={navLinkStyle}
            underlineStyle={underlineStyle}
          />
        </div>
      </div>

      <div className="navbar-center lg:hidden">
        <NavBrand url="/" />
      </div>

      <div className="navbar-end flex gap-4 md:gap-6 items-center">
        {isLoggedIn && (
          <NavBookmark />
        )}

        {isLoggedIn ? (
          <NavProfile onLogout={() => setIsLoggedIn(false)} />
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
        <NavMobile 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu} 
      />
      )}
    </nav>
  );
};

export default Navbar;
