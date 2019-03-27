import {
  configure, mount, shallow, render
} from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

global.mock = new MockAdapter(axios);
global.mount = mount;
global.shallow = shallow;
global.shallow = render;

global.window = Object.create(window);

Object.defineProperty(window, 'location', {
  value: {
    href: ''
  }
});

configure({ adapter: new ReactSixteenAdapter() });

console.error = message => {
  throw new Error(message);
};
