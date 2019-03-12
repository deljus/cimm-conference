import React, { Component } from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import { pick, keys, isEqual, reduce, map } from 'lodash';
import withDataFetch from '../core/withDataFetch';
import { HtmlEditor } from '../components';

class EditMode extends Component{
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = { text: ''};
    }

    componentDidMount(){
        const nextPropsState = pick(this.props, keys(this.state));

        if( !isEqual(nextPropsState, this.state) ){
            this.setState({ ...nextPropsState })
        }
    }

    handleChange = e => {
        console.log(e.target)
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
                    <div className="form-group row">
                        <label className="col-4">Text</label>
                        <div className="col-8">
                            <HtmlEditor
                                value={this.state.text}
                                name="text"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </ValidationForm>
            </div>
        )
    }
}

export default withDataFetch(EditMode);
