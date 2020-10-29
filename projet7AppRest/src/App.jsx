import React from 'react';
import './App.css';
import Aside from './components/Aside';
import MapBase from './components/MapBase';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <Aside></Aside>
          <MapBase></MapBase>




        </div>
      </div>
    </div>
  );
}

export default App;
