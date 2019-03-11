import React, { Component } from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import { pick, keys, isEqual, reduce, map } from 'lodash';
import withDataFetch from '../core/withDataFetch';
import { AFFILIATION_FIELDS } from '../constants';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditMode extends Component{
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = {...reduce(AFFILIATION_FIELDS, (acc, val, key) => {
            acc[key] = val.default;
            return acc;
        },{}), editorState: ''};
    }

    componentDidMount(){
        const nextPropsState = pick(this.props, keys(this.state));

        if( !isEqual(nextPropsState, this.state) ){
            this.setState({ ...nextPropsState })
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = async (e, formData) => {
        const { fetchData, changeState, index } = this.props;
        e.preventDefault();

        const dt = await fetchData({
            method: 'post',
            url: '/affiliation',
            data: formData
        });
        if(dt){
            changeState(dt, index);
        }
    };

    changeToViewMode = (e) => {
        e.preventDefault();
        const { changeToViewMode, index } = this.props;
        changeToViewMode(index);
    }

    render(){

        const { loading, changeToViewMode, index } = this.props;

        return(
            <div className="affiliation-user">
                <ValidationForm
                    onSubmit={this.handleSubmit}
                    ref={this.formRef}
                    immediate={true}
                    setFocusOnError={true}
                >
                    <div className="form-group row">
                        <label className="col-4">Title</label>
                        <div className="col-8">
                            <TextInput
                                       value={this.state.title}
                                       name="title"
                                       onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    {
                        map(AFFILIATION_FIELDS, (item, key) => (
                            <div className="form-group row">
                                <label className="col-4">{ item.label }</label>
                                <div className="col-8">
                                    <TextInput {...item}
                                               value={this.state[key]}
                                               name={key}
                                               onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        ))
                    }
                    <div className="form-group row">
                        <label className="col-4">Text</label>
                        <div className="col-8">
                            <Editor
                                editorState={this.state.editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </div>
                    </div>
                </ValidationForm>
            </div>
        )
    }
}

export default withDataFetch(EditMode);