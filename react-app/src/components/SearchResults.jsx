import React, { Component } from 'react';
import axios from 'axios';
import './SearchResults.css';
import logo from './images/logo4.png';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

function Highlighted({ value, searchTerm, HighlightElement }) {
    if (searchTerm === "") return value;
    const pattern = new RegExp(`(${searchTerm})`, "gi");
    const parts = value.split(pattern);
    const Highlight = styled.span`background-color: yellow; padding: 1.5px;`;
    HighlightElement = Highlight;
    return (
      <>
        {parts.map(part =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <HighlightElement>{part}</HighlightElement>
          ) : (
            part))
        }
      </>
  );}
    
class SearchResults extends Component {
    constructor(props){
        super(props)

        this.state = {
            filter: this.props.match.params.filter,
            search: this.props.match.params.search, 
            players:[],
            offset: 0,
            tableData: [],
            prevpage:1,
            perPage: 5,
            currentPage: 0
        }
        this.getFilter=this.getFilter.bind(this);
        this.getSearch=this.getSearch.bind(this);
        this.getURL=this.getURL.bind(this);
        this.goSearch=this.goSearch.bind(this);
        this.findAll=this.findAll.bind(this);
        this.goHome= this.goHome.bind(this);
        this.viewProfile=this.viewProfile.bind(this);
        
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };
    loadMoreData() {
        console.log()
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			players:slice
		})
	
    }



    goHome(){
        this.props.history.push('/home');
    }
    viewProfile(id,prevpage){
        this.props.history.push(`/profile/${id}/${prevpage}`)
    }
    findAll(){
        return axios.get("http://localhost:8080/findAll");
    }
    getFilter=(event)=>{
        this.setState({filter: event.target.value});
    }
    getSearch=(event)=>{
        this.setState({search: event.target.value});
    }
    getURL(x,y){
        return axios.get(`http://localhost:8080/${x}/${y}`);
    }
    goSearch=(e)=>{
        e.preventDefault();
       this.getURL(this.state.filter,this.state.search).then(res=>{
        var data = res.data;
				
        var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                orgtableData : res.data,
                pageCount: Math.ceil(data.length / this.state.perPage),
                    
                    players:slice
            });
        });
    }
    componentDidMount(){
        this.getURL(this.state.filter,this.state.search)
        .then((res)=>{
            var data = res.data;
				
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                orgtableData : res.data,
                pageCount: Math.ceil(data.length / this.state.perPage),
                    
                    players:slice
                
            });
        });
    }

    render() {
        return (
            <div>
            <div id="bg"></div>
            <nav className="navbar fixed-top" id="topnav">
                <img src={logo} alt="FIFA" />
                <button type="button" className="btn btn-outline-light" onClick={this.goHome} id="add">GO HOME</button>
            </nav>
            <div className="container" id="head">
            <div className="row">
                <div className="col-lg-12 card-margin">
                <div className="card search-form" id="cardSearch">
                <div className="card-body p-0">
                <form id="search-form">
                <div className="row">
                <div className="col-12">
                <div className="row no-gutters">
                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <select name="filter" className="form-select" value={this.state.filter} onChange={this.getFilter}>
                        <option value="search" placeholder="filters">All fields</option>
                        <option value="findName">Name</option>
                        <option value="findNation">Country</option>
                        <option value="findClub">Organisation</option>
                        <option value="findPosition">Designation</option>
                    </select>
                </div>
                <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                    <input type="text" placeholder="Search..." className="form-control" id="search" 
                    autocomplete="off" value={this.state.search} onChange={this.getSearch}/>
                </div>
                <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                    <button type="submit" className="btn btn-base" onClick={this.goSearch}>
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
            <div className="row" id="player-table">
                <div className="col-12">
                <div className="card card-margin">
                <div className="card-body">
                <div className="row search-body">
                <div className="col-lg-12">
                <div className="search-result">
                <div className="result-header">
                <div className="row">
                </div>
                </div>
                <div className="result-body">
                <div className="table-responsive">
                    <table className="table widget-26">
                        <thead>
                            <tr>
                                <td>
                                <div className="widget-26-title">
                                    <h6 >NAME</h6>
                                </div>
                                </td>
                                <td>
                                <div className="widget-26-title">
                                    <h6>AGE</h6>       
                                </div>
                                </td>
                                <td>
                                <div className="widget-26-title">
                                    <h6>COUNTRY</h6>                        
                                </div>
                                </td>
                                <td>
                                <div className="widget-26-title">
                                    <h6>ORGANISATION</h6>  
                                </div>
                                </td>
                                <td>
                                <div className="widget-26-title">
                                    <h6>DESIGNATION</h6>
                                </div>
                                </td>
                                <td>
                                <div className="widget-26-title">
                                        <h6>ACTION</h6>  
                                </div>
                                </td>
                            </tr>   
                        </thead>
                        
                        <tbody>
                        {this.state.players.map(player =>
                            <tr key={player.id}>
                                <td>
                                <div>
                                    <div class=".widget-26-name">       
                                    {(this.state.filter.includes('findName')||this.state.filter.includes('search'))
                                         ?<span><Highlighted value={player.name} searchTerm={this.state.search}/></span>
                                         : <span>{player.name}</span>
                                    }
                                    </div>       
                                </div>
                                </td>
                                <td>
                                <div class="widget-26-category bg-soft-base">
                                    <span>{player.age}</span>
                                </div>
                                </td>
                                <td>
                                <div>
                                    {(this.state.filter.includes('findNation')||this.state.filter.includes('search'))
                                         ?<span><Highlighted value={player.nationality} searchTerm={this.state.search}/></span>
                                         : <span>{player.nationality}</span>
                                    }
                                </div>
                                </td>
                                <td>
                                <div className="column" >
                                    {(this.state.filter.includes('findClub')||this.state.filter.includes('search'))
                                         ?<span><Highlighted value={player.club} searchTerm={this.state.search}/></span>
                                         : <span>{player.club}</span>
                                    }
                                </div>
                                </td>
                                <td>
                                <div class="widget-26-category bg-soft-base">
                                    <span>{player.position}</span>
                                </div>
                                </td>
                                <td>
                                    <button className="btn btn-outline-info" onClick={()=>this.viewProfile(player.id,this.state.prevpage)}>View Details</button>
                                </td>
                               
                            </tr>)
                        }        
                        </tbody>
                        
                    </table>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            </div>

            <ReactPaginate
                    previousLabel={"PREV"}
                    nextLabel={"NEXT"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
            </div>
        );
    }
}

export default SearchResults;
