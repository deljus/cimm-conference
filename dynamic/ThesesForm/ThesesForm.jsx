import React, { Component } from 'react'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator'
import { Typeahead } from 'react-bootstrap-typeahead';
import { getNames } from 'country-list';
import MaskedFormControl from 'react-bootstrap-maskedinput'

class TextInputDemo extends Component {
    state = {
        email: "",
        password: "",
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();
        alert(JSON.stringify(formData, null, 2));
        alert(JSON.stringify(this.state, null, 2));
    }

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs)
    }

    render () {
        return (
            //Controlled Components
            <ValidationForm className="registration-form" onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                <h3>Login or <a href="/registration">Registration</a></h3>
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
                    <button className="btn btn-primary">Submit</button>
                </div>
            </ValidationForm>
        )
    }
}

export default TextInputDemo;
