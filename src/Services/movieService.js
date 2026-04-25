import api from "./api";

export const getMovieList = async (endpoint) => {
  try {
    const response = await api.get(`/movie/${endpoint}`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${endpoint} movies:`, error);
    throw error;
  }
};