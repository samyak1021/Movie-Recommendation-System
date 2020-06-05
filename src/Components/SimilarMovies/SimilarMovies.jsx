import MovieIndex from "../Data/movie_index.json"
import Similar from "../Data/similar_movie.json"

function getSimilarMovies(movieId) {
    let index;
    let simMovies = [];
    for (let key in MovieIndex) {
        if (MovieIndex[key] === movieId) {
            index = key;
            simMovies = Object.values(Similar[index]);
        }
        else {
            simMovies =[]
        }
    }
    return simMovies;
}
export default getSimilarMovies;