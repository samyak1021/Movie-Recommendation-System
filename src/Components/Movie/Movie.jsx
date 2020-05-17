import React from "react";
import "./Movie.css";

function Movie(props) {
  const { title, vote_average, overview } = props;

  return (
    <div className="movie">
      <span className="movietext">&#x3C;Movie /&#x3E;</span>
      {/* <img src={p.avatar_url} alt="avatar" /> */}
      <div className="movieinfo">
        <div>Title: {title}</div>
        <div>Rating: {vote_average}</div>
        <div>Description: {overview}</div>
      </div>
    </div>
  );
}

export default Movie;
