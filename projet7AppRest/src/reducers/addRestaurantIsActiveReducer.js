const initState = {
    addRestaurantIsActive: false
}

//Define Actions
const addRestaurantIsActiveReducer = (state = initState, action) => {

    switch (action.type) {
            //Change bounds values
        case 'CLICK_ON_ADD_RESTAURANT':
            return {
                ...state,
                    addRestaurantIsActive: !state.addRestaurantIsActive  
            }
        case 'ACTIVE_ADD_RESTAURANT':
            return {
                ...state,
                   addRestaurantIsActive: true  
            }

            case 'DISABLE_ADD_RESTAURANT':
                return {
                    ...state,
                    addRestaurantIsActive: false  
                }
       
        default:
            return state
    }
}

export default addRestaurantIsActiveReducer;