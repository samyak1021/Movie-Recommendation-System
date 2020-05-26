import React from "react";
import "./Opinion.css";

function Opinion(props) {
  const { rating, onClick, movieId } = props;

  const text = rating ? "liked" : "haven't liked";
  const label = rating ? "Unlike" : "Like";

  return (
    <div className="custom-container">
      <button className="btn btn-primary" onClick={() => onClick(movieId)}>
        {label}
      </button>
      <p>You {text} this</p>
    </div>
  );
}

export default Opinion;
