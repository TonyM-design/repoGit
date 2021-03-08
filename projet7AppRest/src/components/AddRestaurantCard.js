import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddRestaurantCard = (props) => {
    const [inputRestaurantName, setInputRestaurantName] = useState(null);
    const [inputRestaurantAdress, setInputRestaurantAdress] = useState(null);
    const [validated, setValidated] = useState(false);

    const latitude = props.latLng.latitude;
    const longitude = props.latLng.longitude

    const dispatch = useDispatch();

    const sendNewRestaurantProperties = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            setValidated(true);

            const newRestaurantProperties = {
                restaurantName: inputRestaurantName.val,
                adress: inputRestaurantAdress.val,
                lat: latitude,
                long: longitude,
                ratings: [],
            }
            dispatch({ type: 'ADD_ITEM', payload: { newRestaurantProperties } })
            dispatch({ type: 'CLICK_ON_ADD_RESTAURANT' })
        }
    }

    return (
        <Form style={{
            backgroundColor: ' rgba(255, 255, 255, 0.781)', padding: '15px'
        }} noValidate validated={validated} onSubmit={sendNewRestaurantProperties}>
            <Form.Group>
                <Form.Label>Nom</Form.Label>
                <Form.Control required type="text" placeholder="Entrez le nom du restaurant" onChange={e => setInputRestaurantName({ val: e.target.value })} rows={1} />
            </Form.Group>
            <Form.Group >
                <Form.Label>Adresse</Form.Label>
                <Form.Control required type="textarea" placeholder="Entrez l'adresse du restaurant" onChange={e => setInputRestaurantAdress({ val: e.target.value })} rows={2} />
            </Form.Group>
            <Button type="submit" variant="success">
                Valider
</Button>
        </Form>
    )
}

export default AddRestaurantCard