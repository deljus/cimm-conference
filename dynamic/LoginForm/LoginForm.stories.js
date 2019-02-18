import React from 'react';
import { storiesOf } from '@storybook/react';
import { container } from '../../.storybook/decorators';
import '../../public/stylesheets/style.css';
import LoginForm from './LoginForm';

storiesOf('UI', module)
  .addDecorator(container({ border: '1px dotted grey'}))
  .add('LoginForm', () => (
    <LoginForm />
  ));
