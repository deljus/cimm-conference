import React, { Component } from 'react'
import axios from 'axios';
import { Alert } from "../components";
import { config } from "../../utils/globalConfig";

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
            const params = {
                ...options,
                url: options.url
            };
            const response = await axios(params);
            const { data } = response;
            if(data.message){
                this.setState({
                    message: data.message,
                    alertPrimaryShow: true
                });
            }
            if(data.redirect){
                window.location.href = data.redirect;
                return;
            }
            return data;
        }catch (e) {
            if(e.redirect){
                window.location.href = e.redirect;
                return;
            };
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
