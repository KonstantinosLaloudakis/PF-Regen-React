import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import AddCourse from "./addCourse";

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
                <Button variant="danger" onClick={deletecourses(details.id)}>
                    Delete
                 </Button>

            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCourse;
