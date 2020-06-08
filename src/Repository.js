import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});
const apiKey = "0f8d529ca28503395a1f7dc2532ad517";

function discoverMovies(
  sortBy,
  includeAdult,
  includeVideo,
  page,
  releaseDateFrom,
  voteAverageFrom,
  withGenres,
  withoutGenres,
  originalLanguage
) {
  return tmdbApi.get("/discover/movie", {
    params: {
      api_key: apiKey,
      sort_by: sortBy,
      include_adult: includeAdult,
      include_video: includeVideo,
      page: page,
      "primary_release_date.gte": releaseDateFrom,
      "vote_average.gte": voteAverageFrom,
      with_genres: withGenres,
      without_genres: withoutGenres,
      with_original_language: originalLanguage,
    },
  });
}

function getMovieDetail(movieId) {
  return tmdbApi.get(`/movie/${movieId}`, {
    params: {
      api_key: apiKey,
    },
  });
}

function getTmdbRecommendation(movieId, page) {
  return tmdbApi.get(`/movie/${movieId}/recommendations`, {
    params: {
      api_key: apiKey,
      page: page,
    },
  });
}

export { discoverMovies, getMovieDetail, getTmdbRecommendation };
