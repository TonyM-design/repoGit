import React from "react";
import { Loader } from "@googlemaps/js-api-loader";


const DisplayMap = (position) => {
    const loader = new Loader({
        apiKey: "AIzaSyCN5UCQGiOHjAI4_RCdZ-2Yuug2-4JYTzs",
        version: "weekly",
    });
    // promsesse
    const carte = loader.load().then(() => {
        new google.maps.Map(document.getElementById("map"), {
            center: { lat: 10, lng: 5},
            zoom: 8,
        });
    });

    return (
<div>{carte}</div>)
  
}

export default DisplayMap
