import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const GeolocationModal = () => {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    function validateGeolocation() {
        handleClose();
        setShow(false);

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
 export default GeolocationModal