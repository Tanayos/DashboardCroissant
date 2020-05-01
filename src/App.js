import React from 'react';
import './App.css';
import Ratp from './components/Ratp'
import Croissant from './components/Croissant'
import Info from './components/Info'

const App = ()=> {

  return (
    <div className="App">
      <Ratp/>
      <Croissant/>
      <Info/>
    </div>
  );
}

export default App;
