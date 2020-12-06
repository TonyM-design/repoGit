import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Aside from './components/Aside';
import GeolocationModal from './components/GeolocationModal';
import Map from './components/Map';
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
  
   // hook manage currentPosition for map
   const [currentPosition, setCurrentPosition] = useState({lat:10 , lng:8}); // état initial
   useEffect(() => {
     // met à jour la position de l'utilisateur
     navigator.geolocation.watchPosition(function (position) {
       const lng = position.coords.longitude;
       const lat = position.coords.latitude;
       const newPosition = { lat :lat, lng:lng }; 
       setCurrentPosition(newPosition);// nouvel état contenant lat/lng utilisateur
     });
   }, [setCurrentPosition]);

  return (
    <Container fluid id='App'>
      <Row>
        {(useDisplayModal && <GeolocationModal></GeolocationModal>) || null}
        
        <Map newPosition = {currentPosition}></Map>
        <Aside></Aside>
      </Row>
    </Container>


  );
}

export default App;

