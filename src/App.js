import React from "react";
import { MovieDb } from "moviedb-promise";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.movieDb = new MovieDb("0f8d529ca28503395a1f7dc2532ad517");
  }

  componentDidMount() {
    this.movieDb
      .searchMovie({ query: "Alien" })
      .then((res) => {
        console.log(res);
        this.setState({ data: res });
      })
      .catch(console.error);
  }

  render() {
    const { data } = this.state;

    return <div className="App">{JSON.stringify(data)}</div>;
  }
}

export default App;
