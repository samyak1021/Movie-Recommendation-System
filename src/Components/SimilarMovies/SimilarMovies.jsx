import MovieIndex from "../Data/movieIndex.json";
import Similar from "../Data/similarMovies.json";

function getSimilarMovies(movieId) {
  let index;
  let simMovies = [];
  for (let key in MovieIndex) {
    if (MovieIndex[key] === movieId) {
      index = key;
      simMovies = Object.values(Similar[index]);
      break;
    }
  }
  return simMovies;
}
export default getSimilarMovies;
