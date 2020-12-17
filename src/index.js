import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddCourse from "./addCourse";
import AllCourses from "./AllCourses";
import CustomNavbar from "./App";
import CourseDetails from "./CourseDetails";
import HomePage from "./HomePage";
import "./index.css";


const IndexStructure = () => {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/courses">
                <CustomNavbar />
            </Route>
            <Route exact path="/addCourse">
                <CustomNavbar />
                <AddCourse />
            </Route>
            <Route exact path="/courseDetails/:id">
                <CourseDetails />
            </Route>
            <Route exact path="/Allcourses">
                <CustomNavbar />
                <AllCourses />
            </Route>

        </Switch>

    )
}


ReactDOM.render(<Router> <IndexStructure /> </Router>, document.getElementById("root"));
