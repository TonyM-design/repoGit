import React from 'react';

function Ratings(props){
const ratingObjects = props;
console.log (ratingObjects);

//transforme l'obj en array
let ratingArrays = Object.values(ratingObjects);
console.log(ratingArrays[0].stars)
console.log(ratingArrays[0].comment)

    return(
        <div >
       
            <h3> test RatingsComponent </h3>

      </div>
    );
}
export default Ratings;   