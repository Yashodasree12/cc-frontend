import React, { Component } from 'react';
import axios from 'axios';
import './SearchResults.css';
import ReactPaginate from 'react-paginate';
import './ViewAll.css';


class ViewAllSecurities extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filter: this.props.match.params.filter,
            search: this.props.match.params.search,
            securities: [],
            tableData: [],
        }

        this.findAll = this.findAll.bind(this);
        this.createSecurity = this.createSecurity.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
        this.deleteSecurity = this.deleteSecurity.bind(this);
    }


    createSecurity() {
        this.props.history.push('/profile');
    }
    viewProfile(id,x) {
        this.props.history.push(`/profile/${id}/${x}`)
    }
    findAll() {
        return axios.get("https://db-grads-173c-group-22.nw.r.appspot.com/api/v1/security");
    }
    getSearch=(event)=>{
        this.setState({search: event.target.value});
    }
    getURL(x,y){
        y = Number.parseInt(y);
        return axios.get(`https://db-grads-173c-group-22.nw.r.appspot.com/api/v1/security/${y}`);
    }
    goSearch=(e)=>{
       e.preventDefault();
       this.getURL(this.state.filter,this.state.search).then(res=>{
        var data = res.data;		
            this.setState({
                securities: res.data,
            });
        });
    }

    componentDidMount() {
        this.findAll().then((res) => {
            var data = res.data;

            this.setState({
                securities: res.data,

            })
        });
    }

    deleteSecurity(){
        this.props.history.push('/deletesec');
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
                <div className="col-lg-9 col-md-9 col-sm-12 p-0">
                    <input type="text" placeholder="Search securty by ID" className="form-control" id="search" 
                    autocomplete="off" value={this.state.search} onChange={this.getSearch}/>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
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
                                                                        <h6>ID</h6>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-title">
                                                                        <h6>ISSUER {/*Coupoun*/}</h6>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-title">
                                                                        <h6>MATURITY DATE</h6>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-title">
                                                                        <h6>INTEREST</h6>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-title">
                                                                        <h6>TYPE</h6>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-title">
                                                                        <h6>FACE VALUE</h6>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-title">
                                                                        <h6>STATUS</h6>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-title">
                                                                        <h6>ACTION REQUIRED</h6>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.securities.map(security =>
                                                                <tr key={security.id}>
                                                                    <td>
                                                                        <div>
                                                                            <div class=".widget-26-name">
                                                                                <span>{security.securityId}</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <div class=".widget-26-name">
                                                                                <span>{security.issuer}</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-category bg-soft-base">
                                                                            <span>{security.maturityDate}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div >
                                                                            <span>{security.coupon}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="column" >
                                                                            <span>{security.type}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-category bg-soft-base">
                                                                            <span>{security.faceValue}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-category bg-soft-base">
                                                                            <span>{security.status}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <button className="btn btn-outline-info" onClick={() => this.viewProfile(security.id,this.state.prevpage)}></button>
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
                <button type="button" className="btn btn-outline-dark" onClick={this.createSecurity} id="add">ADD SECURITY</button>
                &nbsp;
                &nbsp;
                <button type="button" className="btn btn-outline-dark" onClick={this.deleteSecurity} id="delete">DELETE</button>
                &nbsp;
                &nbsp;
                <button type="button" className="btn btn-outline-dark"  id="update">UPDATE</button>
                </div>
            </div>
        );
    }
}

export default ViewAllSecurities;
