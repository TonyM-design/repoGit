import React from 'react';
import InfoElement from './InfoElement.js'




function AsideInfoBox() {
  const restaurantList = require('../DonneeTest.json');
  console.log(restaurantList);
  console.log(restaurantList.length);
  
  return (
    <div>
      <p>aside info</p>
      {restaurantList.map((restaurant, i) => {
        return (
          <div key={i} >
          <InfoElement restaurantName={restaurant.restaurantName} address ={restaurant.address} ratings= {restaurant.ratings} ></InfoElement>
          </div>
        );  
      }          
  )
}</div>
  )
}

export default AsideInfoBox;

