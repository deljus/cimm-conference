import React, { Component } from 'react'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator'
import { apiRoutes, outsideRouters, config } from '../../utils/globalConfig';
import withDataFetch from '../core/withDataFetch';

const defaultState = {
    email: "",
    password: "",
    confirmPassword: ""
};

class RegisterForm extends Component {
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
        const { fetchData } = this.props;
        e.preventDefault();
        await fetchData({
            method: 'post',
            url: apiRoutes.registration,
            data: formData
        });
    };

    matchPassword = (value) => {
        return value && value === this.state.password;
    };


    onAlertDismiss = (name) => () => {
        this.setState({ [name]: false })
    };

    render () {

        const {
            email ,
            password,
            confirmPassword,
        } = this.state;

        const {
            loading,
            renderAlerts
        } = this.props;

        return (
            //Controlled Components
            <ValidationForm
                className="registration-form"
                onSubmit={this.handleSubmit}
                onErrorSubmit={this.handleErrorSubmit}
                ref={this.formRef}
                immediate={true}
                setFocusOnError={true}
            >
                <h3>Registration or <a href={ config.routePrefix + outsideRouters.login }>Login</a></h3>
                { renderAlerts() }
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <TextInput name="email" id="email" type="email"
                               validator={validator.isEmail}
                               errorMessage={{validator:"Please enter a valid email"}}
                               value={email}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <TextInput name="password" id="password" type="password" required
                               pattern="(?=.*[A-Z]).{6,}"
                               errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters and contains at least one upper case letter"}}
                               value={password}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <TextInput name="confirmPassword" id="confirmPassword" type="password" required
                               validator={this.matchPassword}
                               errorMessage={{required:"Confirm password is required", validator: "Password does not match"}}
                               value={confirmPassword}
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

export default withDataFetch(RegisterForm);
