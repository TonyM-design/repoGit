import React from 'react';
import InfoRestaurants from './InfoRestaurant.js';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'



function AsideInfoBox(props) {
  const restaurantLists = props.restaurantLists

  return (
    <div>
      {restaurantLists.map((restaurantList, i) => {
        return (
          <Accordion defaultActiveKey="0" key={i} className='col-lg-12' >
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                <h6>{restaurantList.restaurantName}</h6>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <InfoRestaurants restaurantList={restaurantList} key={i} ></InfoRestaurants>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        );
      }
      )
      }</div>
  )
}

export default AsideInfoBox;

