import React from 'react';
import { storiesOf } from '@storybook/react';
import { container } from '../../.storybook/decorators';
import '../../public/stylesheets/style.css';
import ThesesForm from './ThesesForm';

storiesOf('UI', module)
  .addDecorator(container({ border: '1px dotted grey'}))
  .add('ThesesForm', () => (
    <ThesesForm />
  ));
