import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../Services/firebase";
import { doc, onSnapshot, updateDoc, arrayRemove } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import CardMovie from "../components/movie/card/CardMovie";

const MyBookmark = () => {
  const [movies, setMovies] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);
  const { user, loading } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user?.email) {
      const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
        setMovies(doc.data()?.savedShows || []);
        setIsDataReady(true);
      });
      return () => unsubscribe();
    }
  }, [user?.email]);

  const deleteShow = async (passedId) => {
    try {
      const userDoc = doc(db, "users", user.email);
      const movieToDelete = movies.find((item) => item.id === passedId);
      await updateDoc(userDoc, {
        savedShows: arrayRemove(movieToDelete),
      });
    } catch (error) {
      console.log("Error deleting show:", error);
    }
  };

  if (loading || !isDataReady) {
    return (
      <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
        <p className="text-white animate-pulse">Loading your bookmarks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 md:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 border-b border-gray-800 pb-4">
          <h1 className="text-denflix-primary text-3xl font-bold">
            My Bookmark
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Menampilkan {movies.length} item yang disimpan
          </p>
        </div>

        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
            <p className="text-xl italic">
              You haven't bookmarked anything yet.
            </p>
            <Link to="/" className="mt-4 text-denflix-primary hover:underline">
              Explore Content
            </Link>
          </div>
        ) : (
          <div className="bg-denflix-midnight rounded-lg p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-6 justify-items-center">
            {movies.map((item) => {
              const isTv =
                item.type === "tv" ||
                item.media_type === "tv" ||
                !!item.first_air_date ||
                (!item.title && !!item.name);

              const formattedMovie = {
                ...item,
                poster_path: item.img,
                media_type: isTv ? "tv" : "movie",
                title: isTv ? undefined : item.title || item.name,
                name: isTv ? item.name || item.title : undefined,
                vote_average:
                  Number(item.rating) || Number(item.vote_average) || 0,
              };

              const detailPath = isTv
                ? `/tv/detail/${item.id}`
                : `/movie/detail/${item.id}`;

              return (
                <div key={item.id} className="relative group">
                  <CardMovie movie={formattedMovie} />

                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 rounded-xl z-30 pointer-events-none group-hover:pointer-events-auto">
                    <Link
                      to={detailPath}
                      className="bg-denflix-primary text-black px-4 py-2 rounded-full font-bold text-[10px] hover:scale-105 transition-transform"
                    >
                      DETAILS
                    </Link>
                    <button
                      onClick={() => deleteShow(item.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-[10px] hover:bg-red-700 transition-colors"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookmark;
