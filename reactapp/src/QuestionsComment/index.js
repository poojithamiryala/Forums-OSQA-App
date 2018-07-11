import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import like from './like.svg';
import profile from './profile.svg';
import './QuestionsComment.css';
import EditorConvertToHTML from '../Marks';
import { withRouter } from 'react-router';
class QuestionsComment extends React.Component{
    cookies = new Cookies();

    constructor(props) {
        super(props);
        this.state = { Questionlist: [] ,
            Answerlist: [] ,
            Commentlist: [] ,
            clist:[],
            alist:[],
            currentPage: 1,
            text:"",
            questionsPerPage: 3,
            tabname:'',desc:""
        };
        this.submit=this.submit.bind(this);
        this.submitAnswer=this.submitAnswer.bind(this);
        this.submit1=this.submit1.bind(this);
        this.submitComment=this.submitComment.bind(this);
    }
    updateDesc = (desc) => {
        this.setState({desc});
      }
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
      updateText = (text) => {
        this.setState({text});
      }  
      submit(e,pk,title)
      {
          window.alert("hello");
          fetch('http://127.0.0.1:8000/questions/'+pk+'/votes/', {
         method: 'post',
          headers: {
           'Authorization': 'JWT '+(this.cookies.get('userJwtToken').token),
           'Content-Type': 'application/json'
        },
         body: JSON.stringify({
          })
       }) .then(function(response) {
         //this.props.history.push('/questions/'+pk+'/'+title+'/');
         return response.json();
     })
     .then((myJson) => {
         console.log("my"+myJson.id);
         console.log(this.props.history.location);
         this.props.history.push(this.props.history.location);
     })
     .catch(e => {console.log("Error occured in fetching students.."+e)});
      }
      submit1(e,pk,pk1)
      {
          fetch('http://127.0.0.1:8000/questions/'+pk1+'/votes/'+pk+'/', {
         method: 'post',
          headers: {
           'Authorization': 'JWT '+(this.cookies.get('userJwtToken').token),
           'Content-Type': 'application/json'
        },
         body: JSON.stringify({
          })
       }) .then(function(response) {
         //this.props.history.push('/questions/'+pk+'/'+title+'/');
         return response.json();
     })
     .then((myJson) => {
         console.log("my"+myJson.id);
         console.log(this.props.history.location);
         this.props.history.push(this.props.history.location);
     })
     .catch(e => {console.log("Error occured in fetching students.."+e)});
      }
      submitAnswer(e,pk)
      {
        console.log(pk+this.state.text);
        fetch('http://127.0.0.1:8000/questions/'+pk+'/answer/', {
       method: 'post',
        headers: {
         'Authorization': 'JWT '+(this.cookies.get('userJwtToken').token),
         'Content-Type': 'application/json'
      },
       body: JSON.stringify({
           text:this.state.text
        })
     }) .then(function(response) {
       //this.props.history.push('/questions/'+pk+'/'+title+'/');
       return response.json();
   })
   .then((myJson) => {
       console.log("my"+myJson.id);
       console.log(this.props.history.location);
       this.props.history.push(this.props.history.location);
   })
   .catch(e => {console.log("Error occured in fetching students.."+e)});
      }
      submitComment(e,pk)
      {
        console.log(pk);
        fetch('http://127.0.0.1:8000/questions/'+pk+'/comment/', {
       method: 'post',
        headers: {
         'Authorization': 'JWT '+(this.cookies.get('userJwtToken').token),
         'Content-Type': 'application/json'
      },
       body: JSON.stringify({
           text:this.state.text
        })
     }) .then(function(response) {
       //this.props.history.push('/questions/'+pk+'/'+title+'/');
       return response.json();
   })
   .then((myJson) => {
       console.log("my"+myJson.id);
       console.log(this.props.history.location);
       this.props.history.push(this.props.history.location);
   })
   .catch(e => {console.log("Error occured in fetching students.."+e)});
      }
    componentDidMount()
    {
            console.log('entered');
            console.log('http://127.0.0.1:8000/questions/'+ this.props.pk+'/');
           this.state.tabname=this.props.tabname;
           var url='http://127.0.0.1:8000/questions/'+ this.state.tabname+'/';
           fetch('http://127.0.0.1:8000/questions/'+this.props.pk+'/views/', {
           method: 'post',
            headers: {
             'Authorization': 'JWT '+(this.cookies.get('userJwtToken').token),
             'Content-Type': 'application/json'
          },
           body: JSON.stringify({
            })
         }) .then(function(response) {
           return response.json();
       })
       .then((myJson) => {
           console.log("my"+myJson.id);
       })
       .catch(e => {console.log("Error occured in fetching students.."+e)});
            fetch('http://127.0.0.1:8000/questions/'+ this.props.pk+'/', { 
                method: 'get', 
                headers: new Headers({
                'Authorization': 'JWT '+this.cookies.get('userJwtToken').token, 
                }), 
                }).then(function(response) {
                    return response.json();
                })
                .then((myJson) => {
                    this.setState(prev => ( {Questionlist : myJson}));
                })
                .catch(e => {console.log("Error occured in fetching.."+e)});
                fetch('http://127.0.0.1:8000/questions/'+ this.props.pk+'/answer/', { 
                    method: 'get', 
                    headers: new Headers({
                    'Authorization': 'JWT '+this.cookies.get('userJwtToken').token, 
                    }), 
                    }).then(function(response) {
                        return response.json();
                    })
                    .then((myJson) => {
                        this.setState(prev => ( {Answerlist : myJson}));
                    })
                    .catch(e => {console.log("Error occured in fetching.."+e)});
                fetch('http://127.0.0.1:8000/questions/'+ this.props.pk+'/comment/', { 
                        method: 'get', 
                        headers: new Headers({
                        'Authorization': 'JWT '+this.cookies.get('userJwtToken').token, 
                        }), 
                        }).then(function(response) {
                            return response.json();
                        })
                        .then((myJson) => {
                            this.setState(prev => ( {Commentlist : myJson}));
                        })
                        .catch(e => {console.log("Error occured in fetching.."+e)});
    }
    componentWillMount()
    {
            
    }
  
    render()
    {
        console.log(this.props.location);
        return(
           <div className="questionsComments">
                <div className="invis">
                {
                    this.state.Commentlist.map((comment)=>
                    this.state.clist.push({comment})
                )}
                </div>
                <div className="invis">
                 {
                    this.state.Answerlist.map((answer)=>
                    this.state.alist.push({answer})
                )}
                </div>
                {
                    this.state.Questionlist.map((question) => 
                    <QuestionItem question={question} submit1={this.submit1} key={question.id} text={this.state.text} submitAnswer={this.submitAnswer} updateText={this.updateText} props={this.props.history} submit={this.submit} submitComment={this.submitComment}cookies={this.cookies} clist={this.state.Commentlist} alist={this.state.Answerlist} desc={this.state.desc} updateDesc={this.updateDesc}/>
                     )
                }
                </div>
        );
    }

}
const QuestionItem = ({question,submit1,clist,alist,submit,text,updateText,submitComment,submitAnswer,props,desc,cookies,updateDesc,key}) => {
    var str=question.tags;
    var tags=str.split(',');
    return (
        <div>
    <div className="container20">
    <span><b>{question.title}</b></span>
    </div>
    <div className="container21">
    <button><Link to="/questions/ask">Post a question</Link></button>
    </div>
    <div className="container22">
    <div className="container23">
    <button onClick={(e) => submit(e,question.id,question.title)}><img src={like}/></button>
    <center><b>{question.votecount} Votes</b></center>
    </div>
     <div className="container24">
     <div dangerouslySetInnerHTML={{ __html: question.description }} />
     <div className="container25">
     <div className="tags t-wordpress t-wordpress-theming t-custom-post-type">
        {
        // <div className="post-tag" title="show questions tagged 'wordpress'" rel="tag">
            <QuestionTags tags={tags} />
        // </div>
        } 
        </div>
        </div>
      <div className="container26">
      <Link to={"/questions/"+question.id+"/edit"}>edit</Link>
     </div>
     <div className="container27">
     <p>asked {question.time} </p>
     <center><button><img src={profile}></img></button><Link to={"/users"+question.username}> {question.username}</Link>
     </center></div>
     <div className="container28">
    <ul>
                {
                    clist?clist.map((comment) => 
                    <li><hr/>{comment.text}-<Link to={"/users"+comment.user.username}>{comment.user.username}</Link><hr/></li>
                     ):""
                }
                </ul>
                {
                clist==""?<hr/>:""
                }
    <textarea placeholder="add comment" rows="2" cols="2" onChange={e=>updateText(e.target.value)} required/>
     <button onClick={(e) => submitComment(e,question.id)}>Comment</button> 
    </div>
    </div>
    <div className="container29">
            <div className="container30">{alist!=""?<b>{question.answercount} Answers</b>:<b>Be the first Person to answer this question</b>}
    </div>
    {
                    alist?alist.map((answer) => 
                    // <AnswerItem  key={answer}  answer={answer}/>
                    <div className="container31">
         <div className="container23">
         <button onClick={(e) => submit1(e,answer.id,question.id)}><img src={like}/></button>
        <center><b>{answer.votecount} Votes</b></center>
        </div>
        <div className="container24">
         <div dangerouslySetInnerHTML={{ __html: answer.text }} />
        </div>
        <div className="container27">
     <p>asked {question.time} </p>
     <center><button><img src={profile}></img></button><Link to={"/users"+question.username}> {question.username}</Link>
     </center></div>
        </div>
                     ):""
    }
    <div className="container32">
                   
                     <EditorConvertToHTML text={text} updateDesc={updateText}/>
                     <div className="form-button4">
                     <button onClick={(e) => submitAnswer(e,question.id)} className="submit">Answer</button>
                      </div>
                     </div>
                </div>
    </div>
    </div>
    );
}
const QuestionTags =({tags})=>{
    return(
        <div>
                {
                    tags.map(function(name, index){
                    return <div className="post-tag" title="show questions tagged 'wordpress'" rel="tag">{name}</div>;
                  })
                }
        </div>
    );
}
export default withRouter(QuestionsComment);