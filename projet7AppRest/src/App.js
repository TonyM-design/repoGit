import React, { useEffect, useState } from 'react';
import Aside from './components/Aside';
import GeolocationModal from './components/GeolocationModal';
import Map from './components/Map';
import './App.css';
import FilteredRestaurantLists from './components/FilteringRestaurant';
import {useSelector} from 'react-redux'


function App(props) {

  const NewRating = useSelector(state => state.newRestaurantRating)
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

return (
<div>
      {WatchPosition()}
      {(useDisplayModal && <GeolocationModal></GeolocationModal>) || null}
      <Map newPosition={currentPosition} restaurantLists={FilteredRestaurantLists()} > </Map>
      <Aside restaurantLists={FilteredRestaurantLists()} style={{zIndex:'5', position:'absolute', marginTop:'0px'}}  ></Aside>
</div>
);
}
export default App;



