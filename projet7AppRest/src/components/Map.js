import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch } from 'react-redux';
import Marker from './Marker';

const restaurantLists = require('../DonneeTest.json'); // a remonter dans app.js

const Map = (currentLocation) => {
    const lat = currentLocation.newPosition.lat;
    const lng = currentLocation.newPosition.lng;

// REDUX
    const dispatch = useDispatch();

    const getUserBounds = (bounds) => {
        let userBounds = {
            ne: bounds.ne,
            nw: bounds.nw,
            se: bounds.se,
            sw: bounds.sw
        }
        dispatch({ type: 'ON_CHANGE_BOUNDS', payload:userBounds });
    }


    return (
        <div style={{ height: '100vh', width: '100%', opacity: '85%', zIndex: '0' }}>
            {lat && (
                <GoogleMapReact
                    key={1}
                    bootstrapURLKeys={{ key: "AIzaSyCN5UCQGiOHjAI4_RCdZ-2Yuug2-4JYTzs" }}
                    defaultCenter={[lat, lng]}
                    defaultZoom={8}
                    center={{ lat, lng }}
                    onChange={({ bounds }) => {
                        getUserBounds(bounds)
                        dispatch({ type: 'ON_CHANGE_BOUNDS', payload:bounds });

                    }}
                >


                    <Marker key={'user'} lat={lat} lng={lng} contenu={'Vous êtes ici'}></Marker>

                    {
                        restaurantLists.map((restaurantList, i) => {
                            return (
                                <Marker key={i} lat={restaurantList.lat} lng={restaurantList.long} contenu={restaurantList} userLat={lat} userlng={lng}>{/*console.log(restaurantList.restaurantName, restaurantList.lat, restaurantList.long, i)*/}</Marker>
                            )

                        })
                    }

                </GoogleMapReact>
            )}
        </div>);


}

export default Map



