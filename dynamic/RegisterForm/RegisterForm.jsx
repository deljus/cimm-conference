import React, { Component } from 'react'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator'
import { Typeahead } from 'react-bootstrap-typeahead';
import { getNames } from 'country-list';
import MaskedFormControl from 'react-bootstrap-maskedinput';
import axios from 'axios';
import { Alert } from "../components";

const defaultState = {
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    password: "",
    confirmPassword: "",
    country: '',
    phoneNumber: '',
    middleName: '',
    alertPrimaryShow: false,
    alertDangerShow: false,
}

class TextInputDemo extends Component {
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

    handleSubmit = async (e, formData, inputs) => {
        e.preventDefault();
        try{
            await axios.post('/registration', { ...this.state });
            this.setState({ alertPrimaryShow: true });
        }catch (e) {
            this.setState({ alertDangerShow: true });
        }
    };

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs)
    };

    matchPassword = (value) => {
        return value && value === this.state.password;
    };

    resetForm = () => {
        this.setState({
            ...defaultState
        })
        let formRef = this.formRef.current;
        formRef.resetValidationState(false);
    };

    onAlertDismiss = (name) => () => {
        this.setState({ [name]: false })
    };

    render () {
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
                <h3>Registration or <a href="/login">Login</a></h3>

                <Alert
                    text="Unfortunately, something went wrong. Please contact the site administrator."
                    type="danger"
                    show={this.state.alertDangerShow}
                    onDismiss={this.onAlertDismiss('alertDangerShow')}
                />
                <Alert
                    text="An mail has been sent to your email. Confirm registration"
                    type="primary"
                    show={this.state.alertPrimaryShow}
                    onDismiss={this.onAlertDismiss('alertPrimaryShow')}
                />

                <div className="form-group">
                    <label htmlFor="firstName">First name</label>
                    <TextInput name="firstName" id="firstName" required
                               value={this.state.firstName}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <TextInput name="lastName" id="lastName" required
                               value={this.state.lastName}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="middleName">Middle name</label>
                    <TextInput name="middleName" id="middleName"
                               value={this.state.middleName}
                               onChange={this.handleChange}
                    />
                </div>
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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <TextInput name="confirmPassword" id="confirmPassword" type="password" required
                               validator={this.matchPassword}
                               errorMessage={{required:"Confirm password is required", validator: "Password does not match"}}
                               value={this.state.confirmPassword}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <Typeahead
                        inputProps={{
                            name: 'country',
                            id: 'country',
                            required: true
                        }}
                        options={getNames()}
                               value={this.state.country}
                               onChange={r => this.handleChange({ target: { name: 'country', value: r[0] } })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone</label>
                    <MaskedFormControl type='text' name='phoneNumber' mask='111-111-1111' onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Submit</button>
                    <button className="btn btn-default ml-2" type="button" onClick={this.resetForm}>Reset</button>
                </div>
            </ValidationForm>
        )
    }
}

export default TextInputDemo;
