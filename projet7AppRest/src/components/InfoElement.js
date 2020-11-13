import React, {useState} from "react";

const InfoElement = (props) => {


let [restaurantName, setRestaurantName] = useState(null);
const majRestaurantName = () => {
    setRestaurantName(restaurantName = props.restaurantName )
}
let [adress, setAdress] = useState(null);
const majAdress = () => {
    setAdress(adress = props.adress )
}
let [lat, setLat] = useState(null);
const majLat = () => {
    setLat(lat = props.lat )
}
let [long, setLong] = useState(null);
const majLong = () => {
    setLong(long = props.long )
}

console.log('test')




return(
    {majRestaurantName},
    {majAdress},
    {majLat},
    {majLong},



    <div className='asideInfoElementList'>
    <p> Nom du restaurant:{restaurantName}</p>
   
    </div>
    
);
}

export default InfoElement;