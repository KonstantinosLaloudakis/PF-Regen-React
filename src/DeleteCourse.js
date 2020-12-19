import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DeleteCourse = ({ showModalDelete, toggleModalDelete, details, deletecourses }) => {

    return (
        <Modal show={showModalDelete} onHide={toggleModalDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete {details.title} course?
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={toggleModalDelete}>
                    Cancel
                </Button>
                <Link to ="/">
                <Button variant="danger" onClick={() => deletecourses(details.id)}>
                    Delete
                 </Button>
                 </Link>

            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCourse;
