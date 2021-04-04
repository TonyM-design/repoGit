import React from 'react';


function Ratings(props) {
      return(
          <div  className ='advise'>
            <p> note: {props.stars}</p>
            <p> commentaire: {props.comment} </p>
          </div>
         
      );
    }


export default Ratings