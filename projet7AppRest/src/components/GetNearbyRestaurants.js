/**
 * It is the constant value of `google.maps.places.PlacesServiceStatus.OK`
 * cf: https://developers.google.com/maps/documentation/javascript/reference/places-service#PlacesServiceStatus.OK
 */
const placeServiceStatusOK = 'OK';

const getNearbyRestaurantAndRatings = async (mapMapsService, googleBounds) => {
    if (mapMapsService === undefined || mapMapsService.maps === undefined || mapMapsService.map === undefined) {
        console.warn("mapMapsService error")
        return [];
    }

    const placesService = new mapMapsService.maps.places.PlacesService(mapMapsService.map);
    if (placesService === undefined) {
        console.warn("PlaceService error")

        return [];
    }

    const findedRestaurants = await findNearbyRestaurant(placesService, googleBounds);
    const restaurantsToReturnList = []
    for (const findedRestaurant of findedRestaurants) {
        const newRestaurant = {
            restaurantName: findedRestaurant.name,
            adresse: findedRestaurant.vicinity,
            lat: findedRestaurant.geometry.location.lat(),
            long: findedRestaurant.geometry.location.lng(),
            ratings: await findRatingsByRestaurant(placesService, findedRestaurant)
        }
        restaurantsToReturnList.push(newRestaurant)
    }
    return restaurantsToReturnList;
}

const findNearbyRestaurant = async (placesService, googleBounds) => {
    return new Promise((resolve) => {
        let request = {
            bounds: googleBounds,
            type: ['restaurant']
        }
        placesService.nearbySearch(request, callbackSearch);

        function callbackSearch(results, status) {

            if (status === placeServiceStatusOK) {
                resolve(results);
            }
            else {
                console.warn(`PlaceServiceStatus error status must be ${placeServiceStatusOK} but received ${status}`)

                resolve([])
            }
        }
    })
}

const findRatingsByRestaurant = async (placesService, findedRestaurant) => {
    return new Promise((resolve) => {
        let request = {
            placeId: findedRestaurant.place_id,
            fields: ['name', 'rating', 'review']
        };
        placesService.getDetails(request, callback);
        let ratings = []
        function callback(place, status) {
            if (status === placeServiceStatusOK) {
                const importedReviews = place.reviews
                let newImportRating = null
                if (importedReviews !== undefined) {
                    importedReviews.map((importedReview, i) => (
                        newImportRating = { stars: importedReview.rating, comment: importedReview.text },
                        ratings.push(newImportRating)
                    ))
                    return resolve(ratings)
                }
            } else {
                console.warn(`status error : ${placeServiceStatusOK} must be OK received ${status} `)
                resolve([]);
            }

        }
    });
}
export default getNearbyRestaurantAndRatings;
