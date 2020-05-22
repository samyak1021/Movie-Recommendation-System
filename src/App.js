import React from "react";
import MovieForm from "./Components/MovieForm/MovieForm";
import MovieList from "./Components/MovieList/MovieList";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  addMovie = (movie) => {
    console.log(movie);
    this.setState((prevState) => {
      return { movies: [...prevState.movies, movie] };
    });
  };

  render() {
    const { movies } = this.state;

    return (
      <div>
        <MovieForm addMovie={this.addMovie} />
        <MovieList movies={movies} />
      </div>
    );
  }
}

export default App;
