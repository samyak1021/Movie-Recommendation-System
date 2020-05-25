import React from "react";
import MovieForm from "./Components/MovieForm/MovieForm";
import MovieList from "./Components/MovieList/MovieList";
import Navbar from "./Components/Navigation/Navbar"
import "./App.css";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      rating: {},
      liked : true
    };
  }

  addMovie = (movie) => {
    console.log(movie);
    this.setState((prevState) => {
      return { movies: [...prevState.movies, movie] };
    });
  };

  handleClick = (movieid) => {
    const { rating } = this.state; //rating = {}
    rating[movieid] = !rating[movieid];
    this.setState({
      liked: !this.state.liked,
      rating:rating
    });
  }
  onSubmit = () => {
    console.log(this.state.rating);
    console.log(this.state.movies);
  }
  
  render() {
    const { movies } = this.state;
    const { rating } = this.state;
    return (
      <div>
        <Navbar></Navbar>
        <MovieForm addMovie={this.addMovie} />
        <button onClick = {this.onSubmit}>Submit!</button>
        <MovieList
          movies={movies}
          onClick={this.handleClick}
          rating = {rating}
          />
      </div>
    );
  }
}

export default App;
