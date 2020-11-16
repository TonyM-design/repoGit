import React from 'react';
import InfoElement from './InfoElement.js'




function AsideInfoBox() {
  const restaurantLists = require('../DonneeTest.json');
  console.log(restaurantLists);
  console.log(restaurantLists.length);
  
  return (
    <div>
      <p>aside info</p>
      {restaurantLists.map((restaurantList, i) => {
        return (
          <InfoElement restaurantName ={restaurantList.restaurantName} key ={ i} ></InfoElement>
        );  
      }          
  )
}</div>
  )
}

export default AsideInfoBox;

