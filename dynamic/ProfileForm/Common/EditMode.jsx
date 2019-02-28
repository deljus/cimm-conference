import React, { Component } from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import { pick, keys, isEqual } from 'lodash';
import validator from "validator";
import withDataFetch from '../../core/withDataFetch';


class EditMode extends Component{
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = {
            lastName: '',
            firstName: ''
        };
    }

    componentDidMount(){
        const nextPropsState = pick(this.props, keys(this.state));

        if( !isEqual(nextPropsState, this.state) ){
            this.setState({ ...nextPropsState })
        }
    }

    handleChange = e => {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = async (e, formData) => {
        const { fetchData, changeState } = this.props;
        e.preventDefault();

         const dt = await fetchData({
                method: 'post',
                url: '/user',
                data: formData
            });
          if(dt){
              changeState(this.state);
          }
    };

    render(){

        const { lastName, firstName } = this.state;
        const { loading, changeToViewMode } = this.props;

        return(
            <ValidationForm
                onSubmit={this.handleSubmit}
                ref={this.formRef}
                immediate={true}
                setFocusOnError={true}
            >
                <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <TextInput name="lastName" id="lastName" required
                               errorMessage={{required:"Last name is required"}}
                               value={lastName}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Password</label>
                    <TextInput name="firstName" id="firstName" type="text" required
                               errorMessage={{required:"First name is required"}}
                               value={firstName}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" disabled={loading}>
                        { loading && <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>&nbsp;</>}
                        Submit
                    </button>
                    <button className="btn btn-secondary" onClick={changeToViewMode}>
                    <i className="fa fa-times" aria-hidden="true"/>&nbsp;
                    Cancel
                </button>
                </div>
            </ValidationForm>
        )
    }
}

export default withDataFetch(EditMode);
