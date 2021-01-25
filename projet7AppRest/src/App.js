import React, { useEffect, useState } from 'react';
import Aside from './components/Aside';
import GeolocationModal from './components/GeolocationModal';
import Map from './components/Map';
import './App.css';
import { useSelector } from 'react-redux';



 


function App(props) {
  // user location
  const restaurantLists = useSelector(state => state.restaurantList) // a placer tout en haut de la hierarchie

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

  // hook manage current user Position for map
  const [currentPosition, setCurrentPosition] = useState({ lat: 10, lng: 8 }); // état initial
  useEffect(() => {
    navigator.geolocation.watchPosition(function (position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      const newPosition = { lat: lat, lng: lng };
      setCurrentPosition(newPosition);
    });
  }, [setCurrentPosition]);


  //Get bounds from mapLimitReducer
  const userBounds = useSelector(state => state.userBounds.bounds)
 // Get restaurant list from reducer
 const restaurantListReducer = useSelector(state => state.restaurantListReducer)

  // Get if user wants return bests filtered restaurant list 
  const activeStarFilter = useSelector(state => state.activeFilterByStars)

  // Get range of the filtered list
  // const {minRange, maxRange} = useSelector(state => state.starRange);
  const minRange = useSelector(state => state.starRange.min);
  const maxRange = useSelector(state => state.starRange.max)

  // Get the new restaurant to add
  const newRestaurantProperties = useSelector(state => state.newRestaurantProperties)
  console.log(newRestaurantProperties)

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
    if (userBounds !== undefined && userBounds !== null && activeStarFilter === false) {
      restaurantLists.map((restaurantList, i) => {
        if (restaurantList.lat <= userBounds.ne.lat && restaurantList.lat >= userBounds.se.lat) {
          if (restaurantList.long <= userBounds.ne.lng && restaurantList.long >= userBounds.sw.lng) {
          filteredRestaurantLists.push(restaurantList)
          console.log(activeStarFilter)
          
        }
      }
      })
  }
  if (userBounds !== undefined && userBounds !== null && activeStarFilter === true) {
    restaurantLists.map((restaurantList, i) => {
      if (restaurantList.lat <= userBounds.ne.lat && restaurantList.lat >= userBounds.se.lat) {
        if (restaurantList.long <= userBounds.ne.lng && restaurantList.long >= userBounds.sw.lng) {
          filterByStars(restaurantList, filteredRestaurantLists)
        console.log(activeStarFilter)
        
      }
    }
    })
}
  return filteredRestaurantLists
}




return (
<div>
      {WatchPosition()}
      {(useDisplayModal && <GeolocationModal></GeolocationModal>) || null}
      <Map newPosition={currentPosition} starFilterIsActive={activeStarFilter} restaurantLists={filterRestaurantLists(userBounds,activeStarFilter.activeFilterByStars, restaurantListReducer.restaurantLists)} > </Map>
      <Aside restaurantLists={filterRestaurantLists(userBounds,activeStarFilter.activeFilterByStars, restaurantListReducer.restaurantLists)} style={{zIndex:'5'}, {position:'absolute'}, {marginTop:'0px'}}  ></Aside>
</div>

);
}

export default App;



