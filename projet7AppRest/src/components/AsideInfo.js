import React from 'react';
import InfoElement from './InfoElement'




function AsideInfo() {
  let dataLists = require('../DonneeTest.json');
  console.log(dataLists);
  console.log(dataLists.length);
  
  return (
    <div>
      <p>aside info</p>
      {dataLists.map((dataList, i) => {
        return (
          <div key={i} >
          <InfoElement restaurantName={dataList.restaurantName} address ={dataList.address} ratings= {dataList.ratings[i]} ></InfoElement>
          </div>
        );  
      }          
  )
}</div>
  )
}

export default AsideInfo;

