
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
        case 'SEND_NEW_RATING':
            const {restaurantName, comment, stars} = action.payload.newRestaurantRating; // stars: parseInt(inputRestaurantStar.val) comment: inputRestaurantComment.val restaurantName: selectedRestaurant.restaurantName,

           return {
                ...state,
               restaurantLists: state.restaurantLists.map((restaurant) => {
                if (restaurant.restaurantName === restaurantName) {
                 return {...restaurant, ratings: [...restaurant.ratings, {stars, comment}]};
                }
                return {...restaurant};
            })
           }

        default:
            return state
    }
}

export default restaurantListReducers;