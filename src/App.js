import React from "react";
import { MovieDb } from "moviedb-promise";
import Form from "./Form";
function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
class App extends React.Component {
 
	doSomething = (movieinfo) => {
	  console.log(movieinfo);
	};
	
	  render() {
		return (
		  <div>
		  <Form onSubmit={this.doSomething} />
		  </div>
	  );
	}	
  }
export default App;
