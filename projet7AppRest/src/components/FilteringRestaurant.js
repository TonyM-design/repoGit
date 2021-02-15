import React from 'react';
import { useSelector } from 'react-redux';


const FilteredRestaurantLists = () => {
  // const {minRange, maxRange} = useSelector(state => state.starRange);
  const minRange = useSelector(state => state.starRange.min);
  const maxRange = useSelector(state => state.starRange.max)
  //Get bounds from mapLimitReducer
  const userBounds = useSelector(state => state.userBounds.bounds)
  // Get restaurant list from reducer
  const restaurantListReducer = useSelector(state => state.restaurantListReducer)
  // Get if user wants return bests filtered restaurant list 
  const activeStarFilter = useSelector(state => state.activeFilterByStars)


  const calculateRestaurantStarAverage = (valuesStarsList) => {
    var b = valuesStarsList.length,
      c = 0, i;
    for (i = 0; i < b; i++) {
      c += Number(valuesStarsList[i]);
    }
    return c / b;
  }

  const filterByStars = (restaurantList, filteredRestaurantLists) => {
    const valuesStarsList = [];
    restaurantList.ratings.map((rating, i) => {
      valuesStarsList.push(rating.stars)
    })
    const averageStar = calculateRestaurantStarAverage(valuesStarsList)
    if (averageStar >= minRange && averageStar <= maxRange) {
      filteredRestaurantLists.push(restaurantList)

    }

  }

  const filterRestaurantLists = (userBounds, activeStarFilter, restaurantLists) => {
    const filteredRestaurantLists = [];
    if (userBounds !== undefined && userBounds !== null && activeStarFilter === false) {
      restaurantLists.map((restaurantList, i) => {
        if (restaurantList.lat <= userBounds.ne.lat && restaurantList.lat >= userBounds.se.lat) {
          if (restaurantList.long <= userBounds.ne.lng && restaurantList.long >= userBounds.sw.lng) {
            filteredRestaurantLists.push(restaurantList)

          }
        }
      })
    }
    if (userBounds !== undefined && userBounds !== null && activeStarFilter === true) {
      restaurantLists.map((restaurantList, i) => {
        if (restaurantList.lat <= userBounds.ne.lat && restaurantList.lat >= userBounds.se.lat) {
          if (restaurantList.long <= userBounds.ne.lng && restaurantList.long >= userBounds.sw.lng) {
            filterByStars(restaurantList, filteredRestaurantLists)

          }
        }
      })
    }
    return filteredRestaurantLists
  }

  return (filterRestaurantLists(userBounds, activeStarFilter.activeFilterByStars, restaurantListReducer.restaurantLists))

}


export default FilteredRestaurantLists