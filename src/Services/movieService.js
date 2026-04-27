import api from "./api";

export const getMovies = async (endpoint) => {
  try {
    const response = await api.get(`/movie/${endpoint}`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${endpoint} movies:`, error);
    throw error;
  }
};

export const getMovieDetail = async (id) => {
  try {
    const response = await api.get(`/movie/${id}?append_to_response=videos,credits,watch/providers,recommendations,images`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie detail:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await api.get(`/search/movie?query=${query}`);
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};