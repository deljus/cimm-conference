import { createBrowserHistory } from 'history';
import { config } from '../../globalConfig';

const history = createBrowserHistory();

export const redirect = (url) => {
  history.push(config.routePrefix + url);
};

export default history;
