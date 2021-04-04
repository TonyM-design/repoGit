const initState = {
    addRatingIsActive: false
}

//Define Actions
const addRatingIsActive = (state = initState, action) => {
    switch (action.type) {
    
        case 'CLICK_ADD_RATING':
            return {
                ...state,
                addRatingIsActive: !state.addRatingIsActive  
            }

        default:
            return state
    }
}

export default addRatingIsActive;