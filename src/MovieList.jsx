import React from "react";
import './App.css';
import Movie from "./Movie";
class MovieList extends React.Component {
    render() {
        const p = this.props;
        return (
            <div className="movielist">
            <span className="movielisttext">&#x3C;MovieList /&#x3E;</span>
            {p.movieinfoarray.map(movieinfo => <Movie key={movieinfo.id} {...movieinfo}/>)}
            </div>
        );
    }
}
  export default MovieList;