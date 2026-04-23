const Navbar = () => {
  return (
    <div className="navbar fixed bg-denflix-secondary shadow-sm">
      <div className="flex-1">
        <a className="text-denflix-primary text-xl mx-5 font-bold hover:cursor-pointer">
          DenFlix
        </a>
        
        {/* Home */}
        <a 
          tabIndex="0" 
          className="group relative text-white text-md mx-2 font-semibold hover:cursor-pointer transition-colors duration-300 outline-none
                     hover:text-denflix-primary focus:text-denflix-primary pb-1"
        >
          Home
          {/* Line Animation */}
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-denflix-primary transition-all duration-300 
                           group-hover:w-full group-focus:w-full"></span>
        </a>

        {/* Trending */}
        <a 
          tabIndex="0" 
          className="group relative text-white text-md mx-2 font-semibold hover:cursor-pointer transition-colors duration-300 outline-none
                     hover:text-denflix-primary focus:text-denflix-primary pb-1"
        >
          Trending
          {/* Garis Animasi */}
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-denflix-primary transition-all duration-300 
                           group-hover:w-full group-focus:w-full"></span>
        </a>
      </div>
      
      <div className="flex gap-2 mr-4">
        <input
          type="text"
          placeholder="Search"
          className="input bg-slate-200 lg:w-48 h-8 p-2 rounded-xl input-bordered focus:border-2 focus:border-denflix-primary w-24 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default Navbar;