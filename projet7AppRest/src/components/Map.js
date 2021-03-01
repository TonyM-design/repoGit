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
    const [mapMapsService, setMapMapsService] = useState({ map: null, maps: null })
    const [googleService, setGoogleService] = useState(null)
    const [googleBounds, setGoogleBounds] = useState({ east: null, north: null, south: null, west: null });

    //ACCESS ON GOOGLE MAP API 
    const handleApiLoaded = (map, maps) => {
        if (googleBounds.sw !== null) {
            setMapMapsService({ map: map, maps: maps })
            const googleServiceTest = new maps.places.PlacesService(map);
            setGoogleService(googleServiceTest)
        }

        // Configure the click listener
        map.addListener("click", (mapsMouseEvent) => {
            var latitude = mapsMouseEvent.latLng.lat();
            var longitude = mapsMouseEvent.latLng.lng();
            setClickLatLng({ latitude, longitude })
        })
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


    const getMoreDetails = (resultNearbyRestaurant, mapMapsService) => {
        const service = new mapMapsService.maps.places.PlacesService(mapMapsService.map);
        var request = {
            placeId: resultNearbyRestaurant.place_id,
            fields: ['name', 'rating', 'review']
        };
        service.getDetails(request, callback);
        let ratings = []
        function callback(place, status) {
            if (status === mapMapsService.maps.places.PlacesServiceStatus.OK) {
                const importedReviews = place.reviews
                let newImportRating = null
                if (importedReviews !== null && importedReviews !== undefined) {
                    importedReviews.map((importedReview, i) => (
                        newImportRating = { stars: importedReview.rating, comment: importedReview.text }, // VALIDE
                        ratings.push(newImportRating)// VALIDE
                    ))
                }
                console.log(ratings) // ratings semble bon
            }
           
        } return ratings
    }

    const findNearbyRestaurant = (mapMapsService) => {
        if (mapMapsService.maps !== null && mapMapsService !== undefined) {
            const service = new mapMapsService.maps.places.PlacesService(mapMapsService.map);
            const boundsForGoogle = { east: googleBounds.east, north: googleBounds.north, south: googleBounds.south, west: googleBounds.west }


            let request = {
                location: {lat, lng},
                radius: '2500',
                type: ['restaurant']
            };
            function callbackFindNearbyRestaurant(results, status) {
                if (status == mapMapsService.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        const ratingsFromGoogle = getMoreDetails(results[i], mapMapsService)
                        const newRestaurantProperties = {
                            restaurantName: results[i].name,
                            adresse: results[i].vicinity,
                            lat: results[i].geometry.location.lat(),
                            long: results[i].geometry.location.lng(),
                            ratings: ratingsFromGoogle
                        }
                        dispatch({ type: 'ADD_ITEM', payload: { newRestaurantProperties } })

                     /*   const newImportedRestaurantFromGoogle = {
                            restaurantName: results[i].name,
                            adresse: results[i].vicinity,
                            lat: results[i].geometry.location.lat(),
                            long: results[i].geometry.location.lng(),
                            ratings: ratingsFromGoogle
                        }*/
                       // console.log(newImportedRestaurantFromGoogle)                      
                    /*  if ( newImportedRestaurantFromGoogle.lat !== null && newImportedRestaurantFromGoogle.lat !== undefined) {
                          dispatch({ type: 'ADD_ITEM', payload: {newImportedRestaurantFromGoogle} })
                        } */

                    }
                }

            }
            service.nearbySearch(request, callbackFindNearbyRestaurant);
        }
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
                        libraries: ['places']
                    }}
                    defaultCenter={[lat, lng]}
                    defaultZoom={18}
                    onClick={AddNewRestaurant}
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                    center={{ lat, lng }}
                    options={{ draggableCursor: addRestaurantIsActive ? 'crosshair' : 'grab' }}
                    yesIWantToUseGoogleMapApiInternals
                    onChange={({ bounds }) => {
                        getUserBounds(bounds)
                        dispatch({ type: 'ON_CHANGE_BOUNDS', payload: bounds });
                        setGoogleBounds({ east: bounds.ne.lng, north: bounds.ne.lat, south: bounds.sw.lat, west: bounds.sw.lng })
                        if (mapMapsService.maps !== null && mapMapsService !== undefined) {
                            findNearbyRestaurant(mapMapsService)
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



