const initState = {
    bounds:null
    
};

//Define Actions
const mapLimitReducer = (state = initState, action) => {
    switch (action.type) {
            //Change bounds values
        case 'ON_CHANGE_BOUNDS':
            return {
                ...state,
                   bounds: action.payload  
            }
       
        default:
            return state
    }
}

export default mapLimitReducer;