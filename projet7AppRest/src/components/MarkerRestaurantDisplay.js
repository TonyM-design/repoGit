import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Marker from './Marker';


const MarkerRestaurantDisplay = (props) => {
  //const restaurantLists = useSelector(state => state.restaurantListReducer) // valide
  const restaurantListsByProps = props.contenu.restaurantLists
  const [restaurantsAreVisible, setRestaurantAreVisible] = useState (false)

console.log(restaurantListsByProps)  


  return (
    <>
    {
      restaurantListsByProps.map((restaurantListsByProp, i) => {
console.log(i + 1 +"   marqueur")
 return  <Marker className='MARKER FROM RESTAURANT DISPLAY' key={i} lat={restaurantListsByProp.lat} lng={restaurantListsByProp.long} contenu={restaurantListsByProp} />
      })
    }
    </>

    
    


  )
    
 }




export default MarkerRestaurantDisplay;

