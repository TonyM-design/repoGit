import filterByStarReducer from './filterByStarReducer';
import mapLimitReducer from './mapLimitReducer'
import starRangeReducer from './starRangeReducer'
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    userBounds: mapLimitReducer,
    activeFilterByStars: filterByStarReducer,
    starRange: starRangeReducer
})

export default rootReducer