import React, { Component } from 'react';
import './Profile2.css';
import axios from 'axios';
import logo from './images/logo4.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class Profile extends Component {
    constructor(props){
        super(props)

        this.state ={
            input: this.props.match.params.id,
            prevpage:this.props.match.params.prevpage,
            filter: '',
            search: '',
            player:[]
        }
        
        this.goBack=this.goBack.bind(this);
        this.getProfileDetails=this.getProfileDetails.bind(this);
    }
    goBack(){
        console.log(this.state.prevpage);
        if (this.state.prevpage === 1){
      
        this.props.history.push(`/${this.state.filter}/${this.state.search}`)}
        else {
        this.props.history.push(`/viewAll`)}
    }
    getProfileDetails(id){
        return axios.get(`http://localhost:8080/findId/000`);
    }
    componentDidMount(){    
        this.getProfileDetails(this.state.input)
        .then((res) =>{
            this.setState({player : res.data}); 
        });
       
    }

    render() {
        return (
            <div>
                <div id="bg"></div>
                <nav className="navbar fixed-top" id="topnav">
                <img src={logo} alt="FIFA" />
                <h1>Details</h1>
                <button id="close" type="button" onClick={this.goBack}  className="btn btn-outline-light"
                aria-label="Close">GO BACK</button>
                </nav>              
                
                <hr></hr>
                <div className="page-content page-container container" id="page-content">
                <div className="padding">
                <div className="row container d-flex justify-content-center">
            
                <Form>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
                </div>
                </div>
                </div>
                </div>
        );
    }
}

export default Profile;