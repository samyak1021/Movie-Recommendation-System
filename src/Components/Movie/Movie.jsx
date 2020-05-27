import React from "react";
import "./Movie.css";
import Opinion from "../Opinion/Opinion";

function Movie(props) {
  const { title, vote_average, overview, poster_path, rating, movieId,showOpinion } = props;

  return (
    <div className="movie">
      <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt="avatar" />
      <div className="movieinfo">
        <div>Title: {title}</div>
        <div>Rating: {vote_average}</div>
        <div>Description: {overview}</div>
        <div>
          {showOpinion ? <Opinion onClick={props.onClick} rating={rating} movieId={movieId} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Movie;
