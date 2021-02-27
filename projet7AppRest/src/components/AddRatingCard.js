import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback'


const AddRatingCard = (content) => {
    const { selectedRestaurant } = useSelector(state => state.selectedRestaurant)

    // manage form 
    const [inputRestaurantComment, setinputRestaurantComment] = useState(null);
    const [inputRestaurantStar, setinputRestaurantStar] = useState(null);
    const [validated, setValidated] = useState(false);
    //  end manage form 
    const dispatch = useDispatch()

    const sendNewRestaurantRatings = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            setValidated(true);

            const newRestaurantRating = {
                stars: parseInt(inputRestaurantStar.val),
                comment: inputRestaurantComment.val,
                restaurantName: selectedRestaurant.restaurantName,
            }
            dispatch({ type: 'SEND_NEW_RATING', payload: { newRestaurantRating } })
            dispatch({ type: 'CLICK_ADD_RATING' })
            dispatch({ type: 'UNSELECT_RESTAURANT' })
        }
    }
    //

    return (
        <Form style={{ position: 'absolute', backgroundColor: ' rgba(255, 255, 255, 0.781)', marginTop: '40px', marginLeft: '20px', padding: '15px', zIndex: '100', borderRadius: '5px', width: '30vh' }} noValidate validated={validated} onSubmit={sendNewRestaurantRatings} >
            <Form.Group >
                <Form.Label>Commentaire</Form.Label>
                <Form.Control required type="text" placeholder="Entrez votre commentaire"  rows={5}  onChange={e => setinputRestaurantComment({ val: e.target.value })}  />
                <Form.Control.Feedback type="invalid">
                    <Feedback>Veuillez entrer un commentaire.</Feedback>
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Choisissez une note</Form.Label>
                <Form.Control required as="select" type="select" onChange={e => setinputRestaurantStar({ val: e.target.value })}>
                    <option value="">Selectionnez une note</option>
                    <option value={'1'}>1</option>
                    <option value={'2'}>2</option>
                    <option value={'3'}>3</option>
                    <option value={'4'}>4</option>
                    <option value={'5'}>5</option>
                </Form.Control>
            </Form.Group>

            <Button type="submit" variant="success">
                Valider
            </Button>
        </Form>
    )
}

export default AddRatingCard