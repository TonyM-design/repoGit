import React,{useState} from 'react'

const AccessGeolocation = () => {
    if ("geolocation" in navigator) {
        WatchPosition();
    }


};

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
        });
    })
};






export default AccessGeolocation;
