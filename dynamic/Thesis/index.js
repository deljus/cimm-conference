import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link } from 'react-router-dom';
import history from '../core/history';
import ThesisForm from './ThesisForm';
import ThesisList from './ThesisList';
import ThesisShow from './ThesisShow';
import { config, insideRoutes } from '../../utils/globalConfig';

const App = () => (
  <Router history={history}>
    <Route path={config.routePrefix + insideRoutes.thesis.create} exact component={ThesisForm} />
    <Route path={config.routePrefix + insideRoutes.thesis.show} exact component={ThesisShow} />
    <Route path={config.routePrefix + insideRoutes.thesis.edit} component={ThesisForm} />
    <Route path={config.routePrefix + insideRoutes.thesis.list} component={ThesisList} />
  </Router>
);

const root = document.querySelector('#thesis');
ReactDom.render(<App />, root);
