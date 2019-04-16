import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator'
import withDataFetch from "../core/withDataFetch";
import { apiRoutes, insideRoutes } from '../../utils/globalConfig';

class ChangePassForm extends Component {
    state = {
        email: ""
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = async(e, formData) => {
        e.preventDefault();
        const { fetchData } = this.props;
        await fetchData({
            method: 'post',
            url: apiRoutes.changePassByEmail,
            data: formData
        });
    };

    render () {

        const {
            loading,
            renderAlerts
        } = this.props;

        return (
            <ValidationForm className="registration-form" onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                <h3>
                    <Link to={ insideRoutes.auth.login }>Login</Link> or &nbsp;
                    <Link to={ insideRoutes.auth.registration }>Registration</Link></h3>
                { renderAlerts() }
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <TextInput name="email" id="email" type="email"
                               validator={validator.isEmail}
                               errorMessage={{validator:"Please enter a valid email"}}
                               value={this.state.email}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" disabled={loading}>
                        { loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>}
                        Submit
                    </button>
                </div>
            </ValidationForm>
        )
    }
}

export default withDataFetch(ChangePassForm);
