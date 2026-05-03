// src/pages/ReviewPage.jsx
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch"; // Sesuai struktur folder kamu
import { getMovieReviews } from "../services/movie.service";
import { db } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const ReviewPage = () => {
  const { type, id } = useParams();
  const [denflixReviews, setDenflixReviews] = useState([]);

  // Pakai hook andalan kamu untuk data TMDB
  const { data: tmdbReviews, loading } = useFetch(() => getMovieReviews(type, id), id);

  // Untuk Firestore, kita pakai onSnapshot supaya real-time (review baru langsung muncul)
  useEffect(() => {
    const q = query(
      collection(db, "reviews"), 
      where("movieId", "==", id),
      where("type", "==", type)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDenflixReviews(reviews);
    });

    return () => unsubscribe();
  }, [id, type]);

  if (loading) return <div className="text-white pt-24 px-10 text-center">Loading reviews...</div>;

  return (
    <div className="pt-24 px-10 text-white min-h-screen bg-[#0a0a0a]">
      <h1 className="text-3xl font-bold mb-8 text-primary">Reviews</h1>
      
      {/* Area render Review List */}
      <div className="grid gap-6">
        {/* Render Denflix Reviews dulu */}
        {denflixReviews.map((rev) => (
           <div key={rev.id} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
             {/* UI Card Review Kamu */}
           </div>
        ))}

        {/* Baru render TMDB Reviews */}
        {tmdbReviews?.map((rev) => (
           <div key={rev.id} className="p-4 bg-zinc-800/30 rounded-lg">
             {/* UI Card Review Official */}
           </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;