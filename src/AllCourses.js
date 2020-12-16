import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import { ListGroup, ListGroupItem, Badge, Navbar, CardGroup } from 'reactstrap';
import CustomNavbar from "./App";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { Markup } from 'interweave';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";




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

        <CardDeck>
            <Row>
                {allcourses.map(allcourse => (
                    <Col sm={4}>
                        <Card >
                            <Card.Body>
                                <Card.Title>{allcourse.title}</Card.Title>
                                <Card.Img variant="top" src={allcourse.imagePath} />
                                <Card.Text>
                                    Price: <b>{allcourse.price.normal}€ </b>
                     | Bookable: {(allcourse.open) ? <img src='check.png' alt="true" height="50" width="50" /> : <img src='false.png' alt="false" height="50" width="50" />}
                                    <br></br>
                     Duration: <b> {allcourse.duration}</b>
                                    <br></br>
                     Dates: {allcourse.dates.start_date}-{allcourse.dates.end_date}
                                </Card.Text>
                                <Link to={`/CourseDetails/${allcourse.id}`}> <Button color="info" className="float-right">View</Button></Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </CardDeck>
    )


};


export default AllCourses;