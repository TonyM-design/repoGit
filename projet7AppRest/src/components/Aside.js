import React, { useState, useEffect } from 'react';
import AsideInfoBox from './AsideInfoBox';
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import RangeSlider from './RangeSlider'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

function Aside(props) {
  // hook manage Aside
  let [useHideAside, setHideAside] = useState('false');
  const activeHideAside = () => {
    setHideAside(!useHideAside);
  }

  // hook manage Dispatch 
  let [useCheckboxActive, setCheckboxActive] = useState(false);
  const activeCheckbox = () => {
    setCheckboxActive(!useCheckboxActive);
    if (useCheckboxActive === false) {
      dispatch({ type: 'ACTIVE_FILTER_BY_STAR' })
    }
    if (useCheckboxActive === true) {
      dispatch({ type: 'DISABLE_FILTER_BY_STAR' })
    }
  }

  const activeStarFilter = useSelector(state => state.activeFilterByStars)
  console.log(activeStarFilter)

  const dispatch = useDispatch();
  const activeButton = () => {
    dispatch({ type: 'CLICK_ON_ADD_RESTAURANT' })
  }

  

//POP ON HOVER ADD RESTAURANT BUTTON
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Ajouter un restaurant
    </Tooltip>
  );


  return (
    <Container fluid id='App' >

      <Row>

        <div className={useHideAside ? " slide-right col-3  " : " slide-left col-3 "} >
          <div className='col-lg-12   '>
          <Row>
            <div className='col-lg-10 aside '>
              <Row>
                <div className='col-lg-10'>
                  <h3 > tittle + logo</h3>
                </div>

                <div className='col-lg-1'><h3 className='chevronAside' onClick={(activeHideAside)}> {<FontAwesomeIcon icon={faAngleLeft} size="lg" />}</h3> </div><hr />
              </Row>

              <div className='starFilter col-12'>
                <hr />
                <Form.Check type="checkbox" label="Filtrer les restaurants par note" onClick={() => { activeCheckbox() }} />
                <hr />
                <RangeSlider />
                <hr />
              </div>
              <AsideInfoBox restaurantLists={props.restaurantLists} ></AsideInfoBox>
            </div>
            <div className='col-2' >
              <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
              >
                <Button variant="outline-info" onClick={() => activeButton() } > <FontAwesomeIcon icon={faPlus}/></Button>
              </OverlayTrigger>

            </div>
</Row>
          </div>
        </div>
      </Row>

    </Container>
  )
}
//  className={useHideAside ? "aside slide-right " : "aside slide-left"}
export default Aside;