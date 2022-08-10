import React, {useState,useEffect} from 'react';
import Navbar from './Navbar';
import Services from './Services';
import { Navigate } from 'react-router-dom';

const  Dashboard = () => {
    // const [authenticated,setauthenticated]= useState(null);
    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("authenticated");

    //     if(loggedInUser){

    //         setauthenticated(loggedInUser);
    //     }
    // },[]);

    // if(!authenticated){
    //     return <Navigate replace to="/login"/>;
    // }
    // else{
        return(
            <div>
                <Navbar/>
                <Services/>
            </div>
        )
    // }
    
}
export default Dashboard;