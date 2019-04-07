import { createBrowserHistory } from 'history';
import { config } from '../../utils/globalConfig';

const history = createBrowserHistory();

export const redirect = (url) => {
  history.push(url);
};

export default history;
