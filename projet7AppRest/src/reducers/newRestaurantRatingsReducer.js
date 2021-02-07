const initState = {
    stars: null,
    comment: null
  };

//Define Actions
const newRestaurantRatingsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEND_NEW_RATING':
            console.log(action.payload)
            return {
                ...state,
                   newRatings: action.payload  
            }
       
        default:
            return state
    }
}

export default newRestaurantRatingsReducer;