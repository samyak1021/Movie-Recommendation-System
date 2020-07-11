import React from "react";
import { Row, Col, Empty } from "antd";
import Movie from "../Movie/Movie";
import "./MovieList.css";

function MovieList(props) {
  const { movies, rating, onClick, onDelete, showOpinion, emptyDescription } = props;

  return (
    <div className="movie-list">
      {movies.length ? (
        <Row>
          {movies.map((movieInfo) => (
            <Col span={6}>
              <Movie
                key={movieInfo.id}
                {...movieInfo}
                movieId={movieInfo.id}
                onClick={onClick}
                onDelete={onDelete}
                rating={rating ? rating[movieInfo.id] : null}
                showOpinion={showOpinion}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description={emptyDescription} />
      )}
    </div>
  );
}

export default MovieList;
