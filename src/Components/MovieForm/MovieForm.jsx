import React, { useState } from "react";
import "./MovieForm.css";
import { AutoComplete } from "antd";
import { MovieDb } from "moviedb-promise";

// const { Option } = AutoComplete;
const Option = AutoComplete.Option

const movieDb = new MovieDb("0f8d529ca28503395a1f7dc2532ad517");

const MovieForm = (props) => {
  const [movies, setMovies] = useState([]);
  // const arr = useState([]);
  // const movies = arr[0];
  // const setMovies = arr[1];
  const [selectedMovieName, setMovieName] = useState("");
  const { addMovie } = props;

  const searchMovies = (movieName) => {
    movieDb
      .searchMovie({ query: movieName })
      .then((res) => {
        setMovies(res.results);
      })
      .catch(console.error);
  };

  const handleSearch = (value) => {
    if (value) searchMovies(value);
    setMovieName(value);
  };

  const onSelect = (value, options) => {
    // eslint-disable-next-line eqeqeq
    const selectedMovie = movies.findIndex((movie) => movie.id == options.key);
    addMovie(movies[selectedMovie]);
  };

  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{
        width: 300,
      }}
      onSelect={onSelect}
      onSearch={handleSearch}
      value={selectedMovieName}
    >
      {movies.map((movie) => (
        <Option key={movie.id} value={movie.id}>
          {`${movie.title} (${movie.release_date.slice(0, 4)})`}
        </Option>
      ))}
    </AutoComplete>
  );
};

export default MovieForm;
