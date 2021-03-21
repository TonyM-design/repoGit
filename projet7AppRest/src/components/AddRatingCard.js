import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AddRatingCard = (content) => {
    const { selectedRestaurant } = useSelector(state => state.selectedRestaurant)
    //  end manage form 
    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        comment: Yup.string()
            .min(10, "*Un commentaire doit comporter au moins dix caractères")
            .required("*Un commentaire est obligatoire"),
        rating: Yup.string()
            .required("*Une note est obligatoire"),
    });

    return (
        <Formik initialValues={{ comment: "", rating: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                const newRestaurantRating = {
                    comment: values.comment,
                    stars: parseInt(values.rating),
                    restaurantName: selectedRestaurant.restaurantName,
                }
                dispatch({ type: 'SEND_NEW_RATING', payload: { newRestaurantRating } })
                dispatch({ type: 'CLICK_ADD_RATING' })
                dispatch({ type: 'UNSELECT_RESTAURANT' })
            }}
        >

            {({ values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
                <Form onSubmit={handleSubmit} className="mx-auto" style={{ position: 'absolute', backgroundColor: ' rgba(255, 255, 255, 0.781)', marginTop: '40px', marginLeft: '20px', padding: '15px', zIndex: '100', borderRadius: '5px', width: '30vh' }}>
                    <Form.Group controlId="formComment">
                        <Form.Label>Commentaire :</Form.Label>
                        <Form.Control
                            type="text"
                            name="comment"
                            placeholder="Commentaire"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.comment}
                            className={touched.comment && errors.comment ? "has-error" : null}
                        />
                        {touched.comment && errors.comment ? (
                            <div className="error-message">{errors.comment}</div>
                        ) : null}
                    </Form.Group>

                    <Form.Group controlId="formRating">
                        <Form.Label>Choisissez une note :</Form.Label>
                        <Form.Control as ='select'
                            type="select"
                            name="rating"
                            placeholder="Selectionnez une note "
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rating}
                            className={touched.rating && errors.rating ? "has-error" : null}
                        >
                           <option value="">Selectionnez une note</option>
                            <option value={'1'}>1</option>
                            <option value={'2'}>2</option>
                            <option value={'3'}>3</option>
                            <option value={'4'}>4</option>
                            <option value={'5'}>5</option>
                        </Form.Control>
                        {touched.rating && errors.rating ? (
                            <div className="error-message">{errors.rating}</div>
                        ) : null}
                    </Form.Group>


                    {/*Submit button that is disabled after button is clicked/form is in the process of submitting*/}
                    <Button variant="info" type="submit" disabled={isSubmitting}>
                        Valider
          </Button>
                </Form>
            )}
        </Formik>
    )
}
export default AddRatingCard