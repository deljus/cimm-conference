import React, { Component } from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import { pick, keys, isEqual, reduce, map } from 'lodash';
import withDataFetch from '../core/withDataFetch';
import { AFFILIATION_FIELDS } from '../../utils/globalConfig';
import { apiRoutes } from '../../utils/globalConfig';

const defaultState =
    reduce(AFFILIATION_FIELDS, (acc, val, key) => {
    acc[key] = val.default;
    return acc;
},{});

class EditAffiliation extends Component{
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = defaultState;
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = async (e, formData) => {
        const { fetchData, onSubmitted, index } = this.props;
        e.preventDefault();
        e.stopPropagation();

        const dt = await fetchData({
            method: 'post',
            url: apiRoutes.affiliation.create,
            data: formData
        });
        if(dt){
            onSubmitted(dt);
        }
    };

    changeToViewMode = (e) => {
        e.preventDefault();
        this.setState({ ...defaultState });
        this.props.changeToViewMode()
    };


    render(){

        const { loading, renderAlerts } = this.props;

        return(
            <div className="affiliation-user">
                { renderAlerts }
                <ValidationForm
                    onSubmit={this.handleSubmit}
                    ref={this.formRef}
                    immediate={true}
                    setFocusOnError={true}
                >
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
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>
                            { loading && <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>&nbsp;</>}
                            Submit
                        </button>
                        <button className="btn btn-danger" onClick={this.changeToViewMode}>
                            <i className="fa fa-trash" aria-hidden="true" />&nbsp;
                            Cancel
                        </button>
                    </div>
                </ValidationForm>
            </div>
        )
    }
}

EditAffiliation.defaultProps = {
    changeToViewMode: () => {}
}



export default withDataFetch(EditAffiliation);
