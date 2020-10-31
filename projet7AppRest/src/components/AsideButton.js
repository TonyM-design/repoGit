import React from 'react';

class LocateButton extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            txt: <h4>{this.props.txt}</h4>,
            symbol: null,
            waitingLocation: true
    }
}

geolocationIsActivated(){

}

    componentDidMount(){
        this.changeState()
    }


    changeState = (e) => {
        this.state.waitingLocation ? (
            this.setState({
           txt: <h4>Geolocation activée</h4> ,
                waitingLocation: false ,
                symbol: <i className="fa fa-check" style={{color:"greenyellow"}} ></i>
            })
        ) : (
            this.setState({
                txt: <h4>Geolocation désactivée</h4> ,
                waitingLocation: true,
                symbol:<i class="fa fa-times" style={{color:"red"}}></i>
            })
        );
        //this.props.onClick();
    }

    render(){
        return( 
            
                <div className='row justify-content-center btnGlobal'>
             <button type= 'button' className='btn btn-outline-light col-lg-8' txt='props' onClick= {this.changeState} ><h4>{this.state.txt}</h4></button><h4 className='col-lg-4 symbol'>{this.state.symbol}</h4>
            </div>
            
        )
    }
}
export default LocateButton;

