import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddRestaurantCard = (props) => {
    const [inputRestaurantName, setInputRestaurantName] = useState(null);
    const [inputRestaurantAdress, setInputRestaurantAdress] = useState(null);

    const latitude = props.latLng.latitude;
    const longitude = props.latLng.longitude

    const dispatch = useDispatch();
    // hooks manage addRestaurantButton 
    const sendNewRestaurantProperties = () => {
        const newRestaurantProperties = {
            restaurantName: inputRestaurantName.val,
            adress: inputRestaurantAdress.val,
            lat: latitude,
            long: longitude,
            ratings: [],
        }
        dispatch({ type: 'ADD_ITEM', payload: {newRestaurantProperties} })
        dispatch({ type: 'SEND_NEW_RESTAURANT', payload: {newRestaurantProperties} })

    }

    const formValidation = () => {
       if (inputRestaurantName && inputRestaurantAdress !== null ){
           return false
       }
       else return true
    }

    return (
        <Form style={{
            backgroundColor: ' rgba(255, 255, 255, 0.781)', padding: '15px'
        }} >
            <Form.Group >
                <Form.Label>Nom</Form.Label>
                <Form.Control as="textarea" required placeholder="Entrez le nom du restaurant" onChange={e => setInputRestaurantName({ val: e.target.value })} rows={1} />

            </Form.Group>

            <Form.Group >
                <Form.Label>Adresse</Form.Label>
                <Form.Control as="textarea" required placeholder="Entrez l'adresse du restaurant"  onChange={e => setInputRestaurantAdress({ val: e.target.value })}  rows={2} />
            </Form.Group>

            <Button  variant="success" disabled= {formValidation ? false : true} onClick={sendNewRestaurantProperties}>
                Submit
</Button>
        </Form>
    )
}

export default AddRestaurantCard