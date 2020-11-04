import React from 'react';
import ReactDOM from 'react-dom';


// comment faire la gestion css affichage carte autrement ?  

export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props); // ne pas prendre en compte le depreciated bug

        const { lat, lng } = this.props.initialCenter;

        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };

    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {  // si API Google Maps est disponible
            this.loadMap();
        }

        if (prevState.currentLocation !== this.state.currentLocation) {  // si emplacement actuel est fourni -> recentrer la carte vers cet emplacement. 
            this.recenterMap();
        }
    }


    recenterMap() { // recenterMap appelée lorsque currentLocation dans le state est MAJ
        const map = this.map; // est appellée
        const current = this.state.currentLocation;
        const google = this.props.google;
        const maps = google.maps;

        if (map) { // charge le centre de la carte
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }

    componentDidMount() { //verifier si carte chargée. componentDidMount() cycle de vie qui définira un rappel pour récupérer l'emplacement actuel.
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            // verifier si geolocation dispo
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;

            // reference to the actual DOM element
            const node = ReactDOM.findDOMNode(mapRef);

            let { zoom } = this.props;
            const { lat, lng } = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);

            // instance de map
            this.map = new maps.Map(node, { center, zoom });
        }
    }

    renderChildren() {
        const { children } = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;

            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }


    render() {
// IMPOSSIBLE DE PLACER LE COL-LG-9 a la place de className= test
        return (
            
            <div className ='test '>
                <div  className='mapStyle' ref="map">
                    {this.renderChildren()}
                    </div>
                
            </div>
        );
    }
}

// cas où l'emplacement actuel n'est pas fourni , géré par le prop booléen centerAroundCurrentLocation
CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: 0,
        lng: 0
    },
    centerAroundCurrentLocation: false,
    visible: true
};

export default CurrentLocation;