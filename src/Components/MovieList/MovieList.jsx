import React from "react";
import Movie from "../Movie/Movie";

import "./MovieList.css";

function MovieList(props) {
  const { movies,rating } = props;
  return (
    <div className="movielist">
      <span className="movielisttext">&#x3C;MovieList /&#x3E;</span>
      {movies.map((movieinfo) => (
        <Movie
          key={movieinfo.id} {...movieinfo}
          movieid ={movieinfo.id}
          onClick={props.onClick}
          rating = {rating[movieinfo.id]}
          
          />
      ))}
    </div>
  );
}

export default MovieList;
