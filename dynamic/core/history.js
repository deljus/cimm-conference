import { createBrowserHistory } from 'history';
import { routePrefix } from '../../globalConfig.json';

const history = createBrowserHistory();

export const redirect = (url) => {
  history.push(`${routePrefix}${url}`);
};

export default history;
