import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


const Advice = (props) => {
    const stars = props.stars;

    const displayStars = (stars) => {
        let starsArrays = [];
        for (let i = 0; i < stars; i++) {
            starsArrays.push(`étoile ${i}`)
        }
        return starsArrays

    }

    const starsArrays = displayStars(stars)

    return (<div className='advice'>
{console.log(starsArrays)}
{starsArrays.map((starsArray , i) => {
    return (<FontAwesomeIcon icon={faStar} size="lg" color='gold' />)
 })}
        <p> {props.stars}</p>
        <p> {props.comment}</p>{displayStars(stars)}
    </div>
    )
}

export default Advice