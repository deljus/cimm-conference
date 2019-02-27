import React from 'react';
import { storiesOf } from '@storybook/react';
import ProfileForm from './ProfileForm';
import {container} from "../../.storybook/decorators";

storiesOf('UI', module)
    .addDecorator(container({ border: '1px dotted grey'}))
    .add('ProfileForm', () => (
        <ProfileForm />
    ));
