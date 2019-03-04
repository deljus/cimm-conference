import React, { Component } from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import { pick, keys, isEqual, reduce, map } from 'lodash';
import withDataFetch from '../../core/withDataFetch';
import { FIELDS } from './constants';

class EditMode extends Component{
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = reduce(FIELDS, (acc, val, key) => {
            acc[key] = val.default;
            return acc;
        },{});
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
        const { fetchData, changeState } = this.props;
        e.preventDefault();

         const dt = await fetchData({
                method: 'post',
                url: '/affiliation',
                data: formData
            });
          if(dt){
              changeState(this.state);
          }
    };

    deleteInState = (e) => {
        e.preventDefault();
        const { deleteInState, index } = this.props;
        deleteInState(index);
    };

    render(){

        const { loading } = this.props;

        return(
            <ValidationForm
                onSubmit={this.handleSubmit}
                ref={this.formRef}
                immediate={true}
                setFocusOnError={true}
            >
                {
                    map(FIELDS, item => (
                        <div className="form-group">
                            <label>{ item.label }</label>
                            <TextInput {...item}
                                       value={this.state[item.name]}
                                       onChange={this.handleChange}
                            />
                        </div>
                    ))
                }
                <div className="form-group">
                    <button className="btn btn-primary" disabled={loading}>
                        { loading && <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>&nbsp;</>}
                        Submit
                    </button>
                    <button className="btn btn-danger" onClick={this.deleteInState}>
                        <i className="fa fa-trash" aria-hidden="true" />&nbsp;
                    Delete
                </button>
                </div>
            </ValidationForm>
        )
    }
}

export default withDataFetch(EditMode);
