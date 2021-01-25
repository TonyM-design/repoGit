//Reducer for character information Initialize State
const initState = {
    min: 1,
    max: 5,
}

//Define Actions
const starRangeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'APPLY_NEW_RANGE':
            return {
                ...state,
                min: action.payload.min,     
                max: action.payload.max       
            }
        default:
            return state
    }
}

export default starRangeReducer;