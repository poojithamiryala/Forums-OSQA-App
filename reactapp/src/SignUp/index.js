import React, { Component } from 'react';
import {BrowserRouter as Router,Redirect,Link,Switch,Route} from 'react-router-dom'
import './SignUp.css';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router'
  
  class SignUp extends Component {
    cookies = new Cookies();
        state = {
          firstname : "" ,
          lastname : "",
          password: "",
          emailid : "",
          username:""
      }

    saveFirstname = (event) => {
        const {target : {value}}  = event;
        console.log(value);
        this.setState({
            firstname : value
        })
    }
    saveUsername = (event) => {
      const {target : {value}}  = event;
      console.log(value);
      this.setState({
          username : value
      })
  }

    saveLastname = (event) => {
      const {target : {value}}  = event;
      console.log(value);
      this.setState({
          lastname : value
      })
  }
  saveEmailId = (event) => {
    const {target : {value}}  = event;
    console.log(value);
    this.setState({
        emailid : value
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
        this.signup(this.state)
    }

    signup = ({username, password}) =>
    {
        fetch("http://127.0.0.1:8000/rest-auth/registration/", { 
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
           },
            body: JSON.stringify({
              "username":this.state.username,
              "password1":this.state.password,
              "password2":this.state.password,
              "email":this.state.emailid,
             }) 
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
                this.cookies.set('username',this.state.username, {path : '/', expires: new Date(res)})
                console.log(this.cookies.get('userJwtToken').token);
                this.props.updateUsername(this.state.username);
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
      return (
          <div className="container1">
              <div className="forms">
              <div className="forms1">
                   {/* <div className="forms-left"> */}
                       <button className="forms-button">SignUp</button>
                   {/*  </div> 
                   <div className="forms-right"> 
                        <button className="forms-button">Sign-Up</button>
                   </div> */}
              </div>
              <div className="form-group1">
                 <input  onChange={this.saveFirstname} type="text" placeholder="Enter FirstName" name="uname" required/>
                 <input  onChange={this.saveLastname} type="text" placeholder="Enter Lastname" name="uname" required/>
              </div>
              <div className="form-group1">
                 <span className="titles1">UserName:</span>
                 <input onChange={this.saveUsername} type="text" placeholder="Enter Email-Id" name="uname" required/>
              </div>
              <div className="form-group1">
                 <span className="titles1">Email Id:</span>
                 <input onChange={this.saveEmailId} type="text" placeholder="Enter Email-Id" name="uname" required/>
              </div>
              <div className="form-group1">
                 <span className="titles1">Password:</span>
                 <input  onChange={this.savePassword} type="text" placeholder="Enter Password" name="uname" required/>
              </div>
              <div className="form-group2">
                    <button onClick={this.submit} className={"btn btn-primary"} type="submit">SignUp</button>
              </div>
            </div>
            
        </div>
      );
    }
  }
  const SignUpForm = () => (
    <form>
              <div className="form-group1">
                 <input className="form-control2" onChange={this.saveFirstname} type="text" placeholder="Enter FirstName" name="uname" required/>
                 <input className="form-control2" onChange={this.saveLastname} type="text" placeholder="Enter Lastname" name="uname" required/>
              </div>
              <div className="form-group1">
                 <span className="titles1">UserName:</span>
                 <input className="form-control1" onChange={this.saveUsername} type="text" placeholder="Enter Email-Id" name="uname" required/>
              </div>
              <div className="form-group1">
                 <span className="titles1">Email Id:</span>
                 <input className="form-control1" onChange={this.saveEmailId} type="text" placeholder="Enter Email-Id" name="uname" required/>
              </div>
              <div className="form-group1">
                 <span className="titles1">Password:</span>
                 <input className="form-control1" onChange={this.savePassword} type="text" placeholder="Enter Password" name="uname" required/>
              </div>
              <div className="form-group2">
                    <button onClick={this.submit} className={"btn btn-primary"} type="submit">SignUp</button>
              </div>
             </form>
  );
  export default withRouter(SignUp);
  
