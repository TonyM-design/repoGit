import filterByBoundsReducer from './filterByBoundsReducer';
import mapLimitReducer from './mapLimitReducer'
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    userBounds: mapLimitReducer,
})

export default rootReducer