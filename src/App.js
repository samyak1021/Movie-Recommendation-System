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
      recommendations : []
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
    const { movies, rating } = this.state;
    var liked = [];
    var disliked = [];

    movies.forEach((movie) => {
      if (rating[movie.id] === false || rating[movie.id] === undefined) {
        disliked = disliked.concat(movie.genre_ids);
      } else {
        liked = liked.concat(movie.genre_ids);
      }
    });
    const like = liked.join("|");
    const dislike = disliked.join(",");
    console.log(rating, movies, like, dislike);
    discoverMovie(
      like,
      dislike,
      "en-US",
      "popularity.desc",
      false,
      false,
      1,
      2020
    )
      .then( (response) => {
        this.setState({recommendations:response.data.results});
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Movies Fetched");
      });
  };

  render() {
    const { movies, rating, recommendations} = this.state;
    return (
      <div>
        <Navbar></Navbar>
        <MovieForm addMovie={this.addMovie} />
        <button onClick={this.onSubmit}>Submit!</button>
        <MovieList movies={movies} onClick={this.handleClick} rating={rating} showOpinion={true}/>
        <MovieList movies={recommendations}  onClick={() => { }} showOpinion={false}/>
      </div>
    );
  }
}

export default App;
