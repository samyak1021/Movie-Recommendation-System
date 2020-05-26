import React from "react";
import MovieForm from "./Components/MovieForm/MovieForm";
import MovieList from "./Components/MovieList/MovieList";
import Navbar from "./Components/Navigation/Navbar";
import discoverMovie from "./Repository";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      rating: {},
    };
  }

  addMovie = (movie) => {
    console.log(movie);
    this.setState((prevState) => {
      return {
        movies: [...prevState.movies, movie],
      };
    });
  };

  handleClick = (movieId) => {
    const { rating } = this.state; //rating = {}
    rating[movieId] = !rating[movieId];
    this.setState({
      rating: rating,
    });
  };

  onSubmit = () => {
    console.log(this.state.rating);
    console.log(this.state.movies);
    discoverMovie("en-US", "popularity.desc", false, false, 1, 2020)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      console.log("Movies Fetched");
    });  
  };

  render() {
    const { movies, rating} = this.state;

    return (
      <div>
        <Navbar></Navbar>
        <MovieForm addMovie={this.addMovie} />
        <button onClick={this.onSubmit}>Submit!</button>
        <MovieList movies={movies} onClick={this.handleClick} rating={rating} />
      </div>
    );
  }
}

export default App;
