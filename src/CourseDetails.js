import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomNavbar from "./App";
import Image from 'react-bootstrap/Image';
import { Markup } from 'interweave';
import Instructors from "./Instructors";
import Button from 'react-bootstrap/Button';
import AddCourse from "./addCourse";
import EditCourse from "./EditCourse";
import DeleteCourse from "./DeleteCourse";
import {Router, Route, Link, RouteHandler} from 'react-router';
import Card from 'react-bootstrap/Card';



const CourseDetails = () => {
    let { id } = useParams();
    console.log({ id });
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);


    useEffect(() => {
        fetchCourses();
    }, []);

    const toggleModal = () => {
        setShowModal((showModal) => !showModal);

    };

    const toggleModalDelete = () => {
        setShowModalDelete((showModalDelete) => !showModalDelete);

    };

    const [coursedetails, setCourses] = useState(null);
    const [error, setError] = useState(null);
    const [display, setDisplay] = useState(false);
    const fetchCourses = () => {

        fetch(`http://localhost:3000/courses/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setCourses(result);

                },
                (error) => {
                    setError(error);
                }
            )

    }

    const editcourses = (data, id) => {

        fetch(`http://localhost:3000/courses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => console.log(json))
        console.log(data);

        setCourses(data, id)
        toggleModal()
    }

    const deletecourses = (id) => {
      

        console.log("DELETECOURSESSS!!!!");
    
        fetch(`http://localhost:3000/courses/${id}`, {
            method: 'DELETE'

        })
            .then(res => res.json())
            .then(json => console.log(json))

            
            toggleModalDelete()
           
    }

    if (error) {
        return <div>Error:{error.message}</div>;
    }
    else {
        if (coursedetails === null) {
            return <div> Loading...</div>
        }
        else {

            return (
                <React.Fragment>
                    <div className="customBackground">
                        <CustomNavbar />
                        <Card className="coursecard" style={{ width: '45rem' }}>
                            <h3>{coursedetails.title} ({id})</h3>
                            <Card.Img variant="top" src={coursedetails.imagePath} />
                            <Card.Body>

                                <Card.Text>
                                    <nav className="description">
                                        Price: {coursedetails.price.normal} €
                                     <nav className="float-right">Duration: {coursedetails.duration} </nav>
                                        <br></br>
                                      Bookable: {(coursedetails.open) ? <img src='../check.png' alt="true" height="50" width="50" /> : <img src='../false.png' alt="false" height="50" width="50" />}
                                        <nav className="float-right"> Dates: {coursedetails.dates.start_date} - {coursedetails.dates.end_date}</nav>
                                    </nav>
                                    <Markup content={coursedetails.description} />
                                    <hr></hr>
                                    <h3>Instructors: </h3>
                                    <Instructors ids={coursedetails.instructors} />
                                </Card.Text>

                                <Button variant="primary" outline onClick={toggleModal}>Edit</Button>
                                <Button className="float-right" variant="danger" outline onClick={toggleModalDelete}>Delete</Button>

                            </Card.Body>

                        </Card>
                        <EditCourse
                            showModal={showModal}
                            toggleModal={toggleModal}
                            details={coursedetails}
                            editcourses={editcourses} />

                        <DeleteCourse showModalDelete={showModalDelete}
                            toggleModalDelete={toggleModalDelete}
                            details={coursedetails}
                            deletecourses={deletecourses} 
                            />

                    </div>






                </React.Fragment>

            )
        }
    }


}


export default CourseDetails;