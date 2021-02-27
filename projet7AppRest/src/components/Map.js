import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import AddRestaurantCard from './AddRestaurantCard';
import MarkerUser from './MarkerUser';
import MarkerRestaurant from './MarkerRestaurant'
import AddRatingCard from './AddRatingCard';

const Map = (props) => {
    const lat = props.newPosition.lat;
    const lng = props.newPosition.lng;
    const [clickLatLng, setClickLatLng] = useState({ lat: null, lng: null });
    const [mapMapsService, setMapMapsService] = useState( {map:null, maps:null})
    const [googleService, setGoogleService] = useState (null)
    const [googleBounds, setGoogleBounds] = useState({ ne: null, sw: null }); 

    //ACCESS ON GOOGLE MAP API 
    const handleApiLoaded = (map, maps) => {
        if (googleBounds.sw !== null) {
            setMapMapsService({map: map, maps: maps})
            const googleServiceTest =  new maps.places.PlacesService(map);
            setGoogleService(googleServiceTest)
        }

        // Configure the click listener
        map.addListener("click", (mapsMouseEvent) => {
            var latitude = mapsMouseEvent.latLng.lat();
            var longitude = mapsMouseEvent.latLng.lng();
            setClickLatLng({ latitude, longitude })
        })
    }


    const findNearbyRestaurant = (mapMapsService) => {
        console.log(mapMapsService)
        if (mapMapsService.maps !== null && mapMapsService !== undefined){
        const service =new mapMapsService.maps.places.PlacesService(mapMapsService.map);
        console.log(service) ///////////////////////////////////////////////////////
        let test = { sw: googleBounds.ne, ne: googleBounds.sw } 
        console.log(test) // valide

        let request = {
            bounds: test,
            type: ['restaurant']
        };
        function callbackFindNearbyRestaurant(results, status)  {
            console.log('test POUET !')
            if (status == mapMapsService.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                  console.log(results[i]);
                }
              }
        service.nearbySearch(request, callbackFindNearbyRestaurant);
            }
}
    }



    // REDUX
    const restaurantLists = useSelector(state => state.restaurantListReducer.restaurantLists)
    const { addRatingIsActive } = useSelector(state => state.addRatingIsActive)
    const { addRestaurantIsActive } = useSelector(state => state.addRestaurant);
    const { selectedRestaurant } = useSelector(state => state.selectedRestaurant);
    const userBounds = useSelector(state => state.userBounds)


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
                    bootstrapURLKeys={{
                        key: "AIzaSyCN5UCQGiOHjAI4_RCdZ-2Yuug2-4JYTzs",
                        libraries: ['places'] // chargement de la library place / https://github.com/google-map-react/google-map-react/blob/HEAD/API.md / voir fin page
                    }}
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
                        setGoogleBounds( {ne: bounds.ne, sw: bounds.sw})
                        if (mapMapsService.maps !== null && mapMapsService!== undefined){
                        findNearbyRestaurant(mapMapsService)
                        console.log(mapMapsService) ///////////////////////////////////////////////////////////////////////////////////////////////////
                        }
            

                    }
                    }>
                    <MarkerUser key='user' lat={lat} lng={lng}></MarkerUser>


                    {restaurantLists.map((restaurantList) => (
                        <MarkerRestaurant
                            key={restaurantLists.indexOf(restaurantList)}
                            lat={restaurantList.lat}
                            lng={restaurantList.long}
                            contenu={restaurantList}
                        >

                        </MarkerRestaurant>
                    ))}

                    {addRatingIsActive ? <AddRatingCard className='col-2'
                        lat={selectedRestaurant.lat}
                        lng={selectedRestaurant.long}
                        content={restaurantLists}
                    >
                    </AddRatingCard> : null}


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



