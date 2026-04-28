import { useState, useEffect } from "react";

// fetchFunction: fungsi API yang akan dipanggil (getMovies, getMovieDetail, dll)
// dependency: variabel yang bikin fetch jalan ulang (id, category, query)
const useFetch = (fetchFunction, dependency = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Jika dependency adalah search query dan kosong, jangan fetch
      if (dependency === "") {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err);
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency]); 

  return { data, setData, loading, error };
};

export default useFetch;