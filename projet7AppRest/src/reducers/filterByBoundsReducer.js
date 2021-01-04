const initState = [];

//Define Actions
const filterByBoundsReducer = (state = initState, action) => {
    switch (action.type) {
            //Change bounds values
        case 'FILTER_BY_BOUNDS':
            console.log(action.payload)
            return {
                ...state,
                   filteredRestaurantLists: action.payload  
            }
       
        default:
            return state
    }
}

export default filterByBoundsReducer;