import React,{useState} from 'react'
import GeolocationModal from './GeolocationModal'



const WatchPosition = () => {
    return new Promise((resolve) => {
        navigator.geolocation.watchPosition(function (position) {
            console.log("Geolocalisation Activé");
            const lng = position.coords.longitude;
            const lat = position.coords.latitude
            const newPosition = { lat, lng }
            console.log(newPosition)
            resolve(newPosition)
            return newPosition
        },
            function (error) {
                if (error.code === error.PERMISSION_DENIED)
                    console.log("Geolocalisation bloqué, placer Modal");
                    
    ;
            });
    })
};





export default WatchPosition;
