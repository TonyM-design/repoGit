import React, { useState } from "react";
import AdvicesDisplay from './AdvicesDisplay';
import Button from 'react-bootstrap/Button';



const Inforestaurants = (props) => {

    return (
        <div className='asideInfoElementList'>
            <p> Nom du restaurant:{props.restaurantName}</p>
            <p> Adresse:{props.address}</p>
            {AdvicesDisplay(props.ratings)}
            <Button variant="outline-secondary" > ajouter un avis   </Button>
        </div>

    );
}

export default Inforestaurants;