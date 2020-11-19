import React, {useState} from "react";
import Advices from "./Advices";

const DisplayAdvice = (ratings) => {
    const listAdvices = ratings;
    
    listAdvices.map((listAdvice) =>{
        const note = listAdvice.stars;
        const comment = listAdvice.comment;
        return(Advices(note, comment)     )
} 
  
    )

}

const Inforestaurants = (props) => {

return(
    <div className='asideInfoElementList'>
    <p> Nom du restaurant:{props.restaurantName}</p>
    <p> Adresse:{props.address}</p>
    {DisplayAdvice(props.ratings)}
    </div>
    
);
}

export default Inforestaurants;