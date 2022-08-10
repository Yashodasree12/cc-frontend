import React, { Component } from 'react';
import axios from 'axios';
import './SearchResults.css';
import ReactPaginate from 'react-paginate';
import './ViewAll.css';


class Books extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filter: this.props.match.params.filter,
            search: this.props.match.params.search,
            books: [],
            offset: 0,
            tableData: [],
            prevpage:0,
            perPage: 10,
            currentPage: 0
        }

        this.findAll = this.findAll.bind(this);
        this.goHome = this.goHome.bind(this);
        this.viewProfile = this.viewProfile.bind(this);

        this.handlePageClick = this.handlePageClick.bind(this);

    }

    /* Pagination component*/
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
    /* Pagination component*/
    loadMoreData() {
        console.log()
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            books: slice
        })

    }


    goHome() {
        this.props.history.push('/home');
    }
    viewProfile(id,x) {
        this.props.history.push(`/profile/${id}/${x}`)
    }
    findAll() {
        return axios.get("http://localhost:8080/api/v1/books");
    }
    getSearch=(event)=>{
        this.setState({search: event.target.value});
    }
    goSearch=(e)=>{
        e.preventDefault();
       this.getURL(this.state.filter,this.state.search).then(res=>{
        var data = res.data;
				
        var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                orgtableData : res.data,
                pageCount: Math.ceil(data.length / this.state.perPage),
                    
                    books:slice
            });
        });
    }

    componentDidMount() {
        this.findAll().then((res) => {
            var data = res.data;

            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                orgtableData: res.data,
                pageCount: Math.ceil(data.length / this.state.perPage),

                books: slice

            })
        });
    }



    render() {
        return (
            <div>
                <div id="bg"></div>
                <nav className="navbar fixed-top" id="topnav">
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
                        <option value="findName">ID</option>
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
                                                                        <h6>BOOK ID</h6>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-title">
                                                                        <h6>BOOK NAME</h6>
                                                                    </div>
                                                                </td>                                                            

                                                                <td>
                                                                    <div className="widget-26-title">
                                                                        <h6>VIEW BOOK</h6>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.books.map(book =>
                                                                <tr key={book.bookId}>
                                                                    <td>
                                                                        <div>
                                                                            <div class=".widget-26-name">
                                                                                <span>{book.bookId}</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <div class=".widget-26-name">
                                                                                <span>{book.bookName}</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <button className="btn btn-outline-info" onClick={() => this.viewProfile(book.id,this.state.prevpage)}></button>
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
                <button type="button" className="btn btn-outline-dark"  id="add">ADD </button>
                &nbsp;
                &nbsp;
                <button type="button" className="btn btn-outline-dark"  id="delete">DELETE</button>
                &nbsp;
                &nbsp;
                <button type="button" className="btn btn-outline-dark"  id="update">UPDATE </button>
                    </div>
                </div>

                {/* Pagination component*/}
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
                </div>
            </div>
        );
    }
}

export default Books;
