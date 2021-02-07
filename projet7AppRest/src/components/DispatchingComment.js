import React from 'react'
import {useSelector} from 'react-redux'

const DispatchingComment = () => {
    const restaurantList=useSelector(state =>state.restaurantListReducer)
    const selectedRestaurantToCheck = useSelector(state => state.selectedRestaurant)
    const restaurantFound = myRestaurantLists.find(element => element = selectedRestaurantToCheck);


    return(false)
}

export default DispatchingComment