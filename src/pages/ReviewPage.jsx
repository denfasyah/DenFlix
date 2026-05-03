import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../Services/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import useFetch from "../hooks/UseFetch";
import { getMovieReviews, getAllData } from "../Services/movieService";
import Swal from "sweetalert2";

const ViewAllReviews = () => {
  const { user } = UserAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const typeFromUrl = location.pathname.split("/")[1];

  // States
  const [localReviews, setLocalReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // 1. Fetch Metadata Film (Untuk info di header)
  const { data: movieInfo } = useFetch(() => getAllData(id, typeFromUrl), id);

  // 2. Fetch TMDB Reviews
  const { data: tmdbData, loading } = useFetch(
    () => getMovieReviews(id, typeFromUrl),
    id,
  );

  // 3. Fetch Firestore Reviews (Real-time)
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;

    const q = query(
      collection(db, "reviews"),
      where("mediaId", "==", String(id)),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        isLocal: true,
        author: doc.data().userName,
        created_at:
          doc.data().createdAt?.toDate()?.toISOString() ||
          new Date().toISOString(),
        author_details: {
          rating: doc.data().rating,
          avatar_path: doc.data().userPhoto,
        },
      }));
      fetched.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setLocalReviews(fetched);
    });
    return () => unsubscribe();
  }, [id]);

  // Logic: Cek ulasan user saat ini
  const userReview = localReviews.find((rev) => rev.userId === user?.uid);

  // Merge & Pagination Logic
  const allReviews = useMemo(() => {
    const tmdbReviews = Array.isArray(tmdbData) ? tmdbData : [];
    return [...localReviews, ...tmdbReviews];
  }, [localReviews, tmdbData]); 

  const totalReviewCount = allReviews.length;

  const totalPages = Math.ceil(allReviews.length / itemsPerPage);
  const currentReviews = allReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handlers
  const handleActionClick = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        icon: "warning",
        background: "#080808",
        color: "#fff",
      });
      return;
    }
    userReview ? setIsActionModalOpen(true) : setIsModalOpen(true);
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
      background: "#080808",
      color: "#fff",
      confirmButtonColor: "#ef4444",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteDoc(doc(db, "reviews", `${user.uid}_${id}`));
        setReviewText("");
        setRating(0);
        setIsActionModalOpen(false);
        Swal.fire({
          title: "Terhapus!",
          icon: "success",
          background: "#080808",
          color: "#fff",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async () => {
    if (rating === 0 || reviewText.length < 10) return;
    try {
      const reviewId = `${user.uid}_${id}`;
      const reviewRef = doc(db, "reviews", reviewId);
      const existingDoc = await getDoc(reviewRef);

      await setDoc(reviewRef, {
        userId: user.uid,
        userName: user.displayName || "User",
        userPhoto: user.photoURL || "",
        mediaId: String(id),
        mediaType: typeFromUrl,
        rating,
        content: reviewText,
        createdAt: existingDoc.exists()
          ? existingDoc.data().createdAt
          : serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setIsModalOpen(false);
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20">
      {/* Mini Hero Header */}
      <div className="relative h-[400px] w-full overflow-hidden -mt-20">
        <img
          src={`https://image.tmdb.org/t/p/original${movieInfo?.backdrop_path}`}
          className="w-full h-full object-cover opacity-30 blur-sm"
          alt="backdrop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-8 pb-5 max-w-6xl mx-auto right-0 flex items-end gap-16">
          <img
            src={`https://image.tmdb.org/t/p/w200${movieInfo?.poster_path}`}
            className="w-40 rounded-xl shadow-2xl border border-zinc-800 hidden md:block"
            alt="poster"
          />
          <div className="md:mb-8 mb-16">
            <button
              onClick={() => navigate(-1)}
              className="text-zinc-400 hover:text-white mb-4 flex items-center gap-2 text-sm"
            >
              ← Back to Details
            </button>
            <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase">
              {movieInfo?.title || movieInfo?.name}{" "}
            </h1>
            <p className="text-zinc-400 max-w-2xl line-clamp-2 text-sm italic">
              {movieInfo?.overview}
            </p>
            <button
              onClick={handleActionClick}
              className="px-6 py-3 mt-3 bg-yellow-500 text-black font-bold rounded-full hover:scale-105 transition-transform"
            >
              {userReview ? "Manage Your Review" : "Write a Review"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 md:mt-5">
        <div className="grid gap-6">
          <h1 className="text-center text-yellow-500 md:text-4xl text-2xl font-black tracking-tighter uppercase">
            Reviews
          </h1>
          <span className="text-xs text-center font-semibold text-zinc-500 tracking-widest uppercase">
        Total {totalReviewCount} ulasan pengguna
      </span>
          {loading ? (
            <div className="text-center py-20 animate-pulse text-zinc-500">
              Loading reviews...
            </div>
          ) : (
            currentReviews.map((rev) => (
              <div
                key={rev.id}
                className={`group p-6 rounded-2xl border transition-all ${
                  rev.isLocal
                    ? "bg-zinc-900/60 border-yellow-500/20 shadow-xl"
                    : "bg-zinc-900/20 border-zinc-800"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={
                      rev.author_details?.avatar_path?.startsWith("http")
                        ? rev.author_details.avatar_path
                        : `https://image.tmdb.org/t/p/w500${rev.author_details?.avatar_path}`
                    }
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${rev.author}&background=random`;
                    }}
                    className="w-12 h-12 rounded-full object-cover transition-all"
                    alt={rev.author}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-zinc-100">{rev.author}</h3>
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
                <p className="text-zinc-400 text-sm leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo(0, 300);
                }}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  currentPage === i + 1
                    ? "bg-yellow-500 text-black"
                    : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Action Modal (Edit/Delete) */}
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

      {/* Write/Edit Modal */}
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
                onClick={handleSubmit}
                className="flex-1 py-3 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-500/20"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllReviews;
