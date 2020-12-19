import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";



const AllCourses = () => {

    useEffect(() => {
        fetchAllCourses();
    }, []);

    const [allcourses, setAllCourses] = useState([]);
    const [error, setError] = useState(null);


    const fetchAllCourses = () => {
        fetch('http://localhost:3000/courses')
            .then(res => res.json())
            .then(
                (result) => {
                    setAllCourses(result);
                },
                (error) => {
                    setError(error);
                }
            )
    }
    allcourses.sort(function compare(a, b) {
        var dateA = new Date(a.dates.start_date);
        var dateB = new Date(b.dates.start_date);
        return dateA - dateB;
    }
    );

    allcourses.reverse();

    return (

        <CardDeck >
            <Row>
                {allcourses.map(allcourse => (
                    <Col sm={4}>
                        <Card >
                            <Card.Body>
                                <Card.Title>{allcourse.title}</Card.Title>
                                <Card.Img variant="top" src={allcourse.imagePath} />
                                <Card.Text>
                                    Price: <b>{allcourse.price.normal}€ </b>
                     | Bookable: {(allcourse.open) ? <img src='check.png' alt="true" height="40" width="40" /> : <img src='false.png' alt="false" height="40" width="40" />}
                                    <br></br>
                     Duration: <b> {allcourse.duration}</b>
                                    <br></br>
                     Dates: <b>{new Intl.DateTimeFormat('en-GB').format(new Date(allcourse.dates.start_date))} - {new Intl.DateTimeFormat('en-GB').format(new Date(allcourse.dates.end_date))}</b>
                                </Card.Text>
                                <Link to={`/CourseDetails/${allcourse.id}`}> <Button variant="info" className="float-right">View</Button></Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </CardDeck>
    )


};


export default AllCourses;