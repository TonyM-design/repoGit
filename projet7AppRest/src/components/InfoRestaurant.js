import React from "react";
import AdvicesDisplay from './AdvicesDisplay';
import Button from 'react-bootstrap/Button';




const Inforestaurants = (props) => {
    
    const lat = props.restaurantList.lat;
    const lng = props.restaurantList.long
    console.log(lat, lng)

    const createStreetViewLink = (lat , lng ) => {
        let streetViewLink = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + `${lat}` + `${lng}`+"&fov=80&heading=70&pitch=0 &key=AIzaSyCN5UCQGiOHjAI4_RCdZ-2Yuug2-4JYTzs"
        return(streetViewLink)
    }


    return (

        <div className='asideInfoElementList'>
            <h4>{props.restaurantList.restaurantName}</h4>
            <p> {props.restaurantList.address}</p>

            <img src={createStreetViewLink(lat, lng)}></img>
            
            {AdvicesDisplay(props.restaurantList.ratings)}
            <hr></hr>
            <Button variant="outline-secondary" > ajouter un avis </Button>
        </div>

    );
}

export default Inforestaurants;