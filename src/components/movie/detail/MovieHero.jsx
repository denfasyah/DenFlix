import {
  AiFillStar,
  AiOutlineClockCircle,
  AiOutlineCalendar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import { db } from "../../../Services/firebase";
import { UserAuth } from "../../../context/AuthContext"; // Sesuaikan path-nya
import Swal from "sweetalert2";
import {
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";


const MovieHero = ({ data, imageUrl }) => {
  const displayTitle = data.title || data.name || "Untitled";
  const releaseDate = data.release_date || data.first_air_date || "Untitled";
  const duration = data.runtime || data.last_episode_to_air?.runtime || "N/A";
  const isTv = !!data.name || !!data.first_air_date;
  const currentType = isTv ? "tv" : "movie";
  const { user } = UserAuth();

  const handleBookmark = async () => {
    if (!user) {
      return Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please login to save this movie to your bookmarks.",
        background: "#080808",
        color: "#fff",
        confirmButtonColor: "#EAB308",
      });
    }
    const isTv = data.name && !data.title;
    const userDoc = doc(db, "users", user.email);
    const movieData = {
      id: data.id,
      title: data.title || data.name,
      img: data.poster_path,
      type: isTv ? "tv" : "movie",
      rating: data.vote_average,
    };

    try {
      if (isBookmarked) {
        await updateDoc(userDoc, {
          savedShows: arrayRemove(movieData),
        });

        Swal.fire({
          icon: "success",
          title: "Removed",
          text: "Removed from bookmarks",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          backdrop: false,
          timer: 2000,
          background: "#080808",
          color: "#fff",
        });
      } else {
        await updateDoc(userDoc, {
          savedShows: arrayUnion(movieData),
        });

        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "Added to bookmarks",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          backdrop: false,
          timer: 2000,
          background: "#080808",
          color: "#fff",
        });
      }
    } catch (error) {
      console.error("Error updating bookmarks:", error);
    }
  };

  const [movies, setMovies] = useState([]); 

  useEffect(() => {
    if (user?.email) {
      const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
        setMovies(doc.data()?.savedShows || []);
      });
      return () => unsubscribe();
    }
  }, [user?.email]);
  const isBookmarked = movies.find((item) => item.id === data.id);
  return (
    <div className="relative h-[80vh] w-full -mt-20">
      <img
        src={`${imageUrl}/${data.backdrop_path}`}
        className="w-full h-full object-cover opacity-30"
        alt={data.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

      <div className="absolute top-16 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row gap-10 items-center md:items-end">
        <img
          src={`${imageUrl}/${data.poster_path}`}
          className="w-24 md:w-64 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-800"
          alt={data.title}
        />

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
            {displayTitle}
          </h1>
          {data.tagline && (
            <p className="text-denflix-primary italic text-lg md:text-xl mb-4">
              "{data.tagline}"
            </p>
          )}

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm md:text-base mb-6">
            <span className="flex items-center gap-1 bg-denflix-primary text-black px-2 py-1 rounded font-bold">
              <AiFillStar /> {data.vote_average.toFixed(1)}
            </span>
            <button
              className="flex items-center gap-1 text-white hover:text-denflix-primary transition-all duration-300 text-xl cursor-pointer active:scale-90"
              onClick={handleBookmark}
            >
              {isBookmarked ? (
                <FaBookmark className="text-denflix-primary" />
              ) : (
                <FaRegBookmark />
              )}
            </button>
            <span className="flex items-center gap-1 text-white">
              <AiOutlineClockCircle /> {duration} min
            </span>
            <span className="flex items-center gap-1 text-white">
              <AiOutlineCalendar />
              {releaseDate}
            </span>
            <span className="border border-gray-600 px-2 py-1 rounded text-xs uppercase tracking-widest text-white">
              {data.status}
            </span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-20">
            {data.genres.map((genre) => (
              <Link
                to={`/genre/${genre.id}?type=${currentType}`}
                key={genre.id}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded-full text-sm transition-colors cursor-default text-white"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
