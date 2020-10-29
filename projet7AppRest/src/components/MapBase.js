import React, { Component } from 'react';
import {GoogleApiWrapper,InfoWindow, Marker} from 'google-maps-react';
import CurrentLocation from './UserMap'



export class MapBase extends Component {
  state = {
    showingInfoWindow : false,
    activeMarker : {},
    selectedPlace : {}
  }

  // gestionnaire event click marker

  onMarkerClick = (props, marker, e) => // onMarkerClick affiche l'infoWindow (compo googleMapReact) qui créer une fenetre contextuelle avec details marker
  this.setState({
    selectedPlace : props,
    activeMarker : marker,
    showingInfoWindow : true
  });

  onClose = props => { // pour fermer la fenetre contextuelle et réinitialise le state
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow : false,
        activeMarker : null
      });
    }
  }


  // IMPOSSIBLE D'APPLIQUER CLASSNAME SUR COMPO
  render() {
    return (
      
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}>
      
        <Marker
        onClick={this.onMarkerClick} // appel de onMarkerClick pour déclencher l'affichage fenetre contextuelle
        name= {'info marker'}>
        </Marker>

        <InfoWindow
        marker= {this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose= {this.onClose}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>

</CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCN5UCQGiOHjAI4_RCdZ-2Yuug2-4JYTzs'
})(MapBase);
