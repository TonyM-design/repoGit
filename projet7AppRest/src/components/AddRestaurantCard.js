import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AddRestaurantCard = (props) => {
  const latitude = props.latLng.latitude;
  const longitude = props.latLng.longitude
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "*Un nom doit comporter au moins deux caractères")
      .required("*Un nom est obligatoire"),
    adress: Yup.string()
      .min(2, "*Une adresse doit comporter au moins deux caractères")
      .required("*Une adresse est obligatoire"),
  });

  return (
    <Formik initialValues={{ name: "", adress: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const newRestaurant = {
          restaurantName: values.name,
          adress: values.adress,
          lat: latitude,
          long: longitude,
          ratings: [],
        }
        dispatch({ type: 'ADD_ITEM', payload: { newRestaurant } })
        dispatch({ type: 'CLICK_ON_ADD_RESTAURANT' })
        setSubmitting(false);
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
        <Form onSubmit={handleSubmit} className="mx-auto" style={{ position: 'absolute', backgroundColor: ' rgba(255, 255, 255, 0.781)', marginTop: '40px', marginLeft: '20px', padding: '15px', zIndex: '100', borderRadius: '5px', width: '40vh' }}>
          <Form.Group controlId="formName">
            <Form.Label>Nom du restaurant :</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Nom du restaurant"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className={touched.name && errors.name ? "has-error" : null}
            />
            {touched.name && errors.name ? (
              <div className="error-message">{errors.name}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formAdress">
            <Form.Label>Adresse:</Form.Label>
            <Form.Control
              type="text"
              name="adress"
              placeholder="Adresse"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.adress}
              className={touched.adress && errors.adress ? "has-error" : null}
            />
            {touched.adress && errors.adress ? (
              <div className="error-message">{errors.adress}</div>
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

export default AddRestaurantCard