import React, { Component } from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import { pick, keys, isEqual } from 'lodash';
import withDataFetch from '../../core/withDataFetch';
import { TEMPLATE } from './constants';

class EditMode extends Component{
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = TEMPLATE;
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

        const {     country,
            city,
            affiliation,
            address,
            zip} = this.state;
        const { loading, changeToViewMode } = this.props;

        return(
            <ValidationForm
                onSubmit={this.handleSubmit}
                ref={this.formRef}
                immediate={true}
                setFocusOnError={true}
            >
                <div className="form-group">
                    <label>Country</label>
                    <TextInput name="country" required
                               errorMessage={{required:"Country is required"}}
                               value={country}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <TextInput name="city" required
                               errorMessage={{required:"City is required"}}
                               value={city}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Affiliation</label>
                    <TextInput name="affiliation" required
                               errorMessage={{required:"Affiliation is required"}}
                               value={affiliation}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <TextInput name="address" required
                               errorMessage={{required:"Address is required"}}
                               value={address}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Zip</label>
                    <TextInput name="zip" required
                               errorMessage={{required:"Zip is required"}}
                               value={zip}
                               onChange={this.handleChange}
                    />
                </div>
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
