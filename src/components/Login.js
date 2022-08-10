import React , {useState} from 'react';
import {Form, FormGroup, FormControl, Button}  from 'react-bootstrap';
// import { useNavigate} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Dashboard from "./Dashboard/Dashboard";
const divStyle = {
    display : 'flex',
    alignItems: 'center',
    alignSelf : 'center',
    paddingLeft: 550,
    marginTop: 15,
    paddingRight: 500,
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: 'rgba(167,199,231)',
};

const panelStyle = {

    backgroundColor: 'rgba(255,255,255,0.9)',
    border: 0,
    paddingLeft: 20,
    paddingRight: 20,
    width: 300,

};

const buttonStyle = {
    marginBottom: 0,
    marginTop: 10,
    backgroundColor: 'rgba(0,71,171)',
    borderRadius: 1,
};

const loginWrapper = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '80vh',
    minWidth: '300px',
    backgroundSize: 'cover',
    justifyContent: 'center',
}



const Login = props => {
    // const history = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
    const users = [{ username: "Nick", password: "test" }];
    const handleSubmit = (e) => {
        e.preventDefault() 
        const account = users.find((user) => user.username === username);
        if (account && account.password === password) {
            console.log("Hello");
            // setauthenticated(true)
            localStorage.setItem("authenticated", true);
            // history('/dashboard');
            // const dash = ;
            // return(<Redirect to="/dashboard"/>);
            props.history.push("/dashboard");
        }
     };
    return(
    <div style={divStyle}>
    <div style={panelStyle}>
        <div style={loginWrapper}>
            <h1 className="App-header">Log In</h1>
            <br/>
        <Form horizontal="true" id="loginForm" onSubmit={handleSubmit}>
            <FormGroup>
                <FormControl type="text" name="Username" value={username} 
                onChange={(e) => setusername(e.target.value)} placeholder="Username"/>
            </FormGroup>
            <br></br>
            <FormGroup>
                <FormControl type="password" name="Password" onChange={(e) => setpassword(e.target.value)} placeholder="Password"/>
            </FormGroup>
            <div>
                <Button type="submit" value="Submit" style={buttonStyle}>Submit</Button>
            </div>
        </Form>
        </div>
    </div>
    </div>
    )
}

export default Login;
