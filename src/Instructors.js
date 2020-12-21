import React, { useEffect, useState } from "react";

const Instructors = ({ ids }) => {

    useEffect(() => {
        fetchIds();
    }, []);

    const [instructorsArray, setInstructors] = useState([]);
    const [error, setError] = useState(null);
    const fetchIds = () => {
        fetch(`http://localhost:3000/instructors`)
            .then(res => res.json())
            .then(

                (result) => {
                    setInstructors(result);
                },
                (error) => {
                    setError(error);
                }

            )

    }
     
   

    if (error) {
        return <div>Error:{error.message}</div>;
    }
    else {
        if (!instructorsArray.length) { return <div> Loading...</div> }
        else {

            return (

                <div >
                    {instructorsArray.map(instructor => {
                        if (ids.indexOf(instructor.id) > -1) {
                            return (
                                <div key={instructor.id}>
                                    <h3>
                                        {`${instructor.name.first}  ${instructor.name.last} (${instructor.dob})`}
                                    </h3>
                                    <br></br>
                                    <div>
                                        {`Email: `} <a href={instructor.email}>{instructor.email}</a> {` |`}  <a href={instructor.linkedin}>Linkedin</a>
                                        <br></br>
                                        {`${instructor.bio}`}
                                    </div>
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