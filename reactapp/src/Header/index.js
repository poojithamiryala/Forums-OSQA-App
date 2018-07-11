import React, { Component } from 'react'
import world from './world.svg';
import search from './search.svg';
import srh from './srh.svg';
import './Header.css';
import Login from '../Login'
import AddPost from '../AddPost'
import SignUp from '../SignUp'
import QuestionsList from '../Questions'
import {BrowserRouter as Router,Redirect,Link,Switch,Route} from 'react-router-dom'
import TagListContainer from '../Tag';
import QuestionListContainer from '../TagQuestion';
import QuestionsComment from '../QuestionsComment';
import QuestionsEdit from '../QuestionsEdit';
import Search from '../Search';
import Cookies from 'universal-cookie';
class Header extends Component{
  cookies = new Cookies();
    constructor(props) {
        super(props);
        this.toggleClass= this.toggleClass.bind(this);
        this.state = {
          c1: '',
          c2: '',
          c3: '',
          c4:'',
          c5:'',
          c6:'',
          search:''
        }
        console.log(window.location.href.endsWith('a'));
    }
    toggleClass(index, e) {
      if(e===1)
        {
          this.setState({ c1: index });
          this.setState({ c2: '' });
          this.setState({ c3: '' });
          this.setState({ c4: '' });
        this.setState({ c5: '' });
        this.setState({ c6: '' });
        }
        if(e===2)
        {
        this.setState({ c2: index });
        this.setState({ c1: '' });
        this.setState({ c3: '' });
        this.setState({ c4: '' });
        this.setState({ c5: '' });
        this.setState({ c6: '' });
        }
        if(e===3)
        {
        this.setState({ c3: index });
        this.setState({ c1: '' });
        this.setState({ c2: '' });
        this.setState({ c4: '' });
        this.setState({ c5: '' });
        this.setState({ c6: '' });
        }
        if(e===4)
        {
          this.setState({ c1: '' });
          this.setState({ c2: '' });
          this.setState({ c3: '' });
        this.setState({ c4: index });
        this.setState({ c5: '' });
        this.setState({ c6: '' });
        }
        if(e===5)
        {
        this.setState({ c5: index });
        this.setState({ c4: '' });
        this.setState({ c6: '' });
        this.setState({ c1: '' });
          this.setState({ c2: '' });
          this.setState({ c3: '' });
        }
        if(e===6)
        {
          this.setState({ c1: '' });
          this.setState({ c2: '' });
          this.setState({ c3: '' });
        this.setState({ c6: index });
        this.setState({ c4: '' });
        this.setState({ c5: '' });
        }
  };
  componentWillMount()
  {
    if(window.location.href.indexOf('/questions')>=0)
        {
          this.setState({c1:1});
        }
        else if(window.location.href.indexOf('/tags')>=0)
        {
          this.setState({c2:2});
        }
        else if(window.location.href.indexOf('/unanswered')>=0)
        {
          this.setState({c3:3});
        }
        else if(window.location.href.indexOf('/login')>=0)
        {
          this.setState({ c4: 4 });
        }
        else if(window.location.href.indexOf('/about')>=0)
        {
          this.setState({ c5: 5 });
        }
        else if(window.location.href.indexOf('/faq')>=0)
        {
          this.setState({ c6: 6 });
        }

  }
  logout = (props) =>
      {
          this.cookies.remove('userJwtToken');
          this.cookies.remove('username');
          this.props.updateUsername('');
          this.props.updateStatus(false);
      }
      saveSearch = (event) => {
        const {target : {value}}  = event;
        console.log(value);
        this.setState({
            search : value
        })
    }
    render(){
        return (
          <Router>
            <div>
            <div className="w3-top">
            <div className="w3-bar w3-white w3-padding w3-card">
            <div className="w3-left">
              <a href="#home" className="w3-bar-item w3-button">OSQA</a>
               <div className="search-container">
                 <input type="text"  onChange={this.saveSearch} placeholder="Search.." name="search"/>
                 {/* <Link to={"/questions/search/"+this.state.search}><img src={search} alt="logo" /></Link> */}
                 <Link to={"/questions/search/"+this.state.search}><img src={srh} alt="logo" /></Link> 
              </div> 
            </div>
              <div className="w3-right w3-hide-small">
                <Link to={(this.cookies.get('username') && this.cookies.get('username')!='') ?
                                        "/user/"+this.cookies.get('username') : "/login"
                                        } className={"w3-bar-item w3-button "+(this.state.c4!=""?"active":"")} onClick={(e) => this.toggleClass(e,4)}>
                                        { this.props.isAuthenticated?this.cookies.get('username') : "Login"}
                                        </Link>
                {
                  this.cookies.get('username') && this.cookies.get('username')!='' 
                  ?<button className="w3-bar-item w3-button" onClick={this.logout}>Logout</button>
                  :""
                }
                <Link to="/about" className={"w3-bar-item w3-button "+(this.state.c5!=""?"active":"")} onClick={(e) => this.toggleClass(e,5)}>About</Link>
                <Link to="/faq" className={"w3-bar-item w3-button "+(this.state.c6!=""?"active":"")} onClick={(e) => this.toggleClass(e,6)}>Faq</Link>
              </div>
            </div>
          </div>
          <div className="left-container">
          <p><img src={world}></img><b>OSQA</b></p>
          <ul>
            <li><Link to="/questions" className={this.state.c1!=""?"active":null} onClick={(e) => this.toggleClass(e,1)}>Questions</Link></li>
            <li><Link to="/tags" className={this.state.c2!=""?"active":null} onClick={(e) => this.toggleClass(e,2)}>Tags</Link></li>
            <li><Link to="/questions/unanswered" className={this.state.c3!=""?"active":null} onClick={(e) => this.toggleClass(e,3)}>Unanswered</Link></li>
          </ul> 
          </div>
          <div>
          <Switch>
                            <Route exact path="/login" render={(props) =>
                                <Login 
                                    isAuthenticated={this.props.isAuthenticated}
                                    username={this.props.username} 
                                    updateUsername={this.props.updateUsername} 
                                    updateStatus={this.props.updateLoginStatus}/>
                                }/>
                            <Route exact path="/questions/ask" render={(props) =>
                               (this.cookies.get('username') && this.cookies.get('username')!='')? <AddPost/>:<Redirect to="/login"/>
                                }/>
                                 <Route exact path="/signup" render={(props) =>
                               <SignUp isAuthenticated={this.props.isAuthenticated}
                               username={this.props.username} 
                               updateUsername={this.props.updateUsername} 
                               updateStatus={this.props.updateLoginStatus}/>
                                }/>
                                <Route exact path="/questions" render={(props)=>
                                (this.cookies.get('username') && this.cookies.get('username')!='')?
                                    <QuestionsList key={this.props.tabname} tabname={this.props.tabname}/> 
                                     :<Redirect to="/login"/>
                                }/>
                                <Route exact path="/questions/search/:title" render={(props)=>
                                (this.cookies.get('username') && this.cookies.get('username')!='')? 
                                <Search key={new Date().toString()} pk={props.match.params.title}  />  :<Redirect to="/login"/>
                                }/>
                                 <Route exact path="/questions/:pk" render={(props)=>
                                <div>
                                    {/* <Search1 tabname={this.props.tabname} updateTab={this.props.updateTab}/>  */}
                                    <QuestionsList key={props.match.params.pk} tabname={props.match.params.pk}/> 
                                     </div>
                                }/>
                                <Route exact path="/tags" render={(props)=>
                                (this.cookies.get('username') && this.cookies.get('username')!='')? 
                                <TagListContainer /> :<Redirect to="/login"/>
                                // <div>
                                //     <TagListContainer /> 
                                // </div>
                                }/>
                                <Route exact path="/tags/:name" render={(props)=>
                                <div>
                                    <QuestionListContainer key={this.props.tabname} tabname={this.props.tabname} name={props.match.params.name}/>  
                                </div>
                                }/>
                                <Route exact path="/tags/:name/:pk" render={(props)=>
                                <div>
                                    <QuestionListContainer name={props.match.params.name} key={props.match.params.pk} tabname={props.match.params.pk}/>  
                                </div>
                                }/>
                                <Route exact path="/questions/:pk/edit" render={(props)=>
                                <div>
                                    <QuestionsEdit pk={props.match.params.pk} key={props.match.params.pk}/>  
                                </div>
                                }/>
                                <Route exact path="/questions/:pk/:title" render={(props)=>
                                <div>
                                    <QuestionsComment key={new Date().toString()} pk={props.match.params.pk}/>  
                                </div>
                                }/>
                                
          </Switch>
          </div>
          </div>
          </Router>
        );
    }
}
export default Header;


