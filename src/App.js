import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
 
const CustomNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Code.Hub Dashboard</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link href="/allCourses" >Courses</Nav.Link>
                <Nav.Link href="/addCourse">Add new course</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default CustomNavbar;