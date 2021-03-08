import React from "react";
import AdvicesDisplay from './AdvicesDisplay';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';


const Inforestaurants = (props) => {
    const lat = props.restaurantList.lat;
    const lng = props.restaurantList.long
    const createStreetViewLink = (lat, lng) => {
        let streetViewLink = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lat},${lng}&fov=80&heading=70&pitch=0&key=AIzaSyCN5UCQGiOHjAI4_RCdZ-2Yuug2-4JYTzs`
        return (streetViewLink)
    }

const localSelectedRestaurant = props.restaurantList

    const dispatch = useDispatch()
    const ratingIsActive = () => {
        dispatch({ type: 'CLICK_ADD_RATING' })
        dispatch({ type: 'SELECT_RESTAURANT', payload: localSelectedRestaurant})

    }

    const restaurantLists =  useSelector(state => state.restaurantListReducer)
    return (
        <div className='asideInfoElementList'>
            <h4>{props.restaurantList.restaurantName}</h4>
            <p> {props.restaurantList.address}</p>

            <img style ={{width:'100%'}} src={createStreetViewLink(lat, lng)}></img>

            {AdvicesDisplay(props.restaurantList.ratings)}
            <hr></hr>
            <Button variant="outline-secondary" onClick={ratingIsActive} > ajouter un avis </Button>
        </div>
    );
}

export default Inforestaurants;