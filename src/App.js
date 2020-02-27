import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { loading: false, signature: '' }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(res => res.json())
      .then(data => this.setState({ loading: false, signature: data.signature }))
  }

  render() {
    const { loading, signature } = this.state
    return (
      <div className="App">
        <p>Signature: <br/>{signature}</p>
        <button onClick={this.handleClick("signature")}>{loading ? "Loading..." : "Get Signature"}</button>
      </div>
    );
  }
}

export default App;
