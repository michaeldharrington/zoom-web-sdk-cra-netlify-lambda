import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { 
    loading: false, 
    signature: '',
    // meetingLaunched: false,
    // meetingNumber: "2859761343",
    // leaveUrl: "#",
    // userName: "",
    // userEmail: "",
    // passWord: "",
    // role: 0,
    meetingData: {
      meetingNumber: "2859761343",
      role: 0
    }
  }

  launchMeeting = meetingData => e => {
    e.preventDefault()
    
    this.setState({ loading: true })
    fetch("/.netlify/functions/signature",{
      method: "POST",
      body: meetingData
    })
      .then(res => res.json())
      .then(data => this.setState({ loading: false, signature: data.signature }))
  }

  render() {
    const { loading, signature, meetingData } = this.state
    return (
      <div className="App">
        <p>Signature: <br/>{signature}</p>
        <button onClick={this.launchMeeting(meetingData)}>{loading ? "Loading..." : "Get Signature"}</button>
      </div>
    );
  }
}

export default App;
