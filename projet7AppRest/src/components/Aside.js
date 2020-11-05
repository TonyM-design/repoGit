import React from 'react';
import AsideInfo from './AsideInfo';



function Aside() {
  return (
    <div className='aside col-lg-3'>
      
        <h3> tittle + logo</h3>
      
      <hr />
      <div className='menu'>
        <AsideInfo></AsideInfo>
      </div>
    </div>

  )

}

export default Aside;