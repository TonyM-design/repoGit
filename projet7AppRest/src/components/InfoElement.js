import React from 'react';
import Ratings from './Ratings'
          
class InfoElement extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            restaurantName: this.props.restaurantName,
            address: this.props.address,
            lat: this.props.lat,
            long: this.props.long,
            ratings: this.props.ratings,
            visible : false,
            picture : null
    }
}
setVisible(){
    // 
}

render(){
    console.log(this.state)
    return(
        <div className='asideInfoElementList'>
        <p> Nom du restaurant:{this.state.restaurantName}</p>
        <p> Adresse du restaurant:{this.state.address}</p>
        <Ratings ratings={this.state.ratings} ></Ratings>
        </div>
    )
}
}

export default InfoElement;

