import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
// import htmlToDraft from 'html-to-draftjs';
 import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {BaseFormControl} from "react-bootstrap4-form-validation";
import { toolbar } from './toolbarProps';

class HtmlEditor extends BaseFormControl{
    constructor(props){
        super(props);
        this.inputRef = React.createRef();
        this.getInputRef = this.getInputRef.bind(this);
    }

    getInputRef(){
        return this.inputRef.current.inputElement;
    };

    onEditorStateChange = (val) => {
        this.checkError();
        if(this.props.onChange) this.props.onChange(val);
    };

    render () {

        const { value } = this.props;

        return (
            <React.Fragment>
                <Editor
                    ref={this.inputRef}
                    {...this.filterProps()}
                    editorState={value}
                    toolbar={toolbar(()=>{})}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="html-editor"
                    editorClassName="form-control"
                    onEditorStateChange={this.onEditorStateChange}
                />
                { this.displayErrorMessage() }
                { this.displaySuccessMessage() }
            </React.Fragment>
        )
    }
}

export default HtmlEditor;
