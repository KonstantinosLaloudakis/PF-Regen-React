import { Markup } from 'interweave';
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import DeleteCourse from "./DeleteCourse";
import EditCourse from "./EditCourse";
import Instructors from "./Instructors";
 
const CourseDetails = () => {
    let { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);


    useEffect(() => {
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
        fetchCourses();
    }, [id]);

    const toggleModal = () => {
        setShowModal((showModal) => !showModal);

    };

    const toggleModalDelete = () => {
        setShowModalDelete((showModalDelete) => !showModalDelete);

    };

    const [coursedetails, setCourses] = useState(null);
    const [error, setError] = useState(null);
    const [display, setDisplay] = useState(false);

    const editcourses = (data, id) => {

        fetch(`http://localhost:3000/courses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => console.log(json))
        
        setCourses(data, id)
        toggleModal()
    }

    const deletecourses = (id) => {
      

      
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

                        <Card className="coursecard" style={{ width: '45rem'}}   border="secondary">
                            <h3>{coursedetails.title} ({id})</h3>
                            <Card.Img variant="top" src={coursedetails.imagePath} />
                            <Card.Body>
                                    <div className="description">
                                        Price: {coursedetails.price.normal} €
                                     <div className="float-right">Duration: {coursedetails.duration} </div>
                                        <br></br>
                                      Bookable: {(coursedetails.open) ? <img src='../check.png' alt="true" height="50" width="50" /> : <img src='../false.png' alt="false" height="50" width="50" />}
                                        <div className="float-right"> Dates: {new Intl.DateTimeFormat('en-GB').format(new Date(coursedetails.dates.start_date))}  -  {new Intl.DateTimeFormat('en-GB').format(new Date(coursedetails.dates.end_date))}</div>
                                    </div>
                                    <Markup content={coursedetails.description} />
                                    <hr></hr>
                                    <h3>Instructors: </h3>
                                    <Instructors ids={coursedetails.instructors} />
                               
                                <Button variant="primary"  onClick={toggleModal}>Edit</Button>
                                <Button className="float-right" variant="danger" onClick={toggleModalDelete}>Delete</Button>

                            </Card.Body>
                        </Card>
                        <br/>

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