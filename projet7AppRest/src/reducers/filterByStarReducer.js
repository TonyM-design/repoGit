const initState = {
    activeFilterByStars: false
}

//Define Actions
const filterByStarReducer = (state = initState, action) => {
    switch (action.type) {
            //Change bounds values
        case 'ACTIVE_FILTER_BY_STAR':
            return {
                ...state,
                   activeFilterByStars: true  
            }

            case 'DISABLE_FILTER_BY_STAR':
                return {
                    ...state,
                       activeFilterByStars: false  
                }
       
        default:
            return state
    }
}

export default filterByStarReducer;