import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const GeolocationModal = (render) => {
     const [show, setShow] = useState(render);
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Demande de geolocalisation</Modal.Title>
                </Modal.Header>
                <Modal.Body>L'application nécéssite votre geolocalisation. Activez la géolocalisation et rafraichissez la page !</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger " onClick={handleClose}>Fermer</Button>
         
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default GeolocationModal