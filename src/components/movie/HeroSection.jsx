const HeroSection = () => {
  return (
    <div className="hero h-[50vh] md:h-[60vh] relative overflow-hidden">
      <img
        src="/img/herobg.jpg"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <div className="hero-overlay absolute inset-0 bg-opacity-60 bg-black"></div>

      <div className="hero-content relative text-neutral-content text-center">
        <div className="max-w-xl">
          <h1 className="mb-5 text-4xl md:text-6xl font-bold text-denflix-primary uppercase tracking-wider">
            Explore Your Favorite Movies
          </h1>
          <p className="mb-5 text-sm md:text-lg text-gray-200">
            Dapatkan info terbaru mengenai film-film populer dan trending hari
            ini hanya di DenFlix.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
