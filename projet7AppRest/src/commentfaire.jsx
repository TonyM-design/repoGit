import React from 'react';
import Card from 'react-bootstrap/Card';

const Marker = ({ contenu, userLat, userLng }) => { 
  // state
  function handleClick() {
    console.log("test handleClick");
    return (<div>
    <h1>TEST</h1>
    </div>)
  }
const isRestaurant = contenu.lat !== userLat && contenu.long !== userLng;
  if (contenu.lat !== userLat && contenu.long !== userLng) {
    console.log('Ajouter condition apparition via getBounds()')
    return (<div onClick={handleClick}>
      <div className='markerRestaurant'></div>
    </div>
    )
  }
  else return (
    <div>
      <div className='markerUser animated pulse '></div>
    </div>
  )
// fait la meme chose qu'au dessus -> fait par David
  return (<div>
    <CardRestaurant></CardRestaurant>
    {isRestaurant ? <div onClick={handleClick} className='markerRestaurant'/> : <div className='markerUser animated pulse ' />}
   </div>)
}

export default Marker;