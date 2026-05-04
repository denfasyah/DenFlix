import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";
import { getMovieReviews } from "../../../Services/movieService";
import { UserAuth } from "../../../context/AuthContext";
import Swal from "sweetalert2";
import { db } from "../../../Services/firebase";
import {
  collection,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

const MovieReview = () => {
  const { user } = UserAuth();
  const { id } = useParams();
  const location = useLocation();

  const typeFromUrl = location?.pathname?.split("/")?.[1] || "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [localReviews, setLocalReviews] = useState([]);

  const { data: tmdbData, loading } = useFetch(
    () => getMovieReviews(id, typeFromUrl),
    id,
  );

  const reviews = Array.isArray(tmdbData) ? tmdbData : [];
  const allReviews =
    localReviews.length > 0 ? [...localReviews, ...reviews] : reviews;

  const previewReviews = allReviews.slice(0, 2);

  const userReview = localReviews.find((rev) => rev.userId === user?.uid);

  useEffect(() => {
    if (!id) return;

    const reviewsRef = collection(db, "reviews");

    const q = query(reviewsRef, where("mediaId", "==", String(id)));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
          created_at:
            data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
          updated_at: data.updatedAt?.toDate()?.toISOString() || null,
          author: data.userName,
          author_details: {
            rating: data.rating,
            avatar_path: data.userPhoto,
          },
        };
      });

      fetchedReviews.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      setLocalReviews(fetchedReviews);
    });

    return () => unsubscribe();
  }, [id]);

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

    if (userReview) {
      setIsActionModalOpen(true); 
    } else {
      setIsModalOpen(true);
    }
  };

  const handleEdit = () => {
    setReviewText(userReview.content);
    setRating(userReview.rating);
    setIsActionModalOpen(false);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Yakin hapus?",
      text: "Review kamu akan dihapus permanen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      background: "#080808",
      color: "#fff",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteDoc(doc(db, "reviews", `${user.uid}_${id}`));
      setReviewText(""); // Bersihkan teks review
      setRating(0);
      Swal.fire({
        title: "Terhapus!",
        icon: "success",
        background: "#080808",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false,
      });

      setIsActionModalOpen(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Gagal hapus",
        icon: "error",
        background: "#080808",
        color: "#fff",
      });
    }
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      Swal.fire({
        title: "Rating diperlukan",
        text: "Berikan rating bintang dulu ya!",
        icon: "error",
        background: "#080808",
        color: "#fff",
      });
      return;
    }

    if (reviewText.trim().length < 10) {
      Swal.fire({
        title: "Review terlalu pendek",
        text: "Minimal ulasan 10 karakter.",
        icon: "error",
        background: "#080808",
        color: "#fff",
      });
      return;
    }

    try {
      Swal.fire({
        title: "Mengirim ulasan...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
        background: "#080808",
        color: "#fff",
      });

      const reviewId = `${user.uid}_${id}`;
      const reviewRef = doc(db, "reviews", reviewId);

      const existingDoc = await getDoc(reviewRef);

      let createdAtValue = serverTimestamp();

      if (existingDoc.exists()) {
        // 🔥 kalau edit → pakai created lama
        createdAtValue = existingDoc.data().createdAt;
      }

      await setDoc(reviewRef, {
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userPhoto: user.photoURL || "",
        mediaId: String(id),
        mediaType: typeFromUrl,
        rating: rating,
        content: reviewText,
        createdAt: createdAtValue,
        updatedAt: serverTimestamp(),
      });

      Swal.fire({
        title: "Berhasil!",
        text: existingDoc.exists()
          ? "Ulasan kamu berhasil diperbarui."
          : "Ulasan kamu telah tersimpan.",
        icon: "success",
        background: "#080808",
        color: "#fff",
        timer: 2000,
        showConfirmButton: false,
      });

      setReviewText("");
      setRating(0);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error: ", error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan ulasan.",
        icon: "error",
        background: "#080808",
        color: "#fff",
      });
    }
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
            <div
              key={rev.id}
              className="p-5 bg-zinc-900/50 rounded-bl-xl rounded-tr-xl border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
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
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    {rev.author}
                  </h4>
                  <p className="text-zinc-500 text-[10px] uppercase">
                    {rev.updated_at &&
                    new Date(rev.updated_at).getTime() !==
                      new Date(rev.created_at).getTime()
                      ? `UPDATED: ${new Date(rev.updated_at).toLocaleDateString("id-ID")}`
                      : `POSTED: ${new Date(rev.created_at).toLocaleDateString("id-ID")}`}
                  </p>
                </div>
                {rev.author_details?.rating && (
                  <div className="ml-auto bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-xs font-bold border border-yellow-500/20">
                    ★ {rev.author_details.rating}
                  </div>
                )}
              </div>
              <p className="text-zinc-400 text-sm line-clamp-3 italic leading-relaxed">
                "{rev.content}"
              </p>
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
          {userReview ? "Manage Your Review" : "Write a Review"}
        </button>
      </div>

       {isActionModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-[#0f0f0f] border border-zinc-800 w-full max-w-sm rounded-3xl p-8 relative shadow-2xl">
            <button
              onClick={() => setIsActionModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-center mb-8">
              Manage Your Review
            </h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleEdit}
                className="w-full py-4 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-400"
              >
                Edit Review
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-4 bg-red-600/10 text-red-500 border border-red-600/20 rounded-xl font-bold hover:bg-red-600 hover:text-white"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#0f0f0f] border border-zinc-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl overflow-hidden relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Update Review</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                ✕
              </button>
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
              <span className="text-yellow-500 font-bold text-lg">
                {rating || "0"} / 10
              </span>
              <p className="text-zinc-500 text-[10px] uppercase tracking-tighter mt-1">
                Select your score
              </p>
            </div>

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-yellow-500 min-h-[120px] transition-all"
              placeholder="Tulis pendapat jujurmu di sini..."
            ></textarea>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 bg-zinc-800 text-white rounded-lg font-semibold hover:bg-zinc-700 transition-all"
              >
                Cancel
              </button>
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
