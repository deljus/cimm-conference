import React, { Component } from 'react'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator'
import axios from 'axios';
import Alert from '../components/Alerts';

class TextInputDemo extends Component {
    state = {
        email: "",
        password: "",
        alertPrimaryShow: false
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async(e, formData, inputs) => {
        e.preventDefault();
      try{
        await axios.post('/login', formData);
      }catch (e) {
        this.setState({ alertDangerShow: true });
      }
    }

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs)
    };

  onAlertDismiss = () => {
    this.setState({ alertPrimaryShow: false })
  };

    render () {
        return (
            //Controlled Components
            <ValidationForm className="registration-form" onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                <h3>Login or <a href="/registration">Registration</a></h3>
              <Alert
                text="Unfortunately, something went wrong. Please contact the site administrator."
                type="danger"
                show={this.state.alertDangerShow}
                onDismiss={this.onAlertDismiss}
              />
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
