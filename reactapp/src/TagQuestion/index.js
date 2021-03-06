import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';

class QuestionListContainer extends Component{

    cookies = new Cookies();

    constructor(props) {
        super(props);
        this.state = { list: [] ,
            currentPage: 1,
            questionsPerPage: 3,
            tabname:''
        };
    }
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
    componentDidMount()
    {
        // console.log('entered');
        // console.log('http://127.0.0.1:8000/questions/'+ this.state.tabname+'/');
        // if( this.cookies.get('username') && this.cookies.get('username')!='')
        //  {  
            console.log('entered');
            console.log('http://127.0.0.1:8000/tags/'+this.props.name+'/'+this.state.tabname+'/');
           this.state.tabname=this.props.tabname;
           var url='http://127.0.0.1:8000/tags/'+this.props.name+'/'+this.state.tabname+'/';
            fetch('http://127.0.0.1:8000/tags/'+this.props.name+'/'+this.state.tabname+'/', { 
                method: 'get', 
                headers: new Headers({
                'Authorization': 'JWT '+this.cookies.get('userJwtToken').token, 
                }), 
                }).then(function(response) {
                    return response.json();
                })
                .then((myJson) => {
                    this.setState(prev => ( {list : myJson}));
                })
                .catch(e => {console.log("Error occured in fetching.."+e)});
    }
    render()
    {
        console.log(this.props.location);
        return(
            <div className="container4">
            <div>
               <div className="container11">
                    <b>All Questions</b>
                    {/* <button><Link to="/questions/ask">Post a question</Link></button> */}
               </div>
               <div className="container12">
                    <button><Link to="/questions/ask">Post a question</Link></button>
               </div>
               </div>
               <div className="container13">
                    <button><Link to={"/tags/"+this.props.name+"/newest"}>Newest</Link></button>
                    <button><Link to={"/tags/"+this.props.name+"/votes"}>Votes</Link></button>
                    <button><Link to={"/tags/"+this.props.name+"/unanswered"}>Unanswered</Link></button>
               </div>
                {
                    this.state.list.map((question) => 
                      <QuestionItem question={question.postquestion} key={question.postquestion.id}/>
                )}
            </div>
        );
    }
}
const QuestionItem = ({question,key}) => {
    var str=question.tags;
    var tags=str.split(',');
    return (
        <div className="question-summary narrow" id={question.id}>
    <div className="cp">
        <div className="votes">
            <div className="mini-counts">
            <span title="0 votes">
                {/* <Votes pk={question.id}/> */}
                {question.votecount}
            </span></div>
            <div>votes</div>
        </div>
        <div class="status unanswered">
            <div class="mini-counts"><span title="0 answers">{question.answercount}</span></div>
            <div>answers</div>
        </div>
        <div className="views">
            <div className="mini-counts">
            <span title="1 view">
                {/* <Views pk={question.id}/> */}
                {question.viewcount}
            </span></div>
            <div>view</div>
        </div>
    </div>
    <div className="summary">
        <h3><Link to={`/questions/${question.id}/${question.title}`} className="question-hyperlink">{question.title}</Link></h3>
        <div className="tags t-wordpress t-wordpress-theming t-custom-post-type">
        {
        // <div className="post-tag" title="show questions tagged 'wordpress'" rel="tag">
            <QuestionTags tags={tags} />
        // </div>
        } 
        </div>
        <div className="started">
            <a href="/questions/51034904/how-to-remove-add-new-button-from-the-editor-page-of-a-custom-post-type-in-wor" className="started-link">asked <span title="2018-06-26 04:29:28Z" className="relativetime">{question.time}</span></a>
            <a href="/users/7145972/rony">{question.username}</a> <span className="reputation-score" title="reputation score " dir="ltr">11</span>
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
export default QuestionListContainer
 

 