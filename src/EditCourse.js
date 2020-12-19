import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddCourse from "./addCourse";

const EditCourse = ({ showModal, toggleModal, details, editcourses }) => {

    return (
        <Modal show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title>{`Edit Course: ${details.title}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddCourse details={details} editcourses={editcourses} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditCourse;
