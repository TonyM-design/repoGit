import React from 'react';
import './App.css';
import Aside from './components/Aside';
import Container from './components/Container';



// ajouter au compo CONTAINER des props de position (vie currentLcoation plus haut)
function App() {


  
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">

          <Aside></Aside>
          <Container></Container>



        </div>
      </div>
    </div>
  );
}

export default App;
