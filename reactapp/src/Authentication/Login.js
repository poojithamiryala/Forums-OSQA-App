import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom'
import { withRouter } from 'react-router'
import './Login.css';

class Login extends Component{
    cookies = new Cookies();
    state = {
        jwt_url : 'http://127.0.0.1:8000/api-token-auth/',
        username : "" ,
        password: ""
    }

    saveUsername = (event) => {
        const {target : {value}}  = event;
        this.setState({
            username : value
        })
    }

    savePassword = (event) => {
        const {target : {value}} = event;
        this.setState({
            password : value
        })
    }

    submit = (e) => {
        e.preventDefault();
        this.login(this.state)
    }

    logout = (props) =>
    {
        this.cookies.remove('userJwtToken');
        this.cookies.remove('username');
        this.props.updateUsername('');
        this.props.updateStatus(false);
    }
    login = ({username, password}) =>
    {
        console.log(username + " : "+password);
        var formData  = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch(this.state.jwt_url, { 
            method: 'post',
            body: formData, 
          }) .then(function(response) {
            return response.json();
        })
        .then((myJson) => {
            if ('token' in myJson)
            {
                var days = 7;
                var date = new Date();
                var res = date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                // this.cookies.set('userJwtToken', myJson, { path: '/',expires: new Date(Date.now()+2592000)} );
                // this.cookies.set('username',formData.get('username'), {path : '/', expires: new Date(Date.now()+2592000)})
                this.cookies.set('userJwtToken', myJson, { path: '/',expires: new Date(res)} );
                this.cookies.set('username',formData.get('username'), {path : '/', expires: new Date(res)})
                console.log(this.cookies.get('userJwtToken').token);
                this.props.updateUsername(formData.get('username'));
                //this.props.updateStatus(true);
                this.props.history.push('/');
                console.log("Redirecting....")
            }
            else
            {
                alert("Invalid Credentials");
            }
        })
        .catch(e => {console.log("Error occured in fetching students.."+e)});
    }

    render(){
        return (
        <div className="container3">
        <div className="login-form">
        <center><h2>Login Form</h2></center>
        <div className="form-group1">
          <b className="titles1">Name</b>
            <input className="form-control1" type="text" placeholder="Enter Username" 
              onChange={this.saveUsername} required/>
          </div>
          <div className="form-group1">
          <b className="titles1">Password</b>
            <input className="form-control1" type="password" placeholder="Enter Password"
            onChange={this.savePassword} required/>
          </div>
          <div className="form-button1">
          <p></p>
          <button onClick={this.submit} className={"btn btn-primary"} type="submit">Login</button>
          </div>
        {/* <input className="form-login" type="checkbox" checked="checked" name="remember"/> Remember me */}
        </div>
        </div>
        )
    }
}

export default withRouter(Login)