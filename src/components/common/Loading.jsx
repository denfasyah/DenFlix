const Loading = () => {
  return (
    <div className="fixed inset-0 z-[1000] bg-denflix-secondary flex flex-col items-center justify-center gap-4">
      {/* Spinner Ring */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-denflix-primary rounded-full animate-spin"></div>
      </div>
      
      {/* Loading Text with Pulse Effect */}
      <div className="flex flex-col items-center">
        <h2 className="text-denflix-primary text-2xl font-black italic tracking-tighter animate-pulse">
          DENFLIX
        </h2>
        <p className="text-gray-400 text-sm font-medium tracking-widest mt-1">
          LOADING...
        </p>
      </div>
    </div>
  );
};

export default Loading;