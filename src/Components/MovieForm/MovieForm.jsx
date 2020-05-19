import React from "react";
import "./MovieForm.css";
import { Input } from 'antd';
const { Search } = Input;
class Form extends React.Component {
  render() {
    const { onSubmit } = this.props;
    return (
      <Search
      placeholder="input search text"
      onSearch={onSubmit}
      style={{ width: 200 }}
    />
      // <form onSubmit={this.handleSubmit}>
      //   <span className="form_text">&#x3C;Form /&#x3E;</span>
      //   <input
      //     type="text"
      //     value={this.state.movieName}
      //     onChange={(event) => this.setState({ movieName: event.target.value })}
      //     placeholder="Enter Movie Name"
      //     required
      //   />
      //   <button>Go!</button>
      // </form>
    );
  }
}

export default Form;
