import React, { Component } from 'react'
import axios from 'axios';
import { Alert } from "../components";

const defaultState = {
    alertPrimaryShow: false,
    alertDangerShow: false,
    message: '',
    loading: false,
};

const withDataFetch = WrappedComponent => class extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }

    fetchData = async (options) => {
        try{
            this.setState({ loading: true });
            const response = await axios(options);
            const { data } = response;
            if(data.message){
                this.setState({
                    message: data.message,
                    alertPrimaryShow: true
                });
            }
            return data;
        }catch (e) {
            this.setState({
                message: e.message,
                alertDangerShow: true
            });
        }finally {
            this.setState({ loading: false });
        }
    };

    onAlertDismiss = (name) => () => {
        this.setState({ [name]: false })
    };

    renderAlerts = () => {
        const {
            alertPrimaryShow,
            alertDangerShow,
            message
        } = this.state;

        return (
        <>
            <Alert
                text={message}
                type="danger"
                show={alertDangerShow}
                onDismiss={this.onAlertDismiss('alertDangerShow')}
            />
            <Alert
                text={message}
                type="primary"
                show={alertPrimaryShow}
                onDismiss={this.onAlertDismiss('alertPrimaryShow')}
            />
         </>
    )};

    render () {
        const { loading } = this.state;

        return (
            <WrappedComponent {...this.props} loading={loading} renderAlerts={this.renderAlerts} fetchData={this.fetchData}/>

        )
    }
};

export default withDataFetch;
