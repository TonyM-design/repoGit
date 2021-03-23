
const initState =
{
    restaurantLists: require('../DonneeTest.json')
}


//Define Actions
const restaurantListReducers = (state = initState, action) => {
    const tests = state.restaurantLists

    switch (action.type) {
        case 'ADD_ITEM':
           console.log(action.payload.newRestaurant.restaurantName)
           console.log(state)
           const resultat = tests.find(restaurant => restaurant.restaurantName === action.payload.newRestaurant.restaurantName); //RETOURNE TOUJOURS UNDEFINED ERREUR ICI
                if (resultat === undefined) {
                    console.log(resultat)

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