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
       // case 'SEND_NEW_RATING':
            // action.payload
            // stars: inputRestaurantStar.val,
            // comment: inputRestaurantComment.val,
            // restaurantId: content.restaurantId,
            // boucler sur ta liste de restaurant pour trouver le restaurant avec le même ID
            // push un object {starts, comment}
          //  const nouvelleListRestaurant = state.restaurantList.map();
          //  return {
         //       ...state,
         //       restaurantList:
         //   }

        default:
            return state
    }
}

export default restaurantListReducers;