import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Landing from './components/Landing';
import SearchResults from './components/SearchResults';
import Profile from './components/Profile';
import ViewAllSecurities from './components/ViewAllSecurities';
import ViewAllTrades from './components/ViewAllTrades';
import Dashboard from './components/Dashboard/Dashboard';
import Books from './components/Books';
import Delete from './components/Delete'

import Login from './components/Login';
function App(){
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Switch> http://localhost:3000/
              <Route path="/" exact component={Login}></Route>
              <Route path="/dashboard" component={Dashboard}></Route>
              <Route path="/securities" component={ViewAllSecurities}></Route>
              <Route path="/trades" component={ViewAllTrades}></Route>
              <Route path="/books" component={Books}></Route>
              <Route path="/deletesec" component={Delete}></Route>
            </Switch>
          </div>
        </Router>
      </div>
      );
}

export default App;
