import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import EditCourse from './EditCourse';
import CourseDetails from './CourseDetails';
import {Link} from 'react-router-dom';



export default class AddCourse extends React.Component {
    
    constructor(props) {

        super(props);
        if( Object.keys(props).length === 0){
        this.state = {

            id: '',
            title: '',
            price: [],
            dates: [],
            duration: '',
            open: false,
            instructors: [],
            description: '',
            imagePath: '',
            books:[]
        };
        this.flag=false;
    }
    else{
        {console.log('sto neo state');}
        this.state = {
            title: props.details.title,
            price: props.details.price,
            dates: props.details.dates,
            duration: props.details.duration,
            open: props.details.open,
            instructors: props.details.instructors,
            description: props.details.description,
            imagePath: props.details.imagePath,
        };
        this.flag=true;
        this.id=props.details.id;
    }
        console.log(this.state);
        
    }

    componentDidMount() {
        fetch('http://localhost:3000/courses')
        .then((response) => response.json())
        .then(courses=> {
            this.setState({ books: courses });
        });
    }

    
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
        console.log(event.target);
    }
    handleCheckbox = (event) => {
        let nam = event.target.name
        let val = event.target.checked;
        this.setState({ [nam]: val });
    }
    handleInstructors = (event) => {
        if (event.target.checked) {
            if (event.target.name === "john") {
                this.state.instructors.push("01");
            }
            if (event.target.name === "yiannis") {
                this.state.instructors.push("02");
            }
        }
        else {
            if (event.target.name === "john") {

                this.state.instructors = this.state.instructors.filter(function (e) { return e !== "01" })
            }
            if (event.target.name === "yiannis") {
                this.state.instructors = this.state.instructors.filter(function (e) { return e !== "02" })
            }
        }

    }
    handleDates = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ dates: { ...this.state.dates, [nam]: val } });
    }
    handlePrice = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ price: { ...this.state.price, [nam]: val } });
    }
    checkInstructor= (id)=>{
        if(this.state.instructors.indexOf(id)>-1){
            return true;
        }
        return false;
    }
    
    
    submit = e => {
        e.preventDefault();
        console.log(this.state.books);
        if( !this.flag){
        console.log(typeof this.state.books[0].id);
        let ids=this.state.books.map(({id}) => Number(id));
        console.log(Math.max(...ids));
        this.state.id=Math.max(...ids)+1;
        console.log(this.state.id);
                fetch("http://localhost:3000/courses/", {
            method: 'POST',
            body: JSON.stringify({
                id:this.state.id,
                title:this.state.title,
                price:this.state.price,
                dates:this.state.dates,
                duration:this.state.duration,
                open:this.state.open,
                instructors:this.state.instructors,
                description:this.state.description,
                imagePath:this.state.imagePath

            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => console.log(json))
    }
    else{
        this.props.editcourses(this.state, this.id)
    }
}
    
    
    /* {
        fetch(`http://localhost:3000/courses/${this.id}`, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => console.log(json))
           
    }} */
    
    render() {
        return (
            <Form onSubmit={this.submit}>
                <Form.Group controlId="Title">
                    <Form.Label>Title:</Form.Label>
                    {console.log("mesa sto title")}
                    <Form.Control type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.myChangeHandler} />

                </Form.Group>

                <Form.Group controlId="Duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" name="duration" placeholder="Duration" value={this.state.duration} onChange={this.myChangeHandler} />
                </Form.Group>

                <Form.Group controlId="Image">
                    <Form.Label>Image path:</Form.Label>
                    <Form.Control type="text" name="imagePath" placeholder="ImagePath" value={this.state.imagePath} onChange={this.myChangeHandler} />
                </Form.Group>

                <Form.Group >
                    <Form.Check type="checkbox" label="Bookable" name="open" onChange={this.handleCheckbox} defaultChecked={this.state.open} />
                </Form.Group>
                <h1>Instructors</h1>

                <Form.Group >
                    <Form.Check type="checkbox" label="John Tsevdos" name="john" onChange={this.handleInstructors} defaultChecked={this.checkInstructor("01")}/>
                </Form.Group>
                <Form.Group >
                    <Form.Check type="checkbox" label="Yiannis Nikolakopoulos" name="yiannis" onChange={this.handleInstructors} defaultChecked={this.checkInstructor("02")}/>
                </Form.Group>

                <hr></hr>
                <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={this.state.description} onChange={this.myChangeHandler} />
                </Form.Group>

                <h1>Dates</h1>
                <Form.Group >
                    <Form.Label>Start date:</Form.Label>
                    <Form.Control type="date" name="start_date" value={this.state.dates.start_date} onChange={this.handleDates} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>End date:</Form.Label>
                    <Form.Control type="date" name="end_date" value={this.state.dates.end_date} onChange={this.handleDates} />
                </Form.Group>
                <h1>Price</h1>
                <Form.Group >
                    <Form.Label>Normal:</Form.Label>
                    <Form.Control type="text" name="normal" value={this.state.price.normal} onChange={this.handlePrice} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Early Bird:</Form.Label>
                    <Form.Control type="text" name="early_bird" value={this.state.price.early_bird} onChange={this.handlePrice} />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                 </Button>
                 
            </Form>
        );
    
    }
}

