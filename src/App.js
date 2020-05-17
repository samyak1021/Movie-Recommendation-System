import React from "react";
import { MovieDb } from "moviedb-promise";
import Form from "./Form";
import MovieList from "./MovieList";
import Movie from "./Movie";
import './App.css';
class App extends React.Component {
	state = {
	  movieinfoarray: [],
	};
   
	addMovie = (movieinfo) => {
		this.setState(prevState => ({
		  movieinfoarray: [...prevState.movieinfoarray, movieinfo],
	  }));
	};
   
	  render() {
		return (
		  <div>
		  <Form onSubmit={this.addMovie} />
		  <MovieList movieinfoarray={this.state.movieinfoarray} />
		  </div>
	  );
	}	
  }
export default App;
