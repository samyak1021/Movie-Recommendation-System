import axios from 'axios';

const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});
const apiKey = "0f8d529ca28503395a1f7dc2532ad517";

function discoverMovies( releaseDateFrom, releaseDateTo, withGenres, withoutGenres,language, sortBy, includeAdult, includeVideo, page) {
    return (
        tmdbApi.get('/discover/movie', {
            params: {
                "primary_release_date.gte": releaseDateFrom,
                "primary_release_date.lte": releaseDateTo,
                with_genres: withGenres,
                without_genres: withoutGenres,
                api_key: apiKey,
                language: language,
                sort_by: sortBy,
                include_adult: includeAdult,
                include_video: includeVideo,
                page: page,
                
            }
        })
    );
}

export default discoverMovies;