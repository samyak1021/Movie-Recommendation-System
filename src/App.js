import React from "react";
import { Tabs, Button, message, Affix} from "antd";
import MovieForm from "./Components/MovieForm/MovieForm";
import MovieList from "./Components/MovieList/MovieList";
import Navbar from "./Components/Navigation/Navbar";
import discoverMovie from "./Repository";
import { SearchOutlined } from "@ant-design/icons";
import "./App.css";

const { TabPane } = Tabs;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      rating: {},
      recommendations: [],
      activeKey: "watched"
    };
  }

  addMovie = (movie) => {
    console.log(movie);
    this.setState((prevState) => {
      return {
        movies: [...prevState.movies, movie],
      };
    },() =>{message.success("Your movie is added")});
  };

  handleClick = (movieId) => {
    const { rating } = this.state; //rating = {}
    rating[movieId] = !rating[movieId];
    this.setState({
      rating: rating,
    });
  };

  handleChange = (activeKey) => {
    this.setState({ activeKey });
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
        message.success("You're recommendations are ready!")
        this.setState({ activeKey: "recommendations" });
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
        <div className="search-box">
          <MovieForm addMovie={this.addMovie} />
          <Button className="recommend-button"
              style={{ position: 'fixed', bottom: 50, right: 40}}
              type="primary"
              shape="round"
              icon={<SearchOutlined />}
              size="default"
              onClick={this.onSubmit}
            >
                Recommend!
            </Button>
        </div>
        <Tabs
          onChange = {this.handleChange}
          activeKey={this.state.activeKey} className="movie-tabs">
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
