import React from 'react';
import Advice from './Advice';


const AdvicesDisplay = (ratings) => {
    const listAdvices = ratings;
  
    return (
      <div className='advicesBox'>
        {listAdvices.map((listAdvice, i) => (
          <Advice 
            stars={listAdvice.stars}
            comment={listAdvice.comment}
            key={i}
          ></Advice>

          
        ))}

        
      </div>
    );
  };

  export default AdvicesDisplay

