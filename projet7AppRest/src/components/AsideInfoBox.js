import React from 'react';
import InfoRestaurants from './InfoRestaurant.js';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'



function AsideInfoBox() {
  const restaurantLists = require('../DonneeTest.json');
  
  return (







    <div>
      {restaurantLists.map((restaurantList, i) => {
    return(
      <Accordion defaultActiveKey="0" key={i}>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1">
      <h6>{restaurantList.restaurantName}</h6>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body>          
      <InfoRestaurants restaurantName ={restaurantList.restaurantName} address = {restaurantList.address} ratings = {restaurantList.ratings} key ={ i} ></InfoRestaurants>
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

