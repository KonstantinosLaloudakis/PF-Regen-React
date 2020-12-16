import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import CustomNavbar from "./App";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Col from 'react-bootstrap/Col';


const HomePage = () => {


    return (

        <div >
            <CustomNavbar />
            <CustomJumbotron />
            <CustomList />
            <CustomTableCourses />


        </div>
    )
}

const CustomJumbotron = () => {
    return (
        <Jumbotron fluid>
            <h1>Welcome to Code.Hub Dashboard</h1>
            <p>Manage everything and have fun!</p>
        </Jumbotron>
    );
};

const CustomList = () => {

    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    const fetchItems = () => {
        fetch('http://localhost:3000/stats')
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                },
                (error) => {
                    setError(error);
                }
            )
    }

    return (
        <ListGroup horizontal>
            {items.map(item =>
                (
                    <Col sm={3}>
                        <ListGroupItem>
                            {item.title} : <Badge pill> {item.amount}</Badge>

                        </ListGroupItem>
                    </Col>
                ))
            }
        </ListGroup>
    );
};

const CustomTableCourses = () => {

    useEffect(() => {
        fetchCourses();
    }, []);

    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);


    const fetchCourses = () => {
        fetch('http://localhost:3000/courses')
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
    courses.sort(function compare(a, b) {
        var dateA = new Date(a.dates.start_date);
        var dateB = new Date(b.dates.start_date);
        return dateA - dateB;
    }
    );

    courses.reverse();

    return (
        <Table>
            <thead>
                <tr>
                    <th colSpan="4">Last 5 courses</th>
                </tr>
                <tr>
                    <th>Title</th>
                    <th>Bookable</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {courses.slice(0,5).map(course => (
                    <tr>
                        <td>{course.title}</td>
                        {console.log(course)}
                        <td>{(course.open) ? <img src='check.png' alt="true" height="50" width="50" /> : <img src='false.png' alt="false" height="50" width="50" />}</td>
                        <td>{course.price.normal}€</td>
                        <td>{course.dates.start_date}  -  {course.dates.end_date}</td>
                        <td><Link to={`/CourseDetails/${course.id}`}><Button color="info">View details</Button> </Link></td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={5}><Link to={"/AllCourses"}> <Button color="info" className="float-right">View all</Button></Link> </td>
                </tr>
            </tbody>

        </Table>
    )


};
export default HomePage;