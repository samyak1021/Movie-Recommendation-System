import React from "react";
import { Tabs } from "antd";
import MovieForm from "./Components/MovieForm/MovieForm";
import MovieList from "./Components/MovieList/MovieList";
import Navbar from "./Components/Navigation/Navbar";
import discoverMovie from "./Repository";
import "./App.css";

const { TabPane } = Tabs;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      rating: {},
      recommendations: [],
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
    var releaseDate = [];
    var languageOfMovie = [];
    var voteAverage = [];
    var runTime = [];

    movies.forEach((movie) => {
      releaseDate = releaseDate.concat(movie.release_date.slice(0).slice(0, 4));
      languageOfMovie = languageOfMovie.concat(movie.original_language);
      voteAverage = voteAverage.concat(movie.vote_average);
      runTime = runTime.concat(movie.with_runtime);
      if (rating[movie.id] === false || rating[movie.id] === undefined) {
        disliked = disliked.concat(movie.genre_ids);
      } else {
        liked = liked.concat(movie.genre_ids);
      }
    });
    const like = liked.join("|");
    const dislike = disliked.join(",");
    const languages = languageOfMovie.join("|");
    const ratings = Math.min(...voteAverage);
    var releaseDateFrom = Math.min(...releaseDate);
    releaseDateFrom = releaseDateFrom + "";
    console.log(rating, movies, like, dislike);
    discoverMovie(
      "popularity.desc",
      false,
      false,
      1,
      releaseDateFrom + "-01-01",
      ratings,
      like,
      dislike,
      languages
    )
      .then((response) => {
        this.setState({ recommendations: response.data.results });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Movies Fetched");
      });
  };

  render() {
    const { movies, rating, recommendations } = this.state;
    return (
      <div className="app">
        <Navbar />
        <MovieForm addMovie={this.addMovie} />
        <button onClick={this.onSubmit}>Submit!</button>

        <Tabs defaultActiveKey="watched" className="movie-tabs">
          <TabPane tab="Watched" key="watched">
            <MovieList
              movies={movies}
              onClick={this.handleClick}
              rating={rating}
              showOpinion={true}
              emptyDescription="No movies added!"
            />
          </TabPane>
          <TabPane tab="Recommendations" key="recommendations">
            <MovieList
              movies={recommendations}
              onClick={() => {}}
              showOpinion={false}
              emptyDescription="Submit your favorite movies to get recommendations!"
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
