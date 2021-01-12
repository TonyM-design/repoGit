import React, { useState } from 'react';
import Row from 'react-bootstrap/Row'
import AsideInfoBox from './AsideInfoBox';
import { Form, FormLabel } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Component, memo, useCallback, useEffect, useMemo } from "react";
import RangeSlider from './RangeSlider'

function Aside(props) {
  // hook manage Aside
  let [useHideAside, setHideAside] = useState('false');
  const activeHideAside = () => {
    setHideAside(!useHideAside);
  }

  // hook manage Dispatch /// valide
  let [useCheckboxActive, setCheckboxActive] = useState(false);
  const activeCheckbox = () => {
    setCheckboxActive(!useCheckboxActive);
    if (useCheckboxActive === false){
      dispatch({ type: 'ACTIVE_FILTER_BY_STAR' })
    }
    if (useCheckboxActive === true){
      dispatch({ type: 'DISABLE_FILTER_BY_STAR' })
    }
  }
  // recupere l'état dans le reducer 
  const activeStarFilter = useSelector(state => state.activeFilterByStars)
  console.log(activeStarFilter)


  const dispatch = useDispatch();

  const checkboxActiveFilterByStars = () => {
    return (<Form.Check type="checkbox" label="Afficher les meilleurs restaurant" onClick={() => { dispatch({ type: 'ACTIVE_FILTER_BY_STAR' }) }} /> 
)
}


return (
  <div className={useHideAside ? "aside slide-right " : "aside slide-left"} >
    <Row>
      <div className='col-lg-11'>
        <h3 className='menu'> tittle + logo</h3>
      </div>
      <div className=''>
        <h1 className=' chevronAside ' onClick={(activeHideAside)}> {"<"}</h1>
      </div>
      <hr />
      <div className='menu col-lg-11'>
        <div className='starFilter'>
          <hr />  
          <Form.Check type="checkbox" label="Filtrer les restaurants par note" onClick={() => { activeCheckbox() }} />
          <hr />  

          <RangeSlider   />

          <hr />
        </div>
        <AsideInfoBox restaurantLists={props.restaurantLists} ></AsideInfoBox>
      </div>
    </Row>
  </div>
)

}
//  className={useHideAside ? "aside slide-right " : "aside slide-left"}
export default Aside;