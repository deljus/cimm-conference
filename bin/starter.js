require('ignore-styles');
require('@babel/polyfill');

require('@babel/register')({
    ignore: [/(node_modules)/],
    presets: [
        ['env', {
            targets: {
                node: 'current'
            }
        }],
        '@babel/preset-env', '@babel/preset-react'
    ],
    plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-class-properties']
});


require('./www');
