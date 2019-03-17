import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link } from 'react-router-dom';
import history from '../core/history';
import ThesisForm from '../ThesisForm';
import ThesisList from './ThesisList';
import ThesisShow from './ThesisShow';
import { routePrefix } from '../../globalConfig.json';

const App = () => (
  <Router history={history}>
    <Route path={`${routePrefix}thesis/create`} exact component={ThesisForm} />
    <Route path={`${routePrefix}thesis/show/:id`} exact component={ThesisShow} />
    <Route path={`${routePrefix}edit/:id`} component={ThesisForm} />
    <Route path={`${routePrefix}thesis/list`} component={ThesisList} />
  </Router>
);

const root = document.querySelector('#thesis');
ReactDom.render(<App />, root);
