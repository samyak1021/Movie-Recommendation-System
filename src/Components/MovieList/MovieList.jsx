import React from "react";
import Movie from "../Movie/Movie";

import "./MovieList.css";

function MovieList(props) {
  const { movies } = props;

  return (
    <div className="movielist">
      <span className="movielisttext">&#x3C;MovieList /&#x3E;</span>
      {movies.map((movieinfo) => (
        <Movie key={movieinfo.id} {...movieinfo} />
      ))}
    </div>
  );
}

export default MovieList;
