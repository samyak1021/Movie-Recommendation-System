import React from "react";
import styles from './App.css';
import axios from "axios";
class Form extends React.Component {
    state = { movieName: '' };
      
    handleSubmit = async (event) => {
      event.preventDefault();
      const resp = await axios.get(`https://api.github.com/users/${this.state.movieName}`);
      this.props.onSubmit(resp.data);
      this.setState({ movieName: '' });
    };
   
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <span className="formtext">&#x3C;Form /&#x3E;</span>
            <input 
              type="text" 
              value={this.state.movieName}
              onChange={event => this.setState({ movieName: event.target.value })}
              placeholder="Enter Movie Name" 
              required 
            />
            <button>Go!</button>
          </form>
        );
      }
  }
  
  
  export default Form;