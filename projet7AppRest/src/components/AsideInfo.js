import React from 'react';
import InfoElement from './InfoElement'




function AsideInfo() {
  let dataLists = require('../DonneeTest.json');
  console.log(dataLists);
  console.log(dataLists.length);

  //  for (let i=0, i<dataList.length, i++){ // a placer dans le return directement !

  return (
    <div>
      <p>aside info</p>
      {dataLists.map((dataList, i) => {
        return (
          <div key={i} >
          <InfoElement restaurantName={dataList.restaurantName} address ={dataList.address} ></InfoElement>
          </div>
        );  
      }          
  )
}</div>
  )
}

export default AsideInfo;

