import React from "react";
import "./MovieForm.css";
import { AutoComplete } from "antd";
import { MovieDb } from "moviedb-promise";

// const { Option } = AutoComplete;
const Option = AutoComplete.Option;

const movieDb = new MovieDb("0f8d529ca28503395a1f7dc2532ad517");

const getReleaseYear = (releaseDate) =>
  releaseDate !== undefined ? releaseDate.slice(0, 4) : "";

class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovieName: "",
    };
  }

  setMovies = (movie) => {
    this.setState({
      movies: movie,
    });
  };

  setMovieName = (movieName) => {
    this.setState({
      selectedMovieName: movieName,
    });
  };

  searchMovies = (movieName) => {
    movieDb
      .searchMovie({ query: movieName })
      .then((res) => {
        this.setMovies(res.results);
      })
      .catch(console.error);
  };

  handleSearch = (value) => {
    if (value) this.searchMovies(value);
    this.setMovieName(value);
  };

  onSelect = (value, options) => {
    const { addMovie } = this.props;
    const { movies } = this.state;
    // eslint-disable-next-line eqeqeq
    const selectedMovie = movies.findIndex((movie) => movie.id == options.key);

    addMovie(movies[selectedMovie]);
  };

  render() {
    const { selectedMovieName, movies } = this.state;

    return (
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
          width: 300,
        }}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        value={selectedMovieName}
        placeholder="Search Movies..."
      >
        {movies.map((movie) => (
          <Option key={movie.id} value={movie.id}>
            {`${movie.title} (${getReleaseYear(movie.release_date)})`}
          </Option>
        ))}
      </AutoComplete>
    );
  }
}

export default MovieForm;
