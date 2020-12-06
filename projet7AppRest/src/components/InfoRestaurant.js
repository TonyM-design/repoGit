import React, { useState } from "react";
import AdvicesDisplay from './AdvicesDisplay';
import Button from 'react-bootstrap/Button';



const Inforestaurants = (props) => {
    

    return (
        <div className='asideInfoElementList'>
            <h4>{props.restaurantName}</h4>
            <p> {props.address}</p>
            {AdvicesDisplay(props.ratings)}
            <hr></hr>
            <Button variant="outline-secondary" > ajouter un avis   </Button>
        </div>

    );
}

export default Inforestaurants;