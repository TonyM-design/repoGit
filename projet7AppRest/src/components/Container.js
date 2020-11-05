import { GoogleApiWrapper, Map } from 'google-maps-react';
import React from 'react';


export class Container extends React.Component{ // CONTIENT LA MAP GOOGLE
    render(){
        if (!this.props.loaded){
            return <div> <h1>CHARGEMENT ...</h1> </div>
        }
        return ( 
            
            <div > <h1>Emplacement Google Map</h1>
            <Map google={this.props.google} className='col-lg-9' style={{marginRight:"15px"}}></Map>
            {console.log(this.props)};
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey:''
})(Container)