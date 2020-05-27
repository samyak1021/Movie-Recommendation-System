import React from "react";
import Movie from "../Movie/Movie";
import "./MovieList.css";

function MovieList(props) {
  const { movies, rating, onClick, showOpinion} = props;

  return (
    <div className="movie-list">
      <span className="movie-list-text">&#x3C;MovieList /&#x3E;</span>
      {movies.map((movieInfo) => (
        <Movie
          key={movieInfo.id}
          {...movieInfo}
          movieId={movieInfo.id}
          onClick={onClick}
          rating={rating?rating[movieInfo.id]:null}
          showOpinion = {showOpinion}
        />
      ))}
    </div>
  );
}

export default MovieList;
