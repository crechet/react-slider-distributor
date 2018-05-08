import React, { Component } from 'react';
import './App.css';

// Components.
import PercentsDistributor from '../percentsDistributor/percentsDistributor.container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PercentsDistributor />
      </div>
    );
  }
}

export default App;
