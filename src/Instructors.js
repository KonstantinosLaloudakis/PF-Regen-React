import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomNavbar from "./App";
import Image from 'react-bootstrap/Image';
import { Markup } from 'interweave';

const Instructors = ({ ids }) => {

    useEffect(() => {
        fetchIds();
    }, []);

    const [instructorsArray, setInstructors] = useState([]);
    //let instructorsArray = [];
    const [error, setError] = useState(null);
    const fetchIds = () => {
        fetch(`http://localhost:3000/instructors`)
            .then(res => res.json())
            .then(

                (result) => {
                    setInstructors(result);
                    /* (result) => {
                      instructorsArray.push(result)   */
                },
                (error) => {
                    setError(error);
                }

            )

    }
    console.log(instructorsArray);
    instructorsArray.map(instructor => {
        if (ids.indexOf(instructor.id) > -1) {
            console.log(instructor.id);
        }
    })

    if (error) {
        return <div>Error:{error.message}</div>;
    }
    else {
        if (!instructorsArray.length) { return <div> Loading...</div> }
        else {

            console.log(instructorsArray);

            return (

                <div>
                    {instructorsArray.map(instructor => {
                        if (ids.indexOf(instructor.id) > -1) {
                            return (
                                <div>
                                    <h3>
                                        {`${instructor.name.first}  ${instructor.name.last} (${instructor.dob})`}
                                    </h3>
                                    <br></br>
                                    <p>
                                        {`Email: `} <a href={instructor.email}>{instructor.email}</a> {` |`}  <a href={instructor.linkedin}>Linkedin</a>
                                        <br></br>
                                        {`${instructor.bio}`}
                                    </p>

                                </div>
                            )
                        }
                    })
                    }
                </div>
            )

        }
    }
}

export default Instructors;