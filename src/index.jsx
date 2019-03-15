import React from 'react';
import ReactDom from 'react-dom';
import {hot} from 'react-hot-loader';
import App from './App';

document.body.innerHTML += '<div id="root"></div>';

ReactDom.render(<App/>, document.getElementById('root'));
hot(module);