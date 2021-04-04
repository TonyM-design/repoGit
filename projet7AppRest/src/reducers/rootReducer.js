import filterByStarReducer from './filterByStarReducer';
import mapLimitReducer from './mapLimitReducer';
import starRangeReducer from './starRangeReducer';
import addRestaurantIsActiveReducer from './addRestaurantIsActiveReducer';
import restaurantListReducers from './restaurantListReducers';
import addRatingIsActiveReducer from './addRatingIsActiveReducer';
import selectedRestaurantReducer from './selectedRestaurantReducer';
import {combineReducers} from 'redux';


//Combine all the sub reducers
const rootReducer = combineReducers({
    userBounds: mapLimitReducer,
    activeFilterByStars: filterByStarReducer,
    starRange: starRangeReducer,
    addRestaurant: addRestaurantIsActiveReducer,
    restaurantListReducer: restaurantListReducers,
    addRatingIsActive : addRatingIsActiveReducer,
    selectedRestaurant : selectedRestaurantReducer,
})

export default rootReducer