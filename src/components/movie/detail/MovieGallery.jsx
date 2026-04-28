import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import YouTube from "react-youtube";

const MovieGallery = ({ images, videos, imageUrl }) => {
  const [activeTab, setActiveTab] = useState("backdrops");
  const [selectedMedia, setSelectedMedia] = useState(null);

  const data = {
    backdrops: images?.backdrops?.slice(0, 15) || [],
    posters: images?.posters?.slice(0, 15) || [],
    videos:
      videos?.results?.filter((v) => v.site === "YouTube").slice(0, 5) || [],
  };

  const tabs = [
    { id: "backdrops", label: `Backdrops (${data.backdrops.length})` },
    { id: "posters", label: `Posters (${data.posters.length})` },
    { id: "videos", label: `Videos (${data.videos.length})` },
  ];

  return (
    <div className="mt-12 max-w-6xl mx-auto px-8">
      <h2 className="text-2xl font-bold text-denflix-primary mb-4">Gallery</h2>
      <div className="flex gap-8 border-b border-gray-800 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 font-bold transition-all whitespace-nowrap text-sm uppercase tracking-wider ${
              activeTab === tab.id
                ? "text-denflix-primary border-b-2 border-denflix-primary"
                : "text-gray-500 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="carousel carousel-center w-full gap-4 py-5 bg-transparent rounded-box">
        {activeTab === "videos" &&
          data.videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setSelectedMedia({ type: "video", key: vid.key })}
              className="carousel-item w-72 md:w-96 relative group cursor-pointer aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-xl"
            >
              <img
                src={`https://img.youtube.com/vi/${vid.key}/maxresdefault.jpg`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Thumbnail"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                <div className="w-14 h-14 bg-denflix-primary rounded-full flex items-center justify-center text-black shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                  <span className="text-xl">▶</span>
                </div>
              </div>
            </div>
          ))}

        {activeTab !== "videos" &&
          data[activeTab].map((img, index) => (
            <div
              key={index}
              onClick={() =>
                setSelectedMedia({ type: "image", path: img.file_path })
              }
              className={`carousel-item cursor-pointer rounded-2xl overflow-hidden border border-gray-800 group shadow-xl transition-all
              ${activeTab === "posters" ? "w-40 md:w-56 aspect-[2/3]" : "w-72 md:w-96 aspect-video"}`}
            >
              <img
                src={`${imageUrl}/${img.file_path}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Gallery Media"
              />
            </div>
          ))}
      </div>

      {selectedMedia && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-8 right-8 text-white text-4xl hover:text-denflix-primary hover:rotate-90 transition-all z-[110]"
          >
            <AiOutlineClose />
          </button>

          <div className="w-full max-w-6xl aspect-video flex items-center justify-center animate-in fade-in zoom-in duration-300">
            {selectedMedia.type === "video" ? (
              <YouTube
                videoId={selectedMedia.key}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: { autoplay: 1 },
                }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              />
            ) : (
              <img
                src={`${imageUrl}/${selectedMedia.path}`}
                className="max-h-screen max-w-full rounded-lg shadow-2xl object-contain border border-gray-800"
                alt="Full View"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieGallery;
