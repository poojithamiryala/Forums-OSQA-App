import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState,createFromHtml } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import './mark.css';
import htmlToDraft from 'html-to-draftjs';


class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      value:'',
    };
  }

  onEditorStateChange=(editorState) => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.props.updateDesc(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.setState({
      editorState:editorState,
      value:draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  };
  render() {
    const { editorState } = this.state;
    return (
      <div className="container10">
      <Editor
       
       defaultEditorState={(this.props.desc)}
       spellCheck
       placeholder="description"
    wrapperClassName="demo-wrapper"
    editorClassName="demo-editor"
    onEditorStateChange={this.onEditorStateChange}
    toolbar={{
      inline: { inDropdown: true },
      list: { inDropdown: true },
      textAlign: { inDropdown: true },
      link: { inDropdown: true },
      history: { inDropdown: true },
    }}
  />
  <div className="hide">[hide preview]</div>
        <div className="content" dangerouslySetInnerHTML={{ __html: this.state.value }} />
      </div>
    )
  }  
}
export default EditorConvertToHTML;