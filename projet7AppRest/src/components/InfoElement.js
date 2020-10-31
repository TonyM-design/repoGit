import React from 'react';

class InfoElement extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            restaurantName: this.props.restaurantName,
            address: this.props.address,
            lat: this.props.lat,
            long: this.props.long,
  //          stars: this.props.ratings.stars,
    //        comment: this.props.ratings.comment, 
            visible : false,
            picture : null
    }
}
setVisible(){
    // 
}

render(){
    return(
        <div className='asideInfoElementList'>
        <p  > Nom du restaurant:{this.state.restaurantName}</p>
        <p  > Adresse du restaurant:{this.state.address}</p>
        </div>
    )
}
}

export default InfoElement;

