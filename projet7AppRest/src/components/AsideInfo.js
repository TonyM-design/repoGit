import React from 'react';
import jsonData from '../DonneeTest'



function AsideInfo() {
    let dataList = require('../DonneeTest.json');
   console.log(dataList);
    console.log(dataList.length)
       //  for (let i=0, i<dataList.length, i++){ // a placer dans le return directement !
              return(<p>test</p>)
                 
              
          
      


}

export default AsideInfo;


/*  fetch('https://ghibliapi.herokuapp.com/films')
.then(response => {
  return response.json();
})
.then(data =>{
  this.setState({
    movies : data
  });
});
}*/