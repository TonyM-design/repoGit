const GetNearbyRestaurantAndRatings = async (mapMapsService, googleBounds) => {
    const findedRestaurants = await findNearbyRestaurant(mapMapsService, googleBounds);
    const restaurantsToReturnList = []
    for (const findedRestaurant of findedRestaurants) {
        const newRestaurant = {
            restaurantName: findedRestaurant.name,
            adresse: findedRestaurant.vicinity,
            lat: findedRestaurant.geometry.location.lat(),
            long: findedRestaurant.geometry.location.lng(),
            ratings: await findRatingsByRestaurant(mapMapsService, findedRestaurant)
        }
        restaurantsToReturnList.push(newRestaurant)
    }
    return restaurantsToReturnList;
}

const findNearbyRestaurant = async (mapMapsService, googleBounds) => {
    const service = new mapMapsService.maps.places.PlacesService(mapMapsService.map);
    if (service.maps !== null && service !== undefined) {
        return new Promise((resolve) => {
            let request = {
                bounds: googleBounds,
                type: ['restaurant']
            }
            service.nearbySearch(request, callbackSearch);
            function callbackSearch(results, status) {
                if (status == mapMapsService.maps.places.PlacesServiceStatus.OK) {
                    resolve(results);
                    return results
                }
                else { console.log("PlaceServiceStatus error") }
            }
        })
    }
}

const findRatingsByRestaurant = async (mapMapsService, findedRestaurant) => {
    const service = new mapMapsService.maps.places.PlacesService(mapMapsService.map);
    if (service.maps !== null && service !== undefined) {
        return new Promise((resolve) => {
            let request = {
                placeId: findedRestaurant.place_id,
                fields: ['name', 'rating', 'review']
            };
            service.getDetails(request, callback);
            let ratings = []
            function callback(place, status) {
                if (status == mapMapsService.maps.places.PlacesServiceStatus.OK) {
                    const importedReviews = place.reviews
                    let newImportRating = null
                    if (importedReviews !== undefined) {
                        importedReviews.map((importedReview, i) => (
                            newImportRating = { stars: importedReview.rating, comment: importedReview.text },
                            ratings.push(newImportRating)
                        ))
                    }
                }
            }
            resolve(ratings)
            return ratings
        })
    }
}
export default GetNearbyRestaurantAndRatings;
