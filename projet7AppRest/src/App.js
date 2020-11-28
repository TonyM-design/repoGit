import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Aside from './components/Aside';
import GeolocationModal from './components/GeolocationModal';
import DisplayMap from './components/Map';
import ContainerMap from './components/ContainerMap';
import './App.css';




function App() {

  // user location
  const WatchPosition = () => {

    navigator.geolocation.watchPosition(function (position) {
      console.log("Geolocalisation Activé");
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      const newPosition = { lat, lng };
      return (newPosition)
    },
      function (error) {
        if (error.code === error.PERMISSION_DENIED)
          console.log("test dans app de position");
        activeDisplayModal()
      });

  };


  // hook manage Modal
  let [useDisplayModal, setDisplayModal] = useState(false)
 

  const activeDisplayModal = () => {
    setDisplayModal(useDisplayModal = true)
  }


  return (
    <Container fluid id='App'>
      <Row>
        {WatchPosition()}
        {(useDisplayModal && <GeolocationModal></GeolocationModal>) || null}
        <Aside></Aside>
        <ContainerMap>
        {DisplayMap()}
          <DisplayMap>{console.log("test de <DisplayMap></DisplayMap>")}</DisplayMap> 
          {/* Pourquoi lorsque je met à la place '<DisplayMap></DisplayMap>' la map n'apparait plus ? */}
        </ContainerMap>
      </Row>
    </Container>


  );
}

export default App;

