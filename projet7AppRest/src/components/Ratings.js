import React from 'react';


function Ratings(props) {
    console.log('je suis le test de RatingsNew/ Ratings')
    console.log(this.props)
      return(
          <div  className ='advise'>
            <p> note: {props.stars}</p>
            <p> commentaire: {props.comment} </p>
          </div>
         
      );
      


    }


export default Ratings