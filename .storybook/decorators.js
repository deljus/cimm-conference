import React from 'react';

export const container = styles => story => (<div style={{width: '50%', padding: 20, margin: 'auto', ...styles}}>{story()}</div>);

export const wrapContainer = (Component, props) => story => (<Component {...props}>{story()}</Component>);
