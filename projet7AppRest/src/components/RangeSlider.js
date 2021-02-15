import React, { useEffect, useState } from "react";
import {Range} from 'rc-slider';
import { useSelector, useDispatch } from 'react-redux';
import 'rc-slider/assets/index.css'
import filterByStarReducer from "../reducers/filterByStarReducer";


const RangeSlider = (props) => {
  const dispatch = useDispatch();


  // recupere l'état de la checkBox dans le reducer 
    const activeStarFilter = useSelector(state => state.activeFilterByStars)

  function log(value) {
    setcurrentRange(value)
    const minValue= value[0]
    const maxValue= value[1]
    dispatch({ type: 'APPLY_NEW_RANGE', payload: {min:minValue, max: maxValue} });

  }

  const [currentRange, setcurrentRange] = useState({ minValue: 1, maxValue: 5 }); // état initial

  const [checkboxIsActive, setCheckboxIsActive] = useState(activeStarFilter.activeFilterByStars) // valide et synchro à l'initialisation
  
  useEffect(() => {
    
      setCheckboxIsActive(activeStarFilter.activeFilterByStars ? false : true);

  })


    return (
      <div className="range-slider">
       <Range disabled= {checkboxIsActive} min={1} max={5} dots step={1} defaultValue={[1, 5]} tipFormatter={value => `${value}%`} onAfterChange={log} />
 </div>
    );
  }

  export default RangeSlider;