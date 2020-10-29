import React from 'react';
import LocateButton from './AsideButton'
import AsideInfo from './AsideInfo';



function Aside() {
  return (
    <div className='aside col-lg-3'>
      <ul className="nav flex-column">
        <h3> tittle + logo</h3>
        <li className="nav-item">
          <LocateButton txt='Activer la géolocation ?'></LocateButton>
        </li>
      </ul>
      <hr />
      <div className='menu'>
        <p>test</p>
        <AsideInfo></AsideInfo>
      </div>
    </div>

  )

}

export default Aside;