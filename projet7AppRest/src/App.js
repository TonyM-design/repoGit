import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Aside from './components/Aside';
import GeolocationModal from './components/GeolocationModal';
import Map from './components/Map';
import './App.css';
import { useSelector } from 'react-redux';



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

  // Get if user wants return bests filtered restaurant list 
  const activeStarFilter = useSelector(state => state.activeFilterByStars)
  console.log(activeStarFilter)

  // Get range of the filtered list
  const minRange = useSelector(state => state.starRange.min);
  const maxRange = useSelector(state => state.starRange.max)

  

  const calculateRestaurantStarAverage = (valuesStarsList) => {
      var b = valuesStarsList.length,
          c = 0, i;
      for (i = 0; i < b; i++){
        c += Number(valuesStarsList[i]);
      }
      return c/b;
    }
    



 // A INTEGRER DANS FILTERRESTAURANTLISTS ()
 const filterByStars = (restaurantList, filteredRestaurantLists) => {
   const valuesStarsList = [];
restaurantList.ratings.map((rating, i) => {
valuesStarsList.push(rating.stars)
})
const averageStar = calculateRestaurantStarAverage (valuesStarsList)
if (averageStar >= minRange && averageStar <= maxRange ) {
  filteredRestaurantLists.push(restaurantList)

}

 }
  //VALIDE MAIS A FACTORISER

  const filterRestaurantLists = (userBounds, activeStarFilter, restaurantLists) => {
    const filteredRestaurantLists = [];
    if (userBounds.userBounds.bounds !== undefined && userBounds.userBounds.bounds !== null && activeStarFilter === false) {
      restaurantLists.map((restaurantList, i) => {
        if (restaurantList.lat <= userBounds.userBounds.bounds.ne.lat && restaurantList.lat >= userBounds.userBounds.bounds.se.lat) {
          if (restaurantList.long <= userBounds.userBounds.bounds.ne.lng && restaurantList.long >= userBounds.userBounds.bounds.sw.lng) {
          filteredRestaurantLists.push(restaurantList)
          console.log(activeStarFilter)
          
        }
      }
      })
  }
  if (userBounds.userBounds.bounds !== undefined && userBounds.userBounds.bounds !== null && activeStarFilter === true) {
    restaurantLists.map((restaurantList, i) => {
      if (restaurantList.lat <= userBounds.userBounds.bounds.ne.lat && restaurantList.lat >= userBounds.userBounds.bounds.se.lat) {
        if (restaurantList.long <= userBounds.userBounds.bounds.ne.lng && restaurantList.long >= userBounds.userBounds.bounds.sw.lng) {
          filterByStars(restaurantList, filteredRestaurantLists)
        console.log(activeStarFilter)
        
      }
    }
    })
}
  return filteredRestaurantLists
}




return (
  <Container fluid id='App'>
    <Row>
      {WatchPosition()}
      {(useDisplayModal && <GeolocationModal></GeolocationModal>) || null}
      <Map newPosition={currentPosition} > </Map>
      <Aside restaurantLists={filterRestaurantLists(userBounds,activeStarFilter.activeFilterByStars, restaurantLists)} ></Aside>
    </Row>
  </Container>
);
}

export default App;



