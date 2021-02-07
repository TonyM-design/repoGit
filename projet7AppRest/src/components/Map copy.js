import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import Marker from './Marker';
import AddRestaurantCard from './AddRestaurantCard';
import AddRatingCard from './AddRatingCard';


const Map = (props) => {
    const lat = props.newPosition.lat;
    const lng = props.newPosition.lng;
    const [clickLatLng, setClickLatLng] = useState({ lat: null, lng: null });
    //ACCESS ON GOOGLE MAP API 
    const handleApiLoaded = (map, maps) => {
        // Configure the click listener.
        map.addListener("click", (mapsMouseEvent) => {
            var latitude = mapsMouseEvent.latLng.lat();
            var longitude = mapsMouseEvent.latLng.lng();
            setClickLatLng({ latitude, longitude })
        })
    }
    // REDUX
    const restaurantLists = useSelector(state => state.restaurantListReducer)
    const { addRatingIsActive } = useSelector(state => state.addRatingIsActive)
    const { addRestaurantIsActive } = useSelector(state => state.addRestaurant);
    const { selectedRestaurant } = useSelector(state => state.selectedRestaurant);
    const dispatch = useDispatch();
    const getUserBounds = (bounds) => {
        let userBounds = {
            ne: bounds.ne,
            nw: bounds.nw,
            se: bounds.se,
            sw: bounds.sw
        }
        dispatch({ type: 'ON_CHANGE_BOUNDS', payload: userBounds });
    }
    // FIN REDUX
    // MOUSE POSITION 
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, });
    const updateMousePosition = ev => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    const getMousePosition = () => {
        return (mousePosition)
    }
    const [addingNewRestaurant, setAddingNewRestaurant] = useState(false);
    const AddNewRestaurant = () => {
        if (addRestaurantIsActive === true) {
            window.addEventListener("click", updateMousePosition, { once: true });
            getMousePosition()
            setAddingNewRestaurant(true)
            console.log('addNewRestaurant')
            return true
        }
        else if (addRestaurantIsActive === false) {
            setAddingNewRestaurant(false)
            return false
        }
    }
    return (
        <div style={{ height: '100vh', width: '100%', opacity: '85%', zIndex: '0', position: 'absolute' }}>
            {lat && (
                <GoogleMapReact
                    key={1}
                    bootstrapURLKeys={{ key: "AIzaSyCN5UCQGiOHjAI4_RCdZ-2Yuug2-4JYTzs" }}
                    defaultCenter={[lat, lng]}
                    defaultZoom={16}
                    onClick={AddNewRestaurant}
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                    center={{ lat, lng }}
                    options={{ draggableCursor: addRestaurantIsActive ? 'crosshair' : 'grab' }}
                    yesIWantToUseGoogleMapApiInternals
                    onChange={({ bounds }) => {
                        getUserBounds(bounds)
                        dispatch({ type: 'ON_CHANGE_BOUNDS', payload: bounds });
                    }
                    }>
                    <Marker key={'user'} lat={lat} lng={lng} contenu={'Vous êtes ici'}></Marker>

                    {
                        props.restaurantLists.map((restaurantList, i) => {
                            return (
                                <div key={i + 'b'} style={{ position: 'absolute', zIndex: '100', borderRadius: '5px' }} lat={restaurantList.lat} lng={restaurantList.long}>
                                    <Marker key={i} lat={restaurantList.lat} lng={restaurantList.long} contenu={restaurantList} />
                                    {addRatingIsActive && selectedRestaurant.restaurantName === restaurantList.restaurantName ? 
                                        <AddRatingCard key={i + 'a'} content={restaurantList} > </AddRatingCard> : null
                                             }

                                </div>)
                    })}
                </GoogleMapReact>
            )
            }

            {(addRestaurantIsActive && addingNewRestaurant ? <div className='col-2' style={{ position: 'absolute', zIndex: '100', top: mousePosition.y, left: mousePosition.x, borderRadius: '5px' }}>
                <AddRestaurantCard latLng={clickLatLng} > </AddRestaurantCard>
            </div> : null)
            }


        </div>);
}

export default Map



