import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {BaseFormControl} from "react-bootstrap4-form-validation";
import { pick } from 'lodash';
import axios from 'axios';
import { toolbar } from './toolbarProps';

/**
 * Convert defaultValue to draft format
 * @param defaultValue
 * @returns {*}
 */
const defaultState = (defaultValue) => {
    if(defaultValue) {
        const blocksFromHtml = htmlToDraft(defaultValue);
        const {contentBlocks, entityMap} = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        return EditorState.createWithContent(contentState);
    }
    return null;
};

class HtmlEditor extends Component {
    state = {
        editorState: defaultState(this.props.defaultValue),
    };

    onEditorStateChange = (editorState) => {
        const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const { onChange, name } = this.props;
        this.setState({
            editorState,
        });

        onChange({ target: { name, value }})
    };

    fileUpload = (file) => {
        return new Promise(
            (resolve, reject) => {
                const formData = new FormData();
                formData.append('fileUpload', file);
                axios.post('/upload', formData, {
                    headers: {
                        'Authorization': 'multipart/form-data'
                    }
                }).then((responseData) => {
                    resolve(responseData)
                }).catch(err => {
                    reject(err)
                })
            })
    };

    render() {
        const { editorState } = this.state;
        const { name, onImageUpload } = this.props;

        return(
            <>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="html-editor"
                    editorClassName="form-control"
                    toolbar={toolbar(this.fileUpload)}
                    onEditorStateChange={this.onEditorStateChange}
                />
                <textarea
                    name={name}
                    style={{ display: 'none' }}
                    className="html-editor"
                    value={
                        editorState && draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />
            </>
        )
    }
}



export default HtmlEditor;
