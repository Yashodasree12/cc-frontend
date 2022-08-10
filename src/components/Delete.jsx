import React, { Component } from 'react';
import './Profile2.css';
import axios from 'axios';
import logo from './images/logo4.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class Delete extends Component {
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
        this.deleteSecurity=this.getProfileDetails.bind(this);
    }
    goBack(){
        console.log(this.state.prevpage);
        if (this.state.prevpage === 1){
      
        this.props.history.push(`/${this.state.filter}/${this.state.search}`)}
        else {
        this.props.history.push(`/viewAll`)}
    }
    deleteSecurity(id){
        return axios.delete(`http://localhost:8080/security/{id}`);
    }
    // componentDidMount(){    
    //     this.getProfileDetails(this.state.input)
    //     .then((res) =>{
    //         this.setState({player : res.data}); 
    //     });
       
    // }

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
            
                <Form onhandle={this.deleteSecurity}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter the Id </Form.Label>
                        <Form.Control type="id" placeholder="id" />
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

export default Delete;