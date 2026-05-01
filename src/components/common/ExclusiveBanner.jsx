import { Link } from "react-router-dom";
import { Bookmark, MessageCircle, Star, ShieldCheck } from "lucide-react";

const ExclusiveBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-0 md:pr-6 mt-10">
      <div className="relative group overflow-hidden rounded-3xl md:rounded-none md:rounded-tl-[2.5rem] md:rounded-br-[2.5rem] bg-[#0a0a0a] border border-white/5 p-8 md:p-12 shadow-2xl">
        <div className="absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 bg-denflix-primary/10 rounded-full blur-[100px] md:blur-[120px] group-hover:bg-denflix-primary/20 transition-all duration-700"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 md:w-96 md:h-96 bg-yellow-600/10 rounded-full blur-[100px] md:blur-[120px]"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 md:mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-denflix-primary" />
              <span className="text-[10px] md:text-xs font-bold text-gray-300 uppercase tracking-widest">
                Exclusive Member Access
              </span>
            </div>

            <h2 className="text-2xl md:text-6xl font-black text-white italic leading-tight mb-4 md:mb-6">
              READY TO{" "}
              <span className="text-denflix-primary">DIVE DEEPER?</span>
            </h2>

            <p className="text-gray-400 text-sm md:text-xl max-w-xl mb-6 md:mb-8 leading-relaxed">
              Join the community to unlock{" "}
              <span className="text-white font-medium">
                personalized watchlists
              </span>
              , write{" "}
              <span className="text-white font-medium">expert reviews</span>,
              and track your journey.
            </p>

            <div className="flex justify-center lg:justify-start">
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 bg-denflix-primary text-black text-sm md:text-base font-extrabold rounded-xl md:rounded-2xl hover:shadow-[0_0_30px_rgba(234,255,0,0.3)] hover:scale-105 transition-all duration-300 text-center"
              >
                GET STARTED
              </Link>
            </div>
          </div>
          <div className="w-full lg:flex-1">
            <div className="flex lg:grid lg:grid-cols-2 gap-4 overflow-x-auto pb-4 lg:pb-0 no-scrollbar snap-x snap-mandatory">
              <FeatureCard
                icon={<Bookmark className="w-5 h-5 md:w-6 md:h-6" />}
                title="Watchlist"
                desc="Save for later"
                className="min-w-[160px] snap-center lg:min-w-0"
              />
              <FeatureCard
                icon={<MessageCircle className="w-5 h-5 md:w-6 md:h-6" />}
                title="Reviews"
                desc="Share thoughts"
                className="min-w-[160px] snap-center lg:min-w-0"
              />
              <FeatureCard
                icon={<Star className="w-5 h-5 md:w-6 md:h-6" />}
                title="Ratings"
                desc="Rate movies"
                className="min-w-[160px] snap-center lg:min-w-0 lg:col-span-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, desc, className = "" }) => (
  <div
    className={`p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 border border-white/5 hover:border-denflix-primary/30 transition-colors group/card ${className}`}
  >
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-denflix-primary/10 flex items-center justify-center text-denflix-primary mb-3 md:mb-4 group-hover/card:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="text-white text-sm md:text-base font-bold whitespace-nowrap">
      {title}
    </h4>
    <p className="text-gray-500 text-xs md:text-sm whitespace-nowrap">{desc}</p>
  </div>
);

export default ExclusiveBanner;
