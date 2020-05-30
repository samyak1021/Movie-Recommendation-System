import React from "react";
import { Card } from "antd";
import "./Movie.css";
import Opinion from "../Opinion/Opinion";

const { Meta } = Card;

function Movie(props) {
  const {
    title,
    vote_average,
    // overview,
    poster_path,
    rating,
    movieId,
    showOpinion,
  } = props;

  const actions = [];
  if (showOpinion) {
    actions.push(
      <Opinion onClick={props.onClick} rating={rating} movieId={movieId} />
    );
  }

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt={title}
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
        />
      }
      actions={actions}
    >
      <Meta title={`${title} (${vote_average})`} />
    </Card>
  );
}

export default Movie;
