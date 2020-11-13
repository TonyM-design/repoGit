import React, { useState } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DisplayApp from './DisplayApp'

function accessGeolocation() {
    if ("geolocation" in navigator) {
        console.log("Geolocation Disponible.");
        return true;
    } else {
        return false;
    }
};

const locateMe = () => {
    if ("geolocation" in navigator) {
        return new Promise((resolve, reject) => {

            navigator.geolocation.getCurrentPosition((position) => {
                const lng = position.coords.longitude;
                const lat = position.coords.latitude
                const newPosition = { lat, lng }

                resolve(newPosition);


            })
        });

    }
    else return false

}

const GeolocationModal = () => {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    function validateGeolocation() {

        accessGeolocation();
        if (locateMe() !== false) {
            handleClose();
            setShow(false);

            <DisplayApp lat={locateMe.lat} lng={locateMe.lng} />

        }
        else {
            alert("geolocalisation obligatoire")
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Demande de geolocalisation</Modal.Title>
                </Modal.Header>
                <Modal.Body>L'application nécéssite votre geolocalisation.</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger " onClick={handleClose}>
                        Ne pas me localiser
          </Button>
                    <Button variant="outline-success" onClick={validateGeolocation}>
                        Me localiser
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default GeolocationModal;
