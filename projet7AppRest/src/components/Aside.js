import React, { useState } from 'react';
import Row from 'react-bootstrap/Row'
import AsideInfoBox from './AsideInfoBox';



function Aside(props) {
 // hook manage Aside
 let [useHideAside, setHideAside] = useState('false');
 const activeHideAside = () => {
   setHideAside(!useHideAside);
   
 }


 return (
    <div  className={useHideAside ? "aside slide-right " : "aside slide-left"} >
    <Row>
    <div className='col-lg-11'>
    <h3 className='menu'> tittle + logo</h3>
    </div>
    <div className=''>
       <h1 className =' chevronAside ' onClick={activeHideAside}> {"<"}</h1>

    </div>
        
        
        <hr />
      <div className='menu col-lg-11'>
        <AsideInfoBox restaurantLists = {props.restaurantLists} ></AsideInfoBox>
       
      </div> 
   
    </Row>
      
      
    </div>

  )

}

export default Aside;