
const initState =
{
    restaurantLists: require('../DonneeTest.json')
}

const restaurantListReducers = (state = initState, action) => {
    const displayedRestaurants = state.restaurantLists
    switch (action.type) {
        case 'ADD_ITEM':
           const resultat = displayedRestaurants.find(restaurant => restaurant.restaurantName === action.payload.newRestaurant.restaurantName); 
                if (resultat === undefined) {
                return {
                ...state,
                restaurantLists: [...state.restaurantLists, action.payload.newRestaurant]
            }} 
        case 'SEND_NEW_RATING':
            if (action.payload.newRestaurantRating !== undefined){
            const { restaurantName, comment, stars } = action.payload.newRestaurantRating;
            return {
                ...state,
                restaurantLists: state.restaurantLists.map((restaurant) => {
                    if (restaurant.restaurantName === restaurantName) {
                        return { ...restaurant, ratings: [...restaurant.ratings, { stars, comment }] };
                    }
                    return { ...restaurant };
                })
            }}

        default:
            return state
    }
}
export default restaurantListReducers;