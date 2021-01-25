const initState = 
{
    restaurantLists:require('../DonneeTest.json')
} 


//Define Actions
const restaurantListReducers = (state = initState, action) => {
    switch (action.type) {

        case 'ADD_ITEM' :
    return { 
        ...state,
        restaurantLists: [...state.restaurantLists, action.payload.newRestaurantProperties]
    }

        default:
            return state
    }
}

export default restaurantListReducers;