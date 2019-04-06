import React, { Component } from 'react'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator'
import withDataFetch from "../core/withDataFetch";
import { apiRoutes, outsideRouters, config } from '../../utils/globalConfig';

class LoginForm extends Component {
    state = {
        email: "",
        password: "",
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
            url: apiRoutes.login,
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
                <h3>Login or <a href={ config.routePrefix + outsideRouters.registration }>Registration</a></h3>
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
                    <label htmlFor="password">Password</label>
                    <TextInput name="password" id="password" type="password" required
                               pattern="(?=.*[A-Z]).{6,}"
                               errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters and contains at least one upper case letter"}}
                               value={this.state.password}
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

export default withDataFetch(LoginForm);
