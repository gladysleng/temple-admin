import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/application.js';
import { BrowserRouter } from 
    'react-router-dom';

ReactDOM.render(
  <BrowserRouter> <Application /> </BrowserRouter>, document.getElementById('root')
);