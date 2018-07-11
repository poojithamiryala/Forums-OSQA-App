import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import Pagination from '../Pagination';

class Search extends React.Component{
    cookies = new Cookies();

    constructor(props) {
        super(props);
        this.state = { list: [] ,
            tabname:'',
            found:'',
            pageOfItems: []
        };
        this.onChangePage = this.onChangePage.bind(this);
    }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    componentDidMount()
    {
        // console.log('entered');
        // console.log('http://127.0.0.1:8000/questions/'+ this.state.tabname+'/');
        // if( this.cookies.get('username') && this.cookies.get('username')!='')
        //  {  
            console.log('entered');
            console.log('http://127.0.0.1:8000/questions/search/'+this.props.pk+'/');
            fetch('http://127.0.0.1:8000/questions/search/'+this.props.pk+'/', { 
                method: 'get', 
                headers: new Headers({
                'Authorization': 'JWT '+this.cookies.get('userJwtToken').token, 
                }), 
                }).then(function(response) {
                    return response.json();
                })
                .then((myJson) => {
                    this.setState(prev => ( {list : myJson}));
                    myJson.length==0?this.setState({found:"No"}):"";
                })
                .catch(e => {console.log("Error occured in fetching.."+e)});
    }
    find=()=>
    {
        this.setState({found:"No"})
    }
    render()
    {
        console.log(this.props.location);
        return(
            <div className="container4">
            <div>
               <div className="container11">
                    <b>{this.state.found} Questions related to {this.props.pk}</b>
                    {/* <button><Link to="/questions/ask">Post a question</Link></button> */}
               </div>
                {
                    this.state.list!=""?this.state.list.map((question) => 
                <QuestionItem question={question} key={question.id}/>):this.find
                }
                 <Pagination items={this.state.list} onChangePage={this.onChangePage} />
            </div>
            </div>
        );
    }
}
const QuestionItem = ({question,viewCount,key}) => {
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
            <a href="/users/7145972/rony">{question.username}</a> 
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
export default Search;