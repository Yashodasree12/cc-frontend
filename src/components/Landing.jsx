import React, { Component } from 'react';
import './Landing.css';
import logo from './images/logo4.png';
class Landing extends Component {
    constructor(props){
        super(props)

        this.state = {
            filter: 'search',
            search: ''
        }
        this.getFilter=this.getFilter.bind(this);
        this.getSearch=this.getSearch.bind(this);
        this.goSearch=this.goSearch.bind(this);
        this.goViewAll = this.goViewAll.bind(this);
    }

    goViewAll(){
        this.props.history.push('/viewAll');
    }
    getFilter=(event)=>{
        this.setState({filter: event.target.value});
    }
    getSearch=(event)=>{
        this.setState({search: event.target.value});
    }
    goSearch(filter,search){
        this.props.history.push(`/${filter}/${search}`)
    }
    
    render() {
        return (
           <div> 
            <div id="main"></div>
            <div id="overlay"></div>
                <nav className="navbar fixed-top" id="topnav">
                    <img src={logo} alt="FIFA" />
                    
                    <button type="button" className="btn btn-outline-light" id="add" onClick={this.goViewAll}>VIEW ALL</button>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                    <p id="title">ZOOGLE</p>
                    <div className="col-lg-12 card-margin" >
                    <div className="card search-form"id="box-contain">
                    <div className="card-body p-0">
                   
                    <form id="search-form">
                    <div className="row">
                    <div className="col-12">
                    <div className="row no-gutters">
                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                        <select name="filter" className="form-control"
                        value={this.state.filter} onChange={this.getFilter} placeholder="filters">
                            <option value="search" selected></option>
                            <option value="findName">Name</option>
                            <option value="findNation">Country</option>
                            <option value="findClub">Organisation</option>    
                            <option value="findPosition">Designation</option>
                        </select>
                    </div>
                    <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                        <input type="text" placeholder="Search..." className="form-control" id="search" 
                        autocomplete="off"value={this.state.search} onChange={this.getSearch}/>
                    </div>
                    <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                        <button type="submit" className="btn btn-base" onClick={()=>this.goSearch(this.state.filter,this.state.search)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                        className="feather feather-search"><circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                    </div>
                    </div>
                    </div>                   
                    </div>
                    </form>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
              
 
  
            </div>
        );
    }
}



export default Landing;
