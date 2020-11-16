import React, {useState} from "react";

const InfoElement = (props) => {


let [visible, setVisible] = useState(true);
const showRestaurant= () => {
    setVisible(visible = true )
}
const maskRestaurant= () => {
    setVisible(visible = false)
}

// placer conditionnement visible vis a vis des bordures de la carte 

return(
    <div className='asideInfoElementList'>
    <p> Nom du restaurant:{props.restaurantName}</p>
   
    </div>
    
);
}

export default InfoElement;