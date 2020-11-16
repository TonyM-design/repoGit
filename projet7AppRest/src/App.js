import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Aside from './components/Aside';
import GeolocationAccess from './components/Geolocation'
import './App.css';

function App() {
  return (
    <Container fluid id='App'>
      <Row>
{GeolocationAccess()}
      <Aside></Aside>
      
      </Row>
    </Container>
      
    
  );
}

export default App;
