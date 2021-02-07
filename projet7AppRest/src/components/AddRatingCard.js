import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const AddRatingCard = (content) => {
    const [inputRestaurantComment, setinputRestaurantComment] = useState(null);
    const [inputRestaurantStar, setinputRestaurantStar] = useState(null);
    const [validated, setValidated] = useState(false);

    const restaurantListToAnalizes = [useSelector(state => state.restaurantListReducer)]
    const test = restaurantListToAnalizes.find(restaurantListToAnalize => restaurantListToAnalize  === content);

    const dispatch = useDispatch()

    const sendNewRestaurantRatings = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            setValidated(true);

            const newRestaurantRating = {
                stars: inputRestaurantStar.val,
                comment: inputRestaurantComment.val,
                restaurantId: content.restaurantId,
            }
            dispatch({ type: 'SEND_NEW_RATING', payload: { newRestaurantRating } })
            dispatch({ type: 'CLICK_ADD_RATING' })
            dispatch({ type: 'UNSELECT_RESTAURANT'})
        }
    }

    return (
        <Form style={{ backgroundColor: ' rgba(255, 255, 255, 0.781)', padding: '15px', zIndex: '100', marginTop: '25px',  width: '30vh' }} noValidate validated={validated} onSubmit={sendNewRestaurantRatings} >
            <Form.Group >
                <Form.Label>Commentaire</Form.Label>
                <Form.Control required type="text" placeholder="Entrez votre commentaire" onChange={e => setinputRestaurantComment({ val: e.target.value })} rows={5} />

            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Choisissez une note</Form.Label>
                <Form.Control as="select" onChange={e => setinputRestaurantStar({ val: e.target.value })}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </Form.Control>
            </Form.Group>

            <Button type="submit" variant="success">
                Valider
            </Button>
        </Form>
    )
}

export default AddRatingCard