import React from "react";
import "./MovieForm.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movieName: "" };
  }

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    const { movieName } = this.state;

    event.preventDefault();
    onSubmit(movieName);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span className="form_text">&#x3C;Form /&#x3E;</span>
        <input
          type="text"
          value={this.state.movieName}
          onChange={(event) => this.setState({ movieName: event.target.value })}
          placeholder="Enter Movie Name"
          required
        />
        <button>Go!</button>
      </form>
    );
  }
}

export default Form;
