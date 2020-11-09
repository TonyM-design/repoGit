import { GoogleApiWrapper, Map } from 'google-maps-react';
import React from 'react';
import CurrentLocation from './CurrentLocation';


export class Container extends React.Component{ // CONTIENT LA MAP GOOGLE
    constructor(props){
        super(props)
        this.state={
            lat: 'test latitude dans le state',
            lng: 'test longitude dans le state'
        }
        CurrentLocation()
        console.log(this.state)
        console.log(this.props)
    }

   
    render(){
        if (!this.props.loaded){
            return <div> <h1>CHARGEMENT ...</h1> </div>
        }
        return ( 
            <Map
            google={this.props.google}
            zoom={8}
            className='col-lg-9'
            style={{marginRight:"15px"}}
            currentLocation= {{ lat: 10, lng: 10}}
            initialCenter={{ lat: 10, lng: 10}}
            >
                
            </Map>    
                     
        );
    }
}

export default GoogleApiWrapper({
    apiKey:'AIzaSyCN5UCQGiOHjAI4_RCdZ-2Yuug2-4JYTzs'
})(Container)