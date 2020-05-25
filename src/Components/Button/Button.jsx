import React from "react";
import "./Button.css"
function Opinion(props) {
    const text = props.rating ? 'liked' : 'haven\'t liked';
    const label = props.rating ? 'Unlike' : 'Like'
    function handleClick() {
        props.onClick(props.movieid)
    }
    return (
        <div className="customContainer">
            <button className="btn btn-primary" onClick={handleClick}
            >
            {label}</button>
          <p>
            You {text} this
          </p>
        </div>
      );
}
    
    
export default Opinion;