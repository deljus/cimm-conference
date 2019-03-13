import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
// import htmlToDraft from 'html-to-draftjs';
 import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {BaseFormControl} from "react-bootstrap4-form-validation";
import axios from 'axios';
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
    }

    fileUpload = (file) => {
        return new Promise(
            (resolve, reject) => {
                const data = new FormData();
                data.append('fileUpload', file);
                axios.post('/upload', {data}).then((responseData) => {
                    resolve(responseData)
                })
            })
    }

    render () {

        const { value } = this.props;

        return (
            <React.Fragment>
                <Editor
                    ref={this.inputRef}
                    {...this.filterProps()}
                    editorState={value}
                    toolbar={toolbar(this.fileUpload)}
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
