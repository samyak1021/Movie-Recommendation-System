import React from "react";
import { MovieDb } from "moviedb-promise";
import Form from "./Components/MovieForm/MovieForm";
import MovieList from "./Components/MovieList/MovieList";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };

    this.movieDb = new MovieDb("0f8d529ca28503395a1f7dc2532ad517");
  }

  addMovies = (movieName) => {
    this.movieDb
      .searchMovie({ query: movieName })
      .then((res) => {
        this.setState((prevState) => ({
          movies: [...prevState.movies, ...res.results],
        }));
      })
      .catch(console.error);
  };

  render() {
    const { movies } = this.state;

    return (
      <div>
        <Form onSubmit={this.addMovies} />
        <MovieList movies={movies} />
      </div>
    );
  }
}

export default App;
