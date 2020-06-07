import React from "react";
import { Tabs, Button, message } from "antd";
import MovieForm from "./Components/MovieForm/MovieForm";
import MovieList from "./Components/MovieList/MovieList";
import Navbar from "./Components/Navigation/Navbar";
import getSimilarMovies from "./SimilarMovies";
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
    this.setState({
      activeKey,
    });
  };

  updateTmdbRecommendations = (newRecommendations) => {
    this.setState((prevState) => {
      return {
        tmdbRecommendations: prevState.tmdbRecommendations.concat(
          newRecommendations
        ),
        activeKey: "recommendations",
      };
    });
  };

  updateTfidfRecommendations = (newRecommendations) => {
    this.setState((prevState) => {
      return {
        tfidfRecommendations: prevState.tfidfRecommendations.concat(
          newRecommendations
        ),
        activeKey: "recommendations",
      };
    });
  };

  onSubmit = () => {
    this.setState(
      {
        tmdbRecommendations: [],
        tfidfRecommendations: [],
      },
      this.getRecommendations
    );
  };

  getTmdbMovies = () => {
    const { movies, rating } = this.state;
    let liked = [];
    let disliked = [];

    const releaseDate = movies.map((movie) =>
      movie.release_date.slice(0).slice(0, 4)
    );
    const languageOfMovie = movies.map((movie) => movie.original_language);
    const voteAverage = movies.map((movie) => movie.vote_average);

    movies.forEach((movie) => {
      if (rating[movie.id] === false || rating[movie.id] === undefined) {
        disliked = disliked.concat(movie.genre_ids);
      } else {
        liked = liked.concat(movie.genre_ids);
      }
    });

    disliked = [...new Set(disliked)];
    liked = [...new Set(liked)];

    const like = liked.join("|");
    const dislike = disliked.join(",");
    const languages = languageOfMovie.join("|");
    const ratings = Math.min(...voteAverage);
    let releaseDateFrom = Math.min(...releaseDate);
    releaseDateFrom = releaseDateFrom + "-01-01";

    discoverMovies(
      "popularity.desc",
      false,
      false,
      1,
      releaseDateFrom,
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

  getTfidfMovies = () => {
    const { movies, rating } = this.state;

    const dislikedId = [];
    const likedId = [];

    movies.forEach((movie) => {
      if (rating[movie.id] === false || rating[movie.id] === undefined) {
        dislikedId.push(movie.id);
      } else {
        likedId.push(movie.id);
      }
    });

    let id = [];
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
  };

  getRecommendations = () => {
    this.getTmdbMovies();
    this.getTfidfMovies();
  };

  render() {
    const {
      movies,
      rating,
      tmdbRecommendations,
      tfidfRecommendations,
    } = this.state;
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
              <TabPane tab="TMDB Recommendations" key="tmdb">
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
              <TabPane tab="Our Recommendations" key="tfidf">
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
