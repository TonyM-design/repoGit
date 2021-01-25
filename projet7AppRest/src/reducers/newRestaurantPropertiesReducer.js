const initState = {
    restaurantName: '',
    adress: '',
    lat: null,
    long: null,
    ratings: []
  };

//Define Actions
const newRestaurantPropertiesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEND_NEW_RESTAURANT':
            console.log(action.payload)
            return {
                ...state,
                   NewRestaurant: action.payload  
            }
       
        default:
            return state
    }
}

export default newRestaurantPropertiesReducer;