import React from 'react';

function Ratings({ratings}){
console.log (ratings);

//transforme l'obj en array
let ratingArrays = Object.values(ratings);
console.log(ratingArrays[0].stars)
console.log(ratingArrays[0].comment)

    return(
        <div >
       
            <h3> test RatingsComponent </h3>

      </div>
    );
}
export default Ratings;   