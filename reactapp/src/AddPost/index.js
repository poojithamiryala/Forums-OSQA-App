import React, { Component } from 'react';
import './AddPost.css';
//import Markmirror from 'react-markmirror';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import EditorConvertToHTML from '../Marks';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router'


class AddPost extends Component {
  cookies = new Cookies();
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      tag:'',
      desc:'',
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
    this.setState({ body: e.target.value });
    console.log(this.state.body);
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
     dec: '',
     tags:''
   });
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
              modules={App.modules}
              formats={App.formats}
              value={this.state.body}
              placeholder="Description"
              onChange={this.onHandleChange}
            /> */}
              <EditorConvertToHTML desc={this.state.desc} updateDesc={this.updateDesc}/>
              {/* <div className="hide">[hide preview]</div>
            {this.renderPosts()} */}
          </div>
          <div className="form-group">
          <b className="titles">tags:</b>
            <input className="form-control" type="text" placeholder="atleast one tag such as(windows php) etc.max 5 tags" onChange={e => {
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

// App.modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ size: [] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     // ['link', 'image', 'video'],
//     // ['clean'],
//     // ['code-block']
//   ]
// };

// App.formats = [
//   'header',
//   'font',
//   'size',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'list',
//   'bullet',
//   // 'link',
//   // 'image',
//   // 'video',
//   // 'code-block'
// ];


export default withRouter(AddPost);
