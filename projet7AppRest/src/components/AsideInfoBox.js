import React from 'react';
import InfoRestaurants from './InfoRestaurant.js'




function AsideInfoBox() {
  const restaurantLists = require('../DonneeTest.json');
  console.log(restaurantLists);
  console.log(restaurantLists.length);
  
  return (
    <div>
      <p>aside info</p>
      {restaurantLists.map((restaurantList, i) => {
    return(
          <InfoRestaurants restaurantName ={restaurantList.restaurantName} address = {restaurantList.address} ratings = {restaurantList.ratings} key ={ i} ></InfoRestaurants>
    );
      }          
  )
}</div>
  )
}

export default AsideInfoBox;

