import React from "react";
import { Tabs, Button, message } from "antd";
import MovieForm from "./Components/MovieForm/MovieForm";
import MovieList from "./Components/MovieList/MovieList";
import Navbar from "./Components/Navigation/Navbar";
import getSimilarMovies from "./Components/SimilarMovies/SimilarMovies";
import { discoverMovies, getMovieDetail } from "./Repository";
import { SearchOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import "./App.css";

const { TabPane } = Tabs;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      rating: {},
      tmdbRecommendations: [],
      tfidfRecommendations: [],
      activeKey: "watched",
    };
  }

  addMovie = (movie) => {
    console.log(movie);
    this.setState(
      (prevState) => {
        return {
          movies: [...prevState.movies, movie],
        };
      },
      () => {
        message.success("Your movie is added");
      }
    );
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

  updateTmdbRecommendations = (newRecommendations) => {
    this.setState((prevState) => {
      return {
        tmdbRecommendations: prevState.tmdbRecommendations.concat(newRecommendations),
        activeKey: "recommendations",
      };
    });
  };

  updateTfidfRecommendations = (newRecommendations) => {
    this.setState((prevState) => {
      return {
        tfidfRecommendations: prevState.tfidfRecommendations.concat(newRecommendations),
        activeKey: "recommendations",
      };
    });
  };

  onSubmit = () => {
    this.setState({ tmdbRecommendations: [], tfidfRecommendations:[] }, this.getRecommendations);
  };

  getRecommendations = () => {
    const { movies, rating } = this.state;
    let liked = [];
    let likedId = [];
    let disliked = [];
    let dislikedId = [];
    let releaseDate = [];
    let languageOfMovie = [];
    let voteAverage = [];
    let runTime = [];
    let id = [];
    movies.forEach((movie) => {
      releaseDate = releaseDate.concat(movie.release_date.slice(0).slice(0, 4));
      languageOfMovie = languageOfMovie.concat(movie.original_language);
      voteAverage = voteAverage.concat(movie.vote_average);
      runTime = runTime.concat(movie.with_runtime);
      if (rating[movie.id] === false || rating[movie.id] === undefined) {
        disliked = disliked.concat(movie.genre_ids);
        dislikedId = dislikedId.concat(movie.id);
      } else {
        liked = liked.concat(movie.genre_ids);
        likedId = likedId.concat(movie.id);
      }
    });

    likedId.forEach((ids) => {
      id = id.concat(getSimilarMovies(ids));
    });
    id = [...new Set(id)];

    id.forEach((movieId) => {
      getMovieDetail(movieId)
        .then((response) => {
          this.updateTfidfRecommendations([response.data]);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log("Movies Fetched");
        });
    });

    const like = liked.join("|");
    const dislike = disliked.join(",");
    const languages = languageOfMovie.join("|");
    const ratings = Math.min(...voteAverage);
    var releaseDateFrom = Math.min(...releaseDate);
    releaseDateFrom = releaseDateFrom + "";
    console.log(rating, movies, like, dislike);

    discoverMovies(
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
        this.updateTmdbRecommendations(response.data.results);
        message.success("Your recommendations are ready!");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Movies Fetched");
      });
  };

  render() {
    const { movies, rating, tmdbRecommendations, tfidfRecommendations } = this.state;
    return (
      <div className="app">
        <Navbar />
        <div className="search-box">
          <MovieForm addMovie={this.addMovie} />
        </div>
        <Tabs
          onChange={this.handleChange}
          activeKey={this.state.activeKey}
          className="movie-tabs"
        >
          <TabPane tab="Watched" key="watched">
            <MovieList
              movies={movies}
              onClick={this.handleClick}
              rating={rating}
              showOpinion={true}
              emptyDescription="No movies added!"
            />
            <Button
              className="recommend-button"
              style={{ position: "fixed", bottom: 50, right: 40 }}
              type="primary"
              shape="round"
              icon={<SearchOutlined />}
              size="default"
              onClick={this.onSubmit}
            >
              Recommend Movies!
            </Button>
          </TabPane>
          <TabPane tab="Recommendations" key="recommendations">
            <Tabs>
              <TabPane tab="TMDB Recommendations" key="1">
                <MovieList
                  movies={tmdbRecommendations}
                  onClick={() => {}}
                  showOpinion={false}
                  emptyDescription="Submit your favorite movies to get recommendations!"
                />
                <Button
                  className="recommend-button"
                  style={{ position: "fixed", bottom: 50, right: 40 }}
                  type="primary"
                  shape="round"
                  icon={<VideoCameraAddOutlined />}
                  size="default"
                  onClick={() => {
                    this.setState({ activeKey: "watched" });
                  }}
                >
                  Add More Movies!
                </Button>
              </TabPane>
              <TabPane tab="Our Recommendations" key="2">
                <MovieList
                  movies={tfidfRecommendations}
                  onClick={() => {}}
                  showOpinion={false}
                  emptyDescription="Submit your favorite movies to get recommendations!"
                />
                <Button
                  className="recommend-button"
                  style={{ position: "fixed", bottom: 50, right: 40 }}
                  type="primary"
                  shape="round"
                  icon={<VideoCameraAddOutlined />}
                  size="default"
                  onClick={() => {
                    this.setState({ activeKey: "watched" });
                  }}
                >
                  Add More Movies!
                </Button>
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
