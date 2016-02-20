import 'babel/polyfill';
import './vendor/modernizr';

import React from 'react';
import App from './components/App';
import AppActions from './actions/AppActions';

function run() {
    var component = React.createElement(App);
    React.render(component, document.body);
}

Promise.all([
    new Promise((resolve) => {
        if (window.addEventListener) {
            window.addEventListener('DOMContentLoaded', resolve);
        } else {
            window.attachEvent('onload', resolve);
        }
    }),
    new Promise((resolve) => {
        AppActions.loadData(10, resolve);
    })
]).then(run);
