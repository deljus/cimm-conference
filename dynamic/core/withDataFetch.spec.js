import React from 'react';
import withDataFetch from './withDataFetch';

const Component = ({ renderAlerts }) => (<div>{ renderAlerts() }</div>);

const setup = (props) => {
  const WrappenComp = withDataFetch(Component);
  return mount(<WrappenComp {...props} />);
};

describe('withFetchData', ()=> {
  it('Проверка проброса props', () => {
    const wrapper = setup({ test: 'testProps' });
    expect(wrapper.find(Component).props()).toEqual({
      fetchData: expect.any(Function),
      loading: false,
      renderAlerts: expect.any(Function),
      test: 'testProps'
    });
  });
  describe('Succsess request', () => {
    it('Проверка отправки запроса', async () => {
      const wrapper = setup();
      const data = { response: true };
      mock.onGet('url').reply(200, data);
      const response = await wrapper.find(Component).props().fetchData({ method: 'get', url: 'url' });
      expect(response).toEqual(data);
    });
    it('Проверка редиректа', async () => {
      const wrapper = setup();
      const data = { redirect: '/testUrl' };
      mock.onGet('url').reply(200, data);
      const response = await wrapper.find(Component).props().fetchData({ method: 'get', url: 'url' });

      expect(window.location.href).toBe(data.redirect);
      expect(response).toBe(undefined);
    });
    it('Проверка показа сообщений', async () => {
      const wrapper = setup();
      const data = { message: 'testMessage' };
      mock.onGet('url').reply(200, data);
      const response = await wrapper.find(Component).props().fetchData({ method: 'get', url: 'url' });
      wrapper.update();
      expect(wrapper.find('Alerts').at(1).props()).toEqual({
        onDismiss: expect.any(Function),
        show: true,
        text: 'testMessage',
        type: 'primary'
      });
      expect(response).toEqual(data);
    });
  });
  describe('Succsess request', () => {
    it('Проверка отправки запроса', async () => {
      const wrapper = setup();
      const data = { response: true };
      mock.onGet('url').reply(500, data);
      const response = await wrapper.find(Component).props().fetchData({ method: 'get', url: 'url' });
      expect(response).toEqual(undefined);
    });
    it('Проверка показа сообщений', async () => {
      const wrapper = setup();
      const data = { message: 'testMessage' };
      mock.onGet('url').reply(500, data);
      const response = await wrapper.find(Component).props().fetchData({ method: 'get', url: 'url' });
      wrapper.update();
      expect(wrapper.find('Alerts').at(0).props()).toEqual({
        onDismiss: expect.any(Function),
        show: true,
        text: 'Request failed with status code 500',
        type: 'danger'
      });
      expect(response).toBe(undefined);
    });
  });
});
