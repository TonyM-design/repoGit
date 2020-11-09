import React from 'react';

  function CurrentLocation() {
    console.log("je suis le test de CurrentLocation")
    navigator.geolocation.getCurrentPosition(success, error);
  }

function success() {
    console.log("petits oiseaux")
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = pos.coords;
      const lat = coords.latitude;
      const lng = coords.longitude;
      const position = {lat, lng};
     
      console.log(position)
      return position  
    })}
    
  
  
  function error() {
    alert('la geolocalisation est désactivée, activez-la et rechargez la page')
    return (<div className="test d'erreur"><p>veillez activer la geolocalisation </p></div>)
  }
  

  export default CurrentLocation