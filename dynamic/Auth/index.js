import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route } from 'react-router-dom';
import history from '../core/history';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import NewPassForm from './NewPassForm';
import ChangePassForm from './ChangePassForm';
import { insideRoutes } from '../../utils/globalConfig';

const App = () => (
  <Router history={history}>
    <Route path={insideRoutes.auth.login} exact component={LoginForm} />
    <Route path={insideRoutes.auth.registration} exact component={RegisterForm} />
    <Route path={insideRoutes.auth.changePass} component={NewPassForm} />
    <Route path={insideRoutes.auth.changePassByEmail} component={ChangePassForm} />
  </Router>
);

const root = document.querySelector('#auth');
ReactDom.render(<App />, root);
