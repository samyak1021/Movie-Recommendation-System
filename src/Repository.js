import axios from 'axios';

const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});
const apiKey = "0f8d529ca28503395a1f7dc2532ad517";

function discoverMovies( language, sortBy, includeAdult, includeVideo, page, year) {
    return (
        tmdbApi.get('/discover/movie', {
            params: {
                // with_genres: withGenres,
                // without_genres: withoutGenres,
                api_key: apiKey,
                language: language,
                sort_by: sortBy,
                include_adult: includeAdult,
                include_video: includeVideo,
                page: page,
                year: year
            }
        })
    );
}

export default discoverMovies;