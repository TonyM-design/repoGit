import React,{useState , useEffect} from "react";

import GoogleMapReact from 'google-map-react';



const Map = (currentLocation) => {
    const lat = currentLocation.newPosition.lat
    const lng = currentLocation.newPosition.lng
    console.log(lat)
    console.log(lng)
    return (

            
            <div style={{ height: '100vh', width: '100%', opacity:'85%' , zIndex:'0' }}>
                
                {lat && (
          <GoogleMapReact
            bootstrapURLKeys={{
            key: "AIzaSyCN5UCQGiOHjAI4_RCdZ-2Yuug2-4JYTzs"
            }}
            defaultCenter={[lat, lng]}
            defaultZoom={16}
            center={{lat , lng}} 
          ></GoogleMapReact>
        )}
        
        
            </div>);
    
    
}

export default Map



