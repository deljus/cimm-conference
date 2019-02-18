import React, { Component } from 'react'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator'
import { getNames } from 'country-list';
import axios from 'axios';
import { Alert, MaskInputControl, SelectControl } from "../components";

const defaultState = {
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    password: "",
    confirmPassword: "",
    country: '',
    mobilePhone: '',
    middleName: '',
    alertPrimary: {
        show: false,
        text: 'We sent you a password confirmation link in the mail. Please check your mail.'
    },
    alertDanger: {
        show: false
    },
};

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
        });
        let formRef = this.formRef.current;
        formRef.resetValidationState(false);
    };

    onAlertDismiss = (name) => () => {
        this.setState({ [name]: false })
    };

    render () {

        const {
            alertPrimary,
            alertDanger,
            firstName,
            lastName,
            middleName,
            email ,
            password,
            confirmPassword,
            country,
            mobilePhone,
        } = this.state;

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
                    show={alertDanger.show}
                    onDismiss={this.onAlertDismiss('alertDangerShow')}
                />
                <Alert
                    text={alertPrimary.text}
                    type="primary"
                    show={alertPrimary.show}
                    onDismiss={this.onAlertDismiss('alertPrimaryShow')}
                />

                <div className="form-group">
                    <label htmlFor="firstName">First name</label>
                    <TextInput name="firstName" id="firstName" required
                               value={firstName}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <TextInput name="lastName" id="lastName" required
                               value={lastName}
                               onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="middleName">Middle name</label>
                    <TextInput name="middleName" id="middleName"
                               value={middleName}
                               onChange={this.handleChange}
                    />
                </div>
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
                    <label htmlFor="country">Country</label>
                    <SelectControl
                        name="country"
                        value={country}
                        required
                        validator={(value) => value}
                        options={getNames()}
                        errorMessage={{validator:"Please enter a valid email"}}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobilePhone">Phone</label>
                    <MaskInputControl name="mobilePhone" className="form-control"
                                        validator={(value) => value === '' || !(value.indexOf('_') + 1)}
                                        value={mobilePhone}
                                        onChange={this.handleChange}
                                        errorMessage={{validator: "Please enter number to format (999) 999-9999"}}
                                        mask={['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                    />
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
