import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Aside from './components/Aside';
import GeolocationModal from './components/GeolocationModal';
import Map from './components/Map';
import './App.css';
import { useSelector } from 'react-redux';
import { useStore } from 'react-redux'



const restaurantLists = require('./DonneeTest.json'); // a placer tout en haut de la hierarchie
 

function App(props) {
  // user location
  const WatchPosition = () => {
    navigator.geolocation.watchPosition(function (position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      const newPosition = { lat, lng };
      return (newPosition)
    },
      function (error) {
        if (error.code === error.PERMISSION_DENIED)
        activeDisplayModal()
      });
  };

  // hook manage Modal
  let [useDisplayModal, setDisplayModal] = useState(false)
  const activeDisplayModal = () => {
    setDisplayModal(useDisplayModal = true)
  }

  // hook manage currentPosition for map
  const [currentPosition, setCurrentPosition] = useState({ lat: 10, lng: 8 }); // état initial
  useEffect(() => {
    // met à jour la position de l'utilisateur
    navigator.geolocation.watchPosition(function (position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      const newPosition = { lat: lat, lng: lng };
      setCurrentPosition(newPosition);// nouvel état contenant lat/lng utilisateur
    });
  }, [setCurrentPosition]);

  
  //Get bounds from mapLimitReducer
const userBounds = useSelector(state => state)
  console.log(userBounds)
     

     // hook manage list of visible restaurant
     const [[filterByBoundsRestaurantLists], setfilterByBoundsRestaurantLists] = useState([]); // état initial vide
     useEffect(() => {
       // création filtre
       if (userBounds.userBounds.bounds !== undefined && userBounds.userBounds.bounds !== null) {
         const ne = userBounds.userBounds.bounds.ne
         const nw = userBounds.userBounds.bounds.nw
         const se = userBounds.userBounds.bounds.se
         const sw = userBounds.userBounds.bounds.sw
         console.log(restaurantLists)
         // et si je séparais la partie suivante en fonction  ?
         const newLists = [];

         restaurantLists.map((restaurantList, i) => {
           if (restaurantList.lat <= ne.lat && restaurantList.lat >= se.lat){
             if (restaurantList.long <= ne.lng && restaurantList.long >= sw.lng){
                 newLists.push(restaurantList)
                 console.log("rajout a la liste (push)")
             }
           }
         })
         setfilterByBoundsRestaurantLists(newLists);// nouvel état contenant la nouvelle liste
        }
     }, [setfilterByBoundsRestaurantLists]);


     
    
//VALIDE MAIS A TRANSFORMER EN HOOKS 
/*
  const filterRestaurantLists = (userBounds, restaurantLists) => {
    const filteredRestaurantLists = [];
    console.log(userBounds)
    if (userBounds.userBounds.bounds !== undefined) {
      restaurantLists.map((restaurantList, i) => {
        console.log('test avant condition')
        if (restaurantList.lat <= userBounds.userBounds.bounds.ne.lat && restaurantList.lat >= userBounds.userBounds.bounds.se.lat){
          if (restaurantList.long <= userBounds.userBounds.bounds.ne.lng && restaurantList.long >= userBounds.userBounds.bounds.sw.lng){
              filteredRestaurantLists.push(restaurantList)
          }
        }
        
      })
    }
    console.log(filteredRestaurantLists)
    return filteredRestaurantLists
  }
*/



  return (
    <Container fluid id='App'>
      <Row>
        {WatchPosition()}
        {(useDisplayModal && <GeolocationModal></GeolocationModal>) || null}

        <Map newPosition={currentPosition} onChange={useStore()}> </Map>
        <Aside restaurantLists={props.restaurantLists} restaurantListsFiltre={filterByBoundsRestaurantLists} ></Aside>
      </Row>
    </Container>
  );
}

export default App;



