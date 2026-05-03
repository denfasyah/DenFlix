import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";
import { getMovieReviews } from "../../../Services/movieService";
import { UserAuth } from "../../../context/AuthContext";
import Swal from "sweetalert2";

const MovieReview = () => {
  const { user } = UserAuth();
  const { id } = useParams(); 
  const location = useLocation(); 
  
  const typeFromUrl = location.pathname.split("/")[1]; 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const { data: tmdbData, loading } = useFetch(
    () => getMovieReviews(id, typeFromUrl),
    id
  );

  const reviews = Array.isArray(tmdbData) ? tmdbData : [];
  const previewReviews = reviews.slice(0, 2);

  const handleWriteReviewClick = () => {
    if (!user) {
      Swal.fire({
        title: "Mau ikutan review? 🍿",
        text: "Silakan login terlebih dahulu untuk memberikan ulasan di Denflix.",
        icon: "warning",
        background: "#080808",
        color: "#fff",
        confirmButtonColor: "#EAB308",
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      Swal.fire({ title: "Rating diperlukan", text: "Berikan rating bintang dulu ya!", icon: "error", background: "#080808", color: "#fff" });
      return;
    }
    if (reviewText.trim().length < 10) {
      Swal.fire({ title: "Review terlalu pendek", text: "Minimal ulasan 10 karakter.", icon: "error", background: "#080808", color: "#fff" });
      return;
    }
    
    console.log({ rating, reviewText, userId: user.uid, type: typeFromUrl, mediaId: id });
    
    Swal.fire({
      title: "Ulasan Terkirim!",
      text: "Terima kasih sudah berbagi ulasan di Denflix.",
      icon: "success",
      background: "#080808",
      color: "#fff",
      timer: 2000,
      showConfirmButton: false
    });
    
    setReviewText("");
    setRating(0);
    setIsModalOpen(false);
  };

  return (
    <section className="mt-12 max-w-6xl mx-auto px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-denflix-primary mb-6">
          User Reviews
        </h2>
        <Link
          to={`/${typeFromUrl}/${id}/reviews`}
          className="text-yellow-500 hover:underline text-sm font-medium mb-5"
        >
          View All Reviews →
        </Link>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <p className="text-zinc-500 animate-pulse">Loading reviews...</p>
        ) : previewReviews.length > 0 ? (
          previewReviews.map((rev) => (
            <div key={rev.id} className="p-5 bg-zinc-900/50 rounded-bl-xl rounded-tr-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-zinc-700 overflow-hidden border border-zinc-600">
                  <img
                    src={
                      rev.author_details?.avatar_path
                        ? rev.author_details.avatar_path.startsWith("/http")
                          ? rev.author_details.avatar_path.substring(1)
                          : rev.author_details.avatar_path.startsWith("http")
                            ? rev.author_details.avatar_path
                            : `https://image.tmdb.org/t/p/w500${rev.author_details.avatar_path}`
                        : `https://ui-avatars.com/api/?name=${rev.author}&background=random`
                    }
                    alt={rev.author}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${rev.author}&background=random`; }}
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{rev.author}</h4>
                  <p className="text-zinc-500 text-[10px] uppercase">
                    {new Date(rev.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
                {rev.author_details?.rating && (
                  <div className="ml-auto bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-xs font-bold border border-yellow-500/20">
                    ★ {rev.author_details.rating}
                  </div>
                )}
              </div>
              <p className="text-zinc-400 text-sm line-clamp-3 italic leading-relaxed">"{rev.content}"</p>
            </div>
          ))
        ) : (
          <div className="py-8 text-center bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800 text-zinc-500 italic text-sm">
            No reviews yet. Be the first to review!
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={handleWriteReviewClick}
          className="block w-full py-3 text-center bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-all text-sm font-bold shadow-lg shadow-yellow-500/10"
        >
          Write a Review for {typeFromUrl === "movie" ? "Movie" : "TV"}
        </button>
      </div>

      {/* MODAL*/}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#0f0f0f] border border-zinc-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Give Your Rating</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">✕</button>
            </div>
            
            <div className="flex flex-col items-center mb-6 bg-zinc-900/50 py-4 rounded-xl border border-zinc-800">
              <div className="flex gap-1 mb-2">
                {[...Array(10)].map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setRating(index + 1)}
                    className={`text-2xl transition-all ${index < rating ? "text-yellow-500 scale-110" : "text-zinc-700 hover:text-zinc-500"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <span className="text-yellow-500 font-bold text-lg">{rating || "0"} / 10</span>
              <p className="text-zinc-500 text-[10px] uppercase tracking-tighter mt-1">Select your score</p>
            </div>

            <textarea 
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-yellow-500 min-h-[120px] transition-all resize-none"
              placeholder="Tulis pendapat jujurmu di sini..."
            ></textarea>
            
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-zinc-800 text-white rounded-lg font-semibold hover:bg-zinc-700 transition-all">Cancel</button>
              <button 
                onClick={handleSubmitReview}
                className="flex-1 py-3 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-500/20"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MovieReview;