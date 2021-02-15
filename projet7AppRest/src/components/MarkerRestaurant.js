import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const MarkerRestaurant = ({ contenu }) => {
  const dispatch = useDispatch()

  const calculateRestaurantStarAverage = (valuesStarsList) => {
    var b = valuesStarsList.length,
      c = 0, i;
    for (i = 0; i < b; i++) {
      c += Number(valuesStarsList[i]);
    }
    return c / b;
  }

  const averageStar = (contenu) => {
    const valuesStarsList = [];
    contenu.ratings.map((rating, i) => {
      valuesStarsList.push(rating.stars)
    })
    const averageStar = calculateRestaurantStarAverage(valuesStarsList)
    return (averageStar)
  }

  function handleClick() {
    dispatch({ type: 'SELECT_RESTAURANT', payload: contenu })
    dispatch({ type: 'CLICK_ADD_RATING', payload: contenu })
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltipMarker" {...props}>
      <b>{contenu.restaurantName} | {averageStar(contenu)} <FontAwesomeIcon icon={faStar} style={{ justifySelf: 'auto' }} size="1x" color='gold' /></b> 
    </Tooltip>
  );





  return (
    <div className='restaurantMarker'>
       <OverlayTrigger
          placement="right"
          delay={{ show: 100, hide: 100 }}
          overlay={renderTooltip}
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" onClick={handleClick} />
        </OverlayTrigger>
    </div>
  )


}

export default MarkerRestaurant;