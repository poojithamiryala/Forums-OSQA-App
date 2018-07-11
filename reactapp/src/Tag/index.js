import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom"
import './Tag.css';

class TagListContainer extends Component{

    cookies = new Cookies();

    constructor(props) {
        super(props);
        this.state = { list: [] }
    }
    
    componentDidMount() {
            fetch('http://127.0.0.1:8000/tags/', { 
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
                .catch(e => {console.log("Error occured in fetching..")});
    }

    render(){
        console.log("TodoItemContainer");
        console.log(this.state.list)
        return (
        <div class="container15">
        <div className="container16">
                    <b>All Tags</b>
                    {/* <button><Link to="/questions/ask">Post a question</Link></button> */}
        </div>
        <div class="grid-container">
        {
            this.state.list.map((tags) => 
            <TagItem tags={tags} key={tags.name}/>)
        }
        </div>
        </div>
        ) ;
    }
}

const TagItem = ({tags,key}) => {
    return (
        <div class="grid-item"><Link to={'/tags/'+tags.name+'/'}>{tags.name}</Link><span>*{tags.count}</span></div>
    );
}

export default TagListContainer