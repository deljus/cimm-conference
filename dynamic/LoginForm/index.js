import React from 'react';
import ReactDom from 'react-dom';
import LoginForm from './LoginForm';

const root = document.querySelector('#login-form');
ReactDom.render(<LoginForm />, root);
