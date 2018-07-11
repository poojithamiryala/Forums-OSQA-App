import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Markmirror from 'react-markmirror';
import ReactQuill from 'react-quill';
import Header from './Header';
import 'react-quill/dist/quill.snow.css';
import Cookies from 'universal-cookie';


class App extends Component {
  state = {
    title : "OSQA",
    isAuthenticated : false,
    username:'',
    tabname:'newest',
  }
  cookies = new Cookies();
  
  updateTitle = (title) => {
    this.setState({title});
  }
  
  updateLoginStatus = (isAuthenticated) => {
    this.setState({isAuthenticated})
  }

  updateUsername = (username) => {
    this.setState({username})
  }

  updateTab = (tabname) => {
    this.setState({tabname})
  }


  render() {
    this.state.isAuthenticated=(this.cookies.get('username') && this.cookies.get('username')!='')?true:false;
    this.state.username=this.cookies.get('username');
    console.log(this.state.username);
    console.log(this.state.isAuthenticated);
    return (
      <div>
        <header>
        <Header title="Mentor App" 
            isAuthenticated={this.state.isAuthenticated}
            username={this.state.username} 
            tabname={this.state.tabname}
            updateUsername={this.updateUsername} 
            updateStatus={this.updateLoginStatus} 
            updateTab={this.updateTab}/>
        </header>
      </div>
    );
  }
}



export default App;
