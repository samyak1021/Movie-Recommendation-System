import React from "react";
import './App.css';
class Movie extends React.Component {
	render() {
  	const p = this.props;
  	return (
    	<div className="movie">
        <span className="movietext">&#x3C;Movie /&#x3E;</span>
    	  <img src={p.avatar_url} />
        <div className="movieinfo">
          <div>Title: {p.name}</div>
          <div>Rating: {p.email}</div>
          <div>Description: {p.bio}</div>
          <div>Repos: {p.public_repos}</div>
        </div>
    	</div>
    );
  }
}
export default Movie;
