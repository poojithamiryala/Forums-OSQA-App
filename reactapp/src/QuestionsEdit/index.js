import React, { Component } from 'react';
//import Markmirror from 'react-markmirror';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import EditorConvertToHTML from '../Marks';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router'


class QuestionsEdit extends Component {
  cookies = new Cookies();
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      tag:'',
      desc:'',
      Questionlist:[],
      posts: {}
    };
    // bind
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }
  updateDesc = (desc) => {
    this.setState({desc});
  }
  onHandleChange(e) {
    this.setState({desc: e.target.value });
    console.log(this.state.desc);
  }

  onHandleSubmit(e) {
    e.preventDefault();
    var formData  = new FormData();
    formData.append('title', this.state.title);
    formData.append('description', this.state.desc);
    formData.append('tags', this.state.tag);
    console.log(formData);
    console.log( 'JWT '+this.cookies.get('userJwtToken').token);
   fetch('http://127.0.0.1:8000/questions/', {
           method: 'post',
            headers: {
             'Authorization': 'JWT '+(this.cookies.get('userJwtToken').token),
             'Content-Type': 'application/json'
          },
           body: JSON.stringify({
             "title":this.state.title,
             "description":this.state.desc,
             "tags":this.state.tag
            })
         }) .then(function(response) {
           return response.json();
       })
       .then((myJson) => {
           console.log("my"+myJson.id);
               this.props.history.push('/');
               console.log("Redirecting....");
       })
       .catch(e => {console.log("Error occured in fetching students.."+e)});
   this.setState({
     title: '',
     desc: '',
     tag:''
   });
  }
  componentDidMount()
  {
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
                  this.setState({title:myJson[0].title});
                  this.setState({tag:myJson[0].tags});
                  this.setState({desc:myJson[0].description});
              })
              .catch(e => {console.log("Error occured in fetching.."+e)});
  }
  render() {
    return (
        <div>
      <div className="container">
        <form onSubmit={this.onHandleSubmit}>
        <h2><b>Add a Post</b></h2>
        <hr/>
          <div className="form-group">
          <b class="titles">
          Title</b>
            <input className="form-control"
              value={this.state.title}
              type="text"
              name="title"
              placeholder="Title"
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
              ref="title"
              />
              <p className="desc-title">please enter a descriptive title for your question</p>
          </div>
          <div className="form-group">
            {/* <ReactQuill
              modules={QuestionsEdit.modules}
              formats={QuestionsEdit.formats}
              value={this.state.desc}
              placeholder="Description"
              onChange={e => {
                this.setState({ tag: e.target.value });
              }}
            />  */}
              {/* <EditorConvertToHTML desc={this.state.desc} updateDesc={this.updateDesc}/> */}
              <textarea rows="5" cols="80" value={this.state.desc} onChange={e=>{
                this.setState({ desc: e.target.value }); 
              }} />
               <div className="hide">[hide preview]</div>
               <div dangerouslySetInnerHTML={{ __html: this.state.desc}}/>
          </div>
          <div className="form-group">
          <b className="titles">tags:</b>
            <input className="form-control" type="text" value={this.state.tag} placeholder="atleast one tag such as(windows php) etc.max 5 tags" onChange={e => {
                this.setState({ tag: e.target.value });
              }}/>
            <p className="desc-title">Tags are short keywords,with no spaces within.</p>
          </div>
          <div className="form-button">
          <button className="submit">Post</button>
          </div>
        </form>
        <br />
      </div>
      <div className="container-right">
        <div className="tips">
        <p className="tips-title">Tips</p>
          <ul>
            <li>ask a question relevant to OSQA community</li>
            <li>provide enough details</li>
            <li>be clear and concise</li>
          </ul>
        </div>
      </div> 
      </div>
    );
  }
}

QuestionsEdit.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    // ['link', 'image', 'video'],
    // ['clean'],
    // ['code-block']
  ]
};

QuestionsEdit.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  // 'link',
  // 'image',
  // 'video',
  // 'code-block'
];


export default withRouter(QuestionsEdit);
