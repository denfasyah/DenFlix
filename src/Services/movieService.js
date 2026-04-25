import api from "./api";

export const getUpcomingMovies = async () => {
  try {
    const response = await api.get("/movie/upcoming");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};