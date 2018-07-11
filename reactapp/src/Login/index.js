import React, { Component } from 'react';
import {BrowserRouter as Router,Redirect,Link,Switch,Route} from 'react-router-dom'
import './login.css';
import { withRouter } from 'react-router'
import Cookies from 'universal-cookie';
  
  class Login extends Component {

      cookies = new Cookies();
      state = {
          jwt_url : 'http://127.0.0.1:8000/api-token-auth/',
          username : "" ,
          password: ""
      }
  
      saveUsername = (event) => {
          const {target : {value}}  = event;
          console.log(value);
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
  
    render() {
        console.log("enterr");
      return (
        <div className="container1">
        <div className="forms">
        <div className="forms1">
             {/* <div className="forms-left"> */}
                 <button className="forms-button">Login</button>
             {/*  </div> 
             <div className="forms-right"> 
                  <button className="forms-button">Sign-Up</button>
             </div> */}
        </div>
        <div className="form-group1"> 
                 <span className="titles1">Username:</span>
                 <input onChange={this.saveUsername} type="text" placeholder="Enter Username" name="uname" required/>
               </div> 
              <div className="form-group1"> 
                 <span className="titles1">Password:</span>
                 <input onChange={this.savePassword} type="password" placeholder="Enter Password" name="psw" required/>
               </div> 
               <div className="form-group2">
              <button onClick={this.submit} className={"btn btn-primary"} type="submit">Login</button>
              </div>
               <div className="form-group1">
              <b>Click here to</b> 
              <Link to="/signup">SignUp</Link>
              </div> 
      </div>
      
  </div>
      );
    }
  }
  export default withRouter(Login);
  
