import React from "react";
import { Card,Popover } from "antd";
import "./Movie.css";
import Opinion from "../Opinion/Opinion";
import DeleteMovie from "../DeleteMovie/DeleteMovie";

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
  const extra = []
  if (showOpinion) {
    actions.push(
      <Opinion onClick={props.onClick} rating={rating} movieId={movieId} />
    );

    extra.push(
      <DeleteMovie onDelete={props.onDelete} movieId={movieId} />
    );
  }
  const content = (
    <div>
      Rating :{vote_average}
    </div>
  )

  return (
    <Popover content={content} title={title}>
      <Card className = "movie-card"
        hoverable
        cover={
          <img
            alt={title}
            src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          />
        }
        actions={actions}
        extra = {extra}
      >
      <Meta title={`${title} (${vote_average})`} />
      </Card>
    </Popover>
  );
}

export default Movie;
