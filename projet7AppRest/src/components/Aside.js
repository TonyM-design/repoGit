import React from 'react';
import AsideInfoBox from './AsideInfoBox';



function Aside() {
  return (
    <div className='aside col-lg-3'>
      
        <h3> tittle + logo</h3>
      
      <hr />
      <div className='menu'>
        <AsideInfoBox></AsideInfoBox>
      </div>
    </div>

  )

}

export default Aside;