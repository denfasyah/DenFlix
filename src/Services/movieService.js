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

export const getTvShows = async (endpoint) => {
  try {
    const response = await api.get(`/tv/${endpoint}`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${endpoint} TV shows:`, error);
    throw error;
  }
};

export const getCast = async (endpoint) => {
  try {
    const response = await api.get(`/person/${endpoint}`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${endpoint} cast :`, error);
    throw error;
  }
};

export const getTvShowDetail = async (id) => {
  try {
    const response = await api.get(`/tv/${id}?append_to_response=videos,credits,watch/providers,recommendations,images`);
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show detail:", error);
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

export const getCastDetail = async (id) => {
  try {
    const response = await api.get(`/person/${id}?append_to_response=combined_credits,images`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cast detail:", error);
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

export const getGenres = async (type = "movie") => {
  try {
    const response = await api.get(`/genre/${type}/list`);
    return response.data.genres;
  } catch (error) {
    console.error(`Error fetching ${type} genres:`, error);
    throw error;
  }
};

export const getDiscoverByGenre = async (type, genreId) => {
  try {
    const response = await api.get(`/discover/${type}`, {
      params: { with_genres: genreId }
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching discover ${type}:`, error);
    throw error;
  }
};

export const getTrending = async (type = 'all', time = 'day') => {
  try {
    const response = await api.get(`/trending/${type}/${time}`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching trending ${type}:`, error);
    throw error;
  }
};

  