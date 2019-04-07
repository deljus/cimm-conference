import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route } from 'react-router-dom';
import history from '../core/history';
import CreateStaticPage from './CreateStaticPage';
import StaticPageList from './StaticPageList';
import { config, insideRoutes } from '../../utils/globalConfig';

const App = () => (
  <Router history={history}>
    <Route path={insideRoutes.admin.page.create} exact component={CreateStaticPage} />
    <Route path={insideRoutes.admin.page.edit} component={CreateStaticPage} />
    <Route path={insideRoutes.admin.page.list} component={StaticPageList} />
  </Router>
);

const root = document.querySelector('#create-static-page');
ReactDom.render(<App />, root);
