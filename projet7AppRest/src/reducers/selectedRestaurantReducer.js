const initState = {
    selectedRestaurant: null
}

//Define Actions
const selectedRestaurantReducer = (state = initState, action) => {
    switch (action.type) {
            //Change bounds values
        case 'SELECT_RESTAURANT':
            return {
                ...state,
                selectedRestaurant: action.payload  
            }
        case 'UNSELECT_RESTAURANT':
            return {
                ...state,
                selectedRestaurant: null
            }
        default:
            return state
    }
}

export default selectedRestaurantReducer;