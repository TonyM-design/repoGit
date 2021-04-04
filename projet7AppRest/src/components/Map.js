import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import AddRestaurantCard from './AddRestaurantCard';
import MarkerUser from './MarkerUser';
import MarkerRestaurant from './MarkerRestaurant'
import AddRatingCard from './AddRatingCard';
import getNearbyRestaurantAndRatings from './GetNearbyRestaurants';


const Map = (props) => {
    const filteredList = props.restaurantLists
    const lat = props.newPosition.lat;
    const lng = props.newPosition.lng;
    const [clickLatLng, setClickLatLng] = useState({ lat: null, lng: null });
    const [mapMapsService, setMapMapsService] = useState({ map: null, maps: null })

     // REDUX
     const { addRatingIsActive } = useSelector(state => state.addRatingIsActive)
    // const { userPosition } = useSelector(state => state.userPosition)
     const { addRestaurantIsActive } = useSelector(state => state.addRestaurant);
     const { selectedRestaurant } = useSelector(state => state.selectedRestaurant);
     const [googleBounds, setGoogleBounds] = useState({ east: null, north: null, south: null, west: null }); 
     const dispatch = useDispatch();
 

     const transformGoogleBounds = (bounds) =>({ east: bounds.ne.lng, north: bounds.ne.lat, south: bounds.sw.lat, west: bounds.sw.lng }); 


     // userBounds 
     const sendCurrentBounds = (bounds) => {
         dispatch({ type: 'ON_CHANGE_BOUNDS', payload: bounds });
         setGoogleBounds(transformGoogleBounds(bounds))
     }
     // FIN REDUX


    //ACCESS ON GOOGLE MAP API 
    const handleApiLoaded = async (map, maps) => {
         setMapMapsService({ map: map, maps: maps })

        // Configure the click listener
        map.addListener("click", (mapsMouseEvent) => {
            var latitude = mapsMouseEvent.latLng.lat();
            var longitude = mapsMouseEvent.latLng.lng();
            setClickLatLng({ latitude, longitude })
        })
    }
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

    const displayMarkers = async (mapMapsService, boundsMap) => {
        const newRestaurants = await getNearbyRestaurantAndRatings(mapMapsService, boundsMap);

          for (const newRestaurant of newRestaurants) {
               dispatch({ type: 'ADD_ITEM', payload:  {newRestaurant}  })
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
                    defaultZoom={15}
                    minZoom={15}
                    onClick={AddNewRestaurant}
                    onGoogleApiLoaded={({ map, maps }) => {handleApiLoaded(map, maps)}}
                    center={{ lat, lng }}
                    options={{ draggableCursor: addRestaurantIsActive ? 'crosshair' : 'grab', minZoom: 14 }}
                    yesIWantToUseGoogleMapApiInternals
                    onChange={  ({ bounds }) => {
                         sendCurrentBounds(bounds)
                        if (mapMapsService !== undefined && mapMapsService.maps !== null) {
                            displayMarkers(mapMapsService, transformGoogleBounds(bounds));
                        }}
                    }>
                    <MarkerUser key='user' lat={lat} lng={lng}></MarkerUser>

                    {filteredList.map((elem) => (
                        <MarkerRestaurant
                            key={filteredList.indexOf(elem)}
                            lat={elem.lat}
                            lng={elem.long}
                            contenu={elem}
                        >
                        </MarkerRestaurant>
                    ))}

                    {addRatingIsActive ? <AddRatingCard className='col-2'
                        lat={selectedRestaurant.lat}
                        lng={selectedRestaurant.long}
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



