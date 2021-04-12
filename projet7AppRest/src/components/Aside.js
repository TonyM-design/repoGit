import React, { useState } from 'react';
import AsideInfoBox from './AsideInfoBox';
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import RangeSlider from './RangeSlider'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Aside(props) {
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
    <Container fluid id='App ' >

      <Row>
        <div className="col-xl-3 col-lg-4 col-12 col-md-12" >

          <Row>
            <div className='col-lg-10 col-xl-10 col-md-12 col-sm-12 aside-content '>
              <Row>
                <div className='col-10'>
                  <h3 > tittle + logo</h3>
                </div>

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

            <div className='col-2  d-lg-block d-xl-block display-add-restaurant-btn' >
              <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
              >
                <Button variant="outline-info" onClick={() => activeButton()} className="add-restaurant-btn " > <FontAwesomeIcon icon={faPlus} /></Button>
              </OverlayTrigger>

            </div>
          </Row>
        </div>

      </Row>

    </Container>
  )
}
export default Aside;